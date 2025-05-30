
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CharacterExplorer from './pages/CharacterExplorer'
import CharacterDetail from './pages/CharacterDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen ">
        <Routes>
          <Route path="/" element={<CharacterExplorer />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App 