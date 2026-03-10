# Proyecto: Migración de API de Mascotas a React

## Resumen General
- **Objetivo:** Migrar una API de mascotas hecha en Laravel para usarla con un frontend en React, manteniendo el estilo visual de ejercicios anteriores y asegurando una experiencia de usuario moderna y robusta.
- **Backend:** Laravel API (con Sanctum para autenticación y endpoints CRUD para mascotas).
- **Frontend:** React (con react-router-dom, axios, sweetalert2), estructura de componentes, manejo de rutas, autenticación, y operaciones CRUD.

## Progreso y Componentes

### 1. Pokédex (React + pokeapi.co)
- Se implementó una Pokédex en React consumiendo la API de pokeapi.co.
- Se aplicó un estilo visual similar a ejercicios previos.

### 2. Migración API Mascotas (Laravel + React)
- **Estructura:**
  - Backend en `21-larapi/` (Laravel)
  - Frontend en `15-reactjs-larapi/` (React)
- **Componentes principales:**
  - `Login.jsx`: Maneja autenticación, muestra errores, integra SweetAlert2.
  - `Dashboard.jsx`: Lista mascotas, incluye botones de acción (ver, editar, eliminar), navegación y lógica de borrado con confirmación.
  - `AddPet.jsx`: Formulario controlado para agregar mascotas, integración con API y feedback con SweetAlert2.
  - `ShowPet.jsx` y `EditPet.jsx`: (En progreso o pendientes) para ver y editar mascotas.
- **Rutas:**
  - `/login`, `/dashboard`, `/add`, `/show/:id`, `/edit/:id`.
- **Estilo:**
  - CSS adaptado para React, imágenes en `public/imgs`, uso correcto de `className`.

### 3. Funcionalidades Clave
- **Autenticación:**
  - Login con almacenamiento de token en localStorage.
  - Redirección y protección de rutas.
- **CRUD Mascotas:**
  - Listado, creación, eliminación (con confirmación y feedback).
  - Integración de SweetAlert2 para mensajes de éxito/error.
- **UI/UX:**
  - Botones de acción en el dashboard.
  - Formularios controlados y navegación tras acciones.
  - Manejo de errores y mensajes amigables.

## Problemas y Soluciones
- **Errores comunes:**
  - Problemas con rutas de imágenes y CSS → Solucionado usando rutas absolutas y corrigiendo `className`.
  - Advertencias de React sobre inputs no controlados → Formularios convertidos a controlados.
  - Errores de importación y nombres de archivos → Corregidos para coincidir con el sistema de archivos.
  - Lógica de borrado no definida → Se implementó `handleDelete` con confirmación y actualización de la lista.

## Pendientes / Próximos Pasos
- Finalizar formularios y lógica de edición/visualización de mascotas.
- Mejorar feedback de usuario y validaciones.
- Pulir detalles de UI/UX y navegación.

---

**Última actualización:** 10 de marzo de 2026
