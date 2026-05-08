export default function EthicsPage() {
  const considerations = [
    { title: 'Public Datasets Only', desc: 'CourtListener data used under CC BY-ND 4.0. LePaRD is open research data. No private or proprietary legal data.' },
    { title: 'No Human Annotation', desc: 'Hallucination measurement is fully automated via LePaRD gold labels and DeBERTa-v3 NLI. No crowdsourced or paid annotators.' },
    { title: 'Open-Source Generator', desc: 'Generation via Qwen2.5-7B-Instruct (open-source, locally deployed on 4x NVIDIA L4 GPU cluster). No query data sent to third parties during generation. LLM-as-judge uses gpt-4o-mini (OpenAI API) for hallucination labeling only; ~104,385 judgments at ~$53 total cost. Outputs used strictly for retrieval research under academic supervision.' },
    { title: 'PII Handling', desc: 'PII handling follows CourtListener and LePaRD provider redaction practices. No additional PII collection or processing.' },
    { title: 'Scope Limitations', desc: 'Tier C verifies citation existence and local evidence support only — not full legal reasoning correctness. System outputs are not legal advice.' },
    { title: 'Academic Use Only', desc: 'This system is a research prototype. Results should not be used for actual legal practice or decision-making.' },
  ]
  return (
    <div className="w-full px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Ethics &amp; Limitations</h1>
      <p className="text-lg text-gray-600 mb-8">Responsible research practices and known limitations of the system.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {considerations.map(c => (
          <div key={c.title} className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-semibold text-gray-800 mb-2">{c.title}</h2>
            <p className="text-sm text-gray-600">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2">API Placeholder</h2>
        <p className="text-xs text-yellow-700 font-mono">GET /api/ethics — returns ethics statement and limitations summary (pending)</p>
      </div>
    </div>
  )
}
