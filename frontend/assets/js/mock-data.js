const mockServices = [
    {
        id: "1",
        nombre: "Uñas Acrílicas Premium",
        categoria: "Uñas",
        descripcion: "Aplicación de uñas acrílicas con diseño personalizado y terminación de alta duración.",
        precio: 45.00,
        imagen: "https://images.unsplash.com/photo-1519014816548-bf5fe059h98a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        activo: true
    },
    {
        id: "2",
        nombre: "Manicure & Pedicure Spa",
        categoria: "Uñas",
        descripcion: "Limpieza profunda, exfoliación, masaje relajante y esmaltado tradicional o semipermanente.",
        precio: 35.00,
        imagen: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        activo: true
    },
    {
        id: "3",
        nombre: "Maquillaje Profesional",
        categoria: "Maquillaje",
        descripcion: "Maquillaje de larga duración para eventos sociales, bodas o fotografía.",
        precio: 60.00,
        imagen: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        activo: true
    },
    {
        id: "4",
        nombre: "Peinado de Gala",
        categoria: "Peinados",
        descripcion: "Peinados elaborados, ondas de agua, recogidos y semi-recogidos para ocasiones especiales.",
        precio: 40.00,
        imagen: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        activo: true
    },
    {
        id: "5",
        nombre: "Limpieza Facial Profunda",
        categoria: "Facial",
        descripcion: "Extracción de impurezas, exfoliación, mascarilla hidratante y masaje facial.",
        precio: 50.00,
        imagen: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        activo: true
    },
    {
        id: "6",
        nombre: "Tratamiento Anti-Edad",
        categoria: "Facial",
        descripcion: "Aplicación de serums de ácido hialurónico, radiofrecuencia y mascarilla tensora.",
        precio: 85.00,
        imagen: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        activo: true
    },
    {
        id: "7",
        nombre: "Depilación Láser (Corporal)",
        categoria: "Depilación",
        descripcion: "Sesión de depilación definitiva en zonas medianas con tecnología láser de diodo.",
        precio: 70.00,
        imagen: "https://images.unsplash.com/photo-1555820585-c5ae44394b79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        activo: true
    },
    {
        id: "8",
        nombre: "Diseño de Cejas y Henna",
        categoria: "Facial",
        descripcion: "Perfilado de cejas según visagismo facial y tintura temporal con henna natural.",
        precio: 25.00,
        imagen: "https://images.unsplash.com/photo-1620288863673-dbb7d27e7749?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        activo: true
    }
];

// Si el script se carga en el navegador como módulo, se exporta:
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mockServices;
} else if (typeof window !== 'undefined') {
    window.mockServices = mockServices; // Global para facilitar el uso sin modules
}
