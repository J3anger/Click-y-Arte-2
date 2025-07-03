// js/carousel.js

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona los elementos clave del carrusel
    const carouselTrack = document.querySelector('.hero-carousel-track');
    const slides = Array.from(document.querySelectorAll('.hero-carousel-slide')); // Convierte NodeList a Array para usar métodos de array
    const nextBtn = document.querySelector('.hero-carousel-btn-next');
    const prevBtn = document.querySelector('.hero-carousel-btn-prev');
    const navDotsContainer = document.querySelector('.hero-carousel-nav-dots');

    // Validación para asegurar que los elementos existen en el DOM
    if (!carouselTrack || slides.length === 0 || !nextBtn || !prevBtn || !navDotsContainer) {
        console.error('Error: Uno o más elementos del carrusel no fueron encontrados. Asegúrate de que el HTML esté correcto.');
        return; // Detiene la ejecución del script si faltan elementos cruciales
    }

    let currentSlideIndex = 0; // Índice del slide que se está mostrando actualmente
    let slideWidth; // Almacenará el ancho de un solo slide, se calcula dinámicamente

    // --- Funciones Auxiliares ---

    // 1. Calcula y devuelve el ancho de un slide
    const getSlideWidth = () => {
        // Usamos offsetWidth del primer slide para obtener el ancho computado (incluyendo padding/border si los tuviera)
        // Ojo: Si los slides tienen margin, puede ser necesario ajustar esto sumando el margin.
        return slides[0].offsetWidth; 
    };

    // 2. Mueve el carrusel al slide objetivo
    const moveToSlide = (track, targetIndex) => {
        // Recalcular el ancho por si ha habido un resize desde la última vez
        slideWidth = getSlideWidth(); 
        const amountToMove = slideWidth * targetIndex; // Calcula cuánto debe moverse el track
        
        // Aplica la transformación CSS para desplazar el carrusel
        track.style.transform = `translateX(-${amountToMove}px)`;

        // Actualiza la clase 'active' para los slides (para futuras animaciones o estilos)
        slides.forEach((slide, index) => {
            if (index === targetIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    };

    // 3. Actualiza el estado visual de los puntos de navegación
    const updateNavDots = (targetIndex) => {
        const navDots = navDotsContainer.querySelectorAll('.hero-carousel-dot');
        navDots.forEach((dot, index) => {
            if (index === targetIndex) {
                dot.classList.add('active'); // Activa el dot correspondiente
            } else {
                dot.classList.remove('active'); // Desactiva los demás dots
            }
        });
    };

    // 4. Oculta/muestra las flechas y puntos si solo hay un slide (o si la lógica lo requiere)
    const toggleControlsVisibility = () => {
        if (slides.length <= 1) {
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
            navDotsContainer.style.display = 'none';
        } else {
            // Usar 'flex' para los botones ya que tienen un icono centrado con Font Awesome
            nextBtn.style.display = 'flex'; 
            prevBtn.style.display = 'flex';
            navDotsContainer.style.display = 'flex';
        }
    };

    // --- Inicialización del Carrusel ---

    // Esta función se llama al cargar la página y al redimensionar
    const initializeCarousel = () => {
        // Asegúrate de que los dots se generen una sola vez al inicio si el HTML no los tiene todos
        // Aunque en tu HTML ya tienes los 3 dots, este código los generaría dinámicamente.
        // Si el HTML ya los tiene, puedes comentar o eliminar esta sección de creación de dots.
        // Lo mantengo aquí por si decides que el JS los genere.
        if (navDotsContainer.children.length === 0) { // Solo crea los dots si no existen
             slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('hero-carousel-dot');
                dot.dataset.slideIndex = index; // Almacena el índice en un atributo de datos
                navDotsContainer.appendChild(dot);
            });
        }
        
        // Asegura que el carrusel se posicione correctamente al inicio
        moveToSlide(carouselTrack, currentSlideIndex);
        updateNavDots(currentSlideIndex);
        toggleControlsVisibility(); // Ajusta la visibilidad de los controles
    };

    // --- Event Listeners ---

    // Flecha Siguiente
    nextBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length; // Cicla al siguiente slide
        moveToSlide(carouselTrack, currentSlideIndex);
        updateNavDots(currentSlideIndex);
        resetAutoSlide(); // Reinicia el temporizador del auto-slide
    });

    // Flecha Anterior
    prevBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; // Cicla al slide anterior (asegura índice positivo)
        moveToSlide(carouselTrack, currentSlideIndex);
        updateNavDots(currentSlideIndex);
        resetAutoSlide(); // Reinicia el temporizador del auto-slide
    });

    // Puntos de Navegación (Dots)
    navDotsContainer.addEventListener('click', e => {
        // Verifica si el clic fue en un dot
        if (e.target.classList.contains('hero-carousel-dot')) {
            const targetIndex = parseInt(e.target.dataset.slideIndex); // Obtiene el índice del dot
            
            // Solo si el dot clicado no es el slide actual
            if (targetIndex !== currentSlideIndex) { 
                currentSlideIndex = targetIndex;
                moveToSlide(carouselTrack, currentSlideIndex);
                updateNavDots(currentSlideIndex);
                resetAutoSlide(); // Reinicia el temporizador del auto-slide
            }
        }
    });

    // --- Carrusel Automático (Opcional) ---

    let autoSlideInterval;
    const autoSlideDelay = 5000; // 5 segundos

    const startAutoSlide = () => {
        stopAutoSlide(); // Limpia cualquier intervalo previo para evitar duplicados
        autoSlideInterval = setInterval(() => {
            nextBtn.click(); // Simula un clic en el botón Siguiente
        }, autoSlideDelay); 
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Función para reiniciar el temporizador después de la interacción del usuario
    const resetAutoSlide = () => {
        stopAutoSlide();
        setTimeout(startAutoSlide, autoSlideDelay * 2); // Esperar el doble del tiempo antes de reiniciar
    };

    // --- Eventos de Interacción para Auto-slide ---
    
    // Detener el auto-slide al pasar el mouse por el carrusel y reiniciarlo al salir
    carouselTrack.addEventListener('mouseenter', stopAutoSlide);
    carouselTrack.addEventListener('mouseleave', startAutoSlide);

    // También para los botones y dots para una mejor UX
    nextBtn.addEventListener('mouseenter', stopAutoSlide);
    nextBtn.addEventListener('mouseleave', startAutoSlide);
    prevBtn.addEventListener('mouseenter', stopAutoSlide);
    prevBtn.addEventListener('mouseleave', startAutoSlide);
    navDotsContainer.addEventListener('mouseenter', stopAutoSlide);
    navDotsContainer.addEventListener('mouseleave', startAutoSlide);


    // --- Manejo de Redimensionamiento de Ventana ---

    window.addEventListener('resize', () => {
        stopAutoSlide(); // Detener el auto-slide al redimensionar para evitar glitches visuales
        // Re-inicializa el carrusel para recalcular el ancho de los slides y reposicionarlos
        initializeCarousel(); 
        // Asegúrate de que el carrusel se desplace al slide actual después del redimensionamiento
        moveToSlide(carouselTrack, currentSlideIndex); 
        startAutoSlide(); // Reiniciar el auto-slide
    });

    // --- Llamada inicial para que el carrusel funcione al cargar la página ---
    initializeCarousel();
    startAutoSlide(); // Inicia el carrusel automático
});