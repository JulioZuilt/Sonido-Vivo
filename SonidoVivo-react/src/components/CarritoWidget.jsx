import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerCarrito } from '../data/carrito'

function CarritoWidget() {
  const [cantidad, setCantidad] = useState(0)

  useEffect(() => {
    const actualizar = () => {
      const carrito = obtenerCarrito()
      const total = Object.values(carrito).reduce((sum, item) => sum + Number(item.cantidad || 0), 0)
      setCantidad(total)
    }
    actualizar()
    window.addEventListener('carrito:actualizado', actualizar)

    return () => {
      window.removeEventListener('carrito:actualizado', actualizar)
    }
  }, [])
  return (
    <Link to="/carrito" className="nav-item">
      Mi carrito ({cantidad})
    </Link>
  )
}

export default CarritoWidget
