import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'

function MOLGesprek() {
  const [formData, setFormData] = useState({
    naam: '',
    klas: '',
    datum: '',
    gevoel: 50,
    vakkenGoed: '',
    vaardigheden: '',
    aandacht: '',
    aanpak: '',
    actiepuntenMentor: '',
    uitdagingen: '',
    omgaanUitdagingen: '',
    andereOnderwerpen: '',
    actiepunten: '',
    actiepuntenStatus: '',
    nogActiepunten: '',
    hoeAanpakken: '',
    zelfDoen: '',
    oudersHelpen: '',
    mentorVragen: '',
    vakkenVerwacht: '',
    andereBespreken: '',
    mijnActiepunten: ''
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
    doc.text('M(O)L Gesprek - Reflectieformulier', pageWidth / 2, y, { align: 'center' })
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

    addSection('Gespreksvragen', [
      { label: 'In welke vakken ben je goed', value: formData.vakkenGoed },
      { label: 'Over welke vaardigheden ben je tevreden', value: formData.vaardigheden },
      { label: 'Waar wil je meer aandacht voor', value: formData.aandacht },
      { label: 'Hoe ga je dit aanpakken', value: formData.aanpak },
      { label: 'Actiepunten van mentor', value: formData.actiepuntenMentor },
      { label: 'Welke uitdagingen verwacht je', value: formData.uitdagingen },
      { label: 'Hoe ga je met uitdagingen om', value: formData.omgaanUitdagingen },
      { label: 'Andere onderwerpen', value: formData.andereOnderwerpen }
    ])

    addSection('Actiepunten', [
      { label: 'Mijn actiepunten', value: formData.actiepunten }
    ])

    addSection('Vervolggesprek', [
      { label: 'Status actiepunten', value: formData.actiepuntenStatus },
      { label: 'Aanpassingen nodig', value: formData.nogActiepunten },
      { label: 'Hoe aanpakken', value: formData.hoeAanpakken },
      { label: 'Wat kan ik zelf doen', value: formData.zelfDoen },
      { label: 'Hulp van ouders', value: formData.oudersHelpen },
      { label: 'Vragen aan mentor', value: formData.mentorVragen }
    ])

    doc.save(`MOL_Gesprek_${formData.naam || 'formulier'}.pdf`)
  }

  const inputClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-violet-500 focus:outline-none transition-all text-base"
  const textareaClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-violet-500 focus:outline-none transition-all resize-none text-base min-h-[80px]"
  const labelClass = "block text-gray-800 font-semibold mb-2"

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Decoratieve elementen */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20"></div>

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
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">M(O)L Gesprek</h1>
          <p className="text-white/80">Reflectieformulier voor leerling</p>
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

          {/* Gespreksvragen */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Gespreksvragen</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>1. In welke vakken ben je goed?</label>
                <textarea name="vakkenGoed" value={formData.vakkenGoed} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf in welke vakken je goed bent..." />
              </div>
              <div>
                <label className={labelClass}>2. Over welke vaardigheden ben je tevreden?</label>
                <textarea name="vaardigheden" value={formData.vaardigheden} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf je sterke vaardigheden..." />
              </div>
              <div>
                <label className={labelClass}>3. Waar wil je graag (meer) aandacht voor besteden?</label>
                <textarea name="aandacht" value={formData.aandacht} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf waar je aan wilt werken..." />
              </div>
              <div>
                <label className={labelClass}>4. Hoe ga je dit aanpakken?</label>
                <textarea name="aanpak" value={formData.aanpak} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf je aanpak..." />
              </div>
              <div>
                <label className={labelClass}>5. Welke actiepunten heeft jouw docent/mentor voor jou?</label>
                <textarea name="actiepuntenMentor" value={formData.actiepuntenMentor} onChange={handleChange} rows="2" className={textareaClass} placeholder="Vul de actiepunten in..." />
              </div>
              <div>
                <label className={labelClass}>6. Welke uitdagingen verwacht je tegen te komen?</label>
                <textarea name="uitdagingen" value={formData.uitdagingen} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf mogelijke uitdagingen..." />
              </div>
              <div>
                <label className={labelClass}>7. Hoe ga je met deze uitdagingen om?</label>
                <textarea name="omgaanUitdagingen" value={formData.omgaanUitdagingen} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf hoe je hiermee omgaat..." />
              </div>
              <div>
                <label className={labelClass}>8. Welke andere onderwerpen wil je bespreken?</label>
                <textarea name="andereOnderwerpen" value={formData.andereOnderwerpen} onChange={handleChange} rows="2" className={textareaClass} placeholder="Eventuele andere onderwerpen..." />
              </div>
            </div>
          </div>

          {/* Actiepunten */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-violet-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Mijn actiepunten voor komende periode</h2>
            <textarea name="actiepunten" value={formData.actiepunten} onChange={handleChange} rows="4" className={textareaClass} placeholder="1.&#10;2.&#10;3." />
          </div>

          {/* Vervolggesprek */}
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
                <textarea name="nogActiepunten" value={formData.nogActiepunten} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf eventuele aanpassingen..." />
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

          {/* Nieuwe actiepunten */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-violet-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Mijn actiepunten voor komende periode</h2>
            <textarea name="mijnActiepunten" value={formData.mijnActiepunten} onChange={handleChange} rows="4" className={textareaClass} placeholder="1.&#10;2.&#10;3." />
          </div>

          {/* PDF knop */}
          <div className="flex justify-center pt-4 no-print">
            <button onClick={generatePDF} className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-violet-200 hover:shadow-xl hover:scale-105">
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

export default MOLGesprek
