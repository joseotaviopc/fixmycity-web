import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Issue } from './pages/issue'
import { Sidebar } from './components/sidebar'
import { Home } from './pages/home'
import { Reports } from './pages/reports'
import { Settings } from './pages/settings'

function App() {
  return (
    <Router>
      <main className="bg-slate-300 flex flex-row h-screen">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issue" element={<Issue />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sitemap" element={<Issue />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
