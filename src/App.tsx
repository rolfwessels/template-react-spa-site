
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CharacterExplorer from './pages/CharacterExplorer'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<CharacterExplorer />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App 