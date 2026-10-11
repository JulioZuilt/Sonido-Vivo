import instagram from '../assets/img/Instagram.png'
import logo from '../assets/img/Logo.png'
import whatsapp from '../assets/img/Whatsapp.png'
import { itemsMenu } from '../data/itemsMenu'

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
          {itemsMenu.map(({ label, to, destacado, subItems }) => (
            <li className={subItems ? 'menu-desplegable' : undefined} key={label}>
              <a href={to} className={`nav-item${destacado ? ' destacado' : ''}`}>
                {label}
              </a>
              {subItems && (
                <ul className="sub-menu">
                  {subItems.map((item) => (
                    <li key={item.label}>
                      <a href={item.to}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Encabezado