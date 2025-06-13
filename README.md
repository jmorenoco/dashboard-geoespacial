# dashboard-geoespacial

Prueba Técnica para optar al cargo de Desarrollador Frontend en Servinformación S.A.S

![Screenshot Dashboard](image.png)

## Descripción

Dashboard geoespacial interactivo construido con Vue 3, Vite y Google Maps. Permite visualizar rutas, zonas de influencia, puntos de interés y datos analíticos sobre la ciudad de Bogotá. Incluye búsqueda de ubicaciones y widgets informativos.

## Características principales
- Visualización de mapa interactivo con Google Maps
- Búsqueda de ubicaciones y sugerencias inteligentes
- Visualización de rutas, hitos kilométricos y zonas de influencia
- Puntos de interés destacados
- Widgets analíticos (franjas etarias, resumen de puntos de interés, etc.)
- Interfaz responsiva y moderna con TailwindCSS

## Estructura del proyecto
- `src/components/` — Componentes principales (mapa, barra lateral, buscador)
- `src/views/` — Layout principal del dashboard
- `src/data/` — Datos simulados y utilidades
- `src/assets/` — Imágenes y estilos

## Tecnologías y dependencias
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [vue3-google-map](https://github.com/DiegoRBaquero/vue3-google-map)

## Instalación y uso

### Instalación de dependencias
```sh
npm install
```

### Compilación y Hot-Reload para Desarrollo
```sh
npm run dev
```

### Compilación y Minificación para Producción
```sh
npm run build
```

### Vista previa de producción
```sh
npm run preview
```

### Linter con [ESLint](https://eslint.org/)
```sh
npm run lint
```

## Variables de entorno
Para el funcionamiento del mapa, debes definir la variable `VITE_API_KEY_GOOGLE_MAPS` en un archivo `.env` con tu API Key de Google Maps.

## Configuración personalizada
Ver [Vite Configuration Reference](https://vite.dev/config/).

---

Desarrollado por [jmoreno.co](https://jmoreno.co) para Servinformación S.A.S