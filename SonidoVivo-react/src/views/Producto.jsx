import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import { agregarAlCarrito, obtenerStockProducto } from '../data/carrito'
import { obtenerProductosCatalogo } from '../data/catalogo'
import { esUsuarioAutenticado } from '../data/adminAuth'
import { productos as descuentos } from '../data/productos'
import '../styles/Producto.css'

function Producto() {
  const location = useLocation()
  const navigate = useNavigate()
  const parametros = new URLSearchParams(location.search)
  const id = parametros.get('producto') ?? parametros.get('id')
  const [productos, setProductos] = useState(obtenerProductosCatalogo)
  const [estadoProducto, setEstadoProducto] = useState({ id, cantidad: 1, mensaje: '' })
  const cantidad = estadoProducto.id === id ? estadoProducto.cantidad : 1
  const mensaje = estadoProducto.id === id ? estadoProducto.mensaje : ''

  useEffect(() => {
    const actualizarCatalogo = () => setProductos(obtenerProductosCatalogo())
    window.addEventListener('catalogo:actualizado', actualizarCatalogo)
    return () => window.removeEventListener('catalogo:actualizado', actualizarCatalogo)
  }, [])

  const producto = productos.find((item) => String(item.id) === String(id))
  const oferta = descuentos.find((item) => String(item.productoId) === String(id))
  const precio = oferta?.precioOferta ?? producto?.precio
  const stock = producto ? obtenerStockProducto(producto.id) : 0

  const agregar = () => {
    if (!producto) return
    if (!esUsuarioAutenticado()) {
      navigate('/login', {
        state: { from: `${location.pathname}${location.search}` },
      })
      return
    }

    const resultado = agregarAlCarrito({ ...producto, precio }, cantidad)
    setEstadoProducto({ id, cantidad, mensaje: resultado.mensaje })
    if (resultado.ok) {
      window.dispatchEvent(new Event('carrito:actualizado'))
    }
  }

  return (
    <>
      <Encabezado />
      {producto ? (
        <main className="detalle-producto">
          <Link className="btn-volver" to="/productos">Volver a productos</Link>
          <section className="detalle-contenido">
            <img className="detalle-imagen" src={producto.imagen} alt={producto.nombre} />
            <div>
              <h1>{producto.nombre}</h1>
              <p>{producto.descripcion}</p>
              {oferta && (
                <p className="precio-anterior">
                  Precio normal: ${Number(producto.precio).toLocaleString('es-CL')}
                </p>
              )}
              <p className="detalle-precio">${Number(precio).toLocaleString('es-CL')}</p>
              <p className="stock-info">{stock > 0 ? `Stock disponible: ${stock}` : 'Sin stock disponible'}</p>
              <div className="cantidad">
                <button
                  type="button"
                  aria-label="Disminuir cantidad"
                  onClick={() => setEstadoProducto({
                    id,
                    cantidad: Math.max(1, cantidad - 1),
                    mensaje,
                  })}
                >
                  -
                </button>
                <span>{cantidad}</span>
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  disabled={cantidad >= stock}
                  onClick={() => setEstadoProducto({
                    id,
                    cantidad: Math.min(stock, cantidad + 1),
                    mensaje,
                  })}
                >
                  +
                </button>
              </div>
              <button type="button" className="btn-carrito" disabled={stock < 1} onClick={agregar}>
                Agregar al carrito
              </button>
              <p className={`mensaje-carrito${mensaje ? ' visible' : ''}`} role="status">{mensaje}</p>
            </div>
          </section>
        </main>
      ) : (
        <main className="detalle-producto">
          <h1>Producto no encontrado</h1>
          <Link to="/productos">Volver al catálogo</Link>
        </main>
      )}
      <PiePagina />
    </>
  )
}

export default Producto