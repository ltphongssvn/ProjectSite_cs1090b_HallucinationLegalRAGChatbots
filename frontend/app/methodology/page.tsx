export default function MethodologyPage() {
  const tiers = [
    { id: 'A', title: 'Tier A — Retrieval Grounding', desc: 'LePaRD expert-annotated citation pairs. 20,877 unique queries over 7,813,273-chunk corpus. Metrics: Hit@1, Hit@5, Hit@10, Hit@100, MRR, NDCG@10. Two-stage semantic bridge (eyecite + rapidfuzz) produced 2,429,533 verified pairs.', status: 'complete' },
    { id: 'B', title: 'Tier B — LLM-as-Judge Hallucination Detection', desc: 'gpt-4o-mini judges each generation against shown contexts, returning FAITHFUL / PARTIAL / HALLUCINATED. 5 ablations x 20,877 queries = 104,385 generations judged. Budget ~$53. 95% CIs ±0.86% to ±1.96%. Pearson r = -0.9624 (r²=92.6%) between Hit@10 and hallucination rate.', status: 'complete' },
    { id: 'C', title: 'Tier C — Retrieval Ceiling Analysis', desc: 'Stratified evaluation by gold-cluster citation frequency (HEAD/TORSO/TAIL). Hit@100=0.375 ceiling defines irreducible hallucination floor ~56%. Per-query paired comparison: fine-tuned reranker wins 30.6x more queries than hub-concat. Symmetric leakage cleaning via RE2 prevented BM25 Hit@1 inflation from 2.5% to 18%+.', status: 'complete' },
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
