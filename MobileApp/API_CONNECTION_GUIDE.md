# Guia de conexion MobileApp con backend Node.js

Esta guia explica como encender los servicios y actualizar la IP cuando cambies de red Wi-Fi.

## 1. Encender el backend

Abre una terminal en la carpeta del backend:

```bash
cd C:\adso3063934\17-nodejs
npm start
```

Si todo esta bien, debe salir algo parecido a:

```txt
Server running on http://localhost:3000
```

El backend queda corriendo en el puerto `3000`.

## 2. Encender la app Expo

Abre otra terminal en la carpeta de la app movil:

```bash
cd C:\adso3063934\MobileApp
npx expo start
```

Luego escanea el QR con Expo Go.

Si hay errores raros de cache, usa:

```bash
npx expo start -c
```

## 3. Sacar la IP del PC

Cuando uses Expo Go en el celular, NO debes usar `localhost` para llamar al backend.

`localhost` en el celular apunta al celular, no al PC.

Debes usar la IP local del computador.

En Windows, abre una terminal y ejecuta:

```bash
ipconfig
```

Busca la seccion de Wi-Fi:

```txt
Adaptador de LAN inalambrica Wi-Fi:
   Direccion IPv4 . . . . . . . . . . . . . : 192.168.x.x
```

Ejemplo:

```txt
Direccion IPv4: 192.168.10.19
```

Entonces la URL del backend sera:

```txt
http://192.168.10.19:3000
```

## 4. Donde cambiar la IP en la app

Actualmente la IP esta configurada en:

```txt
MobileApp/screens/RegisterScreen.js
```

Busca esta linea:

```js
const API_URL = "http://192.168.10.19:3000";
```

Si tu IP cambia, reemplazala por la nueva:

```js
const API_URL = "http://TU_NUEVA_IP:3000";
```

Ejemplo:

```js
const API_URL = "http://192.168.1.25:3000";
```

Guarda el archivo y recarga Expo.

## 5. Requisitos para que funcione desde el celular

- El backend debe estar encendido.
- Expo debe estar encendido.
- El celular y el PC deben estar conectados a la misma red Wi-Fi.
- La URL debe usar la IP del PC, no `localhost`.
- El puerto debe ser `3000`.

## 6. Probar si el backend responde desde el PC

Puedes probar en PowerShell:

```powershell
Invoke-RestMethod -Uri http://localhost:3000/register -Method Post -ContentType 'application/json' -Body '{"username":"test","password":"123456","image":""}'
```

Si funciona, debe responder:

```txt
User Registered!
```

## 7. Si desde el celular no conecta

Revisa esto:

1. Confirma que el backend este corriendo.
2. Confirma que el celular este en la misma Wi-Fi que el PC.
3. Confirma que `API_URL` tenga la IP actual del PC.
4. Prueba abrir en el navegador del celular:

```txt
http://TU_IP:3000
```

Puede que salga `Cannot GET /`, pero eso ya indica que el celular alcanza el servidor.

5. Si no abre nada, puede ser firewall de Windows bloqueando Node.js.

## 8. Nota sobre datos del registro

El backend actual espera estos campos en `POST /register`:

```js
{
  username,
  password,
  image
}
```

Aunque la pantalla de registro tiene email y fecha, la tabla `users` actual solo guarda:

- username
- password
- image

Archivo del backend donde esta la tabla:

```txt
17-nodejs/database.js
```

Endpoint del registro:

```txt
17-nodejs/index.js
```

## 9. Recomendacion futura

Mas adelante conviene crear un archivo central para la API, por ejemplo:

```txt
MobileApp/config/api.js
```

Y guardar alli:

```js
export const API_URL = "http://TU_IP:3000";
```

Asi no toca cambiar la IP en cada pantalla.

Por ahora solo esta conectada la pantalla de registro.
