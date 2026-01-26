// Visuele voorbeelden voor elke leertechniek

function PomodoroVoorbeeld() {
  return (
    <div className="flex flex-col items-center">
      {/* Tomaat illustratie */}
      <div className="mb-6">
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          {/* Tomaat body */}
          <ellipse cx="50" cy="55" rx="40" ry="35" fill="#EF4444" />
          {/* Glans */}
          <ellipse cx="35" cy="45" rx="8" ry="5" fill="#FCA5A5" opacity="0.6" />
          {/* Steeltje */}
          <path d="M 50 20 Q 45 25 50 30 Q 55 25 50 20" fill="#22C55E" />
          <rect x="48" y="18" width="4" height="8" fill="#16A34A" rx="1" />
          {/* Blaadjes */}
          <path d="M 40 22 Q 35 18 30 22 Q 35 25 40 22" fill="#22C55E" />
          <path d="M 60 22 Q 65 18 70 22 Q 65 25 60 22" fill="#22C55E" />
          {/* Timer tekst */}
          <text x="50" y="60" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">25'</text>
        </svg>
      </div>

      {/* Cyclus */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="text-center">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mb-1 shadow-md">
              <span className="text-white font-bold text-sm">25'</span>
            </div>
            <span className="text-xs text-slate-600">Focus {num}</span>
            {num < 4 && (
              <div className="text-xs text-slate-400">+ 5' pauze</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-red-100 rounded-lg px-4 py-2 text-center">
        <span className="text-red-700 text-sm font-medium">Na 4 sessies → 15-30 min lange pauze</span>
      </div>
    </div>
  )
}

function CornellVoorbeeld() {
  return (
    <div className="max-w-md mx-auto">
      <div className="border-2 border-slate-300 rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="border-b-2 border-slate-300 p-3 bg-slate-50">
          <span className="text-slate-500 text-sm">Onderwerp: _____________</span>
          <span className="text-slate-400 text-sm float-right">Datum: ___/___</span>
        </div>
        
        {/* Main content area */}
        <div className="flex">
          {/* Left column - Keywords */}
          <div className="w-1/3 border-r-2 border-slate-300 p-3 bg-indigo-50">
            <p className="text-xs font-medium text-indigo-600 mb-2">SLEUTELWOORDEN</p>
            <div className="space-y-2 text-xs text-slate-600">
              <p>• Begrip 1</p>
              <p>• Begrip 2</p>
              <p>• Vraag?</p>
            </div>
          </div>
          
          {/* Right column - Notes */}
          <div className="w-2/3 p-3">
            <p className="text-xs font-medium text-slate-600 mb-2">NOTITIES</p>
            <div className="space-y-1 text-xs text-slate-500">
              <p>- Hoofdpunt van de les</p>
              <p>- Uitleg en details</p>
              <p>- Voorbeelden</p>
              <p>- Verbanden met...</p>
            </div>
          </div>
        </div>
        
        {/* Summary */}
        <div className="border-t-2 border-slate-300 p-3 bg-indigo-50">
          <p className="text-xs font-medium text-indigo-600 mb-1">SAMENVATTING</p>
          <p className="text-xs text-slate-600">Schrijf hier de kern in eigen woorden...</p>
        </div>
      </div>
    </div>
  )
}

function MindmapVoorbeeld() {
  return (
    <div className="relative h-64">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Central topic */}
        <ellipse cx="200" cy="100" rx="50" ry="25" fill="#10B981" />
        <text x="200" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">HOOFDSTUK</text>
        
        {/* Branch 1 - Top left */}
        <path d="M 155 85 Q 100 60 60 50" stroke="#3B82F6" strokeWidth="3" fill="none"/>
        <ellipse cx="45" cy="45" rx="35" ry="18" fill="#3B82F6" />
        <text x="45" y="49" textAnchor="middle" fill="white" fontSize="10">Onderwerp 1</text>
        
        {/* Branch 2 - Top right */}
        <path d="M 245 85 Q 300 60 340 50" stroke="#8B5CF6" strokeWidth="3" fill="none"/>
        <ellipse cx="355" cy="45" rx="35" ry="18" fill="#8B5CF6" />
        <text x="355" y="49" textAnchor="middle" fill="white" fontSize="10">Onderwerp 2</text>
        
        {/* Branch 3 - Bottom left */}
        <path d="M 155 115 Q 100 140 60 155" stroke="#F59E0B" strokeWidth="3" fill="none"/>
        <ellipse cx="45" cy="160" rx="35" ry="18" fill="#F59E0B" />
        <text x="45" y="164" textAnchor="middle" fill="white" fontSize="10">Onderwerp 3</text>
        
        {/* Branch 4 - Bottom right */}
        <path d="M 245 115 Q 300 140 340 155" stroke="#EC4899" strokeWidth="3" fill="none"/>
        <ellipse cx="355" cy="160" rx="35" ry="18" fill="#EC4899" />
        <text x="355" y="164" textAnchor="middle" fill="white" fontSize="10">Onderwerp 4</text>
        
        {/* Sub-branches */}
        <line x1="20" y1="30" x2="10" y2="15" stroke="#3B82F6" strokeWidth="2"/>
        <text x="10" y="12" fontSize="8" fill="#3B82F6">detail</text>
        
        <line x1="70" y1="30" x2="80" y2="15" stroke="#3B82F6" strokeWidth="2"/>
        <text x="85" y="12" fontSize="8" fill="#3B82F6">detail</text>
      </svg>
      <p className="text-center text-sm text-slate-500 mt-2">Gebruik kleuren en verbind begrippen met lijnen</p>
    </div>
  )
}

function DualCodingVoorbeeld() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-6 items-center">
        {/* Woorden kant */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <p className="font-medium text-slate-700 mb-2 text-sm">Tekst</p>
          <div className="space-y-2 text-sm text-slate-600">
            <p>"De aarde draait om de zon..."</p>
            <p>"Fotosynthese is..."</p>
            <p>"De formule is: E=mc²"</p>
          </div>
        </div>
        
        {/* Beelden kant */}
        <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
          <p className="font-medium text-violet-700 mb-2 text-sm">Visueel</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-slate-500">→ zonnestelsel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-green-500 rounded"></div>
              <span className="text-xs text-slate-500">→ blad + zon</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-600 font-bold text-sm">E=mc²</span>
              <span className="text-xs text-slate-500">→ diagram</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Arrow showing combination */}
      <div className="text-center mt-4">
        <div className="inline-flex items-center gap-2 bg-violet-100 rounded-full px-4 py-2">
          <span className="text-violet-700 text-sm font-medium">Combineer voor beter onthouden</span>
        </div>
      </div>
    </div>
  )
}

function RetrievalVoorbeeld() {
  return (
    <div className="max-w-md mx-auto">
      {/* Brain dump example */}
      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-4">
        <p className="font-medium text-amber-700 mb-3 text-sm">Braindump voorbeeld:</p>
        <div className="bg-white rounded p-3 border border-amber-200">
          <p className="text-xs text-slate-400 mb-2 italic">Schrijf alles op wat je weet over [onderwerp]:</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>1. _______________</p>
            <p>2. _______________</p>
            <p>3. _______________</p>
          </div>
        </div>
      </div>
      
      {/* Self-test questions */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <p className="font-medium text-slate-700 mb-3 text-sm">Overhoorvragen:</p>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-amber-500">?</span>
            <span className="text-sm text-slate-600">Wat betekent [begrip]?</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500">?</span>
            <span className="text-sm text-slate-600">Noem 3 kenmerken van...</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500">?</span>
            <span className="text-sm text-slate-600">Leg uit waarom...</span>
          </div>
        </div>
      </div>
      
      <p className="text-center text-sm text-slate-500 mt-4">
        Controleer pas daarna je boek!
      </p>
    </div>
  )
}

function SamenvattenVoorbeeld() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Voor: originele tekst */}
        <div>
          <p className="text-sm font-medium text-slate-500 mb-2">Originele tekst:</p>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-sm text-slate-600">
            <p>
              De industriële revolutie begon in <span className="bg-rose-200">Engeland</span> rond{' '}
              <span className="bg-rose-200">1760</span>. Het was een periode van grote{' '}
              <span className="bg-rose-200">technologische veranderingen</span>. 
              Veel mensen verhuisden van het platteland naar de steden om in fabrieken te werken.
              Dit had grote gevolgen voor de samenleving.
            </p>
          </div>
        </div>
        
        {/* Na: samenvatting */}
        <div>
          <p className="text-sm font-medium text-rose-600 mb-2">Jouw samenvatting:</p>
          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200 text-sm text-slate-700">
            <p className="font-medium">
              De industriële revolutie (Engeland, 1760) bracht technologische veranderingen 
              en verstedelijking.
            </p>
          </div>
        </div>
      </div>
      
      {/* Tips */}
      <div className="mt-4 bg-white rounded-lg p-4 border border-slate-200">
        <p className="text-sm font-medium text-slate-700 mb-2">Stappenplan:</p>
        <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
          <li>Markeer de hoofdzaken</li>
          <li>Schrijf in eigen woorden</li>
          <li>Max 3 zinnen per alinea</li>
        </ol>
      </div>
    </div>
  )
}

function TechniekVoorbeelden({ techniek }) {
  const voorbeelden = {
    pomodoro: <PomodoroVoorbeeld />,
    cornell: <CornellVoorbeeld />,
    mindmaps: <MindmapVoorbeeld />,
    dualcoding: <DualCodingVoorbeeld />,
    retrieval: <RetrievalVoorbeeld />,
    samenvatten: <SamenvattenVoorbeeld />
  }

  return voorbeelden[techniek] || null
}

export default TechniekVoorbeelden
