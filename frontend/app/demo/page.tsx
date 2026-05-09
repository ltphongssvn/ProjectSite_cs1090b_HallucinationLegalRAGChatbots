'use client'
import { useState } from 'react'

const ARCHITECTURES = [
  { value: 'bm25', label: 'BM25 (k1=1.5, b=0.75) — matches MS4 baseline' },
]

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

interface Chunk {
  id: string
  court: string
  text: string
  score: number
}

interface QueryResult {
  question: string
  architecture: string
  retrieved_chunks: Chunk[]
  answer: string
  faithfulness: string
  faithfulness_reason: string
}

export default function DemoPage() {
  const [question, setQuestion] = useState('')
  const [arch, setArch] = useState('bm25')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<QueryResult | null>(null)
  const [error, setError] = useState('')

  const faithfulnessColor = (label: string) => {
    if (label === 'FAITHFUL') return 'bg-green-100 text-green-800 border-green-300'
    if (label === 'PARTIAL') return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    if (label === 'HALLUCINATED') return 'bg-red-100 text-red-800 border-red-300'
    return 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const handleSubmit = async () => {
    if (!question.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const resp = await fetch(`${BACKEND_URL}/api/demo/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, architecture: arch }),
      })
      if (!resp.ok) throw new Error(`Backend error: ${resp.status}`)
      setResult(await resp.json())
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Demo</h1>
      <p className="text-gray-600 mb-8">BM25 retrieval over sample LePaRD corpus + gpt-4o-mini generation + gpt-4o-mini faithfulness judge — matching MS4 implementation.</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ask the Legal RAG System</h2>
        <label className="block text-sm font-medium text-gray-700 mb-1">Legal Question</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="e.g. What is the standard for qualified immunity in the Ninth Circuit?"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">Retrieval Architecture</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 text-sm mb-4"
          value={arch}
          onChange={e => setArch(e.target.value)}
        >
          {ARCHITECTURES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
        <button
          onClick={handleSubmit}
          disabled={loading || !question.trim()}
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Running RAG pipeline...' : 'Submit Query'}
        </button>
        {error && <p className="mt-3 text-sm text-red-600">Error: {error}</p>}
      </div>

      {result && (
        <>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Retrieved Chunks (BM25 top-5)</h2>
            <div className="space-y-3">
              {result.retrieved_chunks.map((chunk, i) => (
                <div key={chunk.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">#{i+1}</span>
                    <span className="text-xs text-gray-500 uppercase font-mono">{chunk.court}</span>
                    <span className="text-xs text-gray-400 ml-auto">score: {chunk.score}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{chunk.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Generated Answer <span className="text-xs font-normal text-gray-400">(gpt-4o-mini)</span></h2>
            <p className="text-sm text-gray-800 leading-relaxed">{result.answer}</p>
          </div>

          <div className={`border rounded-xl p-4 ${faithfulnessColor(result.faithfulness)}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm">Faithfulness Judge:</span>
              <span className="font-mono font-bold text-sm">{result.faithfulness}</span>
              <span className="text-xs ml-auto">(gpt-4o-mini judge — matches MS4)</span>
            </div>
            <p className="text-xs">{result.faithfulness_reason}</p>
          </div>
        </>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Pipeline Architecture</h2>
        <p className="text-xs text-gray-500 font-mono">Query &rarr; BM25(k1=1.5,b=0.75) top-5 chunks &rarr; gpt-4o-mini generation (grounded) &rarr; gpt-4o-mini judge (FAITHFUL/PARTIAL/HALLUCINATED)</p>
        <p className="text-xs text-gray-500 font-mono mt-1">Sample corpus: 30 federal appellate opinion chunks. Hard negatives: 7,442 train pairs. Fine-tuning: lr=2e-5, batch=32, 2 epochs, 22 GPU-hours.</p>
      </div>
    </div>
  )
}
