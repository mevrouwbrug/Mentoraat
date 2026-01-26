import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative">
      
      {/* School logo - linksboven */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <img 
          src="/logo.jpg" 
          alt="School logo" 
          className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg"
        />
      </div>

      {/* Titel */}
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">Mentoraat</h1>
      </div>

      {/* Subtitel */}
      <div className="mt-4 mb-12">
        <p className="text-xl text-white/80 text-center">Ontdek hoe jij het beste leert en bereid je voor op gesprekken</p>
      </div>

      {/* Twee knoppen naast elkaar */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        {/* Studie-Coach knop */}
        <Link to="/studie-coach" className="flex-1 group">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Studie-Coach</h2>
              <p className="text-gray-600 mb-4">Doe de test en ontdek welke leertechniek bij jou past</p>
            </div>
            <span className="inline-flex items-center justify-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all mt-4">
              Start de quiz
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Gesprekken knop */}
        <Link to="/gesprekken" className="flex-1 group">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Gesprekken</h2>
              <p className="text-gray-600 mb-4">Formulieren voor mentorgesprekken en reflectie</p>
            </div>
            <span className="inline-flex items-center justify-center gap-2 text-pink-600 font-semibold group-hover:gap-3 transition-all mt-4">
              Open formulieren
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      {/* Quote */}
      <div className="mt-12">
        <p className="text-white text-center font-bold text-lg md:text-xl drop-shadow-lg max-w-xl">
          "Huiswerk maken terwijl je op je telefoon zit, is als tanden poetsen met chocopasta"
        </p>
      </div>
    </div>
  )
}

export default Home
