function obtenerProductoDesdeCard(card) {
  const nombre = card.querySelector(".producto-nombre")?.textContent.trim();
  const descripcion = card.querySelector(".producto-descripcion")?.textContent.trim();
  const precioTexto = card.querySelector(".producto-precio strong")?.textContent.trim().replace("S/.", "").replace(",", ".").trim();
  const precio = parseFloat(precioTexto);
  const imagen = card.querySelector("img")?.getAttribute("src");

  if (!nombre || isNaN(precio) || !imagen) return null;

  return {
    nombre,
    precio,
    cantidad: 1,
    total: precio,
    imagen,
    descripcion,
  };
}

function agregarDesdeCard(card) {
  const producto = obtenerProductoDesdeCard(card);
  if (!producto) return;

  // 🧹 Siempre que agrego al carrito, elimino compra directa previa
  localStorage.removeItem("compraDirecta");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const index = carrito.findIndex((item) => item.nombre === producto.nombre);

  if (index !== -1) {
    carrito[index].cantidad += 1;
    carrito[index].total = carrito[index].precio * carrito[index].cantidad;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  const subtotal = carrito.reduce((acc, item) => acc + item.total, 0);
  localStorage.setItem("subtotal", subtotal.toFixed(2));
  actualizarContadorCarrito();
}

function comprarDesdeCard(card) {
  const producto = obtenerProductoDesdeCard(card);
  if (!producto) return;

  // ❌ Ya NO borramos el carrito, solo guardamos la compra directa
  localStorage.setItem("compraDirecta", JSON.stringify(producto));
  window.location.href = "pagar.html";
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contadores = document.querySelectorAll("#contador-carrito");

  contadores.forEach((contador) => {
    contador.textContent = totalCantidad;
    contador.style.display = totalCantidad > 0 ? "inline-block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();

  document.querySelectorAll(".btn-agregar").forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.stopPropagation(); // Evita que se dispare redirección
      const card = boton.closest(".producto-card");
      agregarDesdeCard(card);
    });
  });

  document.querySelectorAll(".btn-comprar").forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.stopPropagation(); // Evita que se dispare redirección
      const card = boton.closest(".producto-card");
      comprarDesdeCard(card);
    });
  });
});
