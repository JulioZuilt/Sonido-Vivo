**Nombre del Estudiante:** Julio Zuilt, Fabian Ferrada  
**Componente / Módulo Principal:** Catálogo de productos, carrito de compras y registro de usuarios  
**Fecha:** 23-10-2026

| ID | Caso de prueba | Preparación (Arrange) | Acción (Act) | Resultado esperado (Assert) | Estado |
| --- | --- | --- | --- | --- | --- |
| PU-001 | Agregar y eliminar un producto temporal | Crear un producto de prueba | Agregarlo y luego eliminarlo del catálogo | Aparece al agregarlo y desaparece al eliminarlo | Pasa |

| PU-002 | Agregar al carrito sin iniciar sesion | Usuario sin sesión y carrito vacio | Intentar agregar un producto | La operación se rechaza y el carrito queda vacío | Pasa |

| PU-003 | Agregar mas unidades que el stock | Usuario con sesión iniciada y producto con stock limitado | Solicitar mas unidades que el stock | La operación se rechaza y no se agrega el producto | Pasa |

| PU-004 | Comprar con sesión iniciada | Usuario autenticado con un producto en el carrito | Finalizar la compra | Se descuenta el stock y se vacia el carrito | Pasa |

| PU-005 | Enviar el registro con teléfono inválido | Completar el formulario con teléfono incorrecto | Enviar el formulario | Se muestra el error y no se crea la cuenta | Pasa |

| PU-006 | Mostrar productos iniciales | Cargar el catálogo sin cambios temporales | Consultar los productos disponibles | Aparecen los 16 productos iniciales | Pasa |

| PU-007 | Agregar producto sin stock | Usuario autenticado y stock del producto en cero | Intentar agregar una unidad | La operación se rechaza por falta de stock | Pasa |

| PU-008 | Actualizar cantidad en el carrito | Agregar un producto al carrito | Cambiar su cantidad a tres | La cantidad guardada queda en tres | Pasa |

| PU-009 | Eliminar producto del carrito | Agregar un producto al carrito | Cambiar su cantidad a cero | El carrito queda vacío | Pasa |

| PU-010 | Comprar sin iniciar sesión | Carrito con un producto y usuario sin sesión | Intentar finalizar la compra | La compra se rechaza y el carrito se conserva | Pasa |

