export default function ResearchQuestionPage() {
  return (
    <div className="w-full px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Question</h1>
      <p className="text-lg text-gray-600 mb-8">Which retrieval setup most improves evidence grounding and reduces contradiction and neutral-evidence failures in a legal RAG system built over U.S. federal appellate opinions?</p>
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Hypotheses</h2>
          <ul className="space-y-3 text-sm text-blue-800">
            <li><strong>H1:</strong> Hybrid BM25+BGE-M3+CrossEncoder achieves significantly higher Hit@10 than BM25 and BGE-M3 alone (paired bootstrap, p &lt; 0.05).</li>
            <li><strong>H2:</strong> Architectures with higher Hit@10 produce significantly lower contradiction rate in downstream generation (normalized by claim count and per 1K tokens).</li>
            <li><strong>H3:</strong> Hybrid achieves higher Hit@10 than BGE-M3 alone.</li>
          </ul>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Motivation</h2>
          <p className="text-sm text-gray-700">Grounded in <em>Mata v. Avianca Airlines</em> (2023) — a documented case of legal hallucination with real-world consequences. Targets U.S. federal appellate opinions from CourtListener (1,465,484 opinions).</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Results (n=20,877 queries)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Retriever</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">Hit@1</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">Hit@10</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">MRR</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">Hallucinated</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {r:"BM25",h1:"0.0251",h10:"0.1459",mrr:"0.0642",hal:"62.92%"},
                  {r:"BGE-M3",h1:"0.0244",h10:"0.0862",mrr:"0.0457",hal:"63.99%"},
                  {r:"RRF (Hybrid)",h1:"0.0391",h10:"0.1557",mrr:"0.0769",hal:"60.27%"},
                  {r:"Reranker (fine-tuned)",h1:"0.3069",h10:"0.3598",mrr:"0.3275",hal:"55.76%"},
                ].map((row,i)=>(
                  <tr key={row.r} className={i%2===0?"bg-white":"bg-gray-50"}>
                    <td className="px-4 py-2 font-medium text-gray-800">{row.r}</td>
                    <td className="px-4 py-2 text-center text-gray-600">{row.h1}</td>
                    <td className="px-4 py-2 text-center text-gray-600">{row.h10}</td>
                    <td className="px-4 py-2 text-center text-gray-600">{row.mrr}</td>
                    <td className="px-4 py-2 text-center text-gray-600">{row.hal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Pearson r = -0.9624 (r²=92.6%) between Hit@10 and hallucination rate.</p>
        </div>
      </div>
    </div>
  )
}
