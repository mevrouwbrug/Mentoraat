import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const vragen = [
  {
    id: 'pomodoro',
    vraag: 'Vind je het lastig om lang achter elkaar gefocust te blijven?',
    techniek: 'Pomodoro'
  },
  {
    id: 'cornell',
    vraag: 'Zijn je aantekeningen vaak onoverzichtelijk of een rommeltje?',
    techniek: 'Cornell'
  },
  {
    id: 'mindmaps',
    vraag: 'Vind je het fijn om met kleuren en tekeningen te werken?',
    techniek: 'Mindmaps'
  },
  {
    id: 'dualcoding',
    vraag: 'Vind je alleen tekst lezen saai en lastig om te onthouden?',
    techniek: 'Dual Coding'
  },
  {
    id: 'retrieval',
    vraag: 'Ken je de stof vaak wel voor je gevoel, maar vergeet je alles tijdens de toets?',
    techniek: 'Retrieval Practice'
  },
  {
    id: 'samenvatten',
    vraag: 'Vind je het moeilijk om de belangrijkste punten uit een tekst te halen?',
    techniek: 'Samenvatten'
  }
]

const antwoordOpties = [
  { tekst: 'Klopt precies!', punten: 3 },
  { tekst: 'Soms', punten: 1 },
  { tekst: 'Niet echt', punten: 0 }
]

function StudieCoach() {
  const navigate = useNavigate()
  const [antwoorden, setAntwoorden] = useState({})
  const [huidigeVraag, setHuidigeVraag] = useState(0)

  const handleAntwoord = (vraagId, punten) => {
    setAntwoorden(prev => ({
      ...prev,
      [vraagId]: punten
    }))
    
    if (huidigeVraag < vragen.length - 1) {
      setTimeout(() => setHuidigeVraag(prev => prev + 1), 300)
    }
  }

  const handleVerstuur = () => {
    const scores = {}
    vragen.forEach(vraag => {
      scores[vraag.id] = antwoorden[vraag.id] || 0
    })
    
    const hoogsteScore = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    )
    
    navigate(`/resultaat/${hoogsteScore[0]}`)
  }

  const alleVragenBeantwoord = Object.keys(antwoorden).length === vragen.length
  const voortgang = (Object.keys(antwoorden).length / vragen.length) * 100

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center relative">
      {/* Home knop rechtsboven */}
      <Link 
        to="/" 
        className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </Link>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">Mentoruur</h1>
          <p className="text-white/80 text-lg">Ontdek welke leertechniek het beste bij jou past</p>
        </div>

        {/* Voortgangsbalk */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Vraag {Math.min(huidigeVraag + 1, vragen.length)} van {vragen.length}</span>
            <span>{Math.round(voortgang)}% voltooid</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500 ease-out rounded-full"
              style={{ width: `${voortgang}%` }}
            />
          </div>
        </div>

        {/* Vragenkaart */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl mb-6">
          {vragen.map((vraag, index) => (
            <div 
              key={vraag.id}
              className={`transition-all duration-500 ${
                index === huidigeVraag ? 'block' : 'hidden'
              }`}
            >
              <div className="text-center mb-8">
                <span className="inline-flex w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full items-center justify-center font-bold text-lg mb-4 shadow-lg">
                  {index + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {vraag.vraag}
                </h2>
              </div>

              <div className="space-y-3">
                {antwoordOpties.map((optie, optieIndex) => {
                  const isSelected = antwoorden[vraag.id] === optie.punten
                  // Nieuwe kleuren - helder en leesbaar
                  const baseKleuren = [
                    'bg-emerald-500 hover:bg-emerald-600', // Klopt precies - groen
                    'bg-amber-500 hover:bg-amber-600',     // Soms - geel/oranje  
                    'bg-slate-500 hover:bg-slate-600'      // Niet echt - grijs
                  ]
                  return (
                    <button
                      key={optie.tekst}
                      onClick={() => handleAntwoord(vraag.id, optie.punten)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-200 font-semibold text-white shadow-md hover:shadow-lg ${baseKleuren[optieIndex]} ${
                        isSelected ? 'ring-4 ring-purple-300 ring-offset-2' : ''
                      }`}
                    >
                      <span className="pl-2">{optie.tekst}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigatie */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setHuidigeVraag(prev => Math.max(0, prev - 1))}
            disabled={huidigeVraag === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              huidigeVraag === 0 
                ? 'text-white/30 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Vorige
          </button>

          {huidigeVraag < vragen.length - 1 ? (
            <button
              onClick={() => setHuidigeVraag(prev => Math.min(vragen.length - 1, prev + 1))}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Volgende
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleVerstuur}
              disabled={!alleVragenBeantwoord}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                alleVragenBeantwoord
                  ? 'bg-white text-purple-600 hover:shadow-xl hover:scale-105'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              Bekijk je resultaat
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}
        </div>

        {/* Vraag navigatie dots */}
        <div className="flex justify-center gap-2 mt-8">
          {vragen.map((_, index) => (
            <button
              key={index}
              onClick={() => setHuidigeVraag(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                antwoorden[vragen[index].id] !== undefined
                  ? 'bg-white shadow-lg'
                  : index === huidigeVraag
                    ? 'bg-white/80'
                    : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudieCoach
