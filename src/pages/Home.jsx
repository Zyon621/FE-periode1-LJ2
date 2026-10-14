import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { capitalize, spriteUrl } from '../utils'

const FEATURED = [
  { id: 1, name: 'bulbasaur' },
  { id: 4, name: 'charmander' },
  { id: 7, name: 'squirtle' },
  { id: 25, name: 'pikachu' },
  { id: 150, name: 'mewtwo' },
]

function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/list?q=${encodeURIComponent(q)}` : '/list')
  }

  return (
    <section>
      <h1 className="page-title">Pokédex app</h1>
      <p className="intro">
        Welkom bij de Pokémon Team Manager. Zoek Pokémon, bekijk hun
        statistieken en stel je eigen team van maximaal zes samen.
      </p>

      <form className="search" onSubmit={handleSearch} role="search">
        <input
          type="search"
          placeholder="zoek pokémon..."
          aria-label="Zoek Pokémon"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="button-row">
        <Link to="/list" className="btn btn-primary">
          Bekijk pokédex
        </Link>
        <Link to="/team" className="btn btn-secondary">
          Mijn team
        </Link>
      </div>

      <h2 className="section-label">Uitgelicht</h2>
      <ul className="card-grid featured">
        {FEATURED.map((p) => (
          <li key={p.id}>
            <Link to={`/detail/${p.id}`} className="card poke-card">
              <img src={spriteUrl(p.id)} alt="" width="96" height="96" />
              <span>{capitalize(p.name)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Home
