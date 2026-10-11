import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import TarjetaDescuento from '../components/TarjetaDescuento'
import { productos } from '../data/productos'
import '../styles/MegaDescuento.css'

function MegaDescuento() {
  return (
    <>
      <Encabezado />

      <main className="catalogo ofertas-page">
        <section id="ofertas" aria-labelledby="titulo-ofertas">
          <h1 id="titulo-ofertas">Mega Descuentos</h1>
          <p className="descripcion-catalogo">
            Aprovecha nuestras promociones especiales en instrumentos y equipos musicales.
          </p>

          <div className="ofertas-grid">
            {productos.map((producto) => (
              <TarjetaDescuento key={producto.id} oferta={producto} />
            ))}
          </div>
        </section>
      </main>

      <PiePagina />
    </>
  )
}

export default MegaDescuento