import { Link } from 'react-router-dom'

function TarjetaDescuento({ oferta }) {
  const { descuento, imagen, nombre, descripcion, precioAnterior, precioOferta, precioActual, productoId } = oferta

  return (
    <article className="oferta-card">
      <span className="etiqueta-descuento">{descuento}</span>
      <img src={imagen} alt={nombre} />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p className="precio-anterior">{precioAnterior}</p>
      <p className="precio-producto">{precioActual}</p>
      <Link to={`/producto?producto=${productoId}&oferta=${precioOferta}`} className="btn-detalle">
        Ver producto
      </Link>
    </article>
  )
}

export default TarjetaDescuento
