const dataUbigeo = {
  "Lima": {
    "Lima": ["Miraflores", "Surco", "San Isidro", "Comas", "San Juan de Lurigancho"],
    "Cañete": ["San Vicente", "Imperial", "Nuevo Imperial"]
  },
  "Arequipa": {
    "Arequipa": ["Cercado", "Cayma", "Paucarpata", "Miraflores", "Alto Selva Alegre"]
  },
  "Cusco": {
    "Cusco": ["Cusco", "Santiago", "San Sebastián"]
  },
  "Piura": {
    "Piura": ["Piura", "Castilla", "Veintiséis de Octubre"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const resumenLista = document.querySelector("#resumen-productos");
  const subtotalElem = document.querySelector("#resumen-subtotal");
  const envioElem = document.querySelector("#resumen-envio");
  const totalElem = document.querySelector("#resumen-total");
  const descuentoElem = document.querySelector("#resumen-descuento");
  const filaDescuento = document.querySelector("#fila-descuento");
  const inputDescuento = document.getElementById("codigo-descuento");
  const btnPagar = document.querySelector(".btn-dark.w-100");

  const codigosDescuento = {
    chulon: 10,
    oferta10: 15,
    macaco10: 30,
    jimdio: 100,
    mechan_chan: 20,
    enviofree: "envio"
  };

  let productos = [];
  let subtotal = 0;
  let descuento = 0;

  const compraDirecta = JSON.parse(localStorage.getItem("compraDirecta"));
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (compraDirecta) {
    productos = [compraDirecta];
    subtotal = compraDirecta.total;
  } else {
    localStorage.removeItem("compraDirecta");
    productos = carrito;
    subtotal = carrito.reduce((acc, item) => acc + item.total, 0);
  }

  resumenLista.innerHTML = "";
  productos.forEach(producto => {
    const li = document.createElement("li");
    li.className = "d-flex align-items-center mb-3";
    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img me-3" style="width:60px; height:60px; object-fit:cover; border-radius:6px;" />
      <div>
        <p class="mb-1 fw-semibold">${producto.nombre}</p>
        <span class="text-muted">${producto.cantidad} x S/ ${producto.precio.toFixed(2)}</span>
      </div>
    `;
    resumenLista.appendChild(li);
  });

  function actualizarTotales() {
    const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked')?.value;
    let envio = tipoEntrega === "envio" ? 10.0 : 0.0;

    const valor = inputDescuento.value.trim().toLowerCase();
    if (codigosDescuento[valor] === "envio") {
      envio = 0;
    }

    envioElem.parentElement.style.display = envio > 0 ? "flex" : "none";
    subtotalElem.textContent = `S/ ${subtotal.toFixed(2)}`;
    envioElem.textContent = `S/ ${envio.toFixed(2)}`;

    const totalFinal = subtotal + envio - descuento;
    totalElem.textContent = `S/ ${totalFinal.toFixed(2)}`;
  }

  filaDescuento.style.display = "none";

  window.aplicarDescuento = function () {
    const valor = inputDescuento.value.trim().toLowerCase();

    if (codigosDescuento.hasOwnProperty(valor)) {
      const tipo = codigosDescuento[valor];

      if (tipo === "envio") {
        descuento = 0;
        filaDescuento.style.display = "none";
        descuentoElem.textContent = "";
        alert("✅ ¡Código aplicado! Envío gratis 🛵");
      } else if (typeof tipo === "number") {
        if (tipo > subtotal) {
          descuento = 0;
          filaDescuento.style.display = "none";
          descuentoElem.textContent = "";
          alert("❌ El descuento no puede ser mayor al subtotal.");
        } else {
          descuento = tipo;
          filaDescuento.style.display = "flex";
          descuentoElem.textContent = `- S/ ${descuento.toFixed(2)}`;
          alert(`✅ ¡Código aplicado! Descuento de S/ ${tipo}`);
        }
      }
    } else {
      descuento = 0;
      filaDescuento.style.display = "none";
      descuentoElem.textContent = "";
      alert("❌ Código inválido. Intenta con otro.");
    }

    actualizarTotales();
  };

  document.querySelectorAll('input[name="tipoEntrega"]').forEach(radio => {
    radio.addEventListener("change", actualizarTotales);
  });

  actualizarTotales();

  // === 💰 BOTÓN PAGAR ===
  btnPagar.addEventListener("click", () => {
    const radios = document.querySelectorAll('input[name="pago"]');
    let metodoSeleccionado = "";

    radios.forEach(radio => {
      if (radio.checked) {
        const text = radio.parentElement.textContent.trim().toLowerCase();
        if (text.includes("mercado")) metodoSeleccionado = "mercado";
        else if (text.includes("yape") || text.includes("plin")) metodoSeleccionado = "yape";
        else if (text.includes("transferencia")) metodoSeleccionado = "transferencia";
      }
    });

    if (metodoSeleccionado === "mercado") {
      window.location.href = "https://link.mercadopago.com.pe/clickyarte";
    } else if (metodoSeleccionado === "yape") {
      const qrModal = new bootstrap.Modal(document.getElementById("qrModal"));
      qrModal.show();
    } else if (metodoSeleccionado === "transferencia") {
      alert("✅ Gracias por tu compra. Te enviaremos los datos bancarios a tu correo 📩.");
    } else {
      alert("⚠️ Por favor, selecciona un método de pago.");
    }
  });

  // === 🌍 UBIGEO ===
  const depSelect = document.getElementById("departamento-envio");
  const provSelect = document.getElementById("provincia-envio");
  const distSelect = document.getElementById("distrito-envio");

  const poblarSelect = (select, opciones, placeholder) => {
    select.innerHTML = `<option selected disabled value="">${placeholder}</option>`;
    opciones.forEach(opcion => {
      const opt = document.createElement("option");
      opt.value = opcion;
      opt.textContent = opcion;
      select.appendChild(opt);
    });
  };

  if (depSelect && provSelect && distSelect) {
    poblarSelect(depSelect, Object.keys(dataUbigeo), "Departamento");

    depSelect.addEventListener("change", () => {
      const dep = depSelect.value;
      const provincias = Object.keys(dataUbigeo[dep] || {});
      poblarSelect(provSelect, provincias, "Provincia");
      poblarSelect(distSelect, [], "Selecciona primero una provincia");
    });

    provSelect.addEventListener("change", () => {
      const dep = depSelect.value;
      const prov = provSelect.value;
      const distritos = dataUbigeo[dep]?.[prov] || [];
      poblarSelect(distSelect, distritos, "Distrito");
    });
  }
});
