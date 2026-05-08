export default function EthicsPage() {
  const considerations = [
    { title: 'Public Datasets Only', desc: 'CourtListener data used under CC BY-ND 4.0. LePaRD is open research data. No private or proprietary legal data.' },
    { title: 'No Human Annotation', desc: 'Hallucination measurement fully automated: LePaRD gold labels for retrieval (Tier A) + gpt-4o-mini LLM-as-judge (FAITHFUL/PARTIAL/HALLUCINATED) for generation (Tier B). No crowdsourced or paid annotators.' },
    { title: 'Open-Source Generator', desc: 'Generation via Qwen2.5-7B-Instruct (open-source, locally deployed on 4x NVIDIA L4 GPU cluster). No query data sent to third parties during generation. LLM-as-judge uses gpt-4o-mini (OpenAI API) for hallucination labeling only; ~104,385 judgments at ~$53 total cost. Outputs used strictly for retrieval research under academic supervision.' },
    { title: 'PII Handling', desc: 'PII handling follows CourtListener and LePaRD provider redaction practices. No additional PII collection or processing.' },
    { title: 'Scope Limitations', desc: 'Retrieval ceiling: Hit@100=0.375 means ~56% hallucination floor is irreducible at current SOTA. System outputs are not legal advice. Academic research prototype only.' },
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
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Ethics & Limitations Summary</h2>
        <p className="text-xs text-gray-500 font-mono">Generator: Qwen2.5-7B-Instruct (open-source, local, no data sent to third parties). Judge: gpt-4o-mini (OpenAI API, ~$53, 104,385 judgments). Hallucination floor ~56% at SOTA retrieval — not suitable for unsupervised legal deployment. Single judge model (gpt-4o-mini, ~80% FaithBench accuracy); relative differences across ablations robust, absolute rates would tighten under multi-judge consensus.</p>
      </div>
    </div>
  )
}
