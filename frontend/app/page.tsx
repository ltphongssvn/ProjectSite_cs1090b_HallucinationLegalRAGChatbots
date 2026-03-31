/**
 * HomePage — CS1090B Project Site
 */

const milestones = [
  { id: 1, title: 'Milestone 1: Group Formation & Project Selection', due: 'March 24, 2025', weight: '2%', description: 'Select top 5 project choices. Groups of 3–5 students. Staff assigns groups March 27.', status: 'complete' },
  { id: 2, title: 'Milestone 2: Data Wrangling & Project Redefinition', due: 'April 10, 2025', weight: '10%', description: 'Data acquisition, preprocessing, missing data, imbalances, scaling. 10-min presentation.', status: 'complete' },
  { id: 3, title: 'Milestone 3: EDA, Initial Modeling & Pipeline Development', due: 'April 24, 2025', weight: '20%', description: 'EDA, baseline model, training/testing pipeline, evaluation metrics. 10-min presentation.', status: 'in-progress' },
  { id: 4, title: 'Milestone 4: Final Modeling & Deliverables', due: 'May 12, 2025', weight: '68%', description: '2000–2500 word report, 6-min video, well-commented Python notebook.', status: 'upcoming' },
]

const sprints = [
  {
    id: 1,
    title: 'Sprint 1 — Environment & Data Infrastructure',
    dates: 'Mar 24 – Apr 10',
    status: 'complete',
    tasks: [
      { name: 'Environment bootstrap: setup.sh, tests passing, coverage verified', status: 'complete' },
      { name: 'CourtListener: 1,465,484 opinions downloaded, 159 shards, 7.6GB', status: 'complete' },
      { name: 'DVC + S3 artifact versioning operational', status: 'complete' },
      { name: 'All src/ modules implemented and tested', status: 'complete' },
      { name: 'SQLite citation index built via src/extract.py', status: 'complete' },
      { name: 'ruff + mypy linting configured in pyproject.toml', status: 'complete' },
      { name: 'pip-audit CVE scan + CycloneDX SBOM generation in CI', status: 'complete' },
    ],
  },
  {
    id: 2,
    title: 'Sprint 2 — Data Wrangling & LePaRD Acquisition',
    dates: 'Apr 10 – Apr 17',
    status: 'in-progress',
    tasks: [
      { name: 'CourtListener RAG-readiness refinement (Cell 2 — tokenizer-aware chunking 1024 subwords)', status: 'in-progress' },
      { name: 'spaCy stripped pipeline setup (exclude=["ner","parser","lemmatizer"]), nlp.max_length set for full appellate opinions', status: 'in-progress' },
      { name: 'Citation-aware chunk splits with metadata per chunk: court_id, year, is_precedential, opinion_id, chunk_index', status: 'pending' },
      { name: 'LePaRD acquisition via HuggingFace — Priority 1 (cap 500K–1M pairs)', status: 'pending' },
      { name: 'DVC push data shards to S3 cs1090b-hallucinationlegalragchatbots', status: 'pending' },
      { name: 'Train/val/test split — src/split.py (500K train / 50K val / 10K–50K test)', status: 'pending' },
    ],
  },
  {
    id: 3,
    title: 'Sprint 3 — Index Generation & Model Training',
    dates: 'Apr 17 – Apr 24',
    status: 'pending',
    tasks: [
      { name: 'BM25 (bm25s) index over pre-chunked payloads from Stage 3', status: 'pending' },
      { name: 'BGE-M3 FAISS Flat index for validation (CLS pooling, bfloat16)', status: 'pending' },
      { name: 'BGE-M3 fine-tuning: MultipleNegativesRankingLoss, lr=1e-5, batch=32, epochs=3', status: 'pending' },
      { name: 'Hybrid: BM25+BGE-M3+bge-reranker-v2-m3 CrossEncoder (top-50→top-10)', status: 'pending' },
      { name: 'FAISS IVF for full-corpus: index.train() on 100K subset, assert index.is_trained', status: 'pending' },
      { name: 'Log recall@k vs nprobe on validation set to justify IVF parameters; log nprobe/nlist to W&B', status: 'pending' },
      { name: 'Legal-BERT bi-encoder: 512-subword chunks, MultipleNegativesRankingLoss, lr=2e-5, warmup=10%, batch=32, epochs=3 (optional domain-reference)', status: 'pending' },
    ],
  },
  {
    id: 4,
    title: 'Sprint 4 — Evaluation: Tiers A/B/C',
    dates: 'Apr 24 – May 5',
    status: 'pending',
    tasks: [
      { name: 'Tier A: LePaRD Recall@k, MRR, NDCG@10 on 10K–50K capped test set', status: 'pending' },
      { name: 'Tier B: DeBERTa-v3 NLI classifier — 1,000 stratified queries, contradiction rate', status: 'pending' },
      { name: 'Log window count distribution per chunk; log window index per label', status: 'pending' },
      { name: 'Tier C: SQLite citation lookup — Hard Citation Hallucination + CitationFound_NoLocalSupport', status: 'pending' },
      { name: 'Log citation anchor offset on sliding-window fallback', status: 'pending' },
      { name: 'Sequential loading: BGE-M3 → Reranker → Mistral-7B → NLI → SQLite', status: 'pending' },
      { name: 'W&B experiment tracking: VRAM, GPU hours, metrics per phase', status: 'pending' },
    ],
  },
  {
    id: 5,
    title: 'Sprint 5 — Analysis, Ablations & Final Deliverables',
    dates: 'May 5 – May 12',
    status: 'pending',
    tasks: [
      { name: "Paired bootstrap significance tests (B=10,000), Cohen's d, BH-FDR", status: 'pending' },
      { name: 'Ablation: BGE-M3 vs Hybrid, w/o reranker, Legal-BERT, k∈{1,5,10,20}', status: 'pending' },
      { name: 'Ablation: training size 100K vs 500K vs 1M pairs', status: 'pending' },
      { name: 'Ablation: chunk overlap 128 vs 64 subwords on 10% subset', status: 'pending' },
      { name: 'Ablation: Stage 3 normalization on/off', status: 'pending' },
      { name: 'Ablation: Contradiction vs Neutral vs combined metric sensitivity', status: 'pending' },
      { name: 'wandb_logger.py: full per-phase VRAM, pooling flags, score distributions', status: 'pending' },
      { name: 'Final report: 2000–2500 words', status: 'pending' },
      { name: 'Video presentation: 6 minutes', status: 'pending' },
    ],
  },
]

const pipelineStages = [
  { name: 'Environment Bootstrap', status: 'complete' },
  { name: 'CourtListener Download', status: 'complete' },
  { name: 'DVC + S3', status: 'complete' },
  { name: 'CourtListener RAG Prep', status: 'in-progress' },
  { name: 'LePaRD Acquisition', status: 'pending' },
  { name: 'Index Generation', status: 'pending' },
  { name: 'Model Training', status: 'pending' },
  { name: 'Evaluation Tiers A/B/C', status: 'pending' },
  { name: 'Experiment Tracking W&B', status: 'pending' },
]

const reviewerConcerns = [
  {
    id: 'annotation',
    label: 'TF Reviewer',
    concern: 'It is not clear where the human-annotated hallucination rate comes from. The proposal does not mention how embedding methods will be trained to encode legal text.',
    response: 'Hallucination measurement is fully automated — no human annotation required. Three tiers: (A) LePaRD 4M+ expert-annotated citation pairs as gold-standard retrieval ground truth; (B) DeBERTa-v3-large NLI classifier (MoritzLaurer/DeBERTa-v3-large-mnli-fever-anli-ling-wanli) classifies each atomic claim against retrieved chunks locally — contradiction rate normalized by claim count and per 1K tokens; (C) SQLite citation index for hard citation hallucination detection. Embedding training: BGE-M3 fine-tuned with MultipleNegativesRankingLoss on 500K–1M LePaRD pairs (lr=1e-5, batch=32, epochs=3); Legal-BERT optional reference (lr=2e-5).',
    resolved: true,
  },
  {
    id: 'feasibility',
    label: 'Instructor',
    concern: 'Warning: groups should only consider this project if they have a plan for addressing the concerns regarding human-annotation of hallucinations and training of the embedding model. Without addressing the annotation problem the project will be infeasible.',
    response: 'Feasibility confirmed: LePaRD replaces human annotation entirely — 4M+ expert-annotated citation pairs provide gold-standard ground truth at scale. DeBERTa-v3 NLI runs fully locally with no API calls, no human reviewers, no annotation bottleneck. Compute is capped: 500K–1M training pairs, 1,000-query generation eval (±2.5pp at 95% CI). Infrastructure is already complete and operational.',
    resolved: true,
  },
]

const statusColors: Record<string, string> = {
  complete: 'bg-green-100 text-green-800 border-green-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  pending: 'bg-gray-100 text-gray-500 border-gray-300',
  upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
}

const badgeColors: Record<string, string> = {
  complete: 'bg-green-500 text-white',
  'in-progress': 'bg-yellow-500 text-white',
  pending: 'bg-gray-400 text-white',
  upcoming: 'bg-blue-400 text-white',
}

const taskDot: Record<string, string> = {
  complete: 'bg-green-500',
  'in-progress': 'bg-yellow-400',
  pending: 'bg-gray-300',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="w-full px-6 space-y-16">

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              Reducing Hallucination in Legal RAG Chatbots
            </h1>
            <p className="text-lg font-semibold text-gray-700 mb-1">
              COMPSCI 1090B: Data Science 2: Advanced Topics in Data Science
            </p>
            <p className="text-base text-gray-500">
              Harvard University · 2025-2026 Spring
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm min-w-[180px]">
            <p className="text-base font-bold text-gray-800 mb-2">
              Project Group - #43:{' '}
              <a href="https://github.com/ltphongssvn/cs1090b_HallucinationLegalRAGChatbots" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">GitHub</a>
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Alex Oort Alonso</li>
              <li>Allan Korir</li>
              <li>PHONG LE</li>
            </ol>
            <p className="text-sm text-gray-700 mt-3">Assigned Group's Teaching Fellow contact: Zac Sardi-Santos</p>
          </div>
        </header>

        {/* TF Reviewer Comments & Responses */}
        <section data-testid="reviewer-response" className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h2 className="text-2xl font-bold text-red-800">TF Reviewer Comments &amp; Instructor Notes — Addressed</h2>
            <span className="ml-auto px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase">All Resolved</span>
          </div>

          {/* TF Reviewer */}
          <div className="bg-white rounded-xl border border-red-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded uppercase">TF Reviewer</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Resolved</span>
            </div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Concern:</p>
            <p className="text-sm text-red-700 italic mb-4">&ldquo;It is not clear where the human-annotated hallucination rate comes from. The proposal does not mention how embedding methods will be trained to encode legal text.&rdquo;</p>
            <p className="text-sm font-semibold text-gray-500 mb-2">Response:</p>
            <ul className="space-y-3 text-sm text-gray-800">
              <li className="flex items-start gap-2"><span className="mt-1 text-green-600 font-bold">•</span><span><strong>No human annotation required.</strong> Hallucination measurement is fully automated across three tiers:</span></li>
              <li className="ml-4 flex items-start gap-2"><span className="mt-1 text-blue-500 font-bold">–</span><span><strong>Tier A — Retrieval ground truth:</strong> LePaRD 4M+ expert-annotated citation pairs serve as gold-standard retrieval ground truth; evaluation capped at 10K–50K pairs. Metrics: Recall@k, MRR, NDCG@10.</span></li>
              <li className="ml-4 flex items-start gap-2"><span className="mt-1 text-blue-500 font-bold">–</span><span><strong>Tier B — NLI hallucination measurement:</strong> <code className="bg-gray-100 px-1 rounded text-xs">MoritzLaurer/DeBERTa-v3-large-mnli-fever-anli-ling-wanli</code> classifies each atomic claim independently against individual retrieved chunks, running fully locally with no API calls. 512-token limit handled via repo-certified overflow windowing (<code className="bg-gray-100 px-1 rounded text-xs">return_overflowing_tokens=True, max_length=512, stride=64</code>, <code className="bg-gray-100 px-1 rounded text-xs">use_fast=False</code>); window-level logits aggregated per chunk. Contradiction rate normalized by per-query claim count and per 1K tokens. Zero-claim responses excluded and reported separately. NLI confidence scores treated as diagnostic indicators only.</span></li>
              <li className="ml-4 flex items-start gap-2"><span className="mt-1 text-blue-500 font-bold">–</span><span><strong>Tier C — Citation existence verification:</strong> Local SQLite index (<code className="bg-gray-100 px-1 rounded text-xs">check_same_thread=False</code>; read-only) provides O(1) citation lookup. NULL → Hard Citation Hallucination logged, NLI skipped. Found with no local NLI support → <code className="bg-gray-100 px-1 rounded text-xs">CitationFound_NoLocalSupport</code> logged. Citation hash (<code className="bg-gray-100 px-1 rounded text-xs">opinion_id + anchor span</code>) logged per lookup. Windowing: (1) Hybrid reranker; (2) keyword/regex; (3) sliding-window fallback.</span></li>
              <li className="flex items-start gap-2"><span className="mt-1 text-green-600 font-bold">•</span><span><strong>Embedding model training:</strong> BGE-M3 fine-tuned with <code className="bg-gray-100 px-1 rounded text-xs">MultipleNegativesRankingLoss</code> on 500K–1M capped LePaRD pairs (lr=1e-5, warmup=10%, batch=32, epochs=3). CLS pooling enforced per BAAI config; runtime assertion in <code className="bg-gray-100 px-1 rounded text-xs">model_loader.py</code>; pooling flags logged to W&amp;B. Legal-BERT optional domain-reference (lr=2e-5, batch=32, epochs=3). BM25 requires no training (k1=1.5, b=0.75). All architectures evaluated with <code className="bg-gray-100 px-1 rounded text-xs">mistralai/Mistral-7B-Instruct-v0.2</code> held constant (greedy decoding, chat template enforced).</span></li>
            </ul>
          </div>

          {/* Instructor */}
          <div className="bg-white rounded-xl border border-red-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded uppercase">Instructor</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Resolved</span>
            </div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Concern:</p>
            <p className="text-sm text-red-700 italic mb-4">&ldquo;Warning: groups should only consider this project if they have a plan for addressing the concerns regarding human-annotation of hallucinations and training of the embedding model. Without addressing the annotation problem the project will be infeasible.&rdquo;</p>
            <p className="text-sm font-semibold text-gray-500 mb-2">Response:</p>
            <ul className="space-y-3 text-sm text-gray-800">
              <li className="flex items-start gap-2"><span className="mt-1 text-green-600 font-bold">•</span><span><strong>Human annotation bottleneck eliminated.</strong> LePaRD (ACL 2024) provides 4M+ expert-annotated legal citation pairs as gold-standard retrieval ground truth. DeBERTa-v3 NLI runs fully locally on cluster GPU (bfloat16, ~3GB VRAM); no API calls, no human reviewers, no annotation bottleneck.</span></li>
              <li className="flex items-start gap-2"><span className="mt-1 text-green-600 font-bold">•</span><span><strong>Training for the Embedding Model:</strong> BGE-M3 is fine-tuned as the main dense retriever using contrastive (<code className="bg-gray-100 px-1 rounded text-xs">MultipleNegativesRankingLoss</code>) learning on 500K–1M LePaRD citation pairs (lr=1e-5, batch=32, 3 epochs) to produce high-quality legal embeddings for both the standalone dense retriever and the hybrid BM25+BGE-M3+reranker pipeline.</span></li>
              <li className="flex items-start gap-2"><span className="mt-1 text-green-600 font-bold">•</span><span><strong>Compute feasibility confirmed and capped.</strong> Training: 500K–1M pairs (not 3.2M full LePaRD). Retrieval eval: 10K–50K queries. Generation eval: 1,000 stratified queries (±2.5pp at 95% CI). Iteration corpus: ~150K opinions (10% subset) for fast iteration; full 1.46M for final runs.</span></li>
              <li className="flex items-start gap-2"><span className="mt-1 text-green-600 font-bold">•</span><span><strong>Infrastructure already operational.</strong> 1,465,484 federal appellate opinions downloaded, filtered, sharded (7.6GB); DVC + S3 versioning active; all <code className="bg-gray-100 px-1 rounded text-xs">src/</code> modules implemented and tested. Environment asserts <code className="bg-gray-100 px-1 rounded text-xs">transformers.__version__ == &quot;4.39.3&quot;</code>, <code className="bg-gray-100 px-1 rounded text-xs">torch.cuda.is_bf16_supported()</code>, and <code className="bg-gray-100 px-1 rounded text-xs">get_device_capability()[0] &gt;= 8</code> at startup.</span></li>
              <li className="flex items-start gap-2"><span className="mt-1 text-green-600 font-bold">•</span><span><strong>Sequential model loading prevents VRAM exhaustion.</strong> Single 23.7GB L4 (SLURM-allocated). BGE-M3 (~2.27GB), reranker (~2GB), Mistral (~14–15GB + KV cache), DeBERTa (~3GB) loaded one phase at a time; explicit DataLoader deletion + <code className="bg-gray-100 px-1 rounded text-xs">torch.cuda.empty_cache()</code> + <code className="bg-gray-100 px-1 rounded text-xs">gc.collect()</code> between phases; memory stats + CUDA stream sync time + <code className="bg-gray-100 px-1 rounded text-xs">allow_tf32</code> state logged per phase.</span></li>
              <li className="flex items-start gap-2"><span className="mt-1 text-green-600 font-bold">•</span><span><strong>Priority sequencing:</strong> LePaRD acquisition → 10–20% subset fast iteration → BM25 + BGE-M3 + Tier A → scale + Tier B/C.</span></li>
            </ul>
          </div>
        </section>

        {/* Pipeline Status */}
        <section data-testid="pipeline-status">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pipeline Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pipelineStages.map((s) => (
              <div key={s.name} className={`rounded-lg border px-4 py-3 flex items-center gap-2 ${statusColors[s.status]}`}>
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${taskDot[s.status]}`} />
                <span className="text-sm font-medium">{s.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sprint Planning */}
        <section data-testid="sprint-planning">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Agile Sprint Plan — Coding Tasks</h2>
          <div className="space-y-6">
            {sprints.map((sprint) => (
              <div key={sprint.id} data-testid="sprint-card" className={`border rounded-xl p-6 ${statusColors[sprint.status]}`}>
                <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
                  <div data-testid={`sprint-${sprint.id}`}>
                    <h3 className="text-lg font-semibold">{sprint.title}</h3>
                    <p className="text-sm opacity-75">{sprint.dates}</p>
                  </div>
                  <span data-testid="status-badge" className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${badgeColors[sprint.status]}`}>
                    {sprint.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {sprint.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${taskDot[task.status]}`} />
                      {task.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Course Milestones */}
        <section aria-label="Course Milestones">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Milestones</h2>
          <div className="grid gap-4">
            {milestones.map((m) => (
              <div key={m.id} data-testid="milestone-card" className={`border rounded-xl p-5 ${statusColors[m.status]}`}>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <h3 className="text-base font-semibold">{m.title}</h3>
                  <span className="text-sm font-medium">Weight: {m.weight}</span>
                </div>
                <p className="text-sm font-medium mb-1">Due: {m.due}</p>
                <p className="text-sm">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sprint Timeline */}
        <section data-testid="sprint-timeline">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sprint Timeline</h2>
          <ol className="relative border-l-2 border-blue-300 ml-4 space-y-6">
            {sprints.map((s) => (
              <li key={s.id} className="ml-6">
                <span className={`absolute -left-3 w-5 h-5 rounded-full border-2 border-white ${s.status === 'complete' ? 'bg-green-400' : s.status === 'in-progress' ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                <p className="text-sm text-gray-500">{s.dates}</p>
                <p className="font-medium text-gray-800">{s.title}</p>
              </li>
            ))}
          </ol>
        </section>

      </div>
    </main>
  )
}
