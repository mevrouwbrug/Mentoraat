import { useParams, Link } from 'react-router-dom'
import TechniekVoorbeelden from '../components/TechniekVoorbeelden'

const technieken = {
  pomodoro: {
    naam: 'Pomodoro-techniek',
    kleur: 'from-red-500 to-red-600',
    solid: 'bg-red-500',
    uitleg: 'Studeer in blokken van 25 minuten focus. Dit houdt je scherp en voorkomt uitstelgedrag. Pomodoro betekent "tomaat" in het Italiaans - vernoemd naar de tomaatvormige keukentimer.',
    stappen: [
      'Zet een timer op 25 minuten',
      'Werk met volledige focus aan één taak',
      'Neem 5 minuten pauze',
      'Na 4 sessies: lange pauze (15-30 min)'
    ],
    opdracht: 'Zet nu een timer op 25 minuten en leg je telefoon in een andere kamer. Begin direct aan je eerste taak!',
    tip: 'Tijdens de pauze: sta op, drink water, en kijk niet op je telefoon.'
  },
  cornell: {
    naam: 'Cornell-methode',
    kleur: 'from-indigo-500 to-purple-500',
    solid: 'bg-indigo-500',
    uitleg: 'Een gestructureerde manier van aantekeningen maken om de kern sneller te herkennen. Je verdeelt je blad in drie delen.',
    stappen: [
      'Verdeel je blad in drie vakken',
      'Links: sleutelwoorden en begrippen',
      'Rechts: uitgebreide notities',
      'Onderaan: samenvatting in eigen woorden'
    ],
    opdracht: 'Pak een vel papier en teken het Cornell-schema. Maak aantekeningen van je volgende les.',
    tip: 'Vul de samenvatting onderaan pas in nadat je klaar bent met de les.'
  },
  mindmaps: {
    naam: 'Mindmaps',
    kleur: 'from-green-500 to-emerald-500',
    solid: 'bg-green-500',
    uitleg: 'Een visuele samenvatting met tekeningen, pijlen en kernwoorden. Je hersenen onthouden visuele informatie veel beter dan alleen tekst.',
    stappen: [
      'Hoofdonderwerp in het midden',
      'Teken lijnen naar subonderwerpen',
      'Gebruik verschillende kleuren',
      'Voeg tekeningen of symbolen toe'
    ],
    opdracht: 'Maak een mindmap van één hoofdstuk. Gebruik minimaal 3 kleuren en 5 tekeningetjes.',
    tip: 'Begin simpel en voeg later meer details toe.'
  },
  dualcoding: {
    naam: 'Dual Coding',
    kleur: 'from-violet-500 to-purple-500',
    solid: 'bg-violet-500',
    uitleg: 'Combineer tekst met afbeeldingen of diagrammen. Je brein verwerkt informatie dan op twee manieren tegelijk.',
    stappen: [
      'Lees de tekst en vind kernbegrippen',
      'Maak een schema of diagram',
      'Teken tijdlijnen bij geschiedenis',
      'Visualiseer formules met voorbeelden'
    ],
    opdracht: 'Zoek drie moeilijke begrippen en teken voor elk een symbool of schema.',
    tip: 'Je tekeningen hoeven niet mooi te zijn, als ze maar betekenis hebben voor jou.'
  },
  retrieval: {
    naam: 'Retrieval Practice',
    kleur: 'from-amber-500 to-orange-500',
    solid: 'bg-orange-500',
    uitleg: 'Jezelf actief overhoren in plaats van alleen lezen. Je traint je hersenen om informatie "op te halen" uit je geheugen.',
    stappen: [
      'Maak oefenvragen',
      'Laat iemand je overhoren',
      'Schrijf op wat je weet zonder te spieken'
    ],
    opdracht: 'Schrijf nu uit je hoofd 5 dingen op die je nog weet van je laatste les. Controleer daarna pas je boek.',
    tip: 'Het is juist goed als je even moet nadenken. Dat is het moment waarop je leert!'
  },
  samenvatten: {
    naam: 'Samenvatten',
    kleur: 'from-pink-500 to-rose-500',
    solid: 'bg-pink-500',
    uitleg: 'De kern van de stof scheiden van de bijzaken. Door te samenvatten dwing je jezelf om te begrijpen wat echt belangrijk is.',
    stappen: [
      'Lees eerst de hele tekst door',
      'Markeer de hoofdzaken per alinea',
      'Schrijf de kern in je eigen woorden',
      'Controleer of je niets belangrijks mist'
    ],
    opdracht: 'Lees één bladzijde en vat deze samen in maximaal 3 zinnen.',
    tip: 'Als je het niet in je eigen woorden kunt zeggen, snap je het waarschijnlijk nog niet.'
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
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
      {/* Home knop */}
      <Link 
        to="/" 
        className="fixed top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:bg-white z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </Link>

      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Jouw aanbevolen leertechniek</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{data.naam}</h1>
        </div>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          
          {/* Wat is het? - Los vak */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-10 py-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Wat is het?</h2>
            <p className="text-gray-700 leading-relaxed">{data.uitleg}</p>
          </div>

          {/* Voorbeeld - Los vak */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-10 py-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Voorbeeld</h2>
            <TechniekVoorbeelden techniek={techniek} />
          </div>

          {/* Hoe doe je het? - Los vak */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-10 py-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Hoe doe je het?</h2>
            <div className="space-y-4">
              {data.stappen.map((stap, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${data.kleur} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                    {index + 1}
                  </span>
                  <p className="text-gray-700 pt-1">{stap}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro tip - Los vak */}
          <div className="bg-amber-50/95 backdrop-blur-sm rounded-2xl px-10 py-8 shadow-lg border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-amber-800 text-lg mb-2">Pro tip</h3>
                <p className="text-amber-900">{data.tip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Opdracht - Volledige breedte */}
        <div className={`bg-gradient-to-r ${data.kleur} rounded-2xl px-10 py-8 md:px-12 md:py-10 shadow-lg mb-6`}>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Ga aan de slag!</h2>
              <p className="text-white/95 text-lg">{data.opdracht}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 inline-block">
            <p className="text-white text-sm">
              <strong className="text-yellow-400">Actief leren:</strong> Stop met alleen lezen! Passief leren werkt niet.
            </p>
          </div>
          
          <div>
            <Link
              to="/studie-coach"
              className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Doe de test opnieuw
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
