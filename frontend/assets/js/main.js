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

    // --- Lógica de Filtros ---
    let catalogoFilter = 'Todos';

    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        const secContainer = document.getElementById('servicios-container');
        if(secContainer) secContainer.style.transition = 'opacity var(--transition-fast)';

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                catalogoFilter = btn.getAttribute('data-filter');
                
                if (secContainer) {
                    secContainer.style.opacity = 0;
                    setTimeout(() => {
                        renderizarCatalogo();
                        secContainer.style.opacity = 1;
                    }, 200);
                } else {
                    renderizarCatalogo();
                }
            });
        });
    }

    // 3. Renderizar Catálogo usando mock-data.js
    const renderizarCatalogo = () => {
        const container = document.getElementById('servicios-container');
        if (!container) return;
        
        // window.mockServices viene de mock-data.js
        const servicios = window.mockServices || [];
        
        // Filtramos solo los activos para la vista pública
        let activos = servicios.filter(s => s.activo);

        // Aplicamos el filtro si es distinto a Todos
        if (catalogoFilter !== 'Todos') {
            activos = activos.filter(s => s.categoria === catalogoFilter);
        }

        if (activos.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No hay servicios en esta categoría en este momento.</p>';
            return;
        }

        container.innerHTML = activos.map(servicio => `
            <div class="premium-card">
                <div class="card-img-bg" style="background-image: url('${servicio.imagen}');" role="img" aria-label="${servicio.nombre}"></div>
                <div class="premium-card-overlay">
                    <span class="card-category">${servicio.categoria}</span>
                    <h3 class="card-title">${servicio.nombre}</h3>
                    <div class="premium-card-details">
                        <p class="card-desc">${servicio.descripcion}</p>
                        <div class="card-footer">
                            <span class="card-price">$${servicio.precio.toFixed(2)}</span>
                            <a href="#contacto" class="btn btn-outline btn-sm">Reservar</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Renderizar Promociones
    const renderizarPromociones = () => {
        const container = document.getElementById('promociones-container');
        const section = document.getElementById('promociones');
        if (!container || !section) return;

        const promos = window.mockPromociones || [];
        const activas = promos.filter(p => p.activo);

        if (activas.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';

        container.innerHTML = activas.map(promo => `
            <div class="promo-poster" style="background-image: linear-gradient(to right, rgba(44,24,16,0.95) 0%, rgba(44,24,16,0.5) 60%, rgba(44,24,16,0.1) 100%), url('${promo.imagen}')">
                <div class="promo-content">
                    <span class="promo-badge">OFERTA LIMITADA</span>
                    <h3 class="promo-title">${promo.titulo}</h3>
                    <p class="promo-desc">${promo.descripcion}</p>
                    <a href="#contacto" class="btn btn-primary">Aprovechar Promo</a>
                </div>
            </div>
        `).join('');
    };

    renderizarCatalogo();
    renderizarPromociones();

    // --- Carrusel Promos Logic ---
    const prevBtn = document.getElementById('promo-prev');
    const nextBtn = document.getElementById('promo-next');
    const promosContainer = document.getElementById('promociones-container');

    if (prevBtn && nextBtn && promosContainer) {
        prevBtn.addEventListener('click', () => {
            promosContainer.scrollBy({ left: -promosContainer.clientWidth, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            promosContainer.scrollBy({ left: promosContainer.clientWidth, behavior: 'smooth' });
        });
    }

    // --- Theme Switcher (Dark Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const themeText = document.getElementById('theme-text');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            if(themeText) themeText.textContent = 'Modo Claro';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let switchToTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', switchToTheme);
            localStorage.setItem('theme', switchToTheme);
            
            if (switchToTheme === 'dark') {
                if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
                if(themeText) themeText.textContent = 'Modo Claro';
            } else {
                if(themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
                if(themeText) themeText.textContent = 'Modo Oscuro';
            }
        });
    }

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
