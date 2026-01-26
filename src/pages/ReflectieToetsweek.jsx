import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'

const leerstrategieen = {
  voorbereiding: ['Samenvatten', 'Mindmappen', 'Boomdiagram', 'Geen strategie', 'Anders'],
  leren: ['Samenvatting maken zonder boek', 'Stof aan jezelf/iemand uitleggen', 'Mezelf laten overhoren', 'Oefentoets maken', 'Braindump', 'Flashcards', 'Geen strategie', 'Anders'],
  onthouden: ['Tekeningen/iconen in samenvatting', 'Ezelsbruggetjes', 'Geheugenpaleis', 'Geen strategie', 'Anders']
}

const positieveLeergewoontes = ['Op een rustige plek leren', 'Op tijd beginnen', 'Planning maken', 'Genoeg pauzes nemen', 'Telefoon wegleggen/op stil', 'Anders']
const negatieveLeergewoontes = ['Op een rommelige/drukke plek leren', 'Te laat beginnen', 'Geen planning maken', 'Geen/weinig pauzes nemen', 'Veel afleiding van telefoon', 'Anders']

function ReflectieToetsweek() {
  const [formData, setFormData] = useState({
    naam: '',
    klas: '',
    positieveStrategieen: '',
    positieveLeergewoontes: [],
    negatieveStrategieen: '',
    negatieveLeergewoontes: [],
    waaromMinderGoed: '',
    weerDoen: '',
    andersDoen: '',
    doel1: '',
    doel2: '',
    doel3: ''
  })

  // Meerdere vakken die goed gingen
  const [vakkenGoed, setVakkenGoed] = useState([
    { id: 1, vak: '', cijfer: '', waaromTevreden: '', strategieen: { voorbereiding: [], leren: [], onthouden: [] }, waaromStrategieen: '' }
  ])

  // Meerdere vakken die minder goed gingen
  const [vakkenMinder, setVakkenMinder] = useState([
    { id: 1, vak: '', cijfer: '', waaromNietTevreden: '', strategieen: { voorbereiding: [], leren: [], onthouden: [] }, waaromStrategieen: '' }
  ])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleVakGoedChange = (id, field, value) => {
    setVakkenGoed(vakken => vakken.map(vak => vak.id === id ? { ...vak, [field]: value } : vak))
  }

  const handleVakMinderChange = (id, field, value) => {
    setVakkenMinder(vakken => vakken.map(vak => vak.id === id ? { ...vak, [field]: value } : vak))
  }

  const handleStrategieGoedChange = (vakId, section, value) => {
    setVakkenGoed(vakken => vakken.map(vak => {
      if (vak.id === vakId) {
        const current = vak.strategieen[section] || []
        const newValues = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
        return { ...vak, strategieen: { ...vak.strategieen, [section]: newValues } }
      }
      return vak
    }))
  }

  const handleStrategieMinderChange = (vakId, section, value) => {
    setVakkenMinder(vakken => vakken.map(vak => {
      if (vak.id === vakId) {
        const current = vak.strategieen[section] || []
        const newValues = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
        return { ...vak, strategieen: { ...vak.strategieen, [section]: newValues } }
      }
      return vak
    }))
  }

  const voegVakGoedToe = () => {
    const nieuweId = Math.max(...vakkenGoed.map(v => v.id)) + 1
    setVakkenGoed([...vakkenGoed, { id: nieuweId, vak: '', cijfer: '', waaromTevreden: '', strategieen: { voorbereiding: [], leren: [], onthouden: [] }, waaromStrategieen: '' }])
  }

  const voegVakMinderToe = () => {
    const nieuweId = Math.max(...vakkenMinder.map(v => v.id)) + 1
    setVakkenMinder([...vakkenMinder, { id: nieuweId, vak: '', cijfer: '', waaromNietTevreden: '', strategieen: { voorbereiding: [], leren: [], onthouden: [] }, waaromStrategieen: '' }])
  }

  const verwijderVakGoed = (id) => {
    if (vakkenGoed.length > 1) setVakkenGoed(vakken => vakken.filter(v => v.id !== id))
  }

  const verwijderVakMinder = (id) => {
    if (vakkenMinder.length > 1) setVakkenMinder(vakken => vakken.filter(v => v.id !== id))
  }

  const handleLeergewoonteChange = (type, value) => {
    const field = `${type}Leergewoontes`
    const current = formData[field] || []
    const newValues = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    setFormData({ ...formData, [field]: newValues })
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Reflectie Toetsweek', pageWidth / 2, y, { align: 'center' })
    y += 12

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(`Naam: ${formData.naam}`, 20, y)
    doc.text(`Klas: ${formData.klas}`, 120, y)
    y += 15

    const addSection = (title, content) => {
      if (y > 250) { doc.addPage(); y = 20 }
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text(title, 20, y)
      y += 7
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      content.forEach(item => {
        if (y > 270) { doc.addPage(); y = 20 }
        const lines = doc.splitTextToSize(`${item.label}: ${item.value || '-'}`, pageWidth - 40)
        doc.text(lines, 20, y)
        y += lines.length * 4 + 2
      })
      y += 5
    }

    vakkenGoed.forEach((vak, index) => {
      addSection(`Vak dat goed ging ${index + 1}`, [
        { label: 'Vak', value: vak.vak },
        { label: 'Cijfer', value: vak.cijfer },
        { label: 'Waarom tevreden', value: vak.waaromTevreden },
        { label: 'Strategieën', value: [...vak.strategieen.voorbereiding, ...vak.strategieen.leren, ...vak.strategieen.onthouden].join(', ') }
      ])
    })

    vakkenMinder.forEach((vak, index) => {
      addSection(`Vak dat minder goed ging ${index + 1}`, [
        { label: 'Vak', value: vak.vak },
        { label: 'Cijfer', value: vak.cijfer },
        { label: 'Waarom niet tevreden', value: vak.waaromNietTevreden },
        { label: 'Strategieën', value: [...vak.strategieen.voorbereiding, ...vak.strategieen.leren, ...vak.strategieen.onthouden].join(', ') }
      ])
    })

    addSection('Reflectie', [
      { label: 'Strategieën die werkten', value: formData.positieveStrategieen },
      { label: 'Goede leergewoontes', value: formData.positieveLeergewoontes.join(', ') },
      { label: 'Strategieën die niet werkten', value: formData.negatieveStrategieen },
      { label: 'Slechte leergewoontes', value: formData.negatieveLeergewoontes.join(', ') }
    ])

    addSection('Volgende toetsweek', [
      { label: 'Wat ga je weer doen', value: formData.weerDoen },
      { label: 'Wat ga je anders doen', value: formData.andersDoen }
    ])

    addSection('SMART doelen', [
      { label: 'Doel 1', value: formData.doel1 },
      { label: 'Doel 2', value: formData.doel2 },
      { label: 'Doel 3', value: formData.doel3 }
    ])

    doc.save(`Reflectie_Toetsweek_${formData.naam || 'formulier'}.pdf`)
  }

  const inputClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-all text-base"
  const textareaClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-all resize-none text-base min-h-[80px]"
  const labelClass = "block text-gray-800 font-semibold mb-2"

  const StrategieCheckboxes = ({ vakId, section, strategieen, onChange }) => (
    <div className="space-y-2">
      {leerstrategieen[section].map((strategie) => (
        <label key={strategie} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={strategieen[section]?.includes(strategie) || false}
            onChange={() => onChange(vakId, section, strategie)}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-slate-600 text-sm group-hover:text-slate-800">{strategie}</span>
        </label>
      ))}
    </div>
  )

  const VakCard = ({ vak, type, onVakChange, onStrategieChange, onVerwijder, canDelete }) => {
    const isGoed = type === 'goed'
    const borderColor = isGoed ? 'border-green-200' : 'border-red-200'
    const bgColor = isGoed ? 'bg-green-50' : 'bg-red-50'
    
    return (
      <div className={`bg-white rounded p-6 shadow-sm border-2 ${borderColor} mb-4`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-slate-800">
            {isGoed ? 'Vak dat goed ging' : 'Vak dat minder goed ging'}
          </h3>
          {canDelete && (
            <button onClick={() => onVerwijder(vak.id)} className="text-slate-400 hover:text-red-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>Vak</label>
            <input type="text" value={vak.vak} onChange={(e) => onVakChange(vak.id, 'vak', e.target.value)} className={inputClass} placeholder="Naam van het vak" />
          </div>
          <div>
            <label className={labelClass}>Cijfer</label>
            <input type="text" value={vak.cijfer} onChange={(e) => onVakChange(vak.id, 'cijfer', e.target.value)} className={inputClass} placeholder="Bijv. 7.5" />
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>{isGoed ? 'Waarom ben je tevreden?' : 'Waarom ben je niet tevreden?'}</label>
          <textarea
            value={isGoed ? vak.waaromTevreden : vak.waaromNietTevreden}
            onChange={(e) => onVakChange(vak.id, isGoed ? 'waaromTevreden' : 'waaromNietTevreden', e.target.value)}
            rows="2"
            className={textareaClass}
            placeholder={isGoed ? 'Beschrijf waarom je tevreden bent...' : 'Beschrijf waarom je niet tevreden bent...'}
          />
        </div>

        <div className={`${bgColor} rounded p-4 mb-4`}>
          <h4 className="text-slate-800 font-medium mb-3 text-sm">Welke leerstrategieën heb je gebruikt?</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-600 font-medium mb-2 text-xs uppercase tracking-wide">Voorbereiding</p>
              <StrategieCheckboxes vakId={vak.id} section="voorbereiding" strategieen={vak.strategieen} onChange={onStrategieChange} />
            </div>
            <div>
              <p className="text-slate-600 font-medium mb-2 text-xs uppercase tracking-wide">Leren</p>
              <StrategieCheckboxes vakId={vak.id} section="leren" strategieen={vak.strategieen} onChange={onStrategieChange} />
            </div>
            <div>
              <p className="text-slate-600 font-medium mb-2 text-xs uppercase tracking-wide">Onthouden</p>
              <StrategieCheckboxes vakId={vak.id} section="onthouden" strategieen={vak.strategieen} onChange={onStrategieChange} />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Waarom koos je voor deze strategieën?</label>
          <textarea value={vak.waaromStrategieen} onChange={(e) => onVakChange(vak.id, 'waaromStrategieen', e.target.value)} rows="2" className={textareaClass} placeholder="Leg uit waarom je voor deze strategieën koos..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Decoratieve elementen */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-20"></div>

      <div className="w-full max-w-4xl relative z-10">
        <Link to="/gesprekken" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all mb-6 no-print">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Terug
        </Link>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Reflectie Toetsweek</h1>
          <p className="text-white/80">Evalueer wat werkte en wat je kunt verbeteren</p>
        </div>

        <div className="space-y-6">
          {/* Naam en Klas */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Naam leerling</label>
                <input type="text" name="naam" value={formData.naam} onChange={handleChange} className={inputClass} placeholder="Vul je naam in" />
              </div>
              <div>
                <label className={labelClass}>Klas</label>
                <input type="text" name="klas" value={formData.klas} onChange={handleChange} className={inputClass} placeholder="Bijv. 3A" />
              </div>
            </div>
          </div>

          {/* Vakken die goed gingen */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
              Vakken die goed gingen
            </h2>
            {vakkenGoed.map((vak) => (
              <VakCard
                key={vak.id}
                vak={vak}
                type="goed"
                onVakChange={handleVakGoedChange}
                onStrategieChange={handleStrategieGoedChange}
                onVerwijder={verwijderVakGoed}
                canDelete={vakkenGoed.length > 1}
              />
            ))}
            <button onClick={voegVakGoedToe} className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-3 rounded font-semibold transition-colors border-2 border-green-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              + Voeg nog een vak toe
            </button>
          </div>

          {/* Vakken die minder goed gingen */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm">!</span>
              Vakken die minder goed gingen
            </h2>
            {vakkenMinder.map((vak) => (
              <VakCard
                key={vak.id}
                vak={vak}
                type="minder"
                onVakChange={handleVakMinderChange}
                onStrategieChange={handleStrategieMinderChange}
                onVerwijder={verwijderVakMinder}
                canDelete={vakkenMinder.length > 1}
              />
            ))}
            <button onClick={voegVakMinderToe} className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded font-semibold transition-colors border-2 border-red-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              + Voeg nog een vak toe
            </button>
          </div>

          {/* Reflectie - Wat hielp */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Wat hielp jou tijdens het leren?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Strategieën die fijn waren</label>
                <textarea name="positieveStrategieen" value={formData.positieveStrategieen} onChange={handleChange} rows="3" className={textareaClass} placeholder="Welke strategieën werkten goed?" />
              </div>
              <div>
                <label className={labelClass}>Leergewoontes die hielpen</label>
                <div className="space-y-2">
                  {positieveLeergewoontes.map((gewoonte) => (
                    <label key={gewoonte} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.positieveLeergewoontes.includes(gewoonte)} onChange={() => handleLeergewoonteChange('positieve', gewoonte)} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                      <span className="text-slate-600 text-sm">{gewoonte}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reflectie - Wat werkte minder */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Wat werkte minder goed?</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className={labelClass}>Strategieën die niet werkten</label>
                <textarea name="negatieveStrategieen" value={formData.negatieveStrategieen} onChange={handleChange} rows="3" className={textareaClass} placeholder="Welke strategieën werkten niet goed?" />
              </div>
              <div>
                <label className={labelClass}>Leergewoontes die niet hielpen</label>
                <div className="space-y-2">
                  {negatieveLeergewoontes.map((gewoonte) => (
                    <label key={gewoonte} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.negatieveLeergewoontes.includes(gewoonte)} onChange={() => handleLeergewoonteChange('negatieve', gewoonte)} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                      <span className="text-slate-600 text-sm">{gewoonte}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>Waarom werkte dit minder goed?</label>
              <textarea name="waaromMinderGoed" value={formData.waaromMinderGoed} onChange={handleChange} rows="2" className={textareaClass} placeholder="Leg uit waarom dit niet werkte..." />
            </div>
          </div>

          {/* Volgende toetsweek */}
          <div className="bg-white rounded p-6 shadow-sm border-2 border-blue-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Volgende toetsweek</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Wat ga je de volgende toetsweek weer doen?</label>
                <textarea name="weerDoen" value={formData.weerDoen} onChange={handleChange} rows="3" className={textareaClass} placeholder="Beschrijf wat je wilt herhalen..." />
              </div>
              <div>
                <label className={labelClass}>Wat ga je de volgende toetsweek anders doen?</label>
                <textarea name="andersDoen" value={formData.andersDoen} onChange={handleChange} rows="3" className={textareaClass} placeholder="Beschrijf wat je wilt verbeteren..." />
              </div>
            </div>
          </div>

          {/* SMART doelen */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Persoonlijke leerdoelen</h2>
            <p className="text-slate-600 text-sm mb-4">Schrijf doelen die voldoen aan de SMART-eisen</p>
            
            <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
              <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                <span><strong className="text-blue-600">S</strong> Specifiek</span>
                <span><strong className="text-blue-600">M</strong> Meetbaar</span>
                <span><strong className="text-blue-600">A</strong> Aanwijsbaar</span>
                <span><strong className="text-blue-600">R</strong> Realistisch</span>
                <span><strong className="text-blue-600">T</strong> Tijdsgebonden</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Doel 1</label>
                <textarea name="doel1" value={formData.doel1} onChange={handleChange} rows="2" className={textareaClass} placeholder="Mijn eerste SMART doel..." />
              </div>
              <div>
                <label className={labelClass}>Doel 2</label>
                <textarea name="doel2" value={formData.doel2} onChange={handleChange} rows="2" className={textareaClass} placeholder="Mijn tweede SMART doel..." />
              </div>
              <div>
                <label className={labelClass}>Doel 3</label>
                <textarea name="doel3" value={formData.doel3} onChange={handleChange} rows="2" className={textareaClass} placeholder="Mijn derde SMART doel..." />
              </div>
            </div>
          </div>

          {/* PDF knop */}
          <div className="flex justify-center pt-4 no-print">
            <button onClick={generatePDF} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-200 hover:shadow-xl hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Genereer PDF voor Magister
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReflectieToetsweek
