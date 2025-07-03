// Funcionalidad básica para los botones
document.querySelector('.login-btn').addEventListener('click', function() {
   alert('Función de registro próximamente');
});

document.querySelector('.search-icon').addEventListener('click', function() {
   alert('Función de búsqueda próximamente');
});

document.querySelector('.cart-icon').addEventListener('click', function() {
   alert('Carrito de compras próximamente');
});

// Smooth scroll para navegación
document.querySelectorAll('.nav-links a').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
       e.preventDefault();
       // Aquí podrías agregar navegación real entre páginas
       console.log('Navegando a:', this.textContent);
   });
});

// Efectos de hover para las redes sociales
document.querySelectorAll('.social-icon').forEach(icon => {
   icon.addEventListener('mouseenter', function() {
       this.style.backgroundColor = '#2c5530';
       this.style.color = 'white';
       this.style.transform = 'scale(1.1)';
       this.style.transition = 'all 0.3s ease';
   });
   
   icon.addEventListener('mouseleave', function() {
       this.style.backgroundColor = '#f0f0f0';
       this.style.color = 'black';
       this.style.transform = 'scale(1)';
   });
});

// Efectos de hover para el botón de registro
document.querySelector('.login-btn').addEventListener('mouseenter', function() {
   this.style.backgroundColor = '#1e3d21';
   this.style.transition = 'background-color 0.3s ease';
});

document.querySelector('.login-btn').addEventListener('mouseleave', function() {
   this.style.backgroundColor = '#2c5530';
});

// Animación de aparición al hacer scroll
function animateOnScroll() {
   const sections = document.querySelectorAll('.section');
   
   sections.forEach(section => {
       const sectionTop = section.getBoundingClientRect().top;
       const windowHeight = window.innerHeight;
       
       if (sectionTop < windowHeight - 100) {
           section.style.opacity = '1';
           section.style.transform = 'translateY(0)';
       }
   });
}

// Inicializar animaciones - ocultar secciones al inicio
function initializeAnimations() {
   document.querySelectorAll('.section').forEach(section => {
       section.style.opacity = '0';
       section.style.transform = 'translateY(30px)';
       section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
   });
}

// Activar animación al cargar la página
window.addEventListener('load', function() {
   initializeAnimations();
   setTimeout(animateOnScroll, 100); // Pequeño delay para mejor efecto
});

window.addEventListener('scroll', animateOnScroll);

// Validación de formularios (para uso futuro)
function validateForm(formData) {
   const errors = [];
   
   if (!formData.email || !formData.email.includes('@')) {
       errors.push('Email válido es requerido');
   }
   
   if (!formData.name || formData.name.length < 2) {
       errors.push('Nombre es requerido');
   }
   
   return errors;
}

// Función para manejar la búsqueda (placeholder)
function handleSearch(query) {
   console.log('Buscando:', query);
   // Aquí se implementaría la lógica de búsqueda real
   if (query && query.length > 0) {
       alert(`Buscando: ${query}`);
   } else {
       alert('Por favor ingrese un término de búsqueda');
   }
}

// Función para manejar el carrito
function handleCart() {
   console.log('Abriendo carrito');
   // Aquí se implementaría la lógica del carrito
   const cartItems = getCartItems();
   if (cartItems.length > 0) {
       alert(`Tienes ${cartItems.length} items en tu carrito`);
   } else {
       alert('Tu carrito está vacío');
   }
}

// Simulación de items del carrito
function getCartItems() {
   // Esto normalmente vendría de localStorage o una base de datos
   return [];
}

// Efecto de aparición suave para imágenes
function imageLoadEffect() {
   const images = document.querySelectorAll('.section-image img');
   
   images.forEach(img => {
       img.addEventListener('load', function() {
           this.style.opacity = '0';
           this.style.transition = 'opacity 0.5s ease';
           setTimeout(() => {
               this.style.opacity = '1';
           }, 100);
       });
   });
}

// Efecto parallax suave para las secciones
function parallaxEffect() {
   const sections = document.querySelectorAll('.section');
   const scrolled = window.pageYOffset;
   
   sections.forEach((section, index) => {
       const rate = scrolled * -0.5;
       section.style.transform = `translateY(${rate * 0.1}px)`;
   });
}

// Activar efecto parallax en scroll (opcional)
window.addEventListener('scroll', function() {
   // Descomenta la siguiente línea si quieres efecto parallax
   // parallaxEffect();
});

// Función para mostrar/ocultar elementos al hacer scroll
function handleScrollVisibility() {
   const elements = document.querySelectorAll('.section-title, .section-subtitle');
   
   elements.forEach(element => {
       const elementTop = element.getBoundingClientRect().top;
       const elementVisible = 150;
       
       if (elementTop < window.innerHeight - elementVisible) {
           element.classList.add('fade-in');
       }
   });
}

// Agregar clase CSS para fade-in (se puede agregar al CSS)
const style = document.createElement('style');
style.textContent = `
   .fade-in {
       opacity: 1 !important;
       transform: translateY(0) !important;
       transition: all 0.6s ease !important;
   }
`;
document.head.appendChild(style);

// Event listeners adicionales
document.addEventListener('DOMContentLoaded', function() {
   // Verificar que todos los elementos existan antes de agregar event listeners
   const loginBtn = document.querySelector('.login-btn');
   const searchIcon = document.querySelector('.search-icon');
   const cartIcon = document.querySelector('.cart-icon');
   
   if (loginBtn) {
       loginBtn.addEventListener('click', function() {
           console.log('Botón de registro clickeado');
       });
   }
   
   if (searchIcon) {
       searchIcon.addEventListener('click', function() {
           const searchTerm = prompt('¿Qué deseas buscar?');
           if (searchTerm) {
               handleSearch(searchTerm);
           }
       });
   }
   
   if (cartIcon) {
       cartIcon.addEventListener('click', handleCart);
   }
   
   // Inicializar efectos de imagen
   imageLoadEffect();
   
   console.log('Click y Arte - JavaScript cargado correctamente');
});

// Función para debugging
function debugInfo() {
   console.log('Información de debug:');
   console.log('- Secciones encontradas:', document.querySelectorAll('.section').length);
   console.log('- Imágenes encontradas:', document.querySelectorAll('.section-image img').length);
   console.log('- Enlaces de navegación:', document.querySelectorAll('.nav-links a').length);
}

// Llamar debug info si está en modo desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
   debugInfo();
}