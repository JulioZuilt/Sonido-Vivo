const formulario = document.getElementById("form-registro");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmar-contrasena");
const fechaNacimiento = document.getElementById("fecha-nacimiento");

const errorNombre = document.getElementById("error-nombre");
const errorApellido = document.getElementById("error-apellido");
const errorCorreo = document.getElementById("error-correo");
const errorContrasena = document.getElementById("error-contrasena");
const errorConfirmar = document.getElementById("error-confirmar");
const errorFecha = document.getElementById("error-fecha");


formulario.addEventListener("submit", function(event) {

    event.preventDefault();



    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorCorreo.textContent = "";
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


    if (apellido.value.trim() === "") {
        errorApellido.textContent = "El apellido es obligatorio.";
        return;
    }

    if (!soloLetras.test(apellido.value.trim())) {
        errorApellido.textContent = "El apellido solo puede contener letras.";
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


    if (contrasena.value.trim() === "") {
        errorContrasena.textContent = "La contraseña es obligatoria.";
        return;
    }

    if (contrasena.value.length < 4 || contrasena.value.length > 10) {
        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";
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

    if (fechaNacimiento.value >= "2014"){
        errorFecha.textContent = "Debe cumplir con la minoria de edad para registrarse."
        return;
    }
    
    if (fechaNacimiento.value === "") {
        errorFecha.textContent = "La fecha de nacimiento es obligatoria.";
        return;
    }

    alert("Registro realizado correctamente.");

});