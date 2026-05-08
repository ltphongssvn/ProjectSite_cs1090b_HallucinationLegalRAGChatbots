export default function ResultsPage() {
  const metrics = [
    { arch: 'No RAG (baseline)', h1: '-', h10: '-', mrr: '-', ndcg: '-', hal: '99.94%', n: '12,977' },
    { arch: 'BGE-M3', h1: '0.0244', h10: '0.0862', mrr: '0.0457', ndcg: '0.0516', hal: '63.99%', n: '7,101' },
    { arch: 'BM25', h1: '0.0251', h10: '0.1459', mrr: '0.0642', ndcg: '0.0783', hal: '62.92%', n: '6,929' },
    { arch: 'RRF (BM25+BGE-M3, k=60)', h1: '0.0391', h10: '0.1557', mrr: '0.0769', ndcg: '0.0894', hal: '60.27%', n: '7,017' },
    { arch: 'Reranker Concat (hub)', h1: '0.0284', h10: '0.1098', mrr: '0.0575', ndcg: '0.0639', hal: '-', n: '-' },
    { arch: 'Reranker MaxP (hub)', h1: '0.0426', h10: '0.1470', mrr: '0.0778', ndcg: '0.0881', hal: '-', n: '-' },
    { arch: 'Reranker Fine-tuned (best)', h1: '0.3069', h10: '0.3598', mrr: '0.3275', ndcg: '0.3349', hal: '55.76%', n: '2,500' },
  ]
  const highlights = [
    { label: 'Hit@1 gain (fine-tuned vs BM25)', value: '+1,120%', note: '0.0251 -> 0.3069' },
    { label: 'Hallucination reduction', value: '-44.2pp', note: 'no-RAG 99.94% -> 55.76%' },
    { label: 'Retrieval ceiling (Hit@100)', value: '37.5%', note: 'Irreducible ~56% hallucination floor' },
  ]
  return (
    <div className="w-full px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Results Dashboard</h1>
      <p className="text-lg text-gray-600 mb-2">MS4 complete. n=20,877 unique queries. Generator: Qwen2.5-7B-Instruct. Judge: gpt-4o-mini.</p>
      <p className="text-sm text-green-700 font-semibold bg-green-50 border border-green-200 rounded-lg px-4 py-2 mb-8 inline-block">
        Pearson r = -0.9624 (r2=92.6%) between Hit@10 and hallucination rate
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['Architecture','Hit@1','Hit@10','MRR','NDCG@10','Hallucinated','n judged'].map(h=>(
                <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((m,i)=>(
              <tr key={m.arch} className={i%2===0?'bg-white':'bg-gray-50'}>
                <td className="px-4 py-2 font-medium text-gray-800">{m.arch}</td>
                <td className="px-4 py-2 text-center text-gray-600">{m.h1}</td>
                <td className="px-4 py-2 text-center text-gray-600">{m.h10}</td>
                <td className="px-4 py-2 text-center text-gray-600">{m.mrr}</td>
                <td className="px-4 py-2 text-center text-gray-600">{m.ndcg}</td>
                <td className="px-4 py-2 text-center text-gray-600">{m.hal}</td>
                <td className="px-4 py-2 text-center text-gray-600">{m.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {highlights.map(s=>(
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-blue-600 mb-1">{s.value}</p>
            <p className="text-xs text-gray-400">{s.note}</p>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Final Results Summary</h2>
        <p className="text-xs text-gray-500 font-mono">final_summary.json SHA-256: 43eec4d3023f9485... | 5 ablations x 20,877 queries = 104,385 LLM judgments | Generator: Qwen2.5-7B-Instruct (greedy, 4x L4) | Judge: gpt-4o-mini (~$53)</p>
        <p className="text-xs text-gray-500 font-mono mt-1">Stratified (HEAD/TORSO/TAIL): TAIL Hit@10 exceeds HEAD by 1.66x-2.26x for hub variants. Fine-tuned reranker flips pattern: HEAD=0.3596, TORSO=0.3694, TAIL=0.3292. W&B: 45 offline runs, 191.64GB DVC/S3.</p>
      </div>
    </div>
  )
}
