import { useParams, Link } from 'react-router-dom'
import TechniekVoorbeelden from '../components/TechniekVoorbeelden'

const technieken = {
  pomodoro: {
    naam: 'Pomodoro-techniek',
    kleur: 'from-red-500 to-orange-500',
    btnKleur: 'bg-red-500 hover:bg-red-600',
    uitleg: 'Bij de Pomodoro-techniek werk je in korte blokken van 25 minuten. Daarna neem je een korte pauze. Dit helpt je om gefocust te blijven en niet afgeleid te raken. De naam komt van een keukentimer in de vorm van een tomaat (pomodoro is Italiaans voor tomaat).',
    stappen: [
      'Zet een timer op 25 minuten',
      'Werk alleen aan je taak - geen telefoon!',
      'Als de timer gaat: 5 minuten pauze',
      'Na 4 rondes: langere pauze van 15-30 minuten'
    ],
    opdracht: 'Probeer het nu! Zet een timer op 25 minuten, leg je telefoon weg en begin met leren. Je zult merken dat het werkt!',
    tip: 'Tijdens je pauze: sta op, drink water, beweeg even. Maar pak niet je telefoon!'
  },
  cornell: {
    naam: 'Cornell-methode',
    kleur: 'from-indigo-500 to-blue-500',
    btnKleur: 'bg-indigo-500 hover:bg-indigo-600',
    uitleg: 'De Cornell-methode helpt je om betere aantekeningen te maken. Je verdeelt je papier in drie delen: links schrijf je kernwoorden, rechts je notities, en onderaan maak je een samenvatting. Zo vind je later alles makkelijk terug.',
    stappen: [
      'Verdeel je papier in drie vakken met een pen',
      'Rechts: schrijf je notities tijdens de les',
      'Links: schrijf na de les de belangrijkste woorden',
      'Onderaan: schrijf een korte samenvatting'
    ],
    opdracht: 'Pak nu een vel papier en teken de drie vakken. Gebruik dit bij je volgende les!',
    tip: 'De samenvatting onderaan schrijf je pas NA de les. Zo onthoud je het beter.'
  },
  mindmaps: {
    naam: 'Mindmaps',
    kleur: 'from-green-500 to-emerald-500',
    btnKleur: 'bg-green-500 hover:bg-green-600',
    uitleg: 'Een mindmap is een tekening van je leerstof. Je zet het hoofdonderwerp in het midden en tekent lijnen naar alles wat erbij hoort. Door kleuren en plaatjes te gebruiken, onthoud je het veel beter dan met alleen tekst.',
    stappen: [
      'Zet het hoofdonderwerp in het midden van je blad',
      'Teken takken naar de belangrijkste onderwerpen',
      'Gebruik verschillende kleuren per tak',
      'Voeg kleine tekeningen of symbolen toe'
    ],
    opdracht: 'Maak nu een mindmap van een hoofdstuk dat je moet leren. Gebruik minimaal 3 kleuren!',
    tip: 'Je tekeningen hoeven niet mooi te zijn. Als JIJ snapt wat ze betekenen, is het goed.'
  },
  dualcoding: {
    naam: 'Dual Coding',
    kleur: 'from-violet-500 to-purple-500',
    btnKleur: 'bg-violet-500 hover:bg-violet-600',
    uitleg: 'Dual Coding betekent dat je woorden combineert met plaatjes. Je hersenen onthouden informatie beter als je het op twee manieren leert: door te lezen én door te kijken naar afbeeldingen of schema\'s.',
    stappen: [
      'Lees de tekst en zoek de moeilijke begrippen',
      'Teken bij elk begrip een plaatje of schema',
      'Maak tijdlijnen bij geschiedenis',
      'Teken formules uit met voorbeelden'
    ],
    opdracht: 'Kies 3 begrippen die je moet leren en teken bij elk begrip een plaatje dat het uitlegt.',
    tip: 'Het gaat niet om mooie tekeningen, maar om tekeningen die JOU helpen onthouden.'
  },
  retrieval: {
    naam: 'Retrieval Practice',
    kleur: 'from-amber-500 to-orange-500',
    btnKleur: 'bg-amber-500 hover:bg-amber-600',
    uitleg: 'Retrieval Practice betekent: jezelf overhoren. In plaats van alleen te lezen, probeer je actief te herinneren wat je hebt geleerd. Dit werkt veel beter dan alleen maar doorlezen, omdat je hersenen dan écht aan het werk gaan.',
    stappen: [
      'Sluit je boek en schrijf op wat je nog weet',
      'Maak oefenvragen voor jezelf',
      'Laat iemand anders je overhoren',
      'Check daarna pas wat je goed en fout had'
    ],
    opdracht: 'Doe het nu: sluit je boek en schrijf 5 dingen op die je nog weet van je laatste les. Kijk daarna pas of het klopt!',
    tip: 'Vind je het moeilijk? Dat is juist goed! Op dat moment leer je het meest.'
  },
  samenvatten: {
    naam: 'Samenvatten',
    kleur: 'from-pink-500 to-rose-500',
    btnKleur: 'bg-pink-500 hover:bg-pink-600',
    uitleg: 'Samenvatten betekent: de belangrijkste informatie uit een tekst halen en in je eigen woorden opschrijven. Hierdoor dwing je jezelf om echt te begrijpen wat je leest, in plaats van alleen maar over te schrijven.',
    stappen: [
      'Lees eerst de hele tekst één keer door',
      'Lees nog een keer en markeer de hoofdzaken',
      'Schrijf per alinea de kern op in je eigen woorden',
      'Check: heb je alles belangrijks meegenomen?'
    ],
    opdracht: 'Lees één pagina uit je boek en schrijf in maximaal 3 zinnen op wat er staat. Alleen het allerbelangrijkste!',
    tip: 'Als je het niet in je eigen woorden kunt zeggen, snap je het nog niet goed genoeg.'
  }
}

function ResultPage() {
  const { techniek } = useParams()
  const data = technieken[techniek]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Techniek niet gevonden</h1>
          <Link to="/studie-coach" className="text-white/80 hover:text-white underline">
            Terug naar de quiz
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      
      <div className="max-w-3xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Jouw aanbevolen leertechniek</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-6">{data.naam}</h1>
          
          {/* Navigation buttons */}
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 px-5 rounded-lg transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link
              to="/studie-coach"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 px-5 rounded-lg transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Test opnieuw
            </Link>
          </div>
        </div>

        {/* Main content - één doorlopend blok */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          
          {/* Wat is het? */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Wat is het?</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{data.uitleg}</p>
          </div>

          <hr className="border-gray-200 mx-6" />

          {/* Voorbeeld */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Voorbeeld</h2>
            <div className="bg-gray-50 rounded-xl p-5">
              <TechniekVoorbeelden techniek={techniek} />
            </div>
          </div>

          <hr className="border-gray-200 mx-6" />

          {/* Hoe doe je het? */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Zo doe je het</h2>
            <div className="space-y-3">
              {data.stappen.map((stap, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${data.kleur} text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md`}>
                    {index + 1}
                  </span>
                  <p className="text-gray-700 pt-1 text-lg">{stap}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200 mx-6" />

          {/* Pro tip */}
          <div className="p-6 md:p-8 bg-amber-50">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-amber-800 text-lg mb-1">Pro tip</h3>
                <p className="text-amber-900">{data.tip}</p>
              </div>
            </div>
          </div>

          {/* Opdracht */}
          <div className={`p-6 md:p-8 bg-gradient-to-r ${data.kleur}`}>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Ga aan de slag!</h3>
                <p className="text-white/95 text-lg">{data.opdracht}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm mb-4">
            <strong className="text-yellow-300">Onthoud:</strong> Alleen lezen werkt niet. Je moet actief aan de slag!
          </p>
          <Link
            to="/studie-coach"
            className={`inline-flex items-center gap-2 ${data.btnKleur} text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Doe de test opnieuw
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ResultPage
