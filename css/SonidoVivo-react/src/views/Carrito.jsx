import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import { esUsuarioAutenticado } from '../data/adminAuth'
import { comprarCarrito, obtenerCarrito, actualizarCantidad } from '../data/carrito'
import '../styles/Carrito.css'

function Carrito() {
  const location = useLocation()
  const navigate = useNavigate()
  const [carrito, setCarrito] = useState(obtenerCarrito)

  const cargarCarrito = () => {
    setCarrito(obtenerCarrito())
  }

  const items = useMemo(() => Object.values(carrito), [carrito])
  const total = items.reduce((sum, item) => sum + Number(item.precio) * Number(item.cantidad), 0)

  const cambiarCantidad = (id, nuevaCantidad) => {
    const resultado = actualizarCantidad(id, nuevaCantidad)

    if (resultado.ok) {
      cargarCarrito()
      window.dispatchEvent(new Event('carrito:actualizado'))
    }
  }

  const finalizarCompra = () => {
    if (!esUsuarioAutenticado()) {
      navigate('/login', {
        state: { from: `${location.pathname}${location.search}` },
      })
      return
    }

    const resultado = comprarCarrito()

    if (resultado.ok) {
      cargarCarrito()
      window.dispatchEvent(new Event('carrito:actualizado'))
      alert(resultado.mensaje)
    }
  }

  return (
    <div className="carrito-pagina">
      <Encabezado />

      <main className="carrito-page">
        <h1>Mi carrito</h1>

        {items.length === 0 ? (
          <div className="carrito-vacio">
            <p>No tienes productos en tu carrito.</p>
          </div>
        ) : (
          <div className="carrito-layout">
            <div className="carrito-lista">
              {items.map((item) => (
                <article key={item.id} className="carrito-item">
                  <img src={item.imagen} alt={item.nombre} />

                  <div className="carrito-info">
                    <h2>{item.nombre}</h2>
                    <p>{item.categoria}</p>
                    <strong>${Number(item.precio).toLocaleString('es-CL')}</strong>
                  </div>

                  <div className="carrito-controles">
                    <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>-</button>
                    <span>{item.cantidad}</span>
                    <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>+</button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="carrito-resumen">
              <h2>Resumen</h2>
              <div className="resumen-row">
                <span>Subtotal</span>
                <strong>${total.toLocaleString('es-CL')}</strong>
              </div>
              <button type="button" className="btn-comprar" onClick={finalizarCompra}>
                Comprar ahora
              </button>
            </aside>
          </div>
        )}
      </main>

      <PiePagina />
    </div>
  )
}

export default Carrito
