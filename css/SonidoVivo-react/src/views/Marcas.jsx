import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import { marcas } from '../data/marcas'
import '../styles/Marcas.css'

function Marcas() {
  return (
    <>
      <Encabezado />

      <main>
        <h1 className="letra-marcas">MARCAS CON LAS QUE TRABAJAMOS</h1>
        <hr className="divisor-marcas" />

        <section className="seccion-marcas" aria-label="Marcas disponibles">
          <div className="grid-marcas">
            {marcas.map(({ nombre, imagen, cantidad }) => (
              <article className="tarjeta-marca" key={nombre}>
                <div className="contenedor-logo-marca">
                  <img src={imagen} alt={`Logo de ${nombre}`} />
                </div>
                <h2>{nombre}</h2>
                <span className="cantidad-productos">{cantidad} productos</span>
              </article>
            ))}
          </div>
        </section>

        <section className="info-marcas" aria-labelledby="titulo-info-marcas">
          <h2 id="titulo-info-marcas">Respaldo y Calidad Garantizada</h2>
          <p>
            En <strong>Sonido Vivo</strong> trabajamos directamente con los distribuidores oficiales de las marcas
            más destacadas del mundo de la música. Cada instrumento y accesorio cuenta con{' '}
            <strong>garantía de fábrica</strong> y el sello de autenticidad que necesitas para sonar con total confianza.
          </p>
        </section>

        <section className="seccion-video" aria-label="Marcas de Sonido Vivo">
          <video autoPlay loop muted playsInline className="video-destacado">
            <source src="/video/Video_marca.mp4" type="video/mp4" />
            Tu navegador no soporta el formato de video.
          </video>
        </section>
      </main>

      <PiePagina />
    </>
  )
}

export default Marcas