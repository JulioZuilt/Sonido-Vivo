const tarjetas = document.querySelectorAll(".producto-card");
const botones = document.querySelectorAll(".filtro");
const paginacion = document.getElementById("paginacion");
const mensaje = document.getElementById("mensaje-filtro");
let productosFiltrados = Array.from(tarjetas);
let paginaActual = 1;
const productosPorPagina = 8;

function mostrarPagina(pagina) {
    paginaActual = pagina;
    tarjetas.forEach(function (tarjeta) { tarjeta.style.display = "none"; });
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    productosFiltrados.slice(inicio, fin).forEach(function (tarjeta) { tarjeta.style.display = "block"; });
    crearPaginacion();
}

function crearPaginacion() {
    paginacion.innerHTML = "";
    const paginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    if (paginas <= 1) return;
    for (let i = 1; i <= paginas; i++) {
        const boton = document.createElement("button");
        boton.textContent = i;
        if (i === paginaActual) boton.classList.add("activo");
        boton.addEventListener("click", function () { mostrarPagina(i); });
        paginacion.appendChild(boton);
    }
}

function filtrar(categoria) {
    productosFiltrados = Array.from(tarjetas).filter(function (tarjeta) {
        return categoria === "todos" || tarjeta.dataset.categoria === categoria;
    });
    paginaActual = 1;
    mensaje.textContent = categoria === "todos" ? "Mostrando todos los productos" : "Mostrando: " + categoria;
    mostrarPagina(1);
}

botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
        botones.forEach(function (b) { b.classList.remove("activo"); });
        boton.classList.add("activo");
        filtrar(boton.dataset.filtro);
    });
});

document.querySelectorAll(".btn-detalle").forEach(function (boton) {
    boton.addEventListener("click", function () {
        sessionStorage.setItem("volverCatalogo", JSON.stringify({
            url: window.location.href,
            scrollY: window.scrollY,
            pagina: paginaActual
        }));
    });
});

const parametros = new URLSearchParams(window.location.search);
const categoriaInicial = parametros.get("categoria") || "todos";
const botonInicial = document.querySelector('.filtro[data-filtro="' + categoriaInicial + '"]') || document.querySelector('.filtro[data-filtro="todos"]');
botonInicial.classList.add("activo");
filtrar(categoriaInicial);

const regreso = sessionStorage.getItem("restaurarCatalogo");
if (regreso) {
    const datos = JSON.parse(regreso);
    setTimeout(function () {
        mostrarPagina(datos.pagina || 1);
        window.scrollTo(0, datos.scrollY || 0);
        sessionStorage.removeItem("restaurarCatalogo");
    }, 50);
}
