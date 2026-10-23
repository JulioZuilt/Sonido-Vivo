import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { iniciarSesionAdmin, iniciarSesionUsuario } from '../data/adminAuth'
import { validarCredencialesCuenta } from '../data/cuentas'

function LoginFormulario() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  })

  const [errores, setErrores] = useState({
    correo: '',
    contrasena: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (iniciarSesionAdmin(formData.correo, formData.contrasena)) {
      navigate('/admin')
      return
    }

    const nuevosErrores = {
      correo: '',
      contrasena: '',
    }

    if (formData.correo.trim() === '') {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.'
    } else if (formData.correo.length > 100) {
      nuevosErrores.correo = 'El correo no puede superar los 100 caracteres.'
    } else {
      const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formatoCorreo.test(formData.correo.trim())) {
        nuevosErrores.correo = 'Ingresa un correo electrónico válido.'
      } else {
        const dominiosPermitidos = /@(gmail\.com|duoc\.cl|profesor\.duoc\.cl|duocuc\.cl)$/i
        if (!dominiosPermitidos.test(formData.correo.trim())) {
          nuevosErrores.correo =
            'Solo se permiten correos @gmail.com, @duoc.cl, @profesor.duoc.cl o @duocuc.cl.'
        }
      }
    }

    if (formData.contrasena.trim() === '') {
      nuevosErrores.contrasena = 'La contraseña es obligatoria.'
    } else if (formData.contrasena.length < 8 || formData.contrasena.length > 12) {
      nuevosErrores.contrasena = 'La contraseña debe tener entre 8 y 12 caracteres.'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/.test(formData.contrasena)) {
      nuevosErrores.contrasena = 'La contraseña debe incluir mayúscula, minúscula y número.'
    }

    setErrores(nuevosErrores)

    if (nuevosErrores.correo || nuevosErrores.contrasena) {
      return
    }

    try {
      const credencialesValidas = await validarCredencialesCuenta(formData.correo, formData.contrasena)
      if (!credencialesValidas) {
        setErrores((actual) => ({
          ...actual,
          contrasena: 'No existe una cuenta con ese correo y contraseña. Regístrate primero.',
        }))
        return
      }

      iniciarSesionUsuario(formData.correo)
      navigate(location.state?.from ?? '/')
    } catch (cause) {
      setErrores((actual) => ({ ...actual, contrasena: `No se pudo validar la cuenta: ${cause.message}` }))
    }
  }

  return (
    <Form id="form-login" noValidate onSubmit={handleSubmit}>
      <div className="grupo-formulario">
        <Form.Label htmlFor="correo">Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          id="correo"
          name="correo"
          maxLength="100"
          autoComplete="email"
          value={formData.correo}
          onChange={handleChange}
          isInvalid={Boolean(errores.correo)}
        />
        <p id="error-correo" className="mensaje-error">
          {errores.correo}
        </p>
      </div>

      <div className="grupo-formulario">
        <Form.Label htmlFor="contrasena">Contraseña</Form.Label>
        <Form.Control
          type="password"
          id="contrasena"
          name="contrasena"
          minLength="8"
          maxLength="12"
          autoComplete="current-password"
          value={formData.contrasena}
          onChange={handleChange}
          isInvalid={Boolean(errores.contrasena)}
        />
        <p className="ayuda-contrasena">
          Para cuentas normales, debe tener entre 8 y 12 caracteres e incluir mayúscula, minúscula y número.
        </p>
        <p id="error-contrasena" className="mensaje-error">
          {errores.contrasena}
        </p>
      </div>

      <Button type="submit" className="btn-ingresar">
        Iniciar Sesión
      </Button>

      <div className="enlaces-login">
        <p>
          ¿No tienes una cuenta?
          <Link to="/registro">Registrarse</Link>
        </p>

        <Link to="/">Volver al inicio</Link>
      </div>
    </Form>
  )
}

export default LoginFormulario
