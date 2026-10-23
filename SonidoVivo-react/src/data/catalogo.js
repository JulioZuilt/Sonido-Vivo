import guitarra from '../assets/img/Guitarra.png'
import bajo from '../assets/img/Bajo.png'
import ukelele from '../assets/img/Ukelele.png'
import amplificador from '../assets/img/Amplificador.png'
import baterias from '../assets/img/Baterias.png'
import pianos from '../assets/img/Pianos.png'
import vientos from '../assets/img/Vientos.png'
import estudio from '../assets/img/Estudio.png'

export const productosCatalogo = [
  {
    id: 0,
    categoria: 'guitarras',
    nombre: 'Guitarra eléctrica clásica',
    descripcion: 'Guitarra cómoda para comenzar a tocar.',
    precio: 189990,
    stock: 10,
    imagen: guitarra,
  },
  {
    id: 1,
    categoria: 'guitarras',
    nombre: 'Guitarra eléctrica Pro',
    descripcion: 'Sonido potente para ensayos y presentaciones.',
    precio: 329990,
    stock: 8,
    imagen: guitarra,
  },
  {
    id: 2,
    categoria: 'bajos',
    nombre: 'Bajo eléctrico 4 cuerdas',
    descripcion: 'Bajo versátil para distintos estilos musicales.',
    precio: 299990,
    stock: 6,
    imagen: bajo,
  },
  {
    id: 3,
    categoria: 'bajos',
    nombre: 'Bajo eléctrico Jazz',
    descripcion: 'Diseño cómodo y sonido definido.',
    precio: 349990,
    stock: 5,
    imagen: bajo,
  },
  {
    id: 4,
    categoria: 'ukeleles',
    nombre: 'Ukelele soprano',
    descripcion: 'Ukelele liviano y fácil de transportar.',
    precio: 59990,
    stock: 12,
    imagen: ukelele,
  },
  {
    id: 5,
    categoria: 'ukeleles',
    nombre: 'Ukelele concierto',
    descripcion: 'Mayor tamaño para un sonido más completo.',
    precio: 79990,
    stock: 7,
    imagen: ukelele,
  },
  {
    id: 6,
    categoria: 'amplificadores',
    nombre: 'Amplificador 20W',
    descripcion: 'Amplificador compacto para práctica en casa.',
    precio: 119990,
    stock: 9,
    imagen: amplificador,
  },
  {
    id: 7,
    categoria: 'amplificadores',
    nombre: 'Amplificador 50W',
    descripcion: 'Más potencia para ensayos y salas pequeñas.',
    precio: 219990,
    stock: 4,
    imagen: amplificador,
  },
  {
    id: 8,
    categoria: 'baterias',
    nombre: 'Batería acústica',
    descripcion: 'Set de batería para principiantes y práctica.',
    precio: 449990,
    stock: 3,
    imagen: baterias,
  },
  {
    id: 9,
    categoria: 'baterias',
    nombre: 'Batería acústica Pro',
    descripcion: 'Set completo para músicos con más experiencia.',
    precio: 699990,
    stock: 2,
    imagen: baterias,
  },
  {
    id: 10,
    categoria: 'pianos',
    nombre: 'Teclado 61 teclas',
    descripcion: 'Teclado versátil para aprender y practicar.',
    precio: 199990,
    stock: 5,
    imagen: pianos,
  },
  {
    id: 11,
    categoria: 'pianos',
    nombre: 'Piano digital',
    descripcion: 'Piano digital para estudio y hogar.',
    precio: 429990,
    stock: 2,
    imagen: pianos,
  },
  {
    id: 12,
    categoria: 'vientos',
    nombre: 'Saxofón alto',
    descripcion: 'Saxofón para estudiantes y músicos aficionados.',
    precio: 389990,
    stock: 4,
    imagen: vientos,
  },
  {
    id: 13,
    categoria: 'vientos',
    nombre: 'Set de instrumentos de viento',
    descripcion: 'Alternativa para comenzar a explorar instrumentos de viento.',
    precio: 249990,
    stock: 6,
    imagen: vientos,
  },
  {
    id: 14,
    categoria: 'estudio',
    nombre: 'Micrófono de estudio',
    descripcion: 'Micrófono para grabaciones y contenido musical.',
    precio: 99990,
    stock: 11,
    imagen: estudio,
  },
  {
    id: 15,
    categoria: 'estudio',
    nombre: 'Interfaz de audio',
    descripcion: 'Interfaz compacta para grabar en computador.',
    precio: 159990,
    stock: 7,
    imagen: estudio,
  },
]

export const categorias = [
  { value: 'todos', label: 'Todos' },
  { value: 'guitarras', label: 'Guitarras' },
  { value: 'bajos', label: 'Bajos' },
  { value: 'ukeleles', label: 'Ukeleles' },
  { value: 'amplificadores', label: 'Amplificadores' },
  { value: 'baterias', label: 'Baterías' },
  { value: 'pianos', label: 'Pianos y Teclados' },
  { value: 'vientos', label: 'Vientos' },
  { value: 'estudio', label: 'Estudio' },
]

let productosTemporales = []
const productosEliminados = new Set()

export function obtenerProductosCatalogo() {
  return [...productosCatalogo, ...productosTemporales]
    .filter((producto) => !productosEliminados.has(String(producto.id)))
}

export function guardarProductosCatalogo(productos) {
  productosTemporales = [...productos]
}

export function obtenerSiguienteIdProducto() {
  return Math.max(
    ...productosCatalogo.map((producto) => producto.id),
    ...productosTemporales.map((producto) => producto.id),
  ) + 1
}

export function eliminarProductoCatalogo(id) {
  productosEliminados.add(String(id))
  productosTemporales = productosTemporales.filter((producto) => String(producto.id) !== String(id))
}
