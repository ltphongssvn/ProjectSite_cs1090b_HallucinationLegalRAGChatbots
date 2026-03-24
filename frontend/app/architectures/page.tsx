export default function ArchitecturesPage() {
  const archs = [
    { id: 'a', name: 'BM25', type: 'Non-neural baseline', role: 'Reference floor', params: 'k1=1.5, b=0.75', status: 'pending' },
    { id: 'b', name: 'BGE-M3', type: 'Dense retriever (CLS pooling)', role: 'Primary dense baseline', params: 'lr=1e-5, batch=32, epochs=3, 1024-subword chunks', status: 'pending' },
    { id: 'c', name: 'Hybrid BM25+BGE-M3+CrossEncoder', type: 'Lexical + Dense + Reranker', role: 'Expected strongest', params: 'RRF top-50 → rerank → top-10, max_length=1024, batch_size=4', status: 'pending' },
    { id: 'd', name: 'Legal-BERT Bi-Encoder', type: 'Domain-specific Transformer', role: 'Optional domain-reference', params: 'lr=2e-5, warmup=10%, batch=32, epochs=3, 512-subword chunks', status: 'pending' },
  ]
  return (
    <div className="w-full px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Architectures</h1>
      <p className="text-lg text-gray-600 mb-8">Four retrieval architectures compared under a frozen Mistral-7B-Instruct-v0.2 generator (greedy decoding, chat template applied).</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['ID','Architecture','Type','Role','Key Parameters'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {archs.map((a, i) => (
              <tr key={a.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-mono text-gray-500">({a.id})</td>
                <td className="px-4 py-3 font-semibold text-gray-800">{a.name}</td>
                <td className="px-4 py-3 text-gray-600">{a.type}</td>
                <td className="px-4 py-3 text-gray-600">{a.role}</td>
                <td className="px-4 py-3 text-gray-500 text-xs font-mono">{a.params}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2">API Placeholder</h2>
        <p className="text-xs text-yellow-700 font-mono">GET /api/architectures — returns architecture configs and training status (pending)</p>
      </div>
    </div>
  )
}
