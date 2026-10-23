import { beforeEach, describe, expect, it, vi } from 'vitest'
import { esUsuarioAutenticado } from './adminAuth'
import { productosCatalogo } from './catalogo'
import {
  actualizarCantidad,
  agregarAlCarrito,
  comprarCarrito,
  guardarCarrito,
  guardarStock,
  obtenerCarrito,
  obtenerStockProducto,
} from './carrito'

vi.mock('./adminAuth', () => ({
  esUsuarioAutenticado: vi.fn(),
}))

const producto = productosCatalogo[0]
const stockInicial = Object.fromEntries(productosCatalogo.map((item) => [String(item.id), item.stock]))

describe('Carrito y compra', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    esUsuarioAutenticado.mockReturnValue(false)
    guardarStock(stockInicial)
    guardarCarrito({})
  })

  it('no permite agregar al carrito sin iniciar sesión', () => {
    // Arrange
    esUsuarioAutenticado.mockReturnValue(false)

    // Act
    const resultado = agregarAlCarrito(producto, 1)

    // Assert
    expect(resultado.requiereInicioSesion).toBe(true)
    expect(obtenerCarrito()).toEqual({})
  })

  it('no permite agregar una cantidad mayor al stock', () => {
    // Arrange
    esUsuarioAutenticado.mockReturnValue(true)

    // Act
    const resultado = agregarAlCarrito(producto, producto.stock + 1)

    // Assert
    expect(resultado.ok).toBe(false)
    expect(obtenerCarrito()).toEqual({})
  })

  it('no permite agregar productos sin stock', () => {
    // Arrange
    esUsuarioAutenticado.mockReturnValue(true)
    guardarStock({ ...stockInicial, [String(producto.id)]: 0 })

    // Act
    const resultado = agregarAlCarrito(producto, 1)

    // Assert
    expect(resultado.ok).toBe(false)
    expect(resultado.mensaje).toMatch(/No hay stock/)
  })

  it('actualiza la cantidad de un producto en el carrito', () => {
    // Arrange
    esUsuarioAutenticado.mockReturnValue(true)
    agregarAlCarrito(producto, 1)

    // Act
    const resultado = actualizarCantidad(producto.id, 3)

    // Assert
    expect(resultado.ok).toBe(true)
    expect(obtenerCarrito()[String(producto.id)].cantidad).toBe(3)
  })

  it('elimina un producto cuando su cantidad llega a cero', () => {
    // Arrange
    esUsuarioAutenticado.mockReturnValue(true)
    agregarAlCarrito(producto, 1)

    // Act
    const resultado = actualizarCantidad(producto.id, 0)

    // Assert
    expect(resultado.ok).toBe(true)
    expect(obtenerCarrito()).toEqual({})
  })

  it('no permite comprar sin iniciar sesión', () => {
    // Arrange
    guardarCarrito({ [String(producto.id)]: { ...producto, cantidad: 1 } })

    // Act
    const resultado = comprarCarrito()

    // Assert
    expect(resultado.requiereInicioSesion).toBe(true)
    expect(obtenerCarrito()).not.toEqual({})
  })

  it('al comprar descuenta stock y vacía el carrito', () => {
    // Arrange
    esUsuarioAutenticado.mockReturnValue(true)
    agregarAlCarrito(producto, 2)

    // Act
    const resultado = comprarCarrito()

    // Assert
    expect(resultado.ok).toBe(true)
    expect(obtenerStockProducto(producto.id)).toBe(producto.stock - 2)
    expect(obtenerCarrito()).toEqual({})
  })
})
