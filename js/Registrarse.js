document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const correo = document.getElementById('correo').value.trim().toLowerCase();
    const codigoPais = document.getElementById('codigoPais').value;
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const documento = document.getElementById('documento').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const campos = document.querySelectorAll('#registerForm input, #registerForm select');
    for (let campo of campos) {
      if (!campo.value.trim()) {
        alert("Por favor, complete todos los campos.");
        return;
      }
    }

    const soloNumeros = /^\d+$/;
    if (!soloNumeros.test(telefono) || telefono.length !== 9) {
      alert("El número de teléfono debe tener exactamente 9 dígitos.");
      return;
    }

    if (!soloNumeros.test(documento) || documento.length !== 8) {
      alert("El número de documento debe tener exactamente 8 dígitos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const duplicado = usuarios.find(user =>
      user.correo === correo || user.documento === documento
    );

    if (duplicado) {
      alert("Ya existe una cuenta registrada con este correo o documento.");
      return;
    }

    const nuevoUsuario = {
      nombre: `${nombres} ${apellidos}`,
      correo,
      telefono: `${codigoPais} ${telefono}`,
      direccion,
      tipoDocumento,
      documento,
      password
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("¡Registro exitoso!");

    if (window.opener && !window.opener.closed) {
      window.opener.location.reload();
      window.close();
    } else {
      window.location.href = "paginaPrincipal.html";
    }
  });
});

// Mostrar/ocultar contraseña
function togglePassword(fieldId, iconElement) {
  const input = document.getElementById(fieldId);
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  iconElement.textContent = isPassword ? '🙈' : '👁️';
}
