import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './views/Admin'
import Carrito from './views/Carrito'
import Home from './views/Home'
import Login from './views/Login'
import Marcas from './views/Marcas'
import MegaDescuento from './views/MegaDescuento'
import NotFound from './views/NotFound'
import Perfil from './views/Perfil'
import Producto from './views/Producto'
import Productos from './views/Productos'
import Registro from './views/Registro'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/mega-descuento" element={<MegaDescuento />} />
        <Route path="/marcas" element={<Marcas />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
