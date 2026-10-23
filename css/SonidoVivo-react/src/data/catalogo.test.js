import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('Catálogo temporal', () => {
  let catalogo

  beforeEach(async () => {
    vi.resetModules()
    catalogo = await import('./catalogo')
  })

  it('muestra los productos iniciales', () => {

    const productos = catalogo.obtenerProductosCatalogo()

    expect(productos).toHaveLength(16)
  })

  it('agrega y elimina un producto temporal', () => {
    const producto = {
      id: catalogo.obtenerSiguienteIdProducto(),
      nombre: 'Producto de prueba',
      categoria: 'estudio',
      descripcion: 'Producto temporal',
      precio: 10000,
      stock: 2,
      imagen: catalogo.productosCatalogo[0].imagen,
    }

    catalogo.guardarProductosCatalogo([producto])
    const agregado = catalogo.obtenerProductosCatalogo().some((item) => item.id === producto.id)
    catalogo.eliminarProductoCatalogo(producto.id)
    const eliminado = catalogo.obtenerProductosCatalogo().some((item) => item.id === producto.id)

    expect(agregado).toBe(true)
    expect(eliminado).toBe(false)
  })
})
