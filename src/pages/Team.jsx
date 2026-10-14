import { Link } from 'react-router-dom'
import { MAX_TEAM, useTeam } from '../context/TeamContext'
import { capitalize, statPercent, typeLabel } from '../utils'

function Team() {
  const { team, removeFromTeam } = useTeam()

  return (
    <section>
      <header className="page-header">
        <h1 className="page-title">Mijn team</h1>
        <span className="muted">
          {team.length} / {MAX_TEAM} pokémon
        </span>
      </header>

      <ul className="card-grid team-grid">
        {team.map((p) => (
          <li key={p.id} className="card team-card">
            <Link to={`/detail/${p.id}`} className="team-card-link">
              <img src={p.sprite} alt="" width="96" height="96" />
              <h2>{capitalize(p.name)}</h2>
            </Link>
            <ul className="badges">
              {p.types.map((t) => (
                <li key={t} className="badge">
                  {typeLabel(t)}
                </li>
              ))}
            </ul>
            <div className="hp-row">
              <span className="muted">HP</span>
              <div className="bar" role="meter" aria-valuemin={0} aria-valuemax={255} aria-valuenow={p.hp} aria-label="HP">
                <div className="bar-fill" style={{ width: `${statPercent(p.hp)}%` }} />
              </div>
            </div>
            <button
              type="button"
              className="link-button"
              onClick={() => removeFromTeam(p.id)}
            >
              Verwijderen
            </button>
          </li>
        ))}

        {team.length < MAX_TEAM && (
          <li>
            <Link to="/list" className="card empty-slot">
              <span className="plus" aria-hidden="true">+</span>
              <span className="muted">Lege plek</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}

export default Team
