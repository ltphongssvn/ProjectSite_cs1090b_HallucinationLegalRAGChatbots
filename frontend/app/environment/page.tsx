import Image from 'next/image'

export default function EnvironmentPage() {
  return (
    <div className="w-full px-6 py-12 space-y-12">

      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Environment</h1>
        <p className="text-lg text-gray-600">Certified cluster environment. Fully bootstrapped, verified, reproducible on 4x NVIDIA L4 GPUs.</p>
      </div>

      <div className="flex items-center gap-4">
        <a href="/environment/setup_sh.txt" download="setup.sh.txt" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Download setup.sh
        </a>
        <span className="text-sm text-gray-500">Full bootstrap script. Python 3.11.9, torch 2.0.1+cu117, 4x NVIDIA L4</span>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">setup.sh Bootstrap Output</h2>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <Image src="/environment/setup_sh.png" alt="setup.sh bootstrap output showing all steps PASS" width={1400} height={900} className="w-full h-auto" priority />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Jupyter Lab Notebook - Cell 1: Environment Setup and GPU Verification</h2>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <Image src="/environment/cell1.png" alt="Jupyter Lab Cell 1 verified environment showing package versions and GPU info" width={1400} height={900} className="w-full h-auto" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Jupyter Lab Notebook - Cell 2: CourtListener Dataset Summary</h2>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <Image src="/environment/cell2.png" alt="Jupyter Lab Cell 2 CourtListener dataset summary with circuit breakdown" width={1400} height={900} className="w-full h-auto" />
        </div>
      </section>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-yellow-900 mb-2">API Placeholder</h2>
        <p className="text-xs text-yellow-700 font-mono">GET /api/environment - returns live environment manifest JSON (pending)</p>
        <p className="text-xs text-yellow-700 font-mono mt-1">GET /api/environment/manifest - returns logs/environment_manifest.json (pending)</p>
      </div>

    </div>
  )
}
