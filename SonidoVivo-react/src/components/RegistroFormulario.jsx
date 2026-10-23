import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { registrarCuenta } from '../data/cuentas'

const campos = [
  { name: 'nombre', label: 'Nombre', type: 'text', maxLength: 50, autoComplete: 'given-name' },
  { name: 'apellido', label: 'Apellido', type: 'text', maxLength: 100, autoComplete: 'family-name' },
  { name: 'correo', label: 'Correo electrónico', type: 'email', maxLength: 100, autoComplete: 'email' },
  { name: 'telefono', label: 'Teléfono', type: 'text', maxLength: 15, autoComplete: 'tel', placeholder: '+56 9 1234 5678' },
  { name: 'contrasena', label: 'Contraseña', type: 'password', minLength: 8, maxLength: 12, autoComplete: 'new-password' },
  { name: 'confirmarContrasena', label: 'Confirmar contraseña', type: 'password', minLength: 8, maxLength: 12, autoComplete: 'new-password' },
  { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date' },
]
const erroresIniciales = Object.fromEntries(campos.map(({ name }) => [name, '']))

function RegistroFormulario() {
  const [mensaje, setMensaje] = useState('')
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: '',
    fechaNacimiento: '',
  })

  const [errores, setErrores] = useState(erroresIniciales)

  const validarCampo = (name, value) => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    switch (name) {

      case 'nombre':
        if (!value.trim()) return 'El nombre es obligatorio.'
        if (!soloLetras.test(value.trim())) return 'El nombre solo puede contener letras.'
        if (value.trim().replace(/\s/g, '').length < 3) return 'El nombre debe tener al menos 3 letras.'
        return ''

      case 'apellido':
        if (!value.trim()) return 'El apellido es obligatorio.'
        if (!soloLetras.test(value.trim())) return 'El apellido solo puede contener letras.'
        if (value.trim().replace(/\s/g, '').length < 3) return 'El apellido debe tener al menos 3 letras.'
        return ''

      case 'correo':
        if (!value.trim()) return 'El correo electrónico es obligatorio.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Ingresa un correo electrónico válido.'
        if (!/@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/i.test(value.trim())) {
          return 'Solo se permiten correos @gmail.com, @duoc.cl o @profesor.duoc.cl.'
        }
        return ''

      case 'telefono':
        if (!value.trim()) return 'El teléfono es obligatorio.'
        if (!/^(\+569\d{8}|\+56\s9\s\d{4}\s\d{4})$/.test(value.trim())) {
          return 'Ingresa un celular válido con formato +56 9 1234 5678.'
        }
        return ''

      case 'contrasena':
        if (!value.trim()) return 'La contraseña es obligatoria.'
        if (value.length < 8 || value.length > 12) return 'La contraseña debe tener entre 8 y 12 caracteres.'
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/.test(value)) {
          return 'La contraseña debe incluir mayúscula, minúscula y número.'
        }
        return ''

      case 'confirmarContrasena':
        if (!value.trim()) return 'Debes confirmar la contraseña.'
        if (formData.contrasena !== value) return 'Las contraseñas no coinciden.'
        return ''

      case 'fechaNacimiento': {
        if (!value) return 'La fecha de nacimiento es obligatoria.'
        const fecha = new Date(value)
        const anio = fecha.getFullYear()
        if (Number.isNaN(anio) || anio >= 2014) return 'Debe cumplir con la minoria de edad para registrarse.'
        return ''
      }

      default:
        return ''
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: '' }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setMensaje('')

    const nextErrores = Object.fromEntries(
      Object.keys(formData).map((key) => [key, validarCampo(key, formData[key])]),
    )
    setErrores(nextErrores)

    if (Object.values(nextErrores).some(Boolean)) {
      return
    }

    try {
      await registrarCuenta(formData)
      setMensaje('Cuenta creada correctamente. Ya puedes iniciar sesión.')
      setFormData((actual) => ({ ...actual, contrasena: '', confirmarContrasena: '' }))
    } catch (cause) {
      if (cause.message === 'Ya existe una cuenta registrada con ese correo.') {
        setErrores((actual) => ({ ...actual, correo: cause.message }))
      } else {
        setMensaje(`No se pudo crear la cuenta: ${cause.message}`)
      }
    }
  }

  return (
    <Form id="form-registro" noValidate onSubmit={handleSubmit}>
      {campos.map(({ name, label, type, maxLength, minLength, autoComplete, placeholder }) => (
        <div className="grupo-formulario" key={name}>
          <Form.Label htmlFor={name}>{label}</Form.Label>

          <Form.Control
            type={type}
            id={name}
            name={name}
            maxLength={maxLength}
            minLength={minLength}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            isInvalid={Boolean(errores[name])}
          />

          {name === 'contrasena' && (
            <p className="ayuda-contrasena">Debe tener entre 8 y 12 caracteres e incluir mayúscula, minúscula y número.</p>
          )}
          <p id={`error-${name}`} className="mensaje-error">
            {errores[name]}
          </p>
        </div>
      ))}

      <Button type="submit" className="btn-registrar">Registrarse</Button>
      {mensaje && <p className="mensaje-registro" role="status">{mensaje}</p>}

      <div className="enlaces-registro">
        <p>
            ¿Ya tienes una cuenta?
          <Link to="/login">Iniciar Sesión</Link>
        </p>
        <Link to="/">Volver al inicio</Link>
      </div>
    </Form>
  )
}
export default RegistroFormulario