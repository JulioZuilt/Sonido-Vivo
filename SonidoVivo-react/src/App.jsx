import './App.css'
import Home from './views/Home'
import MegaDescuento from './views/MegaDescuento'

function App() {
  return window.location.pathname === '/mega-descuento'
    ? <MegaDescuento />
    : <Home />
}

export default App
