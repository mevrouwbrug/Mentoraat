import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Meerdere vraagvarianten per techniek
const vragenPerTechniek = {
  pomodoro: [
    'Vind je het lastig om lang achter elkaar gefocust te blijven?',
    'Merk je dat je vaak afgeleid wordt tijdens het leren?',
    'Heb je moeite om door te werken zonder pauze te nemen?',
    'Pak je vaak je telefoon terwijl je eigenlijk moet studeren?'
  ],
  cornell: [
    'Zijn je aantekeningen vaak onoverzichtelijk of een rommeltje?',
    'Heb je moeite om later terug te vinden wat je hebt opgeschreven?',
    'Weet je na de les niet meer precies wat de hoofdpunten waren?',
    'Schrijf je alles op zonder structuur?'
  ],
  mindmaps: [
    'Vind je het fijn om met kleuren en tekeningen te werken?',
    'Onthoud je dingen beter als je ze visueel maakt?',
    'Zie je graag verbanden en verbindingen tussen onderwerpen?',
    'Leer je beter met plaatjes dan met alleen tekst?'
  ],
  dualcoding: [
    'Vind je alleen tekst lezen saai en lastig om te onthouden?',
    'Snap je dingen beter als er een plaatje of schema bij zit?',
    'Vergeet je snel wat je hebt gelezen als er geen afbeeldingen bij zijn?',
    'Maak je graag tekeningen bij moeilijke begrippen?'
  ],
  retrieval: [
    'Ken je de stof vaak wel voor je gevoel, maar vergeet je alles tijdens de toets?',
    'Lees je de stof vaak alleen door zonder jezelf te testen?',
    'Schrik je tijdens een toets omdat je minder weet dan je dacht?',
    'Heb je het gevoel dat je alles snapt, maar kun je het niet uitleggen?'
  ],
  samenvatten: [
    'Vind je het moeilijk om de belangrijkste punten uit een tekst te halen?',
    'Weet je na het lezen niet goed wat nu echt belangrijk was?',
    'Heb je moeite om een lang verhaal kort te maken?',
    'Leer je vaak te veel details in plaats van de hoofdzaken?'
  ]
}

const antwoordOpties = [
  { tekst: 'Klopt precies!', punten: 3 },
  { tekst: 'Soms', punten: 1 },
  { tekst: 'Niet echt', punten: 0 }
]

// Selecteer random vraag per techniek
const selecteerRandomVragen = () => {
  return Object.entries(vragenPerTechniek).map(([id, vragen]) => ({
    id,
    vraag: vragen[Math.floor(Math.random() * vragen.length)],
    techniek: id.charAt(0).toUpperCase() + id.slice(1)
  }))
}

function StudieCoach() {
  const navigate = useNavigate()
  const [vragen, setVragen] = useState([])
  const [antwoorden, setAntwoorden] = useState({})
  const [huidigeVraag, setHuidigeVraag] = useState(0)

  // Selecteer random vragen bij laden
  useEffect(() => {
    setVragen(selecteerRandomVragen())
  }, [])

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
  const voortgang = vragen.length > 0 ? (Object.keys(antwoorden).length / vragen.length) * 100 : 0

  if (vragen.length === 0) return null

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
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Vraag {Math.min(huidigeVraag + 1, vragen.length)} van {vragen.length}</span>
            <span>{Math.round(voortgang)}% voltooid</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white transition-all duration-500 ease-out rounded-full"
              style={{ width: `${voortgang}%` }}
            />
          </div>
        </div>

        {/* Vragenkaart - Glasmorfisme */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl mb-6">
          {vragen.map((vraag, index) => (
            <div 
              key={vraag.id}
              className={`transition-all duration-500 ${
                index === huidigeVraag ? 'block' : 'hidden'
              }`}
            >
              <div className="text-center mb-6">
                <span className="inline-flex w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full items-center justify-center font-bold text-lg mb-4 border border-white/30">
                  {index + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
                  {vraag.vraag}
                </h2>
              </div>

              <div className="space-y-3">
                {antwoordOpties.map((optie, optieIndex) => {
                  const isSelected = antwoorden[vraag.id] === optie.punten
                  const kleuren = [
                    'bg-emerald-500/80 hover:bg-emerald-500 border-emerald-400/50',
                    'bg-amber-500/80 hover:bg-amber-500 border-amber-400/50',
                    'bg-slate-500/80 hover:bg-slate-500 border-slate-400/50'
                  ]
                  return (
                    <button
                      key={optie.tekst}
                      onClick={() => handleAntwoord(vraag.id, optie.punten)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 font-semibold text-white border backdrop-blur-sm ${kleuren[optieIndex]} ${
                        isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-[1.02]' : ''
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
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                alleVragenBeantwoord
                  ? 'bg-white/90 backdrop-blur-sm text-purple-600 hover:bg-white hover:shadow-xl hover:scale-105'
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
        <div className="flex justify-center gap-2 mt-6">
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
