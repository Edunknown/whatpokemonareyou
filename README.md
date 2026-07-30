# ¿Qué Pokémon eres tú? — Pokédex OS

Test de personalidad con estética *Pokédex OS*: **20 preguntas elegidas al azar de un banco de 100**. Al terminar, la aplicación cruza tu perfil con la [PokeAPI](https://pokeapi.co/) y revela qué Pokémon eres, con su ilustración oficial, tipos, explicación personalizada y estadísticas base.

## Cómo funciona

1. Cada opción de respuesta suma puntos ocultos a uno o varios de los 18 tipos Pokémon (fuego, agua, psíquico…). Las preguntas son indirectas: nunca revelan qué tipo puntúan.
2. Al acabar, se calculan tus **dos tipos dominantes** y se consulta la PokeAPI para obtener los Pokémon que comparten ambos tipos (hasta el nº 1025 de la Pokédex nacional).
3. La elección dentro de los candidatos es **determinista**: las mismas respuestas producen siempre el mismo Pokémon.

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
│   └── screens.css         # Estilos de cada pantalla
└── js/
    ├── config.js           # Configuración global (API, tiempos, límites)
    ├── constants/
    │   ├── pokemonTypes.js # Perfil de personalidad de cada tipo
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
    │   └── resultBuilder.js # Construcción del modelo de resultado
    ├── ui/
    │   ├── domRefs.js      # Punto único de acceso al DOM
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
