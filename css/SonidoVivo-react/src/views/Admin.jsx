import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AdminGestionCatalogo from '../components/AdminGestionCatalogo'
import Encabezado from '../components/Encabezado'
import PiePagina from '../components/PiePagina'
import { esAdmin } from '../data/adminAuth'
import {
  categorias,
  eliminarProductoCatalogo,
  guardarProductosCatalogo,
  obtenerProductosCatalogo,
  obtenerSiguienteIdProducto,
  productosCatalogo,
} from '../data/catalogo'
import { guardarCarrito, guardarStock, obtenerCarrito, obtenerStock } from '../data/carrito'
import '../styles/Admin.css'

const formularioInicial = {
  nombre: '',
  categoria: categorias[1].value,
  descripcion: '',
  precio: '',
  stock: '',
}

function Admin() {
  const [catalogo, setCatalogo] = useState(obtenerProductosCatalogo)
  const [stock, setStock] = useState(obtenerStock)
  const [formulario, setFormulario] = useState(formularioInicial)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  if (!esAdmin()) {
    return <Navigate to="/login" replace />
  }

  const cambiarFormulario = (event) => {
    const { name, value } = event.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
  }

  const manejarAgregarProducto = (event) => {
    event.preventDefault()
    setMensaje('')
    setError('')

    const precio = Number(formulario.precio)
    const cantidadStock = Number(formulario.stock)
    if (!formulario.nombre.trim() || !formulario.descripcion.trim() || precio <= 0 || cantidadStock < 0) {
      setError('Completa todos los campos con valores válidos.')
      return
    }

    try {
      const id = obtenerSiguienteIdProducto()
      const imagen = catalogo.find((producto) => producto.categoria === formulario.categoria)?.imagen
        ?? productosCatalogo[0].imagen
      const nuevoProducto = {
        id,
        categoria: formulario.categoria,
        nombre: formulario.nombre.trim(),
        descripcion: formulario.descripcion.trim(),
        precio,
        stock: cantidadStock,
        imagen,
      }
      const catalogoActualizado = [...catalogo, nuevoProducto]
      const productosNuevos = catalogoActualizado.filter(
        (producto) => !productosCatalogo.some((inicial) => inicial.id === producto.id),
      )

      guardarProductosCatalogo(productosNuevos)
      const stockActualizado = { ...obtenerStock(), [String(id)]: cantidadStock }
      guardarStock(stockActualizado)
      window.dispatchEvent(new Event('catalogo:actualizado'))
      setCatalogo(catalogoActualizado)
      setStock(stockActualizado)
      setFormulario(formularioInicial)
      setMensaje('Producto agregado al catálogo.')
    } catch (cause) {
      setError(`No se pudo agregar el producto: ${cause.message}`)
    }
  }

  const manejarCambioStock = (id, valor) => {
    setStock((actual) => ({ ...actual, [String(id)]: valor }))
    setMensaje('')
    setError('')
  }

  const manejarEliminarProducto = (producto) => {
    const confirmar = window.confirm(`¿Quieres eliminar "${producto.nombre}" del catálogo?`)
    if (!confirmar) return

    setMensaje('')
    setError('')

    try {
      eliminarProductoCatalogo(producto.id)

      const stockActualizado = obtenerStock()
      delete stockActualizado[String(producto.id)]
      guardarStock(stockActualizado)

      const carritoActualizado = obtenerCarrito()
      delete carritoActualizado[String(producto.id)]
      guardarCarrito(carritoActualizado)

      setCatalogo(obtenerProductosCatalogo())
      setStock((actual) => {
        const stockRestante = { ...actual }
        delete stockRestante[String(producto.id)]
        return stockRestante
      })
      window.dispatchEvent(new Event('catalogo:actualizado'))
      window.dispatchEvent(new Event('carrito:actualizado'))
      setMensaje(`Se eliminó "${producto.nombre}" del catálogo.`)
    } catch (cause) {
      setError(`No se pudo eliminar el producto: ${cause.message}`)
    }
  }

  const manejarGuardarStock = (event) => {
    event.preventDefault()
    setMensaje('')
    setError('')

    const stockValido = Object.values(stock).every((cantidad) =>
      Number.isInteger(Number(cantidad)) && Number(cantidad) >= 0,
    )
    if (!stockValido) {
      setError('El stock debe ser un número entero igual o mayor que cero.')
      return
    }

    try {
      const stockActualizado = Object.fromEntries(
        Object.entries(stock).map(([id, cantidad]) => [id, Number(cantidad)]),
      )
      guardarStock(stockActualizado)
      window.dispatchEvent(new Event('catalogo:actualizado'))
      setStock(stockActualizado)
      setMensaje('Stock actualizado correctamente.')
    } catch (cause) {
      setError(`No se pudo guardar el stock: ${cause.message}`)
    }
  }

  return (
    <>
      <Encabezado />

      <main className="panel-admin">
        <header className="panel-admin-encabezado">
          <div>
            <h1>Administrar catálogo y stock</h1>
            <p>Los cambios son temporales y se reinician al recargar la página.</p>
          </div>
        </header>

        <AdminGestionCatalogo
          formulario={formulario}
          catalogo={catalogo}
          stock={stock}
          onChangeFormulario={cambiarFormulario}
          onAgregarProducto={manejarAgregarProducto}
          onChangeStock={manejarCambioStock}
          onGuardarStock={manejarGuardarStock}
          onEliminarProducto={manejarEliminarProducto}
        />

        {error && <p className="admin-mensaje admin-error" role="alert">{error}</p>}
        {mensaje && <p className="admin-mensaje" role="status">{mensaje}</p>}
      </main>

      <PiePagina />
    </>
  )
}

export default Admin
