# 📚 Studie-Coach

Een interactieve React-app voor middelbare scholieren (13-15 jaar) om hun studievaardigheden te verbeteren en mentorgesprekken te ondersteunen.

## ✨ Features

### 🎯 Studie-Coach
- **6 vragenlijst** om te ontdekken welke leertechniek het beste bij je past
- **Gepersonaliseerde resultaten** met uitleg en praktische opdrachten
- Ondersteunde technieken:
  - 🍅 Pomodoro-Techniek
  - 📝 Cornell-Methode
  - 🎨 Mindmaps
  - 🖼️ Dual Coding
  - 🧠 Retrieval Practice
  - 📋 Samenvatten

### 💬 Gesprekken
4 interactieve formulieren voor mentorgesprekken:
1. **Inzicht in jezelf** - Startgesprek werkblad met SMART doelen
2. **M(O)L Gesprekken** - Reflectieformulier met gevoelsmeter
3. **Voorbereiding Toetsweek** - Interactieve tabellen voor leerstof planning
4. **Reflectie Toetsweek** - Evaluatie met checkboxes voor leerstrategieën

### 📄 PDF Export
Elk formulier heeft een "Genereer PDF voor Magister" knop om ingevulde formulieren te downloaden.

## 🚀 Installatie & Opstarten

### Vereisten
- Node.js 18 of hoger
- npm of yarn

### Stappen

1. **Open een terminal** in de `studie-coach` map

2. **Installeer de dependencies:**
```bash
npm install
```

3. **Start de development server:**
```bash
npm run dev
```

4. **Open de app** in je browser op `http://localhost:5173`

## 🎨 Design

- **Kleuren:** Vrolijke gradients in blauw, roze en oranje
- **Fonts:** Fredoka (headers) en Nunito (body)
- **Stijl:** Glassmorphism met animaties
- **Responsive:** Werkt op zowel desktop als mobiel

## 📁 Projectstructuur

```
studie-coach/
├── public/
│   └── favicon.svg
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Hoofdpagina met twee knoppen
│   │   ├── StudieCoach.jsx       # Vragenlijst
│   │   ├── ResultPage.jsx        # Resultaten per techniek
│   │   ├── Gesprekken.jsx        # Overzicht formulieren
│   │   ├── InzichtInJezelf.jsx   # Formulier 1
│   │   ├── MOLGesprek.jsx        # Formulier 2
│   │   ├── VoorbereidingToetsweek.jsx  # Formulier 3
│   │   └── ReflectieToetsweek.jsx      # Formulier 4
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologieën

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router** - Navigatie
- **jsPDF** - PDF generatie

## 💡 Tips voor gebruik

- De app werkt het beste in Chrome of Firefox
- Voor PDF export: zorg dat pop-ups niet geblokkeerd zijn
- De formulieren slaan data lokaal op - sluit de pagina niet voordat je de PDF hebt gedownload

---

Made with 💖 voor slimme leerlingen

