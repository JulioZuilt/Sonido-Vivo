import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { registrarCuenta } from '../data/cuentas'
import RegistroFormulario from './RegistroFormulario'

vi.mock('../data/cuentas', () => ({
  registrarCuenta: vi.fn(),
}))

function completarFormulario(telefono = '+56 9 1234 5678') {
  const datos = {
    Nombre: 'Julio',
    Apellido: 'Pérez',
    'Correo electrónico': 'julio@gmail.com',
    Teléfono: telefono,
    Contraseña: 'Clave123',
    'Confirmar contraseña': 'Clave123',
    'Fecha de nacimiento': '2000-01-01',
  }

  Object.entries(datos).forEach(([label, value]) => {
    fireEvent.change(screen.getByLabelText(label), { target: { value } })
  })
}

describe('RegistroFormulario', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra un error y no registra si el teléfono no es válido', () => {
    // Arrange
    render(<MemoryRouter><RegistroFormulario /></MemoryRouter>)
    completarFormulario('123')

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }))

    // Assert
    expect(screen.getByText(/Ingresa un celular válido/)).toBeInTheDocument()
    expect(registrarCuenta).not.toHaveBeenCalled()
  })
})
