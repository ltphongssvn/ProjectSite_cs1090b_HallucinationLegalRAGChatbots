export default function ReproducibilityPage() {
  const steps = [
    'git clone https://github.com/ltphongssvn/cs1090b_HallucinationLegalRAGChatbots',
    'cd cs1090b_HallucinationLegalRAGChatbots',
    'uv run pre-commit install && uv run pre-commit install --hook-type pre-push',
    'bash setup.sh',
    'uv run python -c "import torch; print(torch.__version__, torch.cuda.is_available())"',
    'uv run dvc pull',
    'uv run pytest --cov=src --cov-report=term-missing',
  ]
  return (
    <div className="w-full px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Reproducibility</h1>
      <p className="text-lg text-gray-600 mb-8">All experiments are reproducible via uv.lock + DVC + src/repro.py + environment manifest.</p>
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <p className="text-green-400 text-xs font-mono mb-3"># Quick Start</p>
        {steps.map((s, i) => (
          <p key={i} className="text-gray-100 text-xs font-mono py-0.5">{s}</p>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'uv.lock (sha256: 3ac3a454...)', desc: 'Pinned dependency snapshot — 313 packages audited' },
          { label: 'DVC + S3 (191.64 GB)', desc: '34 DVC artifacts, 206 S3 objects, sync clean' },
          { label: 'src/repro.py', desc: 'PYTHONHASHSEED=0, CUBLAS=:4096:8, deterministic=True, seed=0 across 4 GPUs' },
        ].map(item => (
          <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-gray-800 font-mono text-sm mb-1">{item.label}</p>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2">API Placeholder</h2>
        <p className="text-xs text-yellow-700 font-mono">GET /api/reproducibility — returns environment manifest + uv.lock SHA256 (pending)</p>
      </div>
    </div>
  )
}
