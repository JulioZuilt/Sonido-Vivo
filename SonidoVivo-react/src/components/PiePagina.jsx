import logo from '../assets/img/Logo.png'

function PiePagina() {
  return (
    <footer className="pie-pagina">
      <div className="contenedor-footer">
        <div className="columna-footer info-principal">
          <a href="./" className="logo-footer">
            <img src={logo} alt="Sonido Vivo Logo" />
          </a>
          <p>📍 Arlegui 456, Viña del Mar, Chile</p>
          <p>📞 +56 9 3221 2345</p>
          <p>✉️ contacto@sonidovivo.cl</p>
        </div>

        <div className="columna-footer">
          <h4>NAVEGACIÓN</h4>
          <ul>
            <li><a href="./">Inicio</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-abajo">
        <p>&copy; 2026 Sonido Vivo - Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default PiePagina