import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instagram from '../assets/img/Instagram.png'
import logo from '../assets/img/Logo.png'
import whatsapp from '../assets/img/Whatsapp.png'
import CarritoWidget from './CarritoWidget'
import { itemsMenu } from '../data/itemsMenu'
import { esAdmin, esUsuarioAutenticado } from '../data/adminAuth'

function Encabezado() {
  const [sesion, setSesion] = useState(() => ({
    administrador: esAdmin(),
    autenticado: esUsuarioAutenticado(),
  }))

  useEffect(() => {
    const actualizarSesion = () => {
      setSesion({
        administrador: esAdmin(),
        autenticado: esUsuarioAutenticado(),
      })
    }

    window.addEventListener('sesion:actualizada', actualizarSesion)
    return () => window.removeEventListener('sesion:actualizada', actualizarSesion)
  }, [])

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
        <Link to="/" className="logo-link">
          <img src={logo} alt="Sonido Vivo Logo" className="logo-img" />
          <span className="nombre-tienda">SONIDO VIVO</span>
        </Link>

        <div className="acciones">
          {sesion.autenticado ? (
            <>
              {sesion.administrador && (
                <Link to="/admin" className="btn-login btn-header-accion">Panel de administración</Link>
              )}
              <Link to="/perfil" className="btn-login btn-header-accion">Mi perfil</Link>
            </>
          ) : (
            <Link to="/login" className="btn-login btn-header-accion">Iniciar Sesión</Link>
          )}
        </div>
      </div>

      <hr className="divisor-header" />

      <nav className="header-bajo" aria-label="Navegación principal">
        <ul className="nav-links">
          {itemsMenu.map(({ label, to, destacado, subItems }) => (
            <li className={subItems ? 'menu-desplegable' : undefined} key={label}>
              <Link to={to} className={`nav-item${destacado ? ' destacado' : ''}`}>
                {label}
              </Link>
              {subItems && (
                <ul className="sub-menu">
                  {subItems.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <CarritoWidget />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Encabezado