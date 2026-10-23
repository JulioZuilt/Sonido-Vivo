import { Link } from 'react-router-dom'
import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import '../styles/NotFound.css'

function NotFound() {
  return (
    <>
      <Encabezado />
      <main className="pagina-not-found">
        <h1>404 Not Found</h1>
        <p>La página que buscas no existe.</p>
        <Link to="/">Volver al inicio</Link>
      </main>
      <PiePagina />
    </>
  )
}

export default NotFound
