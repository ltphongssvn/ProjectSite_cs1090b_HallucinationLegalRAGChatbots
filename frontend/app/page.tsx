/**
 * HomePage — CS1090B Project Site
 * Agile Sprint Planning from README pipeline status + coding tasks
 */

const milestones = [
  {
    id: 1,
    title: 'Milestone 1: Group Formation & Project Selection',
    due: 'March 24, 2025',
    weight: '2%',
    description: 'Select top 5 project choices. Groups of 3–5 students. Staff assigns groups March 27.',
    status: 'complete',
  },
  {
    id: 2,
    title: 'Milestone 2: Data Wrangling & Project Redefinition',
    due: 'April 10, 2025',
    weight: '10%',
    description: 'Data acquisition, preprocessing, missing data, imbalances, scaling. 10-min presentation.',
    status: 'complete',
  },
  {
    id: 3,
    title: 'Milestone 3: EDA, Initial Modeling & Pipeline Development',
    due: 'April 24, 2025',
    weight: '20%',
    description: 'EDA, baseline model, training/testing pipeline, evaluation metrics. 10-min presentation.',
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Milestone 4: Final Modeling & Deliverables',
    due: 'May 12, 2025',
    weight: '68%',
    description: '2000–2500 word report, 6-min video, well-commented Python notebook.',
    status: 'upcoming',
  },
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
    ],
  },
  {
    id: 2,
    title: 'Sprint 2 — Data Wrangling & LePaRD Acquisition',
    dates: 'Apr 10 – Apr 17',
    status: 'in-progress',
    tasks: [
      { name: 'CourtListener RAG-readiness refinement (Cell 2 — tokenizer-aware chunking 1024 subwords)', status: 'in-progress' },
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
      { name: 'Tier C: SQLite citation lookup — Hard Citation Hallucination + CitationFound_NoLocalSupport', status: 'pending' },
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
      { name: 'Paired bootstrap significance tests (B=10,000), Cohen\'s d, BH-FDR', status: 'pending' },
      { name: 'Ablation: BGE-M3 vs Hybrid, w/o reranker, Legal-BERT, k∈{1,5,10,20}', status: 'pending' },
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
      <div className="max-w-5xl mx-auto space-y-16">

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
              Harvard University · phl690@g.harvard.edu
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm min-w-[180px]">
            <p className="text-base font-bold text-gray-800 mb-2">Project Group #43:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Thanh Phong Le</li>
              <li className="text-gray-400">...</li>
              <li className="text-gray-400">...</li>
            </ol>
          </div>
        </header>

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
              <div
                key={sprint.id}
                data-testid="sprint-card"
                className={`border rounded-xl p-6 ${statusColors[sprint.status]}`}
              >
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
