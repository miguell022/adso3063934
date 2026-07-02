# GTA Generations - Contexto de Migracion a React Native

## Objetivo del proyecto

GTA Generations es una app movil inspirada en la saga Grand Theft Auto. Primero se construyo como maqueta funcional en HTML, CSS y JavaScript vanilla dentro de `18-react-native/APP`. Ahora estamos migrando esa maqueta a una app real con React Native + Expo dentro de la carpeta `MobileApp`.

La idea de la app es permitir explorar:

- Generaciones de GTA: Era 2D, Era 3D, Era HD y Era Moderna.
- Juegos por generacion.
- Personajes/protagonistas.
- Perfil de usuario.
- Login y registro.

El estilo visual viene de la maqueta: fondo oscuro tipo GTA, imagenes urbanas, botones inferiores, colores por categoria/generacion y una interfaz pensada para movil.

## Proyecto original HTML/CSS/JS

La maqueta terminada esta en:

`18-react-native/APP`

Archivos principales de la maqueta:

- `layout.html`: pantalla Welcome.
- `login.html`: inicio de sesion.
- `register.html`: registro.
- `dashboard.html`: pantalla principal.
- `generations.html`: listado de generaciones.
- `generation-games.html`: juegos por generacion.
- `new-generation.html`: crear generacion.
- `edit-generation.html`: editar generacion.
- `profile.html`: perfil.
- `edit-profile.html`: editar perfil.
- `change-password.html`: cambiar contrasena.
- `games.html`: listado de juegos.
- `game-detail.html`: detalle de juego.
- `edit-game.html`: editar juego.
- `characters.html`: listado de personajes.
- `character-detail.html`: detalle de personaje.
- `edit-character.html`: editar personaje.
- `CSS/style.css`: estilos globales de la maqueta.
- `js/script.js`: logica quemada de navegacion, filtros, cards, detalle y edicion.

## Proyecto React Native actual

La app React Native esta en:

`MobileApp`

Estructura actual:

- `App.js`
- `screens/WelcomeScreen.js`
- `screens/LoginScreen.js`
- `screens/RegisterScreen.js`
- `assets/`
- `package.json`

Dependencias actuales importantes:

- Expo SDK 54.
- React Native.
- React Navigation bottom tabs instalado, aunque todavia no se esta usando como navegacion final.

## Assets copiados

Ya se copiaron assets desde la maqueta a:

`MobileApp/assets/gta`

Tambien se copiaron fuentes a:

`MobileApp/assets/fonts`

Imagenes importantes disponibles:

- `FondoWelcome.png`
- `FondoGeneral.png`
- `gtaSanAndreas.jpg`
- `GTAViceCity.webp`
- `GTA_IV_portada.webp`
- `GTA_V.webp`
- `GTA_VI_portada.webp`
- `RockstarLogo.png`
- `CJNew.png`
- `NikoBellic.png`
- `TommyVercetti.png`
- `TrevorPhillips.png`
- imagenes de eras y juegos.

Fuentes disponibles:

- `Pricedown Bl.otf`
- `postnobillscolombo-extrabold.ttf`

Nota: todavia no estamos usando fuentes personalizadas en React Native porque falta instalar/configurar `expo-font`.

## Lo que ya migramos en React Native

Estamos trabajando paso a paso, no en automatico.

Hasta ahora se avanzo principalmente en `WelcomeScreen.js`.

### WelcomeScreen actual

Ya tiene:

- `ImageBackground` con `FondoWelcome.png`.
- Capa `overlay` encima del fondo.
- Titulo `GTA Generations`.
- Imagen fija del futuro carrusel usando `gtaSanAndreas.jpg`.
- Descripcion general de la app.
- Botones `Login` y `Register` abajo usando `TouchableOpacity`.
- Navegacion funcional hacia Login y Register.

Conceptos explicados:

- `ImageBackground`: equivalente a usar una imagen de fondo.
- `overlay`: capa interna que oscurece el fondo y centra el contenido.
- `gameImage`: por ahora es imagen fija, luego sera parte de un carrusel.
- `TouchableOpacity`: boton presionable en React Native.

### Navegacion actual

La navegacion Welcome -> Login y Welcome -> Register ya funciona.

Todavia no hemos definido la navegacion final completa. La idea es primero migrar pantallas iniciales y luego pasar a dashboard/tabs.

## Pendiente inmediato

### 1. Terminar WelcomeScreen

Falta:

- Envolver la descripcion en una caja translucida `descriptionBox`.
- Ajustar espaciados para parecerse mas a la maqueta.
- Convertir la imagen fija en carrusel real.
- Agregar dots del carrusel.
- Agregar flechas izquierda/derecha si decidimos mantenerlas.
- Mejorar botones Login/Register con iconos o estilo mas parecido al HTML.

### 2. Migrar LoginScreen

Debe parecerse a la maqueta:

- Fondo GTA.
- Boton volver.
- Logo Rockstar.
- Formulario con email/user y password.
- Boton para mostrar/ocultar password.
- Boton Login.
- Footer con Login/Register.
- Navegacion hacia dashboard cuando se presione Login.

Por ahora puede usar datos quemados, sin conectar API.

### 3. Migrar RegisterScreen

Debe incluir:

- Fondo GTA.
- Boton volver.
- Avatar/icono.
- Selectores de fecha o inputs simples al inicio.
- Username.
- Email.
- Password.
- Confirm password.
- Boton Register.
- Footer con Login/Register.

### 4. Crear Dashboard en React Native

Basado en la maqueta:

- Juegos destacados.
- Protagonistas iconicos.
- Bottom navigation.

### 5. Migrar seccion Generaciones

Pantallas necesarias:

- `GenerationsScreen`
- `GenerationGamesScreen`
- `NewGenerationScreen`
- `EditGenerationScreen`

Debe incluir:

- Cards de Era 2D, 3D, HD y Moderna.
- Menu editar/eliminar.
- Boton plus para nueva generacion.
- Navegacion a juegos por generacion.

### 6. Migrar seccion Juegos

Pantallas necesarias:

- `GamesScreen`
- `GameDetailScreen`
- `EditGameScreen`

Debe incluir:

- Buscador.
- Chips de generacion.
- Filtros.
- Cards con color segun generacion.
- Detalle de juego.
- Editar juego.

Datos actuales importantes en maqueta:

- GTA 1997
- GTA London 1969
- GTA 2
- GTA III
- GTA Vice City
- GTA San Andreas
- GTA Liberty City Stories
- GTA Vice City Stories
- GTA IV
- GTA V
- GTA Online
- GTA VI

### 7. Migrar seccion Personajes

Pantallas necesarias:

- `CharactersScreen`
- `CharacterDetailScreen`
- `EditCharacterScreen`

Debe incluir:

- Buscador.
- Filtros por generacion/plataforma/orden.
- Grid de personajes.
- Detalle del personaje.
- Editar personaje.

Personajes actuales en maqueta:

- Carl Johnson (CJ)
- Tommy Vercetti
- Claude
- Toni Cipriani
- Victor Vance
- Niko Bellic
- Johnny Klebitz
- Luis Fernando Lopez
- Michael De Santa
- Franklin Clinton
- Trevor Phillips
- Lucia
- Jason

Nota: las imagenes de algunos personajes son temporales porque no tenemos imagen local especifica para todos.

### 8. Migrar perfil

Pantallas necesarias:

- `ProfileScreen`
- `EditProfileScreen`
- `ChangePasswordScreen`

Debe incluir:

- Avatar.
- Nombre.
- Informacion de cuenta.
- Editar perfil.
- Cambiar contrasena.
- Cerrar sesion.

## Decision sobre APIs de imagenes

Se reviso la posibilidad de usar una API para imagenes de personajes.

No hay una API oficial publica de Rockstar/GTA para personajes con imagenes.

Opciones posibles:

- IGDB API: puede tener personajes e imagenes, pero requiere credenciales de Twitch y normalmente debe usarse desde backend.
- RAWG API: sirve mas para juegos, screenshots y metadatos; no es ideal para personajes especificos.

Decision actual:

- Seguir usando imagenes locales en `assets/gta`.
- Para personajes sin imagen, usar imagen temporal y reemplazar luego.

## Forma de trabajo acordada

El usuario quiere ir paso a paso y entender lo que se cambia.

Reglas de trabajo:

- No hacer cambios grandes en automatico sin explicar.
- Revisar el codigo actual antes de dar instrucciones.
- Dar indicaciones basadas en el archivo real, no ejemplos sueltos.
- Avanzar pantalla por pantalla.
- Primero hacer que funcione, luego pulir estilo.

## Proximo paso recomendado

Continuar con `WelcomeScreen.js`:

1. Revisar el codigo actual.
2. Crear `descriptionBox` para que la descripcion quede en caja translucida.
3. Ajustar texto con tildes correctas.
4. Luego convertir `gameImage` en carrusel con estado `currentIndex`.

Despues de Welcome:

1. Migrar `LoginScreen.js`.
2. Migrar `RegisterScreen.js`.
3. Crear dashboard y navegacion principal.
