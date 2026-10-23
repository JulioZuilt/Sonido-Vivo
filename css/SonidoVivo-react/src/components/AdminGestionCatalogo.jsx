import { categorias } from '../data/catalogo'

function AdminGestionCatalogo({
  formulario,
  catalogo,
  stock,
  onChangeFormulario,
  onAgregarProducto,
  onChangeStock,
  onGuardarStock,
  onEliminarProducto,
}) {
  return (
    <>
      <section className="admin-seccion" aria-labelledby="titulo-agregar-producto">
        <h2 id="titulo-agregar-producto">Agregar producto</h2>
        <form className="admin-formulario" onSubmit={onAgregarProducto}>
          <label>
            Nombre
            <input name="nombre"
                   value={formulario.nombre}
                   onChange={onChangeFormulario}
                   required
                   maxLength="100"
            />
          </label>
          <label>
            Categoría
            <select name="categoria" value={formulario.categoria} onChange={onChangeFormulario}>
              {categorias.filter(({ value }) => value !== 'todos').map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>))}
            </select>
          </label>
          <label className="admin-campo-completo">
            Descripción
            <textarea name="descripcion"
                      value={formulario.descripcion}
                      onChange={onChangeFormulario}
                      required
                      maxLength="300"
                      rows="3"
            />
          </label>
          <label>
            Precio (CLP)
            <input name="precio"
                   type="number"
                   value={formulario.precio}
                   onChange={onChangeFormulario}
                   min="1"
                   step="1"
                   required
            />
          </label>
          <label>
            Stock inicial
            <input name="stock"
                   type="number"
                   value={formulario.stock}
                   onChange={onChangeFormulario}
                   min="0"
                   step="1"
                   required
            />
          </label>
          <button type="submit" className="admin-accion admin-campo-completo">Agregar al catálogo</button>
        </form>
      </section>

      <section className="admin-seccion" aria-labelledby="titulo-administrar-stock">
        <h2 id="titulo-administrar-stock">Stock por producto</h2>
        <form onSubmit={onGuardarStock}>
          <div className="admin-tabla-contenedor">
            <table className="admin-tabla">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Stock disponible</th>
                </tr>
              </thead>
              <tbody>
                {catalogo.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>
                      {categorias.find(({ value }) => value === producto.categoria)?.label ?? producto.categoria}
                    </td>
                    <td>
                      <div className="admin-stock-controles">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          required
                          aria-label={`Stock de ${producto.nombre}`}
                          value={stock[String(producto.id)] ?? 0}
                          onChange={(event) => onChangeStock(producto.id, event.target.value)}
                        />
                        <button
                          type="button"
                          className="admin-eliminar-producto"
                          aria-label={`Eliminar ${producto.nombre}`}
                          title={`Eliminar ${producto.nombre}`}
                          onClick={() => onEliminarProducto(producto)}
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="submit" className="admin-accion">Guardar cambios de stock</button>
        </form>
      </section>
    </>
  )
}

export default AdminGestionCatalogo
