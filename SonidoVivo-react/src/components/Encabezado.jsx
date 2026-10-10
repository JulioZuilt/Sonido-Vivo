import instagram from '../assets/img/Instagram.png'
import logo from '../assets/img/Logo.png'
import whatsapp from '../assets/img/Whatsapp.png'

function Encabezado() {
  return (
    <header className="encabezado-principal">
      <div className="header-arriba">
        <div className="contacto-rapido">
          <span>📍 Viña del Mar, Chile</span>
          <span>📞 +56 9 3221 2345</span>
        </div>
        <div className="redes-sociales">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <img src={instagram} alt="Instagram" className="icono-red" />
          </a>
          <a href="https://wa.me/56932212345" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <img src={whatsapp} alt="WhatsApp" className="icono-red" />
          </a>
        </div>
      </div>

      <hr className="divisor-header" />

      <div className="header-medio">
        <a href="/" className="logo-link">
          <img src={logo} alt="Sonido Vivo Logo" className="logo-img" />
          <span className="nombre-tienda">SONIDO VIVO</span>
        </a>

        <div className="acciones">
          <a href="../login.html" className="btn-login">Iniciar Sesión</a>
        </div>
      </div>

      <hr className="divisor-header" />

      <nav className="header-bajo" aria-label="Navegación principal">
        <ul className="nav-links">
          <li className="menu-desplegable">
            <a href="../productos.html" className="nav-item">Ver Categorías</a>
            <ul className="sub-menu">
              <li><a href="../productos.html#guitarras">Guitarras</a></li>
              <li><a href="../productos.html#bajos">Bajos</a></li>
              <li><a href="../productos.html#ukeleles">Ukeleles</a></li>
              <li><a href="../productos.html#amplificadores">Amplificadores</a></li>
              <li><a href="../productos.html#baterias">Baterías</a></li>
              <li><a href="../productos.html#pianos">Pianos y Teclados</a></li>
              <li><a href="../productos.html#vientos">Vientos</a></li>
              <li><a href="../productos.html#estudio">Estudio</a></li>
            </ul>
          </li>
          <li><a href="/mega-descuento" className="nav-item destacado">Mega Descuentos</a></li>
          <li><a href="../marcas.html" className="nav-item">Marcas</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Encabezado