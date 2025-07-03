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

// ================= ABRIR LOGIN EN VENTANA CENTRADA =================
function abrirVentanaLogin() {
    const width = 600;
    const height = 700;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(
        "InicioDeSesion.html",
        "_blank",
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
}

// ================= ABRIR REGISTRO EN VENTANA CENTRADA =================
function abrirVentanaRegistro() {
    const width = 700;
    const height = 800;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(
        "Registrarse.html",
        "_blank",
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
}

// ================= EVENTOS DE BOTONES =================
document.addEventListener("DOMContentLoaded", () => {
    actualizarHeader();

    document.querySelectorAll('.btn-registrarse').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            abrirVentanaRegistro();
        });
    });

    document.querySelectorAll('.btn-iniciar').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            abrirVentanaLogin();
        });
    });
});
