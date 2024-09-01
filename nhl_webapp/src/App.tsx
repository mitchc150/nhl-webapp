import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/navBar.tsx'
import Games from './pages/games.tsx'
import Teams from './pages/teams.tsx'
import Players from './pages/players.tsx'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/games" element={<Games />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
      </Routes>
    </Router>
  )
}

export default App
