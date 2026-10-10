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
      <a href={`./producto.html?producto=${productoId}&oferta=${precioOferta}`} className="btn-detalle">
        Ver producto
      </a>
    </article>
  )
}

export default TarjetaDescuento
