"""
FastAPI application entry point.
Project: CS1090B — Reducing Hallucination in Legal RAG Chatbots
"""
import json
import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rank_bm25 import BM25Okapi
from openai import OpenAI

app = FastAPI(
    title="CS1090B Hallucination Legal RAG Chatbots",
    description="Project website API — CS1090B Harvard",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_corpus_path = Path(__file__).parent / "sample_corpus.json"
_corpus = json.loads(_corpus_path.read_text())
_tokenized = [doc["text"].lower().split() for doc in _corpus]
_bm25 = BM25Okapi(_tokenized, k1=1.5, b=0.75)


class QueryRequest(BaseModel):
    question: str
    architecture: str = "bm25"


class ChunkResult(BaseModel):
    id: str
    court: str
    text: str
    score: float


class QueryResponse(BaseModel):
    question: str
    architecture: str
    retrieved_chunks: list[ChunkResult]
    answer: str
    faithfulness: str
    faithfulness_reason: str


@app.get("/health")
def health() -> dict:
    """Health check endpoint."""
    return {"status": "ok", "project": "hallucination-legal-rag-chatbots"}


@app.post("/api/demo/query", response_model=QueryResponse)
def demo_query(req: QueryRequest) -> QueryResponse:
    """BM25 retrieval + gpt-4o-mini generation + gpt-4o-mini faithfulness judge."""
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", ""))

    tokens = req.question.lower().split()
    scores = _bm25.get_scores(tokens)
    top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:5]
    retrieved = [
        ChunkResult(
            id=_corpus[i]["id"],
            court=_corpus[i]["court"],
            text=_corpus[i]["text"],
            score=round(float(scores[i]), 4),
        )
        for i in top_indices
    ]

    context = "\n\n".join(f"[{r.court.upper()}] {r.text}" for r in retrieved)

    gen_resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": f"""You are a legal research assistant. You MUST answer using ONLY the exact information in the provided context passages. Do NOT use any outside legal knowledge. If the context does not directly address the question, you MUST say exactly: "The provided context does not contain sufficient information to answer this question." Do not guess, infer, or supplement with legal knowledge not present in the context.

Context:
{context}

Question: {req.question}"""}],
        temperature=0.0,
        max_tokens=400,
    )
    answer = gen_resp.choices[0].message.content.strip()

    judge_resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": f"""You are a strict hallucination judge for a legal RAG system. Classify the answer strictly:

- FAITHFUL: Every claim in the answer is directly and explicitly supported by the context. No outside knowledge used.
- PARTIAL: Some claims are supported by context but the answer also contains claims, case names, legal standards, or reasoning NOT found in the context.
- HALLUCINATED: The answer contains significant legal claims, case citations, or reasoning NOT present in the context. Also label HALLUCINATED if the answer refuses to answer but the context clearly does contain relevant information.

Be strict: if ANY claim in the answer cannot be traced to the context, label it PARTIAL or HALLUCINATED.

Context:
{context}

Answer:
{answer}

Respond with JSON only: {{"label": "FAITHFUL|PARTIAL|HALLUCINATED", "reason": "cite specific claims that are supported or unsupported"}}"""}],
        temperature=0.0,
        max_tokens=150,
    )
    judge_text = judge_resp.choices[0].message.content.strip()
    try:
        judge_json = json.loads(judge_text)
        label = judge_json.get("label", "UNKNOWN")
        reason = judge_json.get("reason", "")
    except Exception:
        label = "UNKNOWN"
        reason = judge_text

    return QueryResponse(
        question=req.question,
        architecture=req.architecture,
        retrieved_chunks=retrieved,
        answer=answer,
        faithfulness=label,
        faithfulness_reason=reason,
    )
