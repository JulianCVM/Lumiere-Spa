const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración básica - Middlewares
app.use(cors());
app.use(express.json());

// Servir frontend estáticamente (El index.html y assets)
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas API (Mock/Estructura)
// const servicesRoutes = require('./routes/services');
// app.use('/api/services', servicesRoutes);

// Servir la vista de admin de forma específica
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin/index.html'));
});

// Manejo de rutas no encontradas en el frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Lumière Spa Server corriendo en http://localhost:${PORT}`);
    console.log(`Admin panel disponible en http://localhost:${PORT}/admin`);
});
