import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', number: '01' },
  { to: '/leaderboard', label: 'Leaderboard', number: '02' },
  { to: '/teams', label: 'Teams', number: '03' },
  { to: '/users', label: 'Athletes', number: '04' },
  { to: '/workouts', label: 'Workouts', number: '05' },
]

function App() {
  return (
    <div className="tracker-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/activities" aria-label="Octofit home">
          <img src={logo} alt="" className="brand-mark" />
          <span className="brand-name">octofit<span>.</span></span>
        </NavLink>

        <div className="sidebar-label">Workspace</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to={item.to}
              key={item.to}
            >
              <span className="nav-number">{item.number}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          <span>API · port 8000</span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-kicker">TRAINING / TRACKING</div>
          <div className="topbar-date">OCTOFIT TRACKER <span>·</span> LIVE DATA</div>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
        <footer className="page-footer">
          <span>OCTOFIT TRACKER</span>
          <span>Move well. Keep going.</span>
        </footer>
      </main>
    </div>
  )
}

export default App
