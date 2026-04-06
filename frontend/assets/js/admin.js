document.addEventListener('DOMContentLoaded', () => {
    // Variable global de estado copiada del mock (para que sea mutable al usar CRUD)
    let serviciosAdmin = [...(window.mockServices || [])];
    
    // --- NAVEGACIÓN Y SIDEBAR ---
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('admin-menu-toggle');
    const navLinks = document.querySelectorAll('.sidebar-nav a[data-view]');
    const views = document.querySelectorAll('.content-view');

    // Toggle menú móvil
    if(menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-active');
        });
    }

    // Cambiar vistas
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            
            // UI Sidebar
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Views
            views.forEach(v => v.classList.remove('active'));
            document.getElementById(`view-${viewId}`).classList.add('active');

            if(window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-active');
            }

            // Refrescar vistas al entrar
            if(viewId === 'dashboard') renderDashboard();
            if(viewId === 'servicios') renderTable();
        });
    });

    // --- DASHBOARD LÓGICA ---
    const renderDashboard = () => {
        document.getElementById('kpi-total').textContent = serviciosAdmin.length;
        
        const categoriasSet = new Set(serviciosAdmin.map(s => s.categoria));
        document.getElementById('kpi-categorias').textContent = categoriasSet.size;
        
        const activos = serviciosAdmin.filter(s => s.activo).length;
        document.getElementById('kpi-activos').textContent = activos;

        renderChart();
    };

    const renderChart = () => {
        const chartContainer = document.getElementById('css-chart');
        
        // Contar por categoría
        const conteo = {};
        serviciosAdmin.forEach(s => {
            conteo[s.categoria] = (conteo[s.categoria] || 0) + 1;
        });

        // Encontrar maximo
        const values = Object.values(conteo);
        const max = values.length > 0 ? Math.max(...values) : 1;

        let html = '';
        for (const [cat, count] of Object.entries(conteo)) {
            const heightPercent = (count / max) * 100;
            html += `
                <div class="bar-container">
                    <div class="bar" style="height: ${heightPercent}%">
                        <span class="bar-value">${count}</span>
                    </div>
                    <span class="bar-label">${cat}</span>
                </div>
            `;
        }
        
        if(values.length === 0) {
            html = '<p>No hay datos para mostrar</p>';
        }

        chartContainer.innerHTML = html;
    };

    // --- CRUD DE SERVICIOS ---
    const tbody = document.getElementById('services-tbody');
    
    // Función Render Tabla
    const renderTable = () => {
        tbody.innerHTML = '';
        
        if (serviciosAdmin.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No hay servicios registrados.</td></tr>';
            return;
        }

        serviciosAdmin.forEach(s => {
            const row = document.createElement('tr');
            
            const badgeClass = s.activo ? 'active' : 'inactive';
            const badgeText = s.activo ? 'Activo' : 'Inactivo';
            const imgUrl = s.imagen || 'https://via.placeholder.com/50';

            row.innerHTML = `
                <td><img src="${imgUrl}" alt="${s.nombre}" class="thumb-img"></td>
                <td><strong>${s.nombre}</strong></td>
                <td>${s.categoria}</td>
                <td>$${Number(s.precio).toFixed(2)}</td>
                <td><span class="badge ${badgeClass}">${badgeText}</span></td>
                <td>
                    <button class="btn btn-icon btn-edit" data-id="${s.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-delete" data-id="${s.id}" title="Eliminar"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Listeners for edit/delete buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                openModalElEditar(id);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if(confirm('¿Estás seguro de eliminar este servicio?')) {
                    serviciosAdmin = serviciosAdmin.filter(s => s.id !== id);
                    renderTable();
                    renderDashboard(); // Actualizar kpis silenciosamente
                }
            });
        });
    };


    // --- MODAL LÓGICA ---
    const modal = document.getElementById('service-modal');
    const form = document.getElementById('service-form');
    const btnAdd = document.getElementById('btn-add-service');
    const btnClose = document.getElementById('modal-close');
    const btnCancel = document.getElementById('modal-cancel');

    // Funciones Helper Modal
    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        form.reset();
        document.getElementById('form-id').value = '';
        document.getElementById('modal-title').innerText = 'Agregar Servicio';
    };

    // Listeners Apertura/Cierre
    btnAdd.addEventListener('click', openModal);
    btnClose.addEventListener('click', closeModal);
    btnCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    // Cargar datos en Modal para Editar
    const openModalElEditar = (id) => {
        const servicio = serviciosAdmin.find(s => s.id === id);
        if(!servicio) return;

        document.getElementById('modal-title').innerText = 'Editar Servicio';
        document.getElementById('form-id').value = servicio.id;
        document.getElementById('form-nombre').value = servicio.nombre;
        document.getElementById('form-categoria').value = servicio.categoria;
        document.getElementById('form-precio').value = servicio.precio;
        document.getElementById('form-imagen').value = servicio.imagen || '';
        document.getElementById('form-descripcion').value = servicio.descripcion || '';
        document.getElementById('form-activo').checked = servicio.activo;
        
        openModal();
    };

    // FORM SUBMIT (Crear / Editar)
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores
        const id = document.getElementById('form-id').value;
        const nuevoServicio = {
            id: id ? id : Date.now().toString(), // Generar ID simple si es nuevo
            nombre: document.getElementById('form-nombre').value,
            categoria: document.getElementById('form-categoria').value,
            precio: parseFloat(document.getElementById('form-precio').value),
            imagen: document.getElementById('form-imagen').value || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Default
            descripcion: document.getElementById('form-descripcion').value,
            activo: document.getElementById('form-activo').checked
        };

        if (id) {
            // Actualizar existente
            const index = serviciosAdmin.findIndex(s => s.id === id);
            if (index !== -1) {
                serviciosAdmin[index] = nuevoServicio;
            }
        } else {
            // Insertar nuevo
            serviciosAdmin.push(nuevoServicio);
        }

        renderTable();
        closeModal();
        renderDashboard(); // Actualizar stats
        
        // Simular feedback
        alert(id ? 'Servicio actualizado correctamente.' : 'Servicio creado correctamente.');
    });


    // INIT
    renderDashboard();
    renderTable();
});
