/**
 * Configuración global de la aplicación.
 * Único lugar donde se ajustan parámetros de comportamiento.
 */
export const CONFIG = Object.freeze({
  /** URL base de la PokeAPI. */
  API_BASE_URL: 'https://pokeapi.co/api/v2',

  /**
   * Nº máximo de la Pokédex nacional a considerar.
   * 251 = final de la segunda generación (Johto).
   */
  MAX_DEX: 251,

  /** Preguntas mostradas por partida, elegidas al azar del banco. */
  QUESTIONS_PER_TEST: 20,

  /**
   * Cuántos Pokémon candidatos se analizan a fondo (se descarga su
   * entrada de Pokédex para compararla con el perfil del usuario).
   * Más candidatos = mejor emparejamiento, pero más peticiones.
   */
  CANDIDATE_SAMPLE_SIZE: 14,

  /** Idiomas de la entrada de Pokédex, por orden de preferencia. */
  POKEDEX_LANGUAGES: Object.freeze(['es', 'en']),

  /** Pausa (ms) tras elegir una opción antes de avanzar. */
  ADVANCE_MS: 240,

  /** Rango del porcentaje de afinidad mostrado. */
  MATCH_PCT_MIN: 78,
  MATCH_PCT_MAX: 98,

  /** Valor de referencia para normalizar las estadísticas base. */
  STAT_MAX_VALUE: 180,

  /** Duración (ms) del aviso "copiado al portapapeles". */
  COPY_FEEDBACK_MS: 2500,
});
