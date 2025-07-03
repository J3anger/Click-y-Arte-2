const dataUbigeo = {
  "Amazonas": {
    "Chachapoyas": ["Chachapoyas", "Asunción", "Balsas"],
    "Bagua": ["Bagua", "Aramango", "Copallín"]
  },
  "Áncash": {
    "Huaraz": ["Huaraz", "Independencia", "Pariacoto"],
    "Santa": ["Chimbote", "Coishco", "Nuevo Chimbote"]
  },
  "Apurímac": {
    "Abancay": ["Abancay", "Tamburco"],
    "Andahuaylas": ["Andahuaylas", "San Jerónimo"]
  },
  "Arequipa": {
    "Arequipa": ["Cercado", "Cayma", "Paucarpata", "Miraflores", "Alto Selva Alegre"],
    "Camana": ["Camana", "Samuel Pastor"]
  },
  "Ayacucho": {
    "Huamanga": ["Ayacucho", "Carmen Alto", "Jesús Nazareno"],
    "Cangallo": ["Cangallo", "Paras"]
  },
  "Cajamarca": {
    "Cajamarca": ["Cajamarca", "Baños del Inca", "Los Baños"],
    "Jaén": ["Jaén", "Bellavista"]
  },
  "Callao": {
    "Callao": ["Callao", "La Perla", "Bellavista", "La Punta"]
  },
  "Cusco": {
    "Cusco": ["Cusco", "Santiago", "San Sebastián"],
    "Urubamba": ["Urubamba", "Ollantaytambo"]
  },
  "Huancavelica": {
    "Huancavelica": ["Huancavelica", "Acobambilla"]
  },
  "Huánuco": {
    "Huánuco": ["Huánuco", "Amarilis", "Pillco Marca"],
    "Leoncio Prado": ["Tingo María", "Rupa Rupa"]
  },
  "Ica": {
    "Ica": ["Ica", "La Tinguiña", "Subtanjalla"],
    "Pisco": ["Pisco", "San Clemente"]
  },
  "Junín": {
    "Huancayo": ["Huancayo", "El Tambo", "Chilca"],
    "Tarma": ["Tarma", "Palca"]
  },
  "La Libertad": {
    "Trujillo": ["Trujillo", "El Porvenir", "Florencia de Mora"],
    "Chepén": ["Chepén", "Pacanga"]
  },
  "Lambayeque": {
    "Chiclayo": ["Chiclayo", "José Leonardo Ortiz", "La Victoria"],
    "Lambayeque": ["Lambayeque", "Mochumí"]
  },
  "Lima": {
    "Lima": ["Miraflores", "Surco", "San Isidro", "San Borja", "Comas", "San Juan de Lurigancho"],
    "Cañete": ["San Vicente", "Imperial", "Nuevo Imperial"]
  },
  "Loreto": {
    "Maynas": ["Iquitos", "Punchana", "San Juan Bautista"],
    "Alto Amazonas": ["Yurimaguas", "Lagunas"]
  },
  "Madre de Dios": {
    "Tambopata": ["Puerto Maldonado", "Labyrinth"]
  },
  "Moquegua": {
    "Mariscal Nieto": ["Moquegua", "Samegua"]
  },
  "Pasco": {
    "Pasco": ["Cerro de Pasco", "Tinyahuarco"]
  },
  "Piura": {
    "Piura": ["Piura", "Castilla", "Veintiséis de Octubre"],
    "Sullana": ["Sullana", "Bellavista"]
  },
  "Puno": {
    "Puno": ["Puno", "Acora"],
    "San Román": ["Juliaca", "Caracoto"]
  },
  "San Martín": {
    "Moyobamba": ["Moyobamba", "Calzada"],
    "Tarapoto": ["Tarapoto", "La Banda de Shilcayo"]
  },
  "Tacna": {
    "Tacna": ["Tacna", "Alto de la Alianza", "Gregorio Albarracín"]
  },
  "Tumbes": {
    "Tumbes": ["Tumbes", "Corrales", "Zorritos"]
  },
  "Ucayali": {
    "Coronel Portillo": ["Pucallpa", "Yarinacocha", "Callería"]
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const departamentoSelect = document.getElementById("departamento");
  const provinciaSelect = document.getElementById("provincia");
  const distritoSelect = document.getElementById("distrito");
  const ubicacionTiendaSelect = document.getElementById("ubicacionTienda");
  const tipoDocumentoSelect = document.getElementById("tipoDocumento");
  const tipoRespuestaSelect = document.getElementById("tipoRespuesta");
  const formulario = document.getElementById("libroReclamos");

  // Función genérica para llenar selects
  const poblarSelect = (select, opciones, placeholder) => {
    select.innerHTML = `<option selected disabled value="">${placeholder}</option>`;
    opciones.forEach(opcion => {
      const opt = document.createElement("option");
      opt.value = opcion;
      opt.textContent = opcion;
      select.appendChild(opt);
    });
  };

  // Llenado inicial
  poblarSelect(departamentoSelect, Object.keys(dataUbigeo), "Selecciona un departamento");
  poblarSelect(tipoDocumentoSelect, ["DNI", "Carnet de extranjería", "Pasaporte"], "Selecciona tipo de documento");
  poblarSelect(tipoRespuestaSelect, ["Correo electrónico", "WhatsApp"], "Selecciona tipo de respuesta");
  poblarSelect(ubicacionTiendaSelect, [
    "Lima - Miraflores", "Lima - Surco", "Arequipa - Cercado", "Cusco - Cusco",
    "Trujillo - Trujillo", "Piura - Piura", "Ica - Ica", "Chiclayo - Chiclayo",
    "Puno - Juliaca", "Tacna - Tacna"
  ], "Selecciona ubicación de tienda");

  // Evento: al cambiar departamento
  departamentoSelect.addEventListener("change", () => {
    const dep = departamentoSelect.value;
    const provincias = Object.keys(dataUbigeo[dep] || {});
    poblarSelect(provinciaSelect, provincias, "Selecciona una provincia");
    poblarSelect(distritoSelect, [], "Selecciona primero una provincia");
  });

  // Evento: al cambiar provincia
  provinciaSelect.addEventListener("change", () => {
    const dep = departamentoSelect.value;
    const prov = provinciaSelect.value;
    const distritos = dataUbigeo[dep]?.[prov] || [];
    poblarSelect(distritoSelect, distritos, "Selecciona un distrito");
  });

  // Validación y envío
  formulario.addEventListener("submit", (e) => {const dataUbigeo = {
  "Amazonas": { "Chachapoyas": ["Chachapoyas", "Asunción"], "Bagua": ["Bagua", "Aramango"] },
  "Áncash": { "Huaraz": ["Huaraz", "Independencia"], "Santa": ["Chimbote", "Coishco"] },
  "Lima": { "Lima": ["Miraflores", "Surco", "San Isidro"], "Cañete": ["Imperial", "San Vicente"] },
  "Arequipa": { "Arequipa": ["Cercado", "Cayma", "Paucarpata"] }
  // Puedes añadir más según necesites
};

document.addEventListener("DOMContentLoaded", () => {
  // 🎯 ELEMENTOS DEL RESUMEN
  const resumenLista = document.querySelector(".list-unstyled");
  const subtotalElem = document.querySelector("#resumen-subtotal");
  const envioElem = document.querySelector("#resumen-envio");
  const totalElem = document.querySelector("#resumen-total");
  const descuentoElem = document.querySelector("#resumen-descuento");
  const filaDescuento = document.querySelector("#fila-descuento");
  const inputDescuento = document.getElementById("codigo-descuento");

  // 🎯 ELEMENTOS DE UBIGEO ENVÍO
  const depEnvio = document.getElementById("departamento-envio");
  const provEnvio = document.getElementById("provincia-envio");
  const distEnvio = document.getElementById("distrito-envio");

  // 🛒 Cargar productos
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

  // 🧾 Mostrar productos
  resumenLista.innerHTML = "";
  productos.forEach(producto => {
    const li = document.createElement("li");
    li.className = "d-flex align-items-center mb-3";
    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img me-3" />
      <div>
        <p class="mb-1 fw-semibold">${producto.nombre}</p>
        <span class="text-muted">${producto.cantidad} x S/ ${producto.precio.toFixed(2)}</span>
      </div>
    `;
    resumenLista.appendChild(li);
  });

  // 💰 Calcular totales
  function actualizarTotales() {
    const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked')?.value;
    const envio = tipoEntrega === "envio" ? 10.0 : 0.0;

    envioElem.parentElement.style.display = envio > 0 ? "flex" : "none";
    subtotalElem.textContent = `S/ ${subtotal.toFixed(2)}`;
    envioElem.textContent = `S/ ${envio.toFixed(2)}`;

    const totalFinal = subtotal + envio - descuento;
    totalElem.textContent = `S/ ${totalFinal.toFixed(2)}`;
  }

  // 🎁 Código de descuento
  filaDescuento.style.display = "none";
  window.aplicarDescuento = function () {
    const valor = inputDescuento.value.trim().toLowerCase();
    if (valor === "chulon") {
      descuento = 10;
      filaDescuento.style.display = "flex";
      descuentoElem.textContent = `- S/ ${descuento.toFixed(2)}`;
    } else {
      descuento = 0;
      filaDescuento.style.display = "none";
      descuentoElem.textContent = "";
    }
    actualizarTotales();
  };

  // 🚚 Cambio tipo de entrega
  document.querySelectorAll('input[name="tipoEntrega"]').forEach(radio => {
    radio.addEventListener("change", actualizarTotales);
  });

  actualizarTotales();

  // ================================
  // 📍 LÓGICA DE UBIGEO ENVÍO DINÁMICO
  // ================================
  const poblarSelect = (select, items, placeholder = "Selecciona") => {
    select.innerHTML = `<option selected disabled value="">${placeholder}</option>`;
    items.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      select.appendChild(option);
    });
  };

  // Poblamos departamentos
  if (depEnvio && provEnvio && distEnvio) {
    poblarSelect(depEnvio, Object.keys(dataUbigeo), "Departamento");

    depEnvio.addEventListener("change", () => {
      const selectedDep = depEnvio.value;
      const provincias = Object.keys(dataUbigeo[selectedDep] || []);
      poblarSelect(provEnvio, provincias, "Provincia");
      poblarSelect(distEnvio, [], "Selecciona primero una provincia");
    });

    provEnvio.addEventListener("change", () => {
      const selectedDep = depEnvio.value;
      const selectedProv = provEnvio.value;
      const distritos = dataUbigeo[selectedDep]?.[selectedProv] || [];
      poblarSelect(distEnvio, distritos, "Distrito");
    });
  }
});

    e.preventDefault();
    formulario.classList.add("was-validated");

    if (!formulario.checkValidity()) {
      alert("⚠️ Por favor completa correctamente todos los campos obligatorios.");
      return;
    }

    alert("✅ ¡Formulario enviado con éxito! 🎉");

    // Reset
    formulario.reset();
    formulario.classList.remove("was-validated");

    // Reset selects
    ["departamento", "provincia", "distrito", "ubicacionTienda", "tipoDocumento", "tipoRespuesta"]
      .forEach(id => document.getElementById(id).selectedIndex = 0);

    provinciaSelect.innerHTML = '<option selected disabled value="">Selecciona una provincia</option>';
    distritoSelect.innerHTML = '<option selected disabled value="">Selecciona un distrito</option>';
  });
});
