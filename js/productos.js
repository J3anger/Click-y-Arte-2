function cambiarCantidad(cambio) {
  const cantidadInput = document.getElementById("cantidad");
  if (!cantidadInput) return;

  let cantidad = parseInt(cantidadInput.value) || 1;
  cantidad += cambio;
  cantidadInput.value = cantidad < 1 ? 1 : cantidad;
}

function cambiarImagen(img) {
  const imagenPrincipal = document.getElementById("main-img");
  if (imagenPrincipal && img?.src) {
    imagenPrincipal.src = img.src;
  }
}

function agregarAlCarrito() {
  const producto = obtenerProductoActual();
  if (!producto) return;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.nombre === producto.nombre);
  if (index !== -1) {
    carrito[index].cantidad += producto.cantidad;
    carrito[index].total = carrito[index].precio * carrito[index].cantidad;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  const subtotal = carrito.reduce((acc, item) => acc + item.total, 0);
  localStorage.setItem("subtotal", subtotal.toFixed(2));

  actualizarContadorCarrito();

  const cantidadInput = document.getElementById("cantidad");
  if (cantidadInput) cantidadInput.value = 1;
}

function obtenerProductoActual() {
  const nombre = document.querySelector("h3")?.textContent.trim();
  const precioTexto = document.querySelector(".text-success")?.textContent.trim();
  const precio = parseFloat(precioTexto?.replace("S/", "").trim());
  const cantidadInput = document.getElementById("cantidad");
  const cantidad = parseInt(cantidadInput?.value) || 1;
  const imagen = document.getElementById("main-img")?.getAttribute("src");

  if (!nombre || isNaN(precio) || isNaN(cantidad) || !imagen) return null;

  return {
    nombre,
    precio,
    cantidad,
    total: precio * cantidad,
    imagen
  };
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const contadores = document.querySelectorAll("#contador-carrito");
  contadores.forEach(contador => {
    contador.textContent = totalCantidad;
    contador.style.display = totalCantidad > 0 ? "inline-block" : "none";
  });
}

function toggleMenu() {
  const nav = document.getElementById("nav-mobile");
  const navDesktop = document.querySelector(".nav-contenido");

  if (nav && navDesktop) {
    nav.classList.toggle("active");
    navDesktop.style.display = nav.classList.contains("active") ? "none" : "flex";
  }
}

// ✅ NUEVO: Cerrar menú mobile
function cerrarMenu() {
  const nav = document.getElementById("nav-mobile");
  const navDesktop = document.querySelector(".nav-contenido");

  if (nav && nav.classList.contains("active")) {
    nav.classList.remove("active");
    if (navDesktop) navDesktop.style.display = "flex";
  }
}

function toggleBuscar() {
  const inputBuscar = document.getElementById("input-busqueda");
  if (inputBuscar) {
    inputBuscar.classList.toggle("activo");
    inputBuscar.focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();

  const lupa = document.getElementById("icono-buscar");
  if (lupa) {
    lupa.addEventListener("click", toggleBuscar);
  }

  const hamburguesa = document.querySelector(".boton-hamburguesa");
  if (hamburguesa) {
    hamburguesa.addEventListener("click", toggleMenu);
  }

  const btnComprarAhora = document.getElementById("btn-comprar-ahora");
  if (btnComprarAhora) {
    btnComprarAhora.addEventListener("click", () => {
      const producto = obtenerProductoActual();
      if (!producto) return;

      localStorage.setItem("compraDirecta", JSON.stringify(producto));
      localStorage.removeItem("subtotal");
      window.location.href = "pagar.html";
    });
  }

  const btnCerrarMenu = document.querySelector(".cerrar-menu");
  if (btnCerrarMenu) {
    btnCerrarMenu.addEventListener("click", cerrarMenu);
  }

  document.querySelectorAll(".btn-registrarse, .btn-iniciar").forEach(btn => {
    btn.addEventListener("click", cerrarMenu);
  });
});
