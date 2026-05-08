export default function ArchitecturesPage() {
  const archs = [
    { id: 'a', name: 'BM25', type: 'Non-neural baseline', role: 'Reference floor', params: 'k1=1.5, b=0.75', status: 'pending' },
    { id: 'b', name: 'BGE-M3', type: 'Dense retriever (CLS pooling)', role: 'Primary dense baseline', params: 'lr=1e-5, batch=32, epochs=3, 1024-subword chunks', status: 'pending' },
    { id: 'c', name: 'RRF (BM25+BGE-M3)', type: 'Lexical + Dense Fusion', role: 'Strong hybrid baseline', params: 'k=60 (Cormack 2009), top-100 per retriever fused', status: 'pending' },
    { id: 'c2', name: 'Reranker Concat (hub)', type: 'CrossEncoder hub', role: 'Out-of-domain reranker', params: 'bge-reranker-v2-m3, 2-chunk concat, max_length=1024', status: 'pending' },
    { id: 'c3', name: 'Reranker MaxP (hub)', type: 'CrossEncoder hub MaxP', role: 'Chunk-level max-pool', params: 'bge-reranker-v2-m3, per-chunk MaxP, max_length=1024', status: 'pending' },
    { id: 'c4', name: 'Reranker Fine-tuned', type: 'CrossEncoder fine-tuned on legal hard negatives', role: 'Expected strongest (+980% Hit@1)', params: 'bge-reranker-v2-m3 + 7,442 legal hard negatives, lr=2e-5, batch=32, epochs=2', status: 'pending' },
    { id: 'd', name: 'Legal-BERT Bi-Encoder', type: 'Domain-specific Transformer', role: 'Optional domain-reference', params: 'lr=2e-5, warmup=10%, batch=32, epochs=3, 512-subword chunks', status: 'pending' },
  ]
  return (
    <div className="w-full px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Architectures</h1>
      <p className="text-lg text-gray-600 mb-8">Five retrieval configurations compared under Qwen2.5-7B-Instruct generator (greedy decoding, local on 4× NVIDIA L4). Hallucination judged by gpt-4o-mini (FAITHFUL/PARTIAL/HALLUCINATED) against shown contexts.</p>
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
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">API Placeholder</h2>
        <p className="text-xs text-gray-500 font-mono">GET /api/architectures/retrieval -- BM25(k1=1.5,b=0.75) | BGE-M3(dim=1024,max_len=8192,cosine) | RRF(k=60,top-100) | reranker-concat(max_len=1024) | reranker-maxp | reranker-finetuned(7,442 hard-neg, lr=2e-5, 2ep, 22 GPU-h, 4xL4 DDP)</p>
      </div>
    </div>
  )
}
