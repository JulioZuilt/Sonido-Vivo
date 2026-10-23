import { Navigate, useNavigate } from 'react-router-dom'
import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import { ADMIN_EMAIL, cerrarSesion, esAdmin, esUsuarioAutenticado } from '../data/adminAuth'
import { obtenerPerfilCuenta } from '../data/cuentas'
import '../styles/Perfil.css'

function Perfil() {
  const navigate = useNavigate()

  if (!esUsuarioAutenticado()) {
    return <Navigate to="/login" replace />
  }

  const administrador = esAdmin()
  const correoSesion = administrador ? ADMIN_EMAIL : localStorage.getItem('sonidoVivoUsuario')
  const perfil = administrador
    ? { nombre: 'Administrador', apellido: '', correo: ADMIN_EMAIL }
    : obtenerPerfilCuenta(correoSesion)

  if (!perfil) {
    return <Navigate to="/login" replace />
  }

  const cerrarSesionActual = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <>
      <Encabezado />
      <main className="perfil-pagina">
        <section className="perfil-tarjeta" aria-labelledby="titulo-perfil">
          <h1 id="titulo-perfil">Mi perfil</h1>
          <dl className="perfil-datos">
            <div>
              <dt>Nombre</dt>
              <dd>{[perfil.nombre, perfil.apellido].filter(Boolean).join(' ')}</dd>
            </div>
            <div>
              <dt>Correo electrónico</dt>
              <dd>{perfil.correo}</dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>{perfil.telefono ?? 'No disponible'}</dd>
            </div>
            <div>
              <dt>Fecha de nacimiento</dt>
              <dd>{perfil.fechaNacimiento ?? 'No disponible'}</dd>
            </div>
          </dl>
          <button type="button" className="perfil-cerrar-sesion" onClick={cerrarSesionActual}>
            Cerrar sesión
          </button>
        </section>
      </main>
      <PiePagina />
    </>
  )
}

export default Perfil
