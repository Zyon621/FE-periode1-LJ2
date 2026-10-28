import { Link, useNavigate, useParams } from 'react-router-dom'
import { MAX_TEAM, useTeam } from '../context/TeamContext'
import useFetch from '../hooks/useFetch'
import { capitalize, padId, statLabel, statPercent, typeLabel } from '../utils'

function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { team, isInTeam, addToTeam, removeFromTeam } = useTeam()
  const {
    data: pokemon,
    loading,
    error,
  } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  if (loading) return <p className="status">Laden...</p>
  if (error) {
    return (
      <section>
        <p className="status">Pokémon niet gevonden ({error}).</p>
        <Link to="/list" className="back-link">
          <span aria-hidden="true">&lt;</span> Terug naar de pokédex
        </Link>
      </section>
    )
  }

  const inTeam = isInTeam(pokemon.id)
  const teamFull = team.length >= MAX_TEAM
  const types = pokemon.types.map((t) => t.type.name)
  const hp = pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0
  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default

  const handleTeamClick = () => {
    if (inTeam) {
      removeFromTeam(pokemon.id)
    } else {
      addToTeam({
        id: pokemon.id,
        name: pokemon.name,
        types,
        hp,
        sprite: pokemon.sprites.front_default,
      })
      navigate('/team')
    }
  }

  return (
    <section>
      <Link to="/list" className="back-link">
        <span aria-hidden="true">&lt;</span> Pokémon detail
      </Link>

      <div className="detail">
        <div className="detail-image">
          <img src={image} alt={pokemon.name} />
        </div>

        <div className="detail-info">
          <div className="detail-heading">
            <h1>{capitalize(pokemon.name)}</h1>
            <span className="muted">{padId(pokemon.id)}</span>
          </div>

          <ul className="badges">
            {types.map((t) => (
              <li key={t} className="badge">
                {typeLabel(t)}
              </li>
            ))}
          </ul>

          <h2 className="section-label">Statistieken</h2>
          <ul className="stats">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                <span className="stat-name">{statLabel(s.stat.name)}</span>
                <div
                  className="bar"
                  role="meter"
                  aria-valuemin={0}
                  aria-valuemax={255}
                  aria-valuenow={s.base_stat}
                  aria-label={statLabel(s.stat.name)}
                >
                  <div
                    className="bar-fill"
                    style={{ width: `${statPercent(s.base_stat)}%` }}
                  />
                </div>
                <span className="stat-value">{s.base_stat}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="btn btn-primary btn-large"
            onClick={handleTeamClick}
            disabled={!inTeam && teamFull}
          >
            {inTeam
              ? 'Verwijderen uit team'
              : teamFull
                ? 'Team is vol'
                : 'Toevoegen aan team'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Detail
