document.addEventListener("DOMContentLoaded", () => {
  // Mostrar/ocultar contraseña
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const esPassword = passwordInput.type === "password";
      passwordInput.type = esPassword ? "text" : "password";
      this.textContent = esPassword ? "🙈" : "👁️";
    });
  }

  // Validación del formulario de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;

      if (!email || !password) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

      const usuario = usuarios.find(
        user => user.correo === email && user.password === password
      );

      if (!usuario) {
        alert("Correo o contraseña incorrectos.");
        return;
      }

      // Guardar usuario activo
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      alert(`¡Bienvenido, ${usuario.nombre}!`);

      // Redirigir según si es ventana emergente o no
      if (window.opener && !window.opener.closed) {
        window.opener.location.reload(); // Actualiza página principal
        window.close(); // Cierra esta ventana
      } else {
        window.location.href = "paginaPrincipal.html";
      }
    });
  }
});
