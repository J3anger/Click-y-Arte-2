// Abrir modales
document.querySelector('.btn-iniciar').addEventListener('click', function (e) {
    e.preventDefault();
    abrirModal('modalLogin');
});

document.querySelector('.btn-registrarse').addEventListener('click', function (e) {
    e.preventDefault();
    abrirModal('modalRegistro');
});

function abrirModal(id) {
    document.getElementById(id).style.display = 'block';
    document.body.classList.add('modal-abierto');
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.classList.remove('modal-abierto');
}

// Cierre al hacer clic fuera
window.addEventListener('click', function (e) {
    ['modalLogin', 'modalRegistro'].forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (e.target === modal) {
            cerrarModal(modalId);
        }
    });
});


