import Encabezado from '../components/Encabezado'
import LoginFormulario from '../components/LoginFormulario'
import PiePagina from '../components/PiePagina'
import '../styles/Login.css'

function Login() {
  return (
    <>
      <Encabezado />
      <main className="login-principal">
        <section className="login-contenedor" aria-labelledby="titulo-login">
          <h1 id="titulo-login">Iniciar sesión</h1>
          <LoginFormulario />
        </section>
      </main>
      <PiePagina />
    </>
  )
}

export default Login