import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import { TeamProvider } from './context/TeamContext'
import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import Team from './pages/Team'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <TeamProvider>
        <div className="app">
          <Navigation />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </main>
        </div>
      </TeamProvider>
    </BrowserRouter>
  )
}

export default App
