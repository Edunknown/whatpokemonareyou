/**
 * Constantes de presentación compartidas por las vistas.
 */

/** Letras con las que se etiquetan las opciones de cada pregunta. */
export const OPTION_LETTERS = Object.freeze(['A', 'B', 'C', 'D', 'E']);

/** Identificadores de las pantallas de la aplicación. */
export const SCREENS = Object.freeze({
  LANDING: 'landing',
  QUIZ: 'quiz',
  LOADING: 'loading',
  RESULT: 'result',
  ERROR: 'error',
});

/** Lista de todas las pantallas, en orden de declaración en el DOM. */
export const SCREEN_LIST = Object.freeze(Object.values(SCREENS));

/** Etiquetas en español para las estadísticas base de la PokeAPI. */
export const STAT_LABELS = Object.freeze({
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp',
  'special-defense': 'Def. Esp',
  speed: 'Velocidad',
});

/** Textos del encabezado de pregunta según su clase. */
export const QUESTION_KIND_LABELS = Object.freeze({
  choice: 'Elige una opción',
  scenario: 'Elige un escenario',
});
