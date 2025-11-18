import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import TeamPage from './pages/TeamPage'
import HowToStartPage from './pages/HowToStartPage'
import ProgressPage from './pages/ProgressPage'
import Header from './components/Header/Header'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/how-to-start" element={<HowToStartPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </div>
  )
}

export default App

