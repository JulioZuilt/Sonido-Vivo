import { obtenerProductosCatalogo } from './catalogo'
import { esUsuarioAutenticado } from './adminAuth'

// Aqui con el fabina hicimos que guardara y actualizara el carrito y el stock en la pagina. Verificamos que haya stock y que el cliente inicio sesion para comprar algo

const STORAGE_CART = 'sonidoVivoCart'
let stockTemporal = {}

const construirStockInicial = () =>
  Object.fromEntries(obtenerProductosCatalogo().map((producto) => [String(producto.id), producto.stock]))

export function obtenerStock() {
  return { ...construirStockInicial(), ...stockTemporal }
}

export function guardarStock(stock) {
  stockTemporal = { ...stock }
}

export function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CART) ?? '{}')
  } catch {
    return {}
  }
}

export function guardarCarrito(carrito) {
  localStorage.setItem(STORAGE_CART, JSON.stringify(carrito))
}

export function obtenerStockProducto(id) {
  return Number(obtenerStock()[String(id)] ?? 0)
}

export function agregarAlCarrito(producto, cantidad = 1) {
  if (!esUsuarioAutenticado()) {
    return { ok: false, requiereInicioSesion: true, mensaje: 'Inicia sesión para agregar productos al carrito.' }
  }

  const carrito = obtenerCarrito()
  const stockActual = obtenerStockProducto(producto.id)

  if (stockActual <= 0) {
    return { ok: false, mensaje: 'No hay stock disponible para este producto.' }
  }

  const itemActual = carrito[String(producto.id)] ?? {
    id: producto.id,
    nombre: producto.nombre,
    imagen: producto.imagen,
    categoria: producto.categoria,
    precio: Number(producto.precio),
    cantidad: 0,
  }

  const nuevaCantidad = itemActual.cantidad + Number(cantidad)

  if (nuevaCantidad > stockActual) {
    return {
      ok: false,
      mensaje: `Solo quedan ${stockActual} unidades disponibles.`,
    }
  }

  carrito[String(producto.id)] = {
    ...itemActual,
    precio: Number(producto.precio),
    cantidad: nuevaCantidad,
  }

  guardarCarrito(carrito)

  return {
    ok: true,
    mensaje: `${producto.nombre} agregado al carrito.`,
  }
}

export function actualizarCantidad(id, cantidad) {
  const carrito = obtenerCarrito()
  const item = carrito[String(id)]

  if (!item) {
    return { ok: false, mensaje: 'Producto no encontrado en el carrito.' }
  }

  const stockActual = obtenerStockProducto(id)

  if (cantidad <= 0) {
    delete carrito[String(id)]
    guardarCarrito(carrito)
    return { ok: true, mensaje: 'Producto eliminado del carrito.' }
  }

  if (cantidad > stockActual) {
    return {
      ok: false,
      mensaje: `Solo quedan ${stockActual} unidades disponibles.`,
    }
  }

  item.cantidad = cantidad
  carrito[String(id)] = item
  guardarCarrito(carrito)

  return { ok: true, mensaje: 'Cantidad actualizada.' }
}

export function comprarCarrito() {
  if (!esUsuarioAutenticado()) {
    return { ok: false, requiereInicioSesion: true, mensaje: 'Inicia sesión para finalizar tu compra.' }
  }

  const carrito = obtenerCarrito()
  const stock = obtenerStock()

  Object.values(carrito).forEach((item) => {
    const id = String(item.id)
    stock[id] = Math.max(0, Number(stock[id] ?? 0) - Number(item.cantidad))
  })

  guardarStock(stock)
  guardarCarrito({})

  return { ok: true, mensaje: 'Compra realizada con éxito.' }
}
