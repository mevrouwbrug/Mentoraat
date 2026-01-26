import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StudieCoach from './pages/StudieCoach'
import ResultPage from './pages/ResultPage'
import Gesprekken from './pages/Gesprekken'
import InzichtInJezelf from './pages/InzichtInJezelf'
import MOLGesprek from './pages/MOLGesprek'
import VoorbereidingToetsweek from './pages/VoorbereidingToetsweek'
import ReflectieToetsweek from './pages/ReflectieToetsweek'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studie-coach" element={<StudieCoach />} />
        <Route path="/resultaat/:techniek" element={<ResultPage />} />
        <Route path="/gesprekken" element={<Gesprekken />} />
        <Route path="/gesprekken/inzicht" element={<InzichtInJezelf />} />
        <Route path="/gesprekken/mol" element={<MOLGesprek />} />
        <Route path="/gesprekken/voorbereiding" element={<VoorbereidingToetsweek />} />
        <Route path="/gesprekken/reflectie" element={<ReflectieToetsweek />} />
      </Routes>
    </div>
  )
}

export default App

