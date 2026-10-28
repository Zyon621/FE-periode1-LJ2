import { Link, useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { capitalize, padId, spriteUrl } from '../utils'

function List() {
  const { data, loading, error } = useFetch(
    'https://pokeapi.co/api/v2/pokemon?limit=151',
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const pokemons = (data?.results ?? []).map((p) => ({
    name: p.name,
    id: p.url.split('/').filter(Boolean).pop(),
  }))

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
