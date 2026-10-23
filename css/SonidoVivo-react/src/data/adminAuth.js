const STORAGE_ADMIN = 'sonidoVivoAdmin'
const STORAGE_USER = 'sonidoVivoUsuario'
export const ADMIN_EMAIL = 'admin@sonidovivo.cl'
const ADMIN_PASSWORD = 'admin@123'

export function iniciarSesionAdmin(correo, contrasena) {
  const valido = correo.trim().toLowerCase() === ADMIN_EMAIL && contrasena === ADMIN_PASSWORD

  if (valido) {
    localStorage.setItem(STORAGE_ADMIN, 'true')
    window.dispatchEvent(new Event('sesion:actualizada'))
  }

  return valido
}

export function esAdmin() {
  return localStorage.getItem(STORAGE_ADMIN) === 'true'
}

export function iniciarSesionUsuario(correo) {
  localStorage.setItem(STORAGE_USER, correo.trim().toLowerCase())
  window.dispatchEvent(new Event('sesion:actualizada'))
}

export function esUsuarioAutenticado() {
  return esAdmin() || Boolean(localStorage.getItem(STORAGE_USER))
}

export function cerrarSesion() {
  localStorage.removeItem(STORAGE_ADMIN)
  localStorage.removeItem(STORAGE_USER)
  window.dispatchEvent(new Event('sesion:actualizada'))
}
