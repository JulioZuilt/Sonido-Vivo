const formulario = document.getElementById("form-registro");

const nombre = document.getElementById("nombre");

const apellido = document.getElementById("apellido");

const correo = document.getElementById("correo");

const telefono = document.getElementById("telefono");

const contrasena = document.getElementById("contrasena");

const confirmarContrasena = document.getElementById("confirmar-contrasena");

const fechaNacimiento = document.getElementById("fecha-nacimiento");

const errorNombre = document.getElementById("error-nombre");

const errorApellido = document.getElementById("error-apellido");

const errorCorreo = document.getElementById("error-correo");

const errorTelefono = document.getElementById("error-telefono");

const errorContrasena = document.getElementById("error-contrasena");

const errorConfirmar = document.getElementById("error-confirmar");

const errorFecha = document.getElementById("error-fecha");


formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    errorNombre.textContent = "";

    errorApellido.textContent = "";

    errorCorreo.textContent = "";

    errorTelefono.textContent = "";

    errorContrasena.textContent = "";

    errorConfirmar.textContent = "";

    errorFecha.textContent = "";


    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;


    if (nombre.value.trim() === "") {

        errorNombre.textContent = "El nombre es obligatorio.";

        return;

    }

    if (!soloLetras.test(nombre.value.trim())) {

        errorNombre.textContent = "El nombre solo puede contener letras.";

        return;

    }

    if (nombre.value.trim().replace(/\s/g, "").length < 3) {

        errorNombre.textContent = "El nombre debe tener al menos 3 letras.";

        return;

    }


    if (apellido.value.trim() === "") {

        errorApellido.textContent = "El apellido es obligatorio.";

        return;

    }

    if (!soloLetras.test(apellido.value.trim())) {

        errorApellido.textContent = "El apellido solo puede contener letras.";

        return;

    }

    if (apellido.value.trim().replace(/\s/g, "").length < 3) {

        errorApellido.textContent = "El apellido debe tener al menos 3 letras.";

        return;

    }


    if (correo.value.trim() === "") {

        errorCorreo.textContent = "El correo electrónico es obligatorio.";

        return;

    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.value.trim())) {

        errorCorreo.textContent = "Ingresa un correo electrónico válido.";

        return;

    }

    const dominiosPermitidos =
        /@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/i;

    if (!dominiosPermitidos.test(correo.value.trim())) {

        errorCorreo.textContent =
            "Solo se permiten correos @gmail.com, @duoc.cl o @profesor.duoc.cl.";

        return;

    }


    if (telefono.value.trim() === "") {

        errorTelefono.textContent = "El teléfono es obligatorio.";

        return;

    }

    const formatoTelefono =
        /^(\+569\d{8}|\+56\s9\s\d{4}\s\d{4})$/;

    if (!formatoTelefono.test(telefono.value.trim())) {

        errorTelefono.textContent =
            "Ingresa un celular válido con formato +56 9 1234 5678.";

        return;

    }


    if (contrasena.value.trim() === "") {

        errorContrasena.textContent = "La contraseña es obligatoria.";

        return;

    }

    if (contrasena.value.length < 8 || contrasena.value.length > 12) {

        errorContrasena.textContent =
            "La contraseña debe tener entre 8 y 12 caracteres.";

        return;

    }

    const formatoContrasena =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/;

    if (!formatoContrasena.test(contrasena.value)) {

        errorContrasena.textContent =
            "La contraseña debe incluir mayúscula, minúscula y número.";

        return;

    }


    if (confirmarContrasena.value.trim() === "") {

        errorConfirmar.textContent = "Debes confirmar la contraseña.";

        return;

    }

    if (contrasena.value !== confirmarContrasena.value) {

        errorConfirmar.textContent = "Las contraseñas no coinciden.";

        return;

    }


    if (fechaNacimiento.value >= "2014") {

        errorFecha.textContent =
            "Debe cumplir con la minoria de edad para registrarse.";

        return;

    }

    if (fechaNacimiento.value === "") {

        errorFecha.textContent =
            "La fecha de nacimiento es obligatoria.";

        return;

    }


    alert("Registro realizado correctamente.");

});