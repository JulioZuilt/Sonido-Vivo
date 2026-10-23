const STORAGE_ACCOUNTS = 'sonidoVivoCuentas'
const ITERACIONES = 120000

//AQUI PONDRE COMENTARIOS GENERALES DEL CODIGO EN SI ;)
// aqui guardamos las cuentas registradas en la pagina, protegemos las contraseñas y permitimos buscar los datos del perfil
// por ejemplo con localStorage.getItem() y JSON.parse() nos permite leer las cuetas que fueron guardadas
// con crypto.getRandomValues() y .subtle.deriveBits() protegemos la contraseña. elegimos esta opcion porque permite proteger las contraseñas sin instalar otras librerias

function obtenerCuentas() {
  const guardado = localStorage.getItem(STORAGE_ACCOUNTS)
  if (!guardado) return []

  const cuentas = JSON.parse(guardado)
  if (!Array.isArray(cuentas)) {
    throw new Error('El registro local de cuentas no tiene un formato válido.')
  }

  return cuentas
}

export function obtenerPerfilCuenta(correo) {
  //con esta normalizamos el correo para buscarlo correctamente
  const email = correo.trim().toLowerCase()
  const cuenta = obtenerCuentas().find((registro) => registro.correo === email)

  if (!cuenta) return null

  const { nombre, apellido, correo: emailCuenta, telefono, fechaNacimiento } = cuenta
  return { nombre, apellido, correo: emailCuenta, telefono, fechaNacimiento }
}

function aHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function derivarContrasena(contrasena, sal) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('El navegador no permite proteger contraseñas en este contexto.')
  }

  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(contrasena),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: sal, iterations: ITERACIONES, hash: 'SHA-256' },
    material,
    256,
  )
  return aHex(new Uint8Array(bits))
}

export async function registrarCuenta({ nombre, apellido, correo, telefono, fechaNacimiento, contrasena }) {
  const cuentas = obtenerCuentas()
  const email = correo.trim().toLowerCase()

  if (cuentas.some((cuenta) => cuenta.correo === email)) {
    throw new Error('Ya existe una cuenta registrada con ese correo.')
  }

  const sal = crypto.getRandomValues(new Uint8Array(16))
  const cuenta = {nombre: nombre.trim(), apellido: apellido.trim(), correo: email, telefono: telefono.trim(), fechaNacimiento, sal: aHex(sal), hashContrasena: await derivarContrasena(contrasena, sal),
  }

  localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify([...cuentas, cuenta]))
}

export async function validarCredencialesCuenta(correo, contrasena) {
  const email = correo.trim().toLowerCase()
  const cuenta = obtenerCuentas().find((registro) => registro.correo === email)
  if (!cuenta) return false

  const sal = Uint8Array.from(cuenta.sal.match(/.{2}/g) ?? [], (byte) => Number.parseInt(byte, 16))
  if (sal.length !== 16 || typeof cuenta.hashContrasena !== 'string') {
    throw new Error('Los datos guardados de esta cuenta no tienen un formato válido.')
  }

  return (await derivarContrasena(contrasena, sal)) === cuenta.hashContrasena
}
