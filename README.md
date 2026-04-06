# 🌸 Lumière Spa – Plantilla Web Premium

<div align="center">
  <p><strong>Un diseño web estático puro, elegante y enfocado en la conversión para negocios de Belleza, Spa y Cuidado Personal.</strong></p>
</div>

---

## 📖 Sobre el Proyecto

**Lumière Spa** es más que una simple página de inicio. Es una **plantilla frontend autónoma y escalable**, construida bajo un enfoque de monorepositorio, diseñada específicamente para cautivar a través de una estética editorial, lujosa, minimalista y de altísima velocidad. Sin frameworks pesados; la belleza del *Vanilla Web* llevada a su máximo potencial estético.

### 💡 La Visión como "Plantilla"
Este proyecto nace bajo la premisa de ser un lienzo reutilizable capaz de ser desplegado para distintos clientes del sector de la belleza o cuidado personal. Destaca por su:
- **Datos Controlados (Mock Architecture):** La gestión del "Catálogo" y las "Promociones" no depende de HTML estático aburrido. Todo se levanta de variables controladas (`mock-data.js`), sentando las bases perfectas para posteriormente solo conectarlo fácil a una API Real (backend).
- **Escalabilidad Visual:** Diseñado con un sistema estricto de variables CSS en el elemento raíz (`:root`), permitiendo re-entrenar la paleta de colores de toda la plantilla en *cuestión de segundos* para que coincida con cualquier identidad de marca que adquiera la web.

---

## ✨ Características Principales

*   🌗 **Sistema Dual (Dark / Light Mode Nativo):** Una transición impecablemente balanceada. Mantiene la esencia cálida corporativa durante el día y muta hacia fondos carbón texturizados durante la noche, protegiendo rigurosamente la legibilidad.
*   🛍️ **Catálogo Reactivo:** Una grilla de presentación estilo portafolio con herramientas para que el usuario navegue interactivamente filtrando múltiples categorías de manera instantánea (cero *loading time*).
*   📱 **Animaciones Fluídas Tipo App:** Diseñado de la mano de **IntersectionObservers** y **Scroll-snap**. Revela los contenidos de forma orgánica conforme se baja, además de incluir un majestuoso Carrusel de Promociones horizontal totalmente inmersivo.
*   🚀 **Performance Inmaculado:** Todo construido con HTML, CSS, y JavaScript puros. Ni una sola external library lo sobrecarga.
*   💬 **Llamado a la Acción Fijo (WhatsApp):** Cuidando las tasas de conversión mediante un acceso directo ultra-premium incorporado.

---

## 🛠️ Panel Administrativo (Skeleton)

Para ofrecer un producto de ciclo completo, la plantilla incluye en `/frontend/admin/` una propuesta de **Dashboard de Gestión**. Si bien opera de manera estática mediante *mocks* en este momento, proporciona toda la Interfaz Gráfica necesaria (Listados, Contadores, Tarjetas de Adición y Edición) para orquestar los productos en el catálogo de manera nativa sin salirse de la estética elegante que define al proyecto principal.

---

## 📂 Arquitectura del Proyecto

El repositorio emula un **Monorepo** moderno compuesto por dos bloques principales:

```bash
Plantilla_1/
├── package.json           # Scripts de entorno
├── backend/               # Skeleton Server
│   ├── index.js           # Express App Server Config
│   ├── routes/            # (Listas para implementaciones lógicas directas)
│   ├── controllers/       
│   └── models/            
└── frontend/              # Directorio Raíz de Publicación Frontal
    ├── index.html         # Public Landing Page
    ├── admin/             # Módulo Administrativo Independiente
    │   └── index.html     # Dashboard
    └── assets/            # Directorios unificados
        ├── css/             
        ├── js/              # (main.js, mock-data.js, admin.js)
        └── images/          
```

---

## 🚀 Instalación y Puesta en Marcha

Para iniciar tu servidor de pruebas y experimentar el ambiente de desarrollo de la plantilla:

1. **Clonar este repositorio** en tu entorno local.
2. Asegúrate de tener **Node.js** instalado.
3. Instala todas las dependencias basales en el directorio raíz:
   ```bash
   npm install
   ```
4. Enciende el script del servidor configurado:
   ```bash
   npm run dev
   ```
5. 🌐 Navega al Puerto `3000`:
   - Vista Pública: `http://localhost:3000`
   - Vista Administrativa: `http://localhost:3000/admin`

---

*Desarrollado para quienes ven la programación como un portal al arte visual.* ✨
