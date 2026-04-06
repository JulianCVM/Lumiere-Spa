document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // 2. Efecto de Scroll en Navbar (Glassmorphism)
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Renderizar Catálogo usando mock-data.js
    const renderizarCatalogo = () => {
        const container = document.getElementById('servicios-container');
        if (!container) return;
        
        // window.mockServices viene de mock-data.js
        const servicios = window.mockServices || [];
        
        // Filtramos solo los activos para la vista pública
        const activos = servicios.filter(s => s.activo);

        if (activos.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No hay servicios disponibles en este momento.</p>';
            return;
        }

        container.innerHTML = activos.map(servicio => `
            <div class="card-servicio">
                <div class="card-img-container">
                    <img src="${servicio.imagen}" alt="${servicio.nombre}" loading="lazy">
                </div>
                <div class="card-content">
                    <span class="card-category">${servicio.categoria}</span>
                    <h3 class="card-title">${servicio.nombre}</h3>
                    <p class="card-desc">${servicio.descripcion}</p>
                    <div class="card-footer">
                        <span class="card-price">$${servicio.precio.toFixed(2)}</span>
                        <a href="#contacto" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.8rem;">Reservar</a>
                    </div>
                </div>
            </div>
        `).join('');
    };

    renderizarCatalogo();

    // 4. Animaciones on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(el => appearOnScroll.observe(el));

    // 5. Manejo del formulario (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulación de envío
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto para confirmar tu cita.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }
});
