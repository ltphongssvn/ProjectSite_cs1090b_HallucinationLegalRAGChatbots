export default function DemoPage() {
  return (
    <div className="w-full px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Demo</h1>
      <p className="text-lg text-gray-600 mb-8">Interactive demo of the Legal RAG system — ask a question, see retrieved evidence and generated response.</p>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ask the Legal RAG System</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Legal Question</label>
            <textarea
              disabled
              placeholder="e.g. What standard applies to qualified immunity in the Ninth Circuit?"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-400 bg-gray-50 resize-none h-24 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Retrieval Architecture</label>
            <select disabled className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed">
              <option>Reranker Fine-tuned (recommended — Hit@1=0.3069)</option>
              <option>BGE-M3 Dense</option>
              <option>BM25</option>
            </select>
          </div>
          <button disabled className="w-full bg-blue-300 text-white font-semibold py-3 rounded-lg cursor-not-allowed text-sm">
            ⏳ Demo available post-submission — generator: Qwen2.5-7B-Instruct, judge: gpt-4o-mini
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Pipeline Architecture</h2>
        <p className="text-xs text-gray-500 font-mono">Query → RRF top-100 (BM25+BGE-M3) → fine-tuned bge-reranker-v2-m3 top-5 → Qwen2.5-7B-Instruct (greedy) → gpt-4o-mini judge (FAITHFUL/PARTIAL/HALLUCINATED)</p>
        <p className="text-xs text-gray-500 font-mono mt-1">Corpus: 7,813,273 chunks from 1,465,484 federal appellate opinions. Hard negatives: 7,442 train pairs, 7 neg/pos from RRF ranks 2-100. Fine-tuning: lr=2e-5, batch=32, 2 epochs, 22 GPU-hours, 4x L4 DDP.</p>
      </div>
    </div>
  )
}
