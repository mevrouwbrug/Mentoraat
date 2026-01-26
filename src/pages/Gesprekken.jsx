import { Link } from 'react-router-dom'

const formulieren = [
  {
    id: 'inzicht',
    titel: 'Inzicht in jezelf',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'mol',
    titel: 'MOL Gesprek',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'ml',
    titel: 'ML Gesprek',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'voorbereiding',
    titel: 'Voorbereiding Toetsweek',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'reflectie',
    titel: 'Reflectie Toetsweek',
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
      <div className="w-full max-w-md relative z-10">
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

      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">Gesprekken</h1>
          <p className="text-lg text-white/80">
            Formulieren voor mentorgesprekken
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full">
          {formulieren.map((form) => (
            <Link
              key={form.id}
              to={`/gesprekken/${form.id}`}
              className={`bg-gradient-to-r ${form.gradient} text-white font-semibold text-lg py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-center`}
            >
              {form.titel}
            </Link>
          ))}
        </div>

        {/* Info tekst */}
        <p className="text-white/70 text-center mt-10 text-sm">
          Elk formulier heeft een "Genereer PDF" knop om je ingevulde antwoorden te downloaden.
        </p>
      </div>
    </div>
  )
}

export default Gesprekken
