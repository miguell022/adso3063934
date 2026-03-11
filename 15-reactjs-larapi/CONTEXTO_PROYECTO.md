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

---

## Avances recientes (11 de marzo de 2026)

- Se corrigieron los estilos de los botones y formularios para que coincidan con el diseño original.
- Se implementó el componente EditPet con carga de datos, formulario controlado y actualización vía API.
- Se mejoró el manejo de errores en SweetAlert para mostrar mensajes personalizados de la API.
- Se ajustó el login para mostrar alerta de éxito al iniciar sesión.
- Se revisaron y comentaron los componentes principales (Dashboard, AddPet, ShowPet, EditPet) para facilitar el mantenimiento.
- Se solucionaron errores de rutas y propiedades de React (`className`, `htmlFor`).
- Se verificó y ajustó la estructura de los formularios para que el CSS se aplique correctamente.
- Se mejoró la navegación interna usando Link y useNavigate.
- Se documentó el uso de headers en las peticiones para autenticación y formato JSON.
- Se mantuvo la estructura de los componentes y la lógica de CRUD para mascotas.
- Se implementó protección de rutas con PrivateRoute, mostrando alerta y redirigiendo al login si el usuario no está autenticado.
- Se mejoró la seguridad: si el token es alterado o inválido, se elimina, se muestra el mensaje de la API y se redirige al login en todos los componentes protegidos (Dashboard, AddPet, EditPet, ShowPet).
- Se revisó y ajustó el CSS para unificar el tamaño de los botones, aunque persiste una diferencia visual menor.
- Se comentaron bloques clave de PrivateRoute para facilitar el mantenimiento.
- Se depuró el flujo de login y redirección, asegurando feedback visual y experiencia consistente.
- Se verificó la estructura y tamaño de imágenes de botones.

---

## Aspectos cruciales del proyecto

- Integración de React con Laravel API para CRUD de mascotas, asegurando comunicación segura y eficiente.
- Manejo de autenticación mediante tokens almacenados en localStorage, protegiendo rutas y operaciones sensibles.
- Implementación de SweetAlert2 para feedback visual, mostrando mensajes de éxito y errores personalizados según respuesta de la API.
- Uso de Axios para peticiones HTTP, gestionando headers y errores de forma centralizada.
- Estructura modular de componentes (Login, Dashboard, AddPet, EditPet, ShowPet) para facilitar mantenimiento y escalabilidad.
- Comentado detallado en los componentes principales, permitiendo comprensión rápida del flujo y lógica.
- Validación y control de formularios para evitar datos incompletos o erróneos.
- Navegación interna con React Router (Link, useNavigate) para experiencia fluida.
- Adaptación de estilos CSS heredados para mantener coherencia visual con versiones anteriores.
- Pruebas y depuración iterativa, resolviendo errores de rutas, props y lógica de estado.

---

### Protección de rutas y token: explicación detallada

- **Ruta protegida con PrivateRoute:**
  - Creamos un componente `PrivateRoute` que envuelve las rutas sensibles (Dashboard, AddPet, EditPet, ShowPet).
  - Este componente verifica si existe un token de autenticación en `localStorage`.
  - Si el token no existe, muestra una alerta (SweetAlert2) con el mensaje de la API ("Unauthenticated.") y redirige al usuario al login.
  - Si el token existe, permite el acceso al contenido protegido.

- **Manejo de token inválido o alterado:**
  - En cada petición protegida (Axios), se revisa la respuesta de la API.
  - Si la API responde con "Unauthenticated." o código 401, se elimina el token de `localStorage`.
  - Se muestra una alerta con el mensaje de la API y, al cerrarla, se redirige al login.
  - Esto asegura que, aunque el usuario altere el token manualmente, no podrá interactuar con la aplicación y será forzado a iniciar sesión nuevamente.

- **Ventajas de este enfoque:**
  - El usuario nunca ve información protegida si no está autenticado.
  - El feedback visual es inmediato y claro, usando SweetAlert2.
  - La seguridad es consistente en toda la app, ya que el manejo de token se aplica en todos los componentes que hacen peticiones protegidas.
  - El flujo de redirección es automático y no requiere intervención manual.

- **Resumen técnico:**
  - PrivateRoute actúa como un guardián de acceso.
  - El token es la llave de entrada; si falta o es inválido, se cierra la sesión y se fuerza el login.
  - El sistema es robusto ante intentos de manipulación del token.

---


