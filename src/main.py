"""
FastAPI application entry point.
Project: CS1090B — Reducing Hallucination in Legal RAG Chatbots
"""
from fastapi import FastAPI

app = FastAPI(
    title="CS1090B Hallucination Legal RAG Chatbots",
    description="Project website API — CS1090B Harvard",
    version="0.1.0",
)


@app.get("/health")
def health() -> dict:
    """Health check endpoint."""
    return {"status": "ok", "project": "hallucination-legal-rag-chatbots"}
