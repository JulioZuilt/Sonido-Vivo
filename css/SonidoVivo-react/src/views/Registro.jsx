import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import RegistroFormulario from '../components/RegistroFormulario'
import '../styles/Registro.css'

function Registro() {
  return (
    <>
      <Encabezado />
      <main className="registro-principal">
        <section className="registro-contenedor" aria-labelledby="titulo-registro">
          <h1 id="titulo-registro">Crear cuenta</h1>
          <p>Completa tus datos para registrarte en Sonido Vivo.</p>
          <RegistroFormulario />
        </section>
      </main>
      <PiePagina />
    </>
  )
}

export default Registro