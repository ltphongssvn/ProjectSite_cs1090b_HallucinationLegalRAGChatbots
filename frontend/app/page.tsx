/**
 * HomePage — CS1090B Project Site
 * Displays Agile Sprint milestones and timeline from README
 */

const milestones = [
  {
    id: 1,
    title: 'Milestone 1: Group Formation & Project Selection',
    due: 'March 24, 2025',
    weight: '2%',
    description: 'Select top 5 project choices. Groups of 3–5 students. Staff assigns groups March 27.',
    status: 'complete',
  },
  {
    id: 2,
    title: 'Milestone 2: Data Wrangling & Project Redefinition',
    due: 'April 10, 2025',
    weight: '10%',
    description: 'Data acquisition, preprocessing, missing data, imbalances, scaling. 10-min presentation.',
    status: 'complete',
  },
  {
    id: 3,
    title: 'Milestone 3: EDA, Initial Modeling & Pipeline Development',
    due: 'April 24, 2025',
    weight: '20%',
    description: 'EDA, baseline model, training/testing pipeline, evaluation metrics. 10-min presentation.',
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Milestone 4: Final Modeling & Deliverables',
    due: 'May 12, 2025',
    weight: '68%',
    description: '2000–2500 word report, 6-min video, well-commented Python notebook.',
    status: 'upcoming',
  },
]

const statusColors: Record<string, string> = {
  complete: 'bg-green-100 text-green-800 border-green-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  upcoming: 'bg-gray-100 text-gray-600 border-gray-300',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Reducing Hallucination in Legal RAG Chatbots
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          CS1090B — Harvard University · Thanh Phong Le
        </p>

        {/* Milestone Cards */}
        <section aria-label="Project Milestones" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Agile Sprint Milestones
          </h2>
          <div className="grid gap-6">
            {milestones.map((m) => (
              <div
                key={m.id}
                data-testid="milestone-card"
                className={`border rounded-xl p-6 ${statusColors[m.status]}`}
              >
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{m.title}</h3>
                  <span className="text-sm font-medium">Weight: {m.weight}</span>
                </div>
                <p className="text-sm font-medium mb-1">Due: {m.due}</p>
                <p className="text-sm">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sprint Timeline */}
        <section data-testid="sprint-timeline" aria-label="Sprint Timeline">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Sprint Timeline
          </h2>
          <ol className="relative border-l-2 border-blue-300 ml-4 space-y-8">
            {milestones.map((m) => (
              <li key={m.id} className="ml-6">
                <span className="absolute -left-3 w-5 h-5 rounded-full bg-blue-400 border-2 border-white" />
                <p className="text-sm text-gray-500">{m.due}</p>
                <p className="font-medium text-gray-800">{m.title}</p>
              </li>
            ))}
          </ol>
        </section>

      </div>
    </main>
  )
}
