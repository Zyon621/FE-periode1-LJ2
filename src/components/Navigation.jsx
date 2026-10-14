import { NavLink, useLocation } from 'react-router-dom'

function Pokeball() {
  return (
    <svg className="pokeball" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#333" strokeWidth="1.5" />
      <path d="M1.5 12a10.5 10.5 0 0 1 21 0z" fill="#dc2626" stroke="#333" strokeWidth="1.5" />
      <line x1="1.5" y1="12" x2="22.5" y2="12" stroke="#333" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" fill="#fff" stroke="#333" strokeWidth="1.5" />
    </svg>
  )
}

function Navigation() {
  const { pathname } = useLocation()
  const pokedexActive = pathname.startsWith('/list') || pathname.startsWith('/detail')

  return (
    <nav className="sidebar" aria-label="Hoofdmenu">
      <div className="sidebar-brand">
        <Pokeball />
        <span>Team Manager</span>
      </div>
      <ul>
        <li>
          <NavLink to="/" end className="nav-link">
            <span className="nav-dot" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/list"
            className={() => `nav-link${pokedexActive ? ' active' : ''}`}
          >
            <span className="nav-dot" />
            Pokédex
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" className="nav-link">
            <span className="nav-dot" />
            Team
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
