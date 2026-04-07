# Errores y Soluciones del Proyecto GameNextJS

## 1. Imagen de fondo que no se mostraba
- **Problema:** La ruta de la imagen era incorrecta en la clase Tailwind.
- **Solución:** Usar la ruta correcta desde la carpeta `public`, por ejemplo: `bg-[url('/img/bg-home.png')]`.

## 2. Error con fuentes de Google en Next.js
- **Problema:** Importación antigua de fuentes: `next/font/google/target.css`.
- **Solución:** Usar el nuevo sistema de fuentes de Next.js y eliminar importaciones antiguas.

## 3. Problemas con el botón de eliminar (API vs Server Component)
- **Problema:** Eliminar desde el cliente requería un endpoint API, pero Next.js App Router tenía problemas con rutas dinámicas y params.
- **Solución:** Eliminar directamente desde un componente de servidor usando Prisma y mostrar feedback visual en la misma página.

## 4. El paginador no cambiaba los juegos
- **Problema:**
  - El parámetro `params` en rutas dinámicas del App Router es una promesa y debe resolverse con `await`.
  - Se usaba `params.page` directamente, lo que causaba que siempre se mostrara la primera página.
- **Solución:**
  - Cambiar la firma del componente a:
    ```tsx
    export default async function GamesPage({ params }: { params: Promise<{ page: string }> }) {
      const { page } = await params;
      // ...
    }
    ```
  - Así, la paginación funciona correctamente y los juegos cambian según la página.

## 5. Redirección de /games a /games/1
- **Problema:** Al eliminar el archivo `page.tsx` en la carpeta `/games`, la ruta base no redirigía a la primera página.
- **Solución:** Crear un archivo `app/games/page.tsx` con:
    ```tsx
    import { redirect } from "next/navigation";
    export default function Page() {
      redirect("/games/1");
    }
    ```

## 6. Problemas con rutas dinámicas en API
- **Problema:** El parámetro `params.id` llegaba como `undefined` en el endpoint API.
- **Solución:** Se decidió eliminar juegos solo desde el server component, evitando la necesidad de un endpoint API.

---

**Recomendación:**
- Siempre revisa si los parámetros en rutas dinámicas son promesas y resuélvelos con `await`.
- Si usas el App Router de Next.js, prefiere lógica de negocio en server components para evitar problemas de sincronización de rutas y parámetros.

## 7. Add Game mostraba éxito pero no guardaba en la base de datos
- **Problema:** El formulario de agregar juego mostraba mensaje de éxito, pero el juego no aparecía ni en la tabla ni en Neon.
- **Causa:** `AddGameForm.tsx` enviaba el formulario a `/games/add`, pero esa ruta era una página visual y no una API que hiciera `prisma.games.create(...)`.
- **Solución:**
  - Crear una ruta API real en `app/api/games/route.ts` con método `POST`.
  - Enviar el formulario a `/api/games`.
  - Validar campos, `price`, `console_id` y la existencia de la consola.
  - Crear el juego con Prisma y luego regresar al listado con `router.push("/games")` y `router.refresh()`.

## 8. Add Game no mostraba el sidebar
- **Problema:** La vista de agregar juego abría solo el formulario, sin el mismo `SideBar` usado en `show` y `edit`.
- **Solución:** En `app/games/add/page.tsx` se envolvió `AddGameForm` dentro de `SideBar`, reutilizando el mismo patrón visual del resto del CRUD.

## 9. Delete Game se ejecutaba por navegación a `/games/delete/[id]`
- **Problema:** El borrado dependía de entrar a una URL como `/games/delete/18`, lo cual no era ideal porque convertía eliminar en navegación y no en una acción cliente.
- **Causa:** En `GamesInfo.tsx`, el icono de borrar usaba un enlace hacia la ruta vieja de delete.
- **Solución:**
  - Reemplazar el enlace por un botón.
  - Mostrar confirmación con `SweetAlert2`.
  - Hacer `fetch("/api/games/${id}", { method: "DELETE" })`.
  - Quitar el juego de la tabla usando estado local.
  - Finalmente usar `router.refresh()` para sincronizar con el servidor.

## 10. Error `ID inválido` al eliminar desde la API
- **Problema:** Aunque el juego sí existía, la API respondía `ID inválido`.
- **Causa:** En `app/api/games/[id]/route.ts`, el `params` de la ruta dinámica se estaba leyendo con una firma vieja.
- **Solución:** Ajustar el route handler para Next.js 16 leyendo `params` como promesa:
  ```ts
  export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id: rawId } = await params;
    const id = Number(rawId);
  }
  ```
  Con eso, el `id` llegó correctamente y el borrado comenzó a funcionar desde la API.

## 11. Error de codificación UTF-8 en `GamesInfo.tsx`
- **Problema:** Turbopack mostraba `Reading source code for parsing failed` e `invalid utf-8 sequence`.
- **Causa:** El archivo `GamesInfo.tsx` quedó guardado con una codificación que Next.js no podía interpretar bien.
- **Solución:** Reescribir el archivo y guardarlo en UTF-8 limpio para que el compilador pudiera leerlo correctamente.

## 12. La ruta vieja `/games/delete/[id]` seguía interfiriendo
- **Problema:** Aunque el botón nuevo ya usaba `fetch`, a veces el navegador seguía abriendo la ruta vieja por caché o bundles antiguos.
- **Solución:** Dejar la página `app/games/delete/[id]/page.tsx` neutralizada/redirigiendo al listado, para que el borrado real quedara solamente en la API y en el flujo cliente con `SweetAlert2`.
