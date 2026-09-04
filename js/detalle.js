const productos = [
    {"categoria": "guitarras", "nombre": "Guitarra eléctrica clásica", "descripcion": "Guitarra cómoda para comenzar a tocar.", "precio": "$189.990", "imagen": "Guitarra.png"},

    {"categoria": "guitarras", "nombre": "Guitarra eléctrica Pro", "descripcion": "Sonido potente para ensayos y presentaciones.", "precio": "$329.990", "imagen": "Guitarra.png"},

    {"categoria": "bajos", "nombre": "Bajo eléctrico 4 cuerdas", "descripcion": "Bajo versátil para distintos estilos musicales.", "precio": "$299.990", "imagen": "Bajo.png"},

    {"categoria": "bajos", "nombre": "Bajo eléctrico Jazz", "descripcion": "Diseño cómodo y sonido definido.", "precio": "$349.990", "imagen": "Bajo.png"},

    {"categoria": "ukeleles", "nombre": "Ukelele soprano", "descripcion": "Ukelele liviano y fácil de transportar.", "precio": "$59.990", "imagen": "Ukelele.png"},

    {"categoria": "ukeleles", "nombre": "Ukelele concierto", "descripcion": "Mayor tamaño para un sonido más completo.", "precio": "$79.990", "imagen": "Ukelele.png"},
         
    {"categoria": "amplificadores", "nombre": "Amplificador 20W", "descripcion": "Amplificador compacto para práctica en casa.", "precio": "$119.990", "imagen": "Amplificador.png"},
         
    {"categoria": "amplificadores", "nombre": "Amplificador 50W", "descripcion": "Más potencia para ensayos y salas pequeñas.", "precio": "$219.990", "imagen": "Amplificador.png"},
         
    {"categoria": "baterias", "nombre": "Batería acústica", "descripcion": "Set de batería para principiantes y práctica.", "precio": "$449.990", "imagen": "Baterias.png"},
    {"categoria": "baterias", "nombre": "Batería acústica Pro", "descripcion": "Set completo para músicos con más experiencia.", "precio": "$699.990", "imagen": "Baterias.png"},

    {"categoria": "pianos", "nombre": "Teclado 61 teclas", "descripcion": "Teclado versátil para aprender y practicar.", "precio": "$199.990", "imagen": "Pianos.png"},
           
    {"categoria": "pianos", "nombre": "Piano digital", "descripcion": "Piano digital para estudio y hogar.", "precio": "$429.990", "imagen": "Pianos.png"},
           
    {"categoria": "vientos", "nombre": "Saxofón alto", "descripcion": "Saxofón para estudiantes y músicos aficionados.", "precio": "$389.990", "imagen": "Vientos.png"},
           
    {"categoria": "vientos", "nombre": "Set de instrumentos de viento", "descripcion": "Alternativa para comenzar a explorar instrumentos de viento.", "precio": "$249.990", "imagen": "Vientos.png"},
           
    {"categoria": "estudio", "nombre": "Micrófono de estudio", "descripcion": "Micrófono para grabaciones y contenido musical.", "precio": "$99.990", "imagen": "Estudio.png"},
           
    {"categoria": "estudio", "nombre": "Interfaz de audio", "descripcion": "Interfaz compacta para grabar en computador.", "precio": "$159.990", "imagen": "Estudio.png"}];

const datos = new URLSearchParams(window.location.search);
const numero = Number(datos.get("producto"));
const producto = productos[numero] || productos[0];

document.getElementById("detalle-imagen").src = "img/" + producto.imagen;
document.getElementById("detalle-imagen").alt = producto.nombre;
document.getElementById("detalle-nombre").textContent = producto.nombre;
document.getElementById("detalle-descripcion").textContent = producto.descripcion;
document.getElementById("detalle-precio").textContent = producto.precio;
document.getElementById("detalle-categoria").textContent = producto.categoria;

let cantidad = 1;
const cantidadTexto = document.getElementById("cantidad");
const totalTexto = document.getElementById("total");

function numeroPrecio(precio) {
    return Number(precio.replace("$", "").replace(".", "").replace(".", ""));
}

function actualizarTotal() {
    const total = numeroPrecio(producto.precio) * cantidad;
    totalTexto.textContent = "$" + total.toLocaleString("es-CL");
    cantidadTexto.textContent = cantidad;
}

document.getElementById("menos").addEventListener("click", function () {
    if (cantidad > 1) { cantidad--; actualizarTotal(); }
});

document.getElementById("mas").addEventListener("click", function () {
    cantidad++; actualizarTotal();
});

document.getElementById("agregar").addEventListener("click", function () {
    document.getElementById("mensaje-carrito").textContent = "Producto agregado al carrito.";
});

document.getElementById("volver-catalogo").addEventListener("click", function () {
    const regreso = sessionStorage.getItem("volverCatalogo");
    if (regreso) {
        sessionStorage.setItem("restaurarCatalogo", regreso);
        sessionStorage.removeItem("volverCatalogo");
    }
    window.location.href = regreso ? JSON.parse(regreso).url : "productos.html";
});

actualizarTotal();
