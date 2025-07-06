// ================= MOSTRAR NOMBRE EN HEADER =================
function actualizarHeader() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    const acciones = document.querySelector(".acciones");

    if (usuarioActivo && acciones) {
        acciones.innerHTML = `
            <span class="text-end me-2">Bienvenido: <strong>${usuarioActivo.nombre}</strong></span>
            <img src="img_header/user.png" alt="Usuario" style="width: 32px; height: 32px; border-radius: 50%; vertical-align: middle;">
            <a href="#" onclick="cerrarSesion()" class="btn btn-cerrar-sesion">Cerrar Sesión</a>
        `;
    }
}

// ================= CERRAR SESIÓN =================
function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    location.reload(); // Recarga para reflejar cambios
}

// ================= ABRIR MODAL LOGIN =================
function abrirModalLogin() {
    const modalLogin = document.getElementById('modalLogin');
    modalLogin.style.display = 'flex';  // Mostrar el modal
}

// ================= ABRIR MODAL REGISTRO =================
function abrirModalRegistro() {
    const modalRegistro = document.getElementById('modalRegistro');
    modalRegistro.style.display = 'flex'; // Mostrar el modal
}

// ================= CERRAR LOS MODALES =================
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none'; // Ocultar el modal
}

// ================= EVENTOS DE BOTONES =================
document.addEventListener("DOMContentLoaded", () => {
    actualizarHeader();

    // Cuando el usuario haga clic en el botón "Registrarse", abrir el modal de registro
    document.querySelectorAll('.btn-registrarse').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();  // Prevenir el comportamiento por defecto
            abrirModalRegistro();  // Abrir el modal de registro
        });
    });

    // Cuando el usuario haga clic en el botón "Iniciar sesión", abrir el modal de login
    document.querySelectorAll('.btn-iniciar').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();  // Prevenir el comportamiento por defecto
            abrirModalLogin();  // Abrir el modal de login
        });
    });

    // Cerrar el modal de registro o login al hacer clic en la X
    const cerrarRegistro = document.getElementById('cerrarRegistro');
    const cerrarLogin = document.getElementById('cerrarLogin');

    if (cerrarRegistro) {
        cerrarRegistro.addEventListener('click', function () {
            cerrarModal('modalRegistro');
        });
    }

    if (cerrarLogin) {
        cerrarLogin.addEventListener('click', function () {
            cerrarModal('modalLogin');
        });
    }

    // Cerrar el modal si se hace clic fuera del modal
    window.addEventListener('click', function (event) {
        if (event.target === document.getElementById('modalRegistro')) {
            cerrarModal('modalRegistro');
        }
        if (event.target === document.getElementById('modalLogin')) {
            cerrarModal('modalLogin');
        }
    });
});
