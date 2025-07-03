function crearFilaProducto(producto) {
  const tr = document.createElement("tr");
  tr.classList.add("cart-item");
  tr.dataset.precio = producto.precio;

  tr.innerHTML = `
    <td>
      <div class="d-flex align-items-center gap-5">
        <div class="img-box">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
        </div>
        <div>
          <p class="mb-2 fw-semibold text-start ps-4">${producto.nombre}</p>
          <small class="text-start ps-4">S/ ${producto.precio}</small>
        </div>
      </div>
    </td>
    <td class="text-center">
      <div class="d-flex align-items-center justify-content-center gap-3">
        <div class="d-flex border rounded px-2 py-1 align-items-center gap-3">
          <button class="btn-menos btn p-0 border-0 bg-transparent text-dark">
            <i class="fas fa-minus"></i>
          </button>
          <input type="text" class="form-control text-center border-0 p-0 cantidad" value="${producto.cantidad}" readonly />
          <button class="btn-mas btn p-0 border-0 bg-transparent text-dark">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <button class="btn-eliminar btn p-0 text-danger bg-transparent border-0">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </td>
    <td class="text-end pe-5 fw-semibold total-producto">S/ ${(producto.precio * producto.cantidad).toFixed(2)}</td>
  `;

  return tr;
}

function cargarProductosDesdeLocalStorage() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const tbody = document.querySelector("#tabla-carrito tbody");
  tbody.innerHTML = "";

  const mensajeVacio = document.getElementById("mensaje-vacio");

  if (carrito.length === 0) {
    if (mensajeVacio) mensajeVacio.style.display = "block";
  } else {
    if (mensajeVacio) mensajeVacio.style.display = "none";
    carrito.forEach(producto => {
      const fila = crearFilaProducto(producto);
      tbody.appendChild(fila);
    });
  }
}

function actualizarTotales() {
  let subtotal = 0;
  const carrito = [];

  document.querySelectorAll(".cart-item").forEach(item => {
    const precio = parseFloat(item.dataset.precio);
    const cantidadInput = item.querySelector(".cantidad");
    const cantidad = parseInt(cantidadInput.value);
    const total = precio * cantidad;

    item.querySelector(".total-producto").textContent = `S/ ${total.toFixed(2)}`;
    subtotal += total;

    const nombre = item.querySelector("p").textContent.trim();
    const imagen = item.querySelector("img").getAttribute("src");

    carrito.push({ nombre, precio, cantidad, total, imagen });
  });

  document.getElementById("subtotal").textContent = `S/ ${subtotal.toFixed(2)}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("subtotal", subtotal.toFixed(2));

  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }

  const btnPagar = document.getElementById("btn-pagar");
  if (btnPagar) {
    btnPagar.style.display = carrito.length > 0 ? "block" : "none";
  }
}

function agregarEventosBotones() {
  document.querySelectorAll(".btn-mas").forEach(btn => {
    btn.addEventListener("click", e => {
      const input = e.target.closest("tr").querySelector(".cantidad");
      input.value = parseInt(input.value) + 1;
      actualizarTotales();
    });
  });

  document.querySelectorAll(".btn-menos").forEach(btn => {
    btn.addEventListener("click", e => {
      const input = e.target.closest("tr").querySelector(".cantidad");
      let nuevaCantidad = parseInt(input.value) - 1;
      input.value = nuevaCantidad < 1 ? 1 : nuevaCantidad;
      actualizarTotales();
    });
  });

  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", e => {
      const fila = e.target.closest("tr");
      fila.remove();
      actualizarTotales();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductosDesdeLocalStorage();
  actualizarTotales();
  agregarEventosBotones();

  const btnPagar = document.getElementById("btn-pagar");
  if (btnPagar) {
    btnPagar.addEventListener("click", () => {
      localStorage.removeItem("compraDirecta");
      window.location.href = "pagar.html";
    });
  }
});
