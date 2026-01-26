import { Link } from 'react-router-dom'

const formulieren = [
  {
    id: 'inzicht',
    titel: 'Inzicht in jezelf',
    beschrijving: 'Kennismaking, doelen stellen en ontdekken wat jij nodig hebt',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'mol',
    titel: 'MOL Gesprek',
    beschrijving: 'Reflectieformulier met gevoelsmeter en gespreksvragen',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'ml',
    titel: 'ML Gesprek',
    beschrijving: 'Vervolggesprek over actiepunten uit vorig gesprek',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'voorbereiding',
    titel: 'Voorbereiding Toetsweek',
    beschrijving: 'Plan je leerstof en leerstrategieën per vak',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'reflectie',
    titel: 'Reflectie Toetsweek',
    beschrijving: 'Evalueer wat werkte en wat je kunt verbeteren',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-500'
  }
]

function Gesprekken() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Decoratieve elementen */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"></div>

      {/* Terug knop */}
      <div className="w-full max-w-4xl relative z-10">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Terug naar home
        </Link>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">Gesprekken</h1>
          <p className="text-lg text-white/80 max-w-lg mx-auto">
            Formulieren voor mentorgesprekken, reflectie en toetsvoorbereiding
          </p>
        </div>

        {/* Formulier kaarten */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {formulieren.map((form) => (
            <Link
              key={form.id}
              to={`/gesprekken/${form.id}`}
              className="group"
            >
              <div className="bg-white rounded p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-300 text-center hover:scale-105 border-2 border-gray-100">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${form.gradient} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {form.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">{form.titel}</h2>
                <p className="text-gray-600 text-sm mb-4">{form.beschrijving}</p>
                <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold">
                  <span>Open formulier</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-10 bg-white rounded p-6 shadow-lg max-w-xl mx-auto text-center border-2 border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-gray-800 font-bold mb-1">PDF Export</h3>
          <p className="text-gray-600 text-sm">
            Elk formulier heeft een "Genereer PDF voor Magister" knop om je ingevulde formulieren te downloaden.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Gesprekken
