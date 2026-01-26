import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'

function MLGesprek() {
  const [formData, setFormData] = useState({
    naam: '',
    klas: '',
    datum: '',
    gevoel: 50,
    actiepuntenStatus: '',
    aanpassingen: '',
    hoeAanpakken: '',
    zelfDoen: '',
    oudersHelpen: '',
    mentorVragen: '',
    actiepunten: ''
  })

  const handleChange = (e) => {
    const value = e.target.type === 'range' ? parseInt(e.target.value) : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const getGevoelLabel = (value) => {
    if (value <= 25) return { label: 'Slecht', color: 'text-red-600', bg: 'bg-red-100' }
    if (value <= 50) return { label: 'Matig', color: 'text-orange-600', bg: 'bg-orange-100' }
    if (value <= 75) return { label: 'Goed', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { label: 'Uitstekend', color: 'text-green-600', bg: 'bg-green-100' }
  }

  const gevoelInfo = getGevoelLabel(formData.gevoel)

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('ML Gesprek - Vervolggesprek', pageWidth / 2, y, { align: 'center' })
    y += 15

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Naam: ${formData.naam}`, 20, y)
    doc.text(`Klas: ${formData.klas}`, 100, y)
    doc.text(`Datum: ${formData.datum}`, 150, y)
    y += 10
    doc.text(`Hoe voel je je: ${gevoelInfo.label}`, 20, y)
    y += 15

    const addSection = (title, fields) => {
      if (y > 250) { doc.addPage(); y = 20 }
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(title, 20, y)
      y += 8
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      fields.forEach(field => {
        if (y > 270) { doc.addPage(); y = 20 }
        const lines = doc.splitTextToSize(`${field.label}: ${field.value || '-'}`, pageWidth - 40)
        doc.text(lines, 20, y)
        y += lines.length * 5 + 3
      })
      y += 5
    }

    addSection('Vervolggesprek - Hoe gaat het met de actiepunten uit het vorige gesprek?', [
      { label: '1. Is het gelukt? Zijn er nog actiepunten', value: formData.actiepuntenStatus },
      { label: '2. Welke aanpassingen zijn er nodig', value: formData.aanpassingen },
      { label: '3. Hoe ga je dat aanpakken', value: formData.hoeAanpakken },
      { label: '4. Wat kun je zelf doen', value: formData.zelfDoen },
      { label: '5. Waar kunnen jouw ouders bij helpen', value: formData.oudersHelpen },
      { label: '6. Wat wil je je mentor vragen', value: formData.mentorVragen }
    ])

    addSection('Mijn actiepunten voor komende periode', [
      { label: 'Actiepunten', value: formData.actiepunten }
    ])

    doc.save(`ML_Gesprek_${formData.naam || 'formulier'}.pdf`)
  }

  const inputClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-all text-base"
  const textareaClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-all resize-none text-base min-h-[80px]"
  const labelClass = "block text-gray-800 font-semibold mb-2"

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Decoratieve elementen */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-400 rounded-full blur-3xl opacity-20"></div>

      <div className="w-full max-w-3xl relative z-10">
        <Link to="/gesprekken" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all mb-6 no-print">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Terug
        </Link>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">ML Gesprek</h1>
          <p className="text-white/80">Vervolggesprek - Hoe gaat het met je actiepunten?</p>
        </div>

        <div className="space-y-6">
          {/* Naam, Klas, Datum */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Naam</label>
                <input type="text" name="naam" value={formData.naam} onChange={handleChange} className={inputClass} placeholder="Vul je naam in" />
              </div>
              <div>
                <label className={labelClass}>Klas</label>
                <input type="text" name="klas" value={formData.klas} onChange={handleChange} className={inputClass} placeholder="Bijv. 3A" />
              </div>
              <div>
                <label className={labelClass}>Datum</label>
                <input type="date" name="datum" value={formData.datum} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Gevoelsmeter */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Hoe voel je je?</h2>
            <div className="space-y-4">
              <input
                type="range"
                name="gevoel"
                min="0"
                max="100"
                value={formData.gevoel}
                onChange={handleChange}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #EF4444, #F59E0B, #10B981)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Slecht</span>
                <span>Matig</span>
                <span>Goed</span>
                <span>Uitstekend</span>
              </div>
              <div className="text-center">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${gevoelInfo.bg} ${gevoelInfo.color}`}>
                  {gevoelInfo.label}
                </span>
              </div>
            </div>
          </div>

          {/* Vervolggesprek vragen */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Vervolggesprek</h2>
            <p className="text-slate-600 text-sm mb-4">Hoe gaat het met de actiepunten uit het vorige gesprek?</p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>1. Is het gelukt? Zijn er nog actiepunten?</label>
                <textarea name="actiepuntenStatus" value={formData.actiepuntenStatus} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf de voortgang..." />
              </div>
              <div>
                <label className={labelClass}>2. Welke aanpassingen zijn er nodig?</label>
                <textarea name="aanpassingen" value={formData.aanpassingen} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf eventuele aanpassingen..." />
              </div>
              <div>
                <label className={labelClass}>3. Hoe ga je dat aanpakken?</label>
                <textarea name="hoeAanpakken" value={formData.hoeAanpakken} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf je nieuwe aanpak..." />
              </div>
              <div>
                <label className={labelClass}>4. Wat kun je zelf doen?</label>
                <textarea name="zelfDoen" value={formData.zelfDoen} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf wat je zelf kunt doen..." />
              </div>
              <div>
                <label className={labelClass}>5. Waar kunnen jouw ouders bij helpen?</label>
                <textarea name="oudersHelpen" value={formData.oudersHelpen} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf hoe ouders kunnen helpen..." />
              </div>
              <div>
                <label className={labelClass}>6. Wat wil je je mentor vragen?</label>
                <textarea name="mentorVragen" value={formData.mentorVragen} onChange={handleChange} rows="2" className={textareaClass} placeholder="Vragen voor je mentor..." />
              </div>
            </div>
          </div>

          {/* Actiepunten */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-pink-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Mijn actiepunten voor komende periode</h2>
            <textarea name="actiepunten" value={formData.actiepunten} onChange={handleChange} rows="4" className={textareaClass} placeholder="1.&#10;2.&#10;3." />
          </div>

          {/* PDF knop */}
          <div className="flex justify-center pt-4 no-print">
            <button onClick={generatePDF} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105">
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

export default MLGesprek
