const formulario = document.getElementById("form-login");

const correo = document.getElementById("correo");
const errorCorreo = document.getElementById("error-correo");

const contrasena = document.getElementById("contrasena");
const errorContrasena = document.getElementById("error-contrasena");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Limpiar mensajes anteriores
    errorCorreo.textContent = "";
    errorContrasena.textContent = "";

    // VALIDACIÓN DEL CORREO

    if (correo.value.trim() === "") {
        errorCorreo.textContent = "El correo electrónico es obligatorio.";
        return;
    }

    if (correo.value.length > 100) {
        errorCorreo.textContent = "El correo no puede superar los 100 caracteres.";
        return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.value.trim())) {
        errorCorreo.textContent = "Ingresa un correo electrónico válido.";
        return;
    }

    const dominiosPermitidos = /@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/i;

    if (!dominiosPermitidos.test(correo.value.trim())) {
        errorCorreo.textContent =
            "Solo se permiten correos @gmail.com, @duoc.cl o @profesor.duoc.cl.";
        return;
    }


    // VALIDACIÓN DE LA CONTRASEÑA

    if (contrasena.value.trim() === "") {
        errorContrasena.textContent = "La contraseña es obligatoria.";
        return;
    }

    if (contrasena.value.length < 4 || contrasena.value.length > 10) {
        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";
        return;
    }


    // SI TODO ESTÁ CORRECTO

    alert("Inicio de sesión válido.");

});