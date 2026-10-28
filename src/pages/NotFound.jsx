import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section>
      <h1 className="page-title">Pagina niet gevonden</h1>
      <p className="intro">Deze pagina bestaat niet.</p>
      <Link to="/" className="btn btn-primary">
        Naar home
      </Link>
    </section>
  )
}

export default NotFound
