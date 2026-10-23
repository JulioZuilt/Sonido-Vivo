import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import { categorias, obtenerProductosCatalogo } from '../data/catalogo'
import { obtenerStockProducto } from '../data/carrito'
import '../styles/Productos.css'

function categoriaDesdeHash(hash) {
  const categoria = hash.replace('#', '')
  return categorias.some((item) => item.value === categoria) ? categoria : 'todos'
}

function Productos() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const [productos, setProductos] = useState(obtenerProductosCatalogo)
  const filtro = categoriaDesdeHash(hash)

  useEffect(() => {
    const actualizarCatalogo = () => setProductos(obtenerProductosCatalogo())
    window.addEventListener('catalogo:actualizado', actualizarCatalogo)
    return () => window.removeEventListener('catalogo:actualizado', actualizarCatalogo)
  }, [])

  const productosFiltrados = productos.filter(
    (producto) => filtro === 'todos' || producto.categoria === filtro,
  )

  return (
    <>
      <Encabezado />
      <main className="catalogo">
        <h1>Productos</h1>
        <p className="descripcion-catalogo">Explora nuestro catálogo de instrumentos y equipos musicales.</p>

        <div className="filtros" aria-label="Filtrar productos por categoría">
          {categorias.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={`filtro${filtro === value ? ' activo' : ''}`}
              aria-pressed={filtro === value}
              onClick={() => navigate(value === 'todos' ? '/productos' : `/productos#${value}`)}
            >
              {label}
            </button>
          ))}
        </div>

        {productosFiltrados.length === 0 ? (
          <p className="mensaje-filtro">No hay productos en esta categoría.</p>
        ) : (
          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
              <article className="producto-card" key={producto.id}>
                <img src={producto.imagen} alt={producto.nombre} />
                <h2>{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <p className="precio-producto">${Number(producto.precio).toLocaleString('es-CL')}</p>
                <p className="stock-info">
                  {obtenerStockProducto(producto.id) > 0
                    ? `Stock: ${obtenerStockProducto(producto.id)}`
                    : 'Sin stock'}
                </p>
                <Link className="btn-detalle" to={`/producto?producto=${producto.id}`}>
                  Ver producto
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <PiePagina />
    </>
  )
}

export default Productos