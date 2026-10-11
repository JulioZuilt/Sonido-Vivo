import './App.css'
import Home from './views/Home'
import MegaDescuento from './views/MegaDescuento'
import Marcas from './views/Marcas'

function App() {
  const ruta = window.location.pathname

  if (ruta === '/mega-descuento') {
    return <MegaDescuento />
  }

  if (ruta === '/marcas') {
    return <Marcas />
  }

  return <Home />
}

export default App
