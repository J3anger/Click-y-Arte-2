// Cambia la cantidad del input (mínimo 1)
function cambiarCantidad(cambio) {
  const cantidadInput = document.getElementById("cantidad");
  let cantidad = parseInt(cantidadInput.value) + cambio;
  if (cantidad < 1) cantidad = 1;
  cantidadInput.value = cantidad;
}

// Cambia la imagen principal del producto al hacer clic en una miniatura
function cambiarImagen(img) {
  const imagenPrincipal = document.getElementById("main-img");
  if (imagenPrincipal && img?.src) {
    imagenPrincipal.src = img.src;
  }
}

// Agrega el producto al carrito y actualiza el contador
function agregarAlCarrito() {
  const nombre = document.querySelector("h3")?.textContent.trim();
  const precioTexto = document.querySelector(".text-success")?.textContent.trim();
  const precio = parseFloat(precioTexto?.replace("S/", "").trim());
  const cantidad = parseInt(document.getElementById("cantidad")?.value);
  const imagen = document.getElementById("main-img")?.getAttribute("src");

  if (!nombre || isNaN(precio) || isNaN(cantidad) || !imagen) return;

  const nuevoProducto = {
    nombre,
    precio,
    cantidad,
    total: precio * cantidad,
    imagen
  };

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.nombre === nombre);
  if (index !== -1) {
    carrito[index].cantidad += cantidad;
    carrito[index].total = carrito[index].precio * carrito[index].cantidad;
  } else {
    carrito.push(nuevoProducto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  const subtotal = carrito.reduce((acc, item) => acc + item.total, 0);
  localStorage.setItem("subtotal", subtotal.toFixed(2));

  actualizarContadorCarrito();
}

// Actualiza el número del carrito en el header
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("contador-carrito");

  if (contador) {
    contador.textContent = totalCantidad;
    contador.style.display = totalCantidad > 0 ? "inline-block" : "none";
  }
}

// Muestra/Oculta el menú hamburguesa
function toggleMenu() {
  const nav = document.getElementById("nav-mobile");
  nav?.classList.toggle("active");
}

// 🔍 Lógica para mostrar barra de búsqueda (opcional)
function toggleBuscar() {
  const inputBuscar = document.getElementById("input-busqueda");
  if (inputBuscar) {
    inputBuscar.classList.toggle("activo");
    inputBuscar.focus();
  }
}

// Al cargar la página, actualiza el número del carrito
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();

  // Asignar evento a la lupa
  const lupa = document.getElementById("icono-buscar");
  if (lupa) {
    lupa.addEventListener("click", toggleBuscar);
  }
});
