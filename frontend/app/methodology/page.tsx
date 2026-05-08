export default function MethodologyPage() {
  const tiers = [
    { id: 'A', title: 'Tier A — Retrieval Grounding', desc: 'LePaRD 4M+ expert-annotated citation pairs. Metrics: Hit@k, MRR, NDCG@10. Capped at 10K–50K test pairs.', status: 'pending' },
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
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Hallucination Results by Ablation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Ablation</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">n judged</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">Hit@10</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">Faithful</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">Partial</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">Hallucinated</th>
              </tr>
            </thead>
            <tbody>
              {[
                {a:"No RAG",n:"12,977",h10:"—",f:"0.06%",p:"0.00%",hal:"99.94%"},
                {a:"BGE-M3",n:"7,101",h10:"0.0862",f:"9.07%",p:"26.94%",hal:"63.99%"},
                {a:"BM25",n:"6,929",h10:"0.1459",f:"9.15%",p:"27.93%",hal:"62.92%"},
                {a:"RRF (Hybrid)",n:"7,017",h10:"0.1557",f:"9.49%",p:"30.24%",hal:"60.27%"},
                {a:"Reranker (fine-tuned)",n:"2,500",h10:"0.3598",f:"11.84%",p:"32.40%",hal:"55.76%"},
              ].map((row,i)=>(
                <tr key={row.a} className={i%2===0?"bg-white":"bg-gray-50"}>
                  <td className="px-4 py-2 font-medium text-gray-800">{row.a}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{row.n}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{row.h10}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{row.f}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{row.p}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{row.hal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">Judge: gpt-4o-mini. Generator: Qwen2.5-7B-Instruct. Pearson r = -0.9624 between Hit@10 and hallucination rate.</p>
      </div>
    </div>
  )
}
