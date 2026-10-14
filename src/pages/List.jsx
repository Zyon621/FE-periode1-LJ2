import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { capitalize, padId, spriteUrl } from '../utils'

function List() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const data = await res.json()
        if (cancelled) return
        setPokemons(
          data.results.map((p) => ({
            name: p.name,
            id: p.url.split('/').filter(Boolean).pop(),
          })),
        )
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleChange = (e) => {
    const value = e.target.value
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  const filtered = pokemons.filter((p) =>
    p.name.includes(query.trim().toLowerCase()),
  )

  return (
    <section>
      <h1 className="page-title">Pokédex</h1>

      <div className="search">
        <input
          type="search"
          placeholder="zoek pokémon..."
          aria-label="Zoek Pokémon"
          value={query}
          onChange={handleChange}
        />
      </div>

      {loading && <p className="status">Laden...</p>}
      {error && <p className="status">Kon de Pokémon niet laden: {error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="status">Geen Pokémon gevonden.</p>
      )}

      <ul className="card-grid">
        {filtered.map((p) => (
          <li key={p.id}>
            <Link to={`/detail/${p.id}`} className="card poke-card">
              <img src={spriteUrl(p.id)} alt="" width="96" height="96" loading="lazy" />
              <span>{capitalize(p.name)}</span>
              <small>{padId(p.id)}</small>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default List
