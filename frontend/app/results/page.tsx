export default function ResultsPage() {
  const metrics = [
    { arch: 'BM25', recall10: '—', mrr: '—', ndcg10: '—', contradiction: '—', status: 'pending' },
    { arch: 'BGE-M3', recall10: '—', mrr: '—', ndcg10: '—', contradiction: '—', status: 'pending' },
    { arch: 'Hybrid BM25+BGE-M3+CrossEncoder', recall10: '—', mrr: '—', ndcg10: '—', contradiction: '—', status: 'pending' },
    { arch: 'Legal-BERT (optional)', recall10: '—', mrr: '—', ndcg10: '—', contradiction: '—', status: 'pending' },
  ]
  return (
    <div className="w-full px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Results Dashboard</h1>
      <p className="text-lg text-gray-600 mb-2">Experiment results will populate here as evaluation runs complete.</p>
      <p className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 mb-8 inline-block">⏳ Evaluation pending — Sprint 4 (Apr 24 – May 5)</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['Architecture','Recall@10','MRR','NDCG@10','Contradiction Rate'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <tr key={m.arch} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-gray-800">{m.arch}</td>
                <td className="px-4 py-3 text-gray-400 text-center">—</td>
                <td className="px-4 py-3 text-gray-400 text-center">—</td>
                <td className="px-4 py-3 text-gray-400 text-center">—</td>
                <td className="px-4 py-3 text-gray-400 text-center">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2">API Placeholder</h2>
        <p className="text-xs text-yellow-700 font-mono">GET /api/results — returns experiment metrics from W&B export (pending)</p>
        <p className="text-xs text-yellow-700 font-mono mt-1">GET /api/results/ablations — returns ablation study results (pending)</p>
      </div>
    </div>
  )
}
