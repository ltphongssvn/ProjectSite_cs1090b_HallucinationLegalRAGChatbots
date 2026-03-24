export default function ResearchQuestionPage() {
  return (
    <div className="w-full px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Question</h1>
      <p className="text-lg text-gray-600 mb-8">Which retrieval setup most improves evidence grounding and reduces contradiction and neutral-evidence failures in a legal RAG system built over U.S. federal appellate opinions?</p>
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Hypotheses</h2>
          <ul className="space-y-3 text-sm text-blue-800">
            <li><strong>H1:</strong> Hybrid BM25+BGE-M3+CrossEncoder achieves significantly higher Recall@10 than BM25 and BGE-M3 alone (paired bootstrap, p &lt; 0.05).</li>
            <li><strong>H2:</strong> Architectures with higher Recall@10 produce significantly lower contradiction rate in downstream generation (normalized by claim count and per 1K tokens).</li>
            <li><strong>H3:</strong> Hybrid achieves higher Recall@10 than BGE-M3 alone.</li>
          </ul>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Motivation</h2>
          <p className="text-sm text-gray-700">Grounded in <em>Mata v. Avianca Airlines</em> (2023) — a documented case of legal hallucination with real-world consequences. Targets U.S. federal appellate opinions from CourtListener (1,465,484 opinions).</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">API Placeholder</h2>
          <p className="text-xs text-yellow-700 font-mono">GET /api/research-question — returns structured hypotheses and metrics (pending)</p>
        </div>
      </div>
    </div>
  )
}
