export default function MethodologyPage() {
  const tiers = [
    { id: 'A', title: 'Tier A — Retrieval Grounding', desc: 'LePaRD 4M+ expert-annotated citation pairs. Metrics: Recall@k, MRR, NDCG@10. Capped at 10K–50K test pairs.', status: 'pending' },
    { id: 'B', title: 'Tier B — NLI Hallucination Detection', desc: 'DeBERTa-v3-large-mnli classifies each atomic claim against retrieved chunks. 1,000 stratified queries. Contradiction rate normalized by claim count and per 1K tokens. Fully local, no API.', status: 'pending' },
    { id: 'C', title: 'Tier C — Citation Existence Check', desc: 'SQLite citation index lookup. NULL → Hard Citation Hallucination. Found + no NLI support → CitationFound_NoLocalSupport. Anchor-first windowing strategy.', status: 'pending' },
  ]
  return (
    <div className="w-full px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Methodology</h1>
      <p className="text-lg text-gray-600 mb-8">Three-tier automated hallucination measurement — no human annotation bottleneck.</p>
      <div className="space-y-4 mb-8">
        {tiers.map(t => (
          <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{t.title}</h2>
            <p className="text-sm text-gray-600">{t.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2">API Placeholder</h2>
        <p className="text-xs text-yellow-700 font-mono">GET /api/methodology — returns evaluation protocol details (pending)</p>
      </div>
    </div>
  )
}
