import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'

function VoorbereidingToetsweek() {
  const [formData, setFormData] = useState({
    naam: '',
    klas: '',
    periode: ''
  })

  const [leerstofRijen, setLeerstofRijen] = useState([
    { id: 1, vak: '', leerstof: '', leermiddelen: '' }
  ])

  const [leerstrategieRijen, setLeerstrategieRijen] = useState([
    { id: 1, vak: '', niveau1: '', niveau2: '' }
  ])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLeerstofChange = (id, field, value) => {
    setLeerstofRijen(rijen => rijen.map(rij => rij.id === id ? { ...rij, [field]: value } : rij))
  }

  const handleStrategieChange = (id, field, value) => {
    setLeerstrategieRijen(rijen => rijen.map(rij => rij.id === id ? { ...rij, [field]: value } : rij))
  }

  const voegLeerstofRijToe = () => {
    const nieuweId = Math.max(...leerstofRijen.map(r => r.id)) + 1
    setLeerstofRijen([...leerstofRijen, { id: nieuweId, vak: '', leerstof: '', leermiddelen: '' }])
  }

  const voegStrategieRijToe = () => {
    const nieuweId = Math.max(...leerstrategieRijen.map(r => r.id)) + 1
    setLeerstrategieRijen([...leerstrategieRijen, { id: nieuweId, vak: '', niveau1: '', niveau2: '' }])
  }

  const verwijderLeerstofRij = (id) => {
    if (leerstofRijen.length > 1) {
      setLeerstofRijen(rijen => rijen.filter(rij => rij.id !== id))
    }
  }

  const verwijderStrategieRij = (id) => {
    if (leerstrategieRijen.length > 1) {
      setLeerstrategieRijen(rijen => rijen.filter(rij => rij.id !== id))
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(`Voorbereiding Toetsweek${formData.periode ? ` - ${formData.periode}` : ''}`, pageWidth / 2, y, { align: 'center' })
    y += 12

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(`Naam: ${formData.naam}`, 20, y)
    doc.text(`Klas: ${formData.klas}`, 120, y)
    y += 15

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Wat moet je leren?', 20, y)
    y += 8

    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('Vak', 20, y)
    doc.text('Leerstof', 50, y)
    doc.text('Leermiddelen', 120, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    leerstofRijen.forEach(rij => {
      if (y > 270) { doc.addPage(); y = 20 }
      doc.text(rij.vak || '-', 20, y)
      doc.text(doc.splitTextToSize(rij.leerstof || '-', 65), 50, y)
      doc.text(doc.splitTextToSize(rij.leermiddelen || '-', 60), 120, y)
      y += 10
    })
    y += 10

    if (y > 230) { doc.addPage(); y = 20 }
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Hoe ga je leren?', 20, y)
    y += 8

    doc.setFontSize(9)
    doc.text('Vak', 20, y)
    doc.text('Niveau 1 (kennen/weten)', 50, y)
    doc.text('Niveau 2 (snappen)', 120, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    leerstrategieRijen.forEach(rij => {
      if (y > 270) { doc.addPage(); y = 20 }
      doc.text(rij.vak || '-', 20, y)
      doc.text(doc.splitTextToSize(rij.niveau1 || '-', 60), 50, y)
      doc.text(doc.splitTextToSize(rij.niveau2 || '-', 60), 120, y)
      y += 10
    })

    doc.save(`Voorbereiding_Toetsweek_${formData.naam || 'formulier'}.pdf`)
  }

  const inputClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all text-base"
  const smallInputClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all text-sm"
  const labelClass = "block text-gray-800 font-semibold mb-2"

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Decoratieve elementen */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-20"></div>

      <div className="w-full max-w-5xl relative z-10">
        <Link 
          to="/gesprekken"
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all mb-6 no-print"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Terug
        </Link>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Voorbereiding Toetsweek</h1>
          <p className="text-white/80">Plan je leerstof en strategieën</p>
        </div>

        <div className="space-y-6">
          {/* Naam, Klas, Periode */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Naam leerling</label>
                <input type="text" name="naam" value={formData.naam} onChange={handleChange} className={inputClass} placeholder="Vul je naam in" />
              </div>
              <div>
                <label className={labelClass}>Klas</label>
                <input type="text" name="klas" value={formData.klas} onChange={handleChange} className={inputClass} placeholder="Bijv. 3A" />
              </div>
              <div>
                <label className={labelClass}>Periode</label>
                <input type="text" name="periode" value={formData.periode} onChange={handleChange} className={inputClass} placeholder="Bijv. Periode 1" />
              </div>
            </div>
          </div>

          {/* Tabel 1: Wat moet je leren */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Wat moet je leren?</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-600 border-b border-slate-200">
                    <th className="pb-3 pr-2 font-medium text-sm w-24">Vak</th>
                    <th className="pb-3 px-2 font-medium text-sm">Leerstof</th>
                    <th className="pb-3 px-2 font-medium text-sm">Leermiddelen</th>
                    <th className="pb-3 pl-2 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {leerstofRijen.map((rij) => (
                    <tr key={rij.id} className="border-b border-slate-100">
                      <td className="py-2 pr-2">
                        <input type="text" value={rij.vak} onChange={(e) => handleLeerstofChange(rij.id, 'vak', e.target.value)} className={smallInputClass} placeholder="Vak" />
                      </td>
                      <td className="py-2 px-2">
                        <input type="text" value={rij.leerstof} onChange={(e) => handleLeerstofChange(rij.id, 'leerstof', e.target.value)} className={smallInputClass} placeholder="Wat moet je leren?" />
                      </td>
                      <td className="py-2 px-2">
                        <input type="text" value={rij.leermiddelen} onChange={(e) => handleLeerstofChange(rij.id, 'leermiddelen', e.target.value)} className={smallInputClass} placeholder="Leermiddelen" />
                      </td>
                      <td className="py-2 pl-2">
                        <button onClick={() => verwijderLeerstofRij(rij.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={voegLeerstofRijToe} className="mt-4 flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded font-semibold transition-colors border-2 border-blue-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              + Voeg vak toe
            </button>
          </div>

          {/* Tabel 2: Hoe ga je leren */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Hoe ga je leren?</h2>
            
            <div className="mb-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-slate-600 text-sm">
                <strong className="text-slate-800">Niveau 1 (kennen/weten):</strong> Feiten, begrippen, definities onthouden<br/>
                <strong className="text-slate-800">Niveau 2 (snappen):</strong> Uitleggen, toepassen, verbanden leggen
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-600 border-b border-slate-200">
                    <th className="pb-3 pr-2 font-medium text-sm w-24">Vak</th>
                    <th className="pb-3 px-2 font-medium text-sm">Niveau 1 (kennen/weten)</th>
                    <th className="pb-3 px-2 font-medium text-sm">Niveau 2 (snappen)</th>
                    <th className="pb-3 pl-2 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {leerstrategieRijen.map((rij) => (
                    <tr key={rij.id} className="border-b border-slate-100">
                      <td className="py-2 pr-2">
                        <input type="text" value={rij.vak} onChange={(e) => handleStrategieChange(rij.id, 'vak', e.target.value)} className={smallInputClass} placeholder="Vak" />
                      </td>
                      <td className="py-2 px-2">
                        <input type="text" value={rij.niveau1} onChange={(e) => handleStrategieChange(rij.id, 'niveau1', e.target.value)} className={smallInputClass} placeholder="Hoe ga je onthouden?" />
                      </td>
                      <td className="py-2 px-2">
                        <input type="text" value={rij.niveau2} onChange={(e) => handleStrategieChange(rij.id, 'niveau2', e.target.value)} className={smallInputClass} placeholder="Hoe ga je begrijpen?" />
                      </td>
                      <td className="py-2 pl-2">
                        <button onClick={() => verwijderStrategieRij(rij.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={voegStrategieRijToe} className="mt-4 flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded font-semibold transition-colors border-2 border-blue-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              + Voeg vak toe
            </button>
          </div>

          {/* PDF knop */}
          <div className="flex justify-center pt-4 no-print">
            <button onClick={generatePDF} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-105">
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

export default VoorbereidingToetsweek
