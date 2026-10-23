import banner from '../assets/img/Sonido.png'
import guitarra from '../assets/img/Guitarra.png'
import bajo from '../assets/img/Bajo.png'
import ukelele from '../assets/img/Ukelele.png'
import amplificador from '../assets/img/Amplificador.png'
import baterias from '../assets/img/Baterias.png'
import pianos from '../assets/img/Pianos.png'
import vientos from '../assets/img/Vientos.png'
import estudio from '../assets/img/Estudio.png'
import '../styles/Inicio.css'

const beneficios = [
  {
    icono: '💳',
    titulo: 'Paga hasta en 12 pagos',
    descripcion: 'Ver promociones en WebPay.',
  },
  {
    icono: '🚚',
    titulo: 'Envíos a todo Chile',
    descripcion: 'Gratis en compras desde $100.000.-',
  },
  {
    icono: '⭐',
    titulo: 'Garantía exclusiva',
    descripcion: 'Devuelve tu compra sin trabas.',
  },
]

const categorias = [
  { nombre: 'Guitarras', imagen: guitarra },
  { nombre: 'Bajos', imagen: bajo },
  { nombre: 'Ukeleles', imagen: ukelele },
  { nombre: 'Amplificadores', imagen: amplificador },
  { nombre: 'Baterías', imagen: baterias },
  { nombre: 'Pianos y teclados', imagen: pianos },
  { nombre: 'Vientos', imagen: vientos },
  { nombre: 'Estudio', imagen: estudio },
]

function ContenidoInicio() {
  return (
    <main>
      <section className="contenedor-principal banner">
        <img src={banner} alt="Banner principal de Sonido Vivo" className="banner-img" />
      </section>

      <section className="beneficios" aria-label="Beneficios de compra">
        {beneficios.map(({ icono, titulo, descripcion }) => (
          <article className="tarjeta-beneficio" key={titulo}>
            <span className="icono-beneficio" aria-hidden="true">{icono}</span>
            <div className="texto-beneficio">
              <strong>{titulo}</strong>
              <p>{descripcion}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="categorias" aria-labelledby="titulo-categorias">
        <h2 id="titulo-categorias" className="titulo-seccion">
          Nuestras <span>Categorías</span>
        </h2>
        <div className="img-categorias">
          {categorias.map(({ nombre, imagen }) => (
            <article className="tarjeta-categoria" key={nombre}>
              <img src={imagen} alt="" />
              <span>{nombre}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="seccion-video" aria-label="Conoce Sonido Vivo">
        <video autoPlay loop muted playsInline className="video-destacado">
          <source src="/video/Video_banner.mp4" type="video/mp4" />
          Tu navegador no soporta el formato de video.
        </video>
      </section>

      <section className="seccion-historia" aria-labelledby="titulo-historia">
        <h2 id="titulo-historia">
          Sobre <span>Sonido Vivo</span>
        </h2>
        <p>
          Con más de <strong>11 años de trayectoria</strong> en Viña del Mar, somos especialistas en la venta de
          instrumentos musicales, equipos de sonido y accesorios. Ofrecemos las mejores marcas del mercado
          junto con un servicio técnico especializado en la Quinta Región.
        </p>
      </section>
    </main>
  )
}

export default ContenidoInicio
