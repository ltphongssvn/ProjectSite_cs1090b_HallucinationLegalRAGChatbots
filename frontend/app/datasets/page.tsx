export default function DatasetsPage() {
  const datasets = [
    { name: 'CourtListener Federal Appellate', size: '1,465,484 opinions → 7,813,273 chunks (1,024-subword, 128-overlap)', license: 'CC BY-ND 4.0', role: 'Retrieval corpus + SQLite citation index', status: '✅ Complete' },
    { name: 'LePaRD (ACL 2024)', size: '4M pairs → 2,429,533 verified (eyecite+rapidfuzz bridge, 60.74%) → 20,877 unique test queries', license: 'Open research (Mahari et al. ACL 2024)', role: 'Hard-negative mining + retrieval evaluation', status: '✅ Complete' },
  ]
  return (
    <div className="w-full px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Datasets</h1>
      <p className="text-lg text-gray-600 mb-8">Two core datasets — all publicly available, no private data.</p>
      <div className="space-y-4 mb-8">
        {datasets.map(d => (
          <div key={d.name} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
              <h2 className="text-lg font-semibold text-gray-800">{d.name}</h2>
              <span className="text-sm text-gray-500">{d.status}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1"><strong>Size:</strong> {d.size}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>License:</strong> {d.license}</p>
            <p className="text-sm text-gray-600"><strong>Role:</strong> {d.role}</p>
          </div>
        ))}
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2">API Placeholder</h2>
        <p className="text-xs text-yellow-700 font-mono">GET /api/datasets — returns dataset stats and DVC artifact metadata (pending)</p>
      </div>
    </div>
  )
}
