# ¿Qué Pokémon eres tú? — Pokédex OS

Test de personalidad con estética *Pokédex OS*: **20 preguntas elegidas al azar de un banco de 100**. Al terminar, la aplicación lee las **entradas reales de la Pokédex** desde la [PokeAPI](https://pokeapi.co/) y elige el Pokémon de **Kanto o Johto** que mejor te describe, con su ilustración oficial, tipos, estadísticas y la cita textual que justifica el resultado.

## Cómo funciona

1. Cada opción de respuesta suma puntos ocultos a uno o varios de los 18 tipos Pokémon (fuego, agua, psíquico…). Las preguntas son indirectas: nunca revelan qué tipo puntúan.
2. Al acabar se calculan tus **dos tipos dominantes** y se reúnen los Pokémon de la primera y segunda generación (nº 1–251) que comparten ambos tipos.
3. De esos candidatos se descarga su **entrada real de Pokédex en español** y se puntúa cuánto encaja con tu perfil: cada tipo de personalidad tiene un vocabulario asociado (*voltaje*, *descarga*, *bosque*, *telepatía*…) que se busca dentro del texto oficial.
4. Gana el Pokémon cuya descripción más te representa, y el resultado **cita las palabras concretas** que provocaron la coincidencia.

## Compartir

En móvil (iOS 15+ y Android) el botón abre la **ventana nativa de compartir** con tres cosas: una tarjeta generada en canvas con el Pokémon, su nombre, tipos y afinidad; el texto del resultado; y el enlace a la web.

Dos decisiones que conviene conocer si se toca este código:

- **La imagen se genera por adelantado**, al mostrarse el resultado. `navigator.share()` exige activación por gesto del usuario y en iOS Safari cualquier `await` dentro del manejador la consume, haciendo fallar la llamada con `NotAllowedError`. Por eso `shareResult()` no es `async` y el fichero debe estar listo antes del clic.
- **La URL va impresa dentro de la tarjeta**, no solo en el campo `url`: varias apps de mensajería descartan ese campo cuando se comparte un fichero, y así el enlace viaja igualmente.

Si el dispositivo no admite compartir ficheros, envía texto y enlace; si no admite compartir en absoluto (escritorio), copia al portapapeles.

## Animación

Las transiciones usan [GSAP](https://gsap.com/) sobre un componente Pokéball construido en CSS:

- Portada: pokéball girando y flotando, más pokéballs a la deriva de fondo.
- Carga: el **forcejeo de captura** clásico, con destello del botón entre sacudida y sacudida.
- Resultado: la pokéball **se abre en dos mitades**, estalla un destello y el Pokémon aparece; después entran insignias, texto y barras de estadísticas.

Si GSAP no carga o el sistema pide reducir el movimiento, la interfaz queda estática pero **completamente utilizable**: ninguna animación es requisito para ver el contenido.

## Ejecutar en local

El proyecto usa módulos ES nativos, así que necesita servirse por HTTP (no funciona abriendo `index.html` con doble clic):

```bash
# Con Python
python -m http.server 8123

# O con Node
npx serve .
```

Y abrir `http://localhost:8123`.

En **GitHub Pages** funciona directamente: Settings → Pages → Deploy from branch.

## Estructura

```
├── index.html              # Solo markup: pantallas y contenedores
├── css/
│   ├── base.css            # Variables de diseño, reset, animaciones
│   ├── layout.css          # Escenario, cabecera, barra de progreso
│   ├── pokeball.css        # Componente Pokéball y sus variantes
│   └── screens.css         # Estilos de cada pantalla
└── js/
    ├── config.js           # Configuración global (API, tiempos, límites)
    ├── constants/
    │   ├── pokemonTypes.js # Perfil y vocabulario de cada tipo
    │   ├── questions.js    # Banco de 100 preguntas con su puntuación
    │   └── ui.js           # Constantes de presentación
    ├── utils/
    │   ├── colorUtils.js   # Contraste de texto sobre color
    │   ├── formatUtils.js  # Formato de nombres y números
    │   ├── randomUtils.js  # Barajado y selección aleatoria
    │   └── shareUtils.js   # Compartir / copiar al portapapeles
    ├── services/
    │   └── pokeApiService.js # Cliente de la PokeAPI
    ├── core/
    │   ├── quizEngine.js   # Estado, selección de preguntas y puntuación
    │   ├── descriptionMatcher.js # Encaje perfil ↔ entrada de Pokédex
    │   └── resultBuilder.js # Construcción del modelo de resultado
    ├── animations/
    │   ├── motion.js       # Acceso a GSAP y preferencias de movimiento
    │   ├── pokeballAnimator.js  # Giro, forcejeo y apertura de una pokéball
    │   └── animationDirector.js # Orquestación de toda la coreografía
    ├── ui/
    │   ├── domRefs.js      # Punto único de acceso al DOM
    │   ├── pokeballFactory.js # Construcción del DOM de la pokéball
    │   ├── screenManager.js # Navegación entre pantallas
    │   ├── quizView.js     # Render del quiz
    │   └── resultView.js   # Render del resultado
    └── main.js             # Raíz de composición (controlador App)
```

## Arquitectura

- **`core/`** es lógica pura: no toca el DOM ni la red, por lo que es directamente testeable.
- **`services/`** es la única capa que conoce la forma de la API externa.
- **`ui/`** solo pinta: recibe modelos ya construidos y callbacks.
- **`main.js`** es la raíz de composición: instancia cada pieza y las conecta.

## Accesibilidad

- Navegable por teclado, con `focus-visible` en todos los controles.
- `aria-live` en la zona de preguntas y `progressbar` accesible.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Contraste AA sobre fondo oscuro y color de texto de los badges calculado por luminancia.

## Créditos

- Datos e ilustraciones: [PokeAPI](https://pokeapi.co/).
- Pokémon es una marca de Nintendo/Creatures Inc./GAME FREAK inc. Proyecto sin ánimo de lucro y sin afiliación.
