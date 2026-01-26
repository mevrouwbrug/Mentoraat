import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'

function InzichtInJezelf() {
  const [formData, setFormData] = useState({
    naam: '',
    klas: '',
    trots: '',
    lastig: '',
    anders: '',
    leukVak: '',
    leukWaarom: '',
    minderLeukVak: '',
    minderLeukWaarom: '',
    meestGeleerd: '',
    watGeleerd: '',
    favorietMoment: '',
    klasgroep: '',
    samenwerken: '',
    watHelpt: '',
    hobbys: '',
    vrijeTijd: '',
    slaappatroon: '',
    telefoonTijd: '',
    doel1: '',
    doel2: '',
    doel3: '',
    specifiek: '',
    meetbaar: '',
    aanwijsbaar: '',
    realistisch: '',
    tijdsgebonden: '',
    extraHulp: '',
    mentorHelp: '',
    oudersHelp: '',
    vieren: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Startgesprek Werkblad - Inzicht in Jezelf', pageWidth / 2, y, { align: 'center' })
    y += 15

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Naam: ${formData.naam}`, 20, y)
    doc.text(`Klas: ${formData.klas}`, 120, y)
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

    addSection('1. Kennismaking', [
      { label: 'Waar ben je trots op', value: formData.trots },
      { label: 'Wat vond je lastig', value: formData.lastig },
      { label: 'Wat wil je anders doen', value: formData.anders }
    ])

    addSection('2. School & Vakken', [
      { label: 'Leuk vak', value: `${formData.leukVak} - ${formData.leukWaarom}` },
      { label: 'Minder leuk vak', value: `${formData.minderLeukVak} - ${formData.minderLeukWaarom}` },
      { label: 'Meest geleerd', value: `${formData.meestGeleerd} - ${formData.watGeleerd}` },
      { label: 'Favoriet moment', value: formData.favorietMoment }
    ])

    addSection('3. Jij in de klas', [
      { label: 'Hoe voel je je in de klasgroep', value: formData.klasgroep },
      { label: 'Samenwerken met klasgenoten', value: formData.samenwerken },
      { label: 'Wat helpt jou', value: formData.watHelpt }
    ])

    addSection('4. Over jou', [
      { label: 'Hobbys', value: formData.hobbys },
      { label: 'Vrije tijd', value: formData.vrijeTijd },
      { label: 'Slaappatroon', value: formData.slaappatroon },
      { label: 'Telefoon tijd per dag', value: formData.telefoonTijd }
    ])

    addSection('5. Doelen voor dit jaar', [
      { label: 'Doel 1', value: formData.doel1 },
      { label: 'Doel 2', value: formData.doel2 },
      { label: 'Doel 3', value: formData.doel3 }
    ])

    addSection('SMART Doelen', [
      { label: 'Specifiek', value: formData.specifiek },
      { label: 'Meetbaar', value: formData.meetbaar },
      { label: 'Aanwijsbaar', value: formData.aanwijsbaar },
      { label: 'Realistisch', value: formData.realistisch },
      { label: 'Tijdsgebonden', value: formData.tijdsgebonden }
    ])

    addSection('6. Wat heb jij nodig', [
      { label: 'Extra hulp of begeleiding', value: formData.extraHulp },
      { label: 'Wat kunnen mentor/docenten doen', value: formData.mentorHelp },
      { label: 'Wat kunnen ouders doen', value: formData.oudersHelp }
    ])

    addSection('7. Afspraak met jezelf', [
      { label: 'Als het goed gaat, hoe ga je vieren', value: formData.vieren }
    ])

    doc.save(`Inzicht_in_jezelf_${formData.naam || 'formulier'}.pdf`)
  }

  const inputClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all text-base"
  const textareaClass = "w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all resize-none text-base min-h-[80px]"
  const labelClass = "block text-gray-800 font-semibold mb-2"

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Decoratieve elementen */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-20"></div>

      {/* Terug knop */}
      <div className="w-full max-w-3xl relative z-10">
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

      <div className="max-w-3xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Inzicht in Jezelf</h1>
          <p className="text-white/80">Startgesprek werkblad</p>
        </div>

        {/* Formulier */}
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
                <input type="text" name="klas" value={formData.klas} onChange={handleChange} className={inputClass} placeholder="Bijv. 2B" />
              </div>
            </div>
          </div>

          {/* 1. Kennismaking */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Kennismaking
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Waar ben je trots op als je terugkijkt op vorig schooljaar?</label>
                <textarea name="trots" value={formData.trots} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf waar je trots op bent..." />
              </div>
              <div>
                <label className={labelClass}>Wat vond je lastig of minder leuk vorig schooljaar?</label>
                <textarea name="lastig" value={formData.lastig} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf wat je lastig vond..." />
              </div>
              <div>
                <label className={labelClass}>Wat hoop je dit schooljaar anders of beter te doen?</label>
                <textarea name="anders" value={formData.anders} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf wat je wilt verbeteren..." />
              </div>
            </div>
          </div>

          {/* 2. School & Vakken */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              School & Vakken
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Welk vak vind je leuk?</label>
                  <input type="text" name="leukVak" value={formData.leukVak} onChange={handleChange} className={inputClass} placeholder="Vak" />
                </div>
                <div>
                  <label className={labelClass}>Waarom?</label>
                  <input type="text" name="leukWaarom" value={formData.leukWaarom} onChange={handleChange} className={inputClass} placeholder="Omdat..." />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Welk vak vind je minder leuk?</label>
                  <input type="text" name="minderLeukVak" value={formData.minderLeukVak} onChange={handleChange} className={inputClass} placeholder="Vak" />
                </div>
                <div>
                  <label className={labelClass}>Waarom?</label>
                  <input type="text" name="minderLeukWaarom" value={formData.minderLeukWaarom} onChange={handleChange} className={inputClass} placeholder="Omdat..." />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Bij welk vak heb je het meeste geleerd?</label>
                  <input type="text" name="meestGeleerd" value={formData.meestGeleerd} onChange={handleChange} className={inputClass} placeholder="Vak" />
                </div>
                <div>
                  <label className={labelClass}>Wat heb je dan geleerd?</label>
                  <input type="text" name="watGeleerd" value={formData.watGeleerd} onChange={handleChange} className={inputClass} placeholder="Ik heb geleerd..." />
                </div>
              </div>
              <div>
                <label className={labelClass}>Wat is tot nu toe je favoriete moment op school?</label>
                <textarea name="favorietMoment" value={formData.favorietMoment} onChange={handleChange} rows="2" className={textareaClass} placeholder="Mijn favoriete moment was..." />
              </div>
            </div>
          </div>

          {/* 3. Jij in de klas */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Jij in de klas
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Hoe voel je je in de klasgroep?</label>
                <textarea name="klasgroep" value={formData.klasgroep} onChange={handleChange} rows="2" className={textareaClass} placeholder="Ik voel me..." />
              </div>
              <div>
                <label className={labelClass}>Kun je goed samenwerken met klasgenoten?</label>
                <textarea name="samenwerken" value={formData.samenwerken} onChange={handleChange} rows="2" className={textareaClass} placeholder="Beschrijf hoe samenwerken gaat..." />
              </div>
              <div>
                <label className={labelClass}>Wat helpt jou om goed te kunnen werken in de les?</label>
                <textarea name="watHelpt" value={formData.watHelpt} onChange={handleChange} rows="2" className={textareaClass} placeholder="Het helpt als..." />
              </div>
            </div>
          </div>

          {/* 4. Over jou */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Over jou
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Wat zijn jouw hobby's of dingen waar je blij van wordt?</label>
                <textarea name="hobbys" value={formData.hobbys} onChange={handleChange} rows="2" className={textareaClass} placeholder="Mijn hobby's zijn..." />
              </div>
              <div>
                <label className={labelClass}>Wat doe je graag in je vrije tijd?</label>
                <textarea name="vrijeTijd" value={formData.vrijeTijd} onChange={handleChange} rows="2" className={textareaClass} placeholder="In mijn vrije tijd..." />
              </div>
              <div>
                <label className={labelClass}>Hoe ziet jouw ochtend- of slaappatroon eruit?</label>
                <textarea name="slaappatroon" value={formData.slaappatroon} onChange={handleChange} rows="2" className={textareaClass} placeholder="Ik ga slapen om... en word wakker om..." />
              </div>
              <div>
                <label className={labelClass}>Hoeveel tijd zit je gemiddeld op je telefoon per dag?</label>
                <input type="text" name="telefoonTijd" value={formData.telefoonTijd} onChange={handleChange} className={inputClass} placeholder="Ongeveer ... uur" />
              </div>
            </div>
          </div>

          {/* 5. Doelen */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              Jouw doelen voor dit jaar
            </h2>
            <p className="text-gray-600 mb-4 text-sm">Wat wil je leren of verbeteren aan jezelf dit schooljaar?</p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Doel 1</label>
                <input type="text" name="doel1" value={formData.doel1} onChange={handleChange} className={inputClass} placeholder="Mijn eerste doel is..." />
              </div>
              <div>
                <label className={labelClass}>Doel 2</label>
                <input type="text" name="doel2" value={formData.doel2} onChange={handleChange} className={inputClass} placeholder="Mijn tweede doel is..." />
              </div>
              <div>
                <label className={labelClass}>Doel 3</label>
                <input type="text" name="doel3" value={formData.doel3} onChange={handleChange} className={inputClass} placeholder="Mijn derde doel is..." />
              </div>
            </div>

            {/* SMART uitleg */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-gray-800 font-bold mb-3 text-sm">Maak je doelen SMART:</h3>
              <div className="grid gap-3">
                <div>
                  <label className="block text-blue-600 font-medium mb-1 text-sm">S - Specifiek: Wat precies?</label>
                  <input type="text" name="specifiek" value={formData.specifiek} onChange={handleChange} className={inputClass} placeholder="Wat wil je precies bereiken..." />
                </div>
                <div>
                  <label className="block text-blue-600 font-medium mb-1 text-sm">M - Meetbaar: Wanneer weet je of het gelukt is?</label>
                  <input type="text" name="meetbaar" value={formData.meetbaar} onChange={handleChange} className={inputClass} placeholder="Ik weet dat het gelukt is als..." />
                </div>
                <div>
                  <label className="block text-blue-600 font-medium mb-1 text-sm">A - Aanwijsbaar: Wie helpt jou erbij?</label>
                  <input type="text" name="aanwijsbaar" value={formData.aanwijsbaar} onChange={handleChange} className={inputClass} placeholder="Ik kan hulp vragen aan..." />
                </div>
                <div>
                  <label className="block text-blue-600 font-medium mb-1 text-sm">R - Realistisch: Is het haalbaar?</label>
                  <input type="text" name="realistisch" value={formData.realistisch} onChange={handleChange} className={inputClass} placeholder="Dit is haalbaar omdat..." />
                </div>
                <div>
                  <label className="block text-blue-600 font-medium mb-1 text-sm">T - Tijdsgebonden: Wanneer wil je dit bereikt hebben?</label>
                  <input type="text" name="tijdsgebonden" value={formData.tijdsgebonden} onChange={handleChange} className={inputClass} placeholder="Ik wil dit bereikt hebben voor..." />
                </div>
              </div>
            </div>
          </div>

          {/* 6. Wat heb jij nodig */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
              Wat heb jij nodig?
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Waar heb jij als leerling dit jaar extra hulp of begeleiding bij nodig?</label>
                <textarea name="extraHulp" value={formData.extraHulp} onChange={handleChange} rows="2" className={textareaClass} placeholder="Ik heb hulp nodig bij..." />
              </div>
              <div>
                <label className={labelClass}>Wat kunnen je mentor en docenten voor je doen om jou te helpen?</label>
                <textarea name="mentorHelp" value={formData.mentorHelp} onChange={handleChange} rows="2" className={textareaClass} placeholder="Mijn mentor kan..." />
              </div>
              <div>
                <label className={labelClass}>Wat kunnen je ouders voor je doen om jou te helpen?</label>
                <textarea name="oudersHelp" value={formData.oudersHelp} onChange={handleChange} rows="2" className={textareaClass} placeholder="Mijn ouders kunnen..." />
              </div>
            </div>
          </div>

          {/* 7. Afspraak met jezelf */}
          <div className="bg-white rounded p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
              Afspraak met jezelf
            </h2>
            <div>
              <label className={labelClass}>Als het goed gaat, hoe ga je dat vieren?</label>
              <textarea name="vieren" value={formData.vieren} onChange={handleChange} rows="2" className={textareaClass} placeholder="Als het lukt ga ik..." />
            </div>
          </div>

          {/* PDF knop */}
          <div className="flex justify-center pt-4 no-print">
            <button
              onClick={generatePDF}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
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

export default InzichtInJezelf
