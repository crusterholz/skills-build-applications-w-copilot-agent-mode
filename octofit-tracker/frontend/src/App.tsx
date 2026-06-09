import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl, codespaceName, codespaceSource } from './api'

function App() {
  const envHint = codespaceName
    ? `Using Codespaces API host from ${codespaceSource}.`
    : `No Codespaces host configured; using localhost API fallback.`

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          This app detects the Codespaces API host from environment and falls back to localhost when needed.
          {` `}
          {envHint}
        </p>
        <div className="alert alert-info">
          API base URL: <strong>{apiBaseUrl}</strong>
        </div>
        <nav className="nav nav-pills flex-column flex-sm-row gap-2">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
