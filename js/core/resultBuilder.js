import { POKEMON_TYPES } from '../constants/pokemonTypes.js';
import { STAT_LABELS } from '../constants/ui.js';
import { clamp, formatPokemonName, padNumber } from '../utils/formatUtils.js';

/**
 * Construcción del modelo de resultado a partir de las puntuaciones
 * y de los datos crudos de la PokeAPI. Lógica pura, sin DOM ni red.
 */

/**
 * Elige un id del conjunto de candidatos de forma determinista:
 * las mismas respuestas producen siempre el mismo Pokémon.
 * @param {readonly number[]} pool Ids candidatos, no vacío.
 * @param {readonly number[]} answers Opciones elegidas por el usuario.
 * @returns {number}
 */
export function pickPokemonId(pool, answers) {
  const seed = answers.reduce((sum, answer, index) => sum + (answer + 1) * (index * 7 + 13), 0);
  return pool[seed % pool.length];
}

/**
 * Porcentaje de afinidad según cuánto domina el tipo primario
 * sobre el secundario.
 * @param {Readonly<Record<string, number>>} scores
 * @param {string} primaryKey
 * @param {string} secondaryKey
 * @param {{MATCH_PCT_MIN: number, MATCH_PCT_MAX: number}} config
 * @returns {number}
 */
function computeMatchPercent(scores, primaryKey, secondaryKey, config) {
  const primaryScore = scores[primaryKey];
  const secondaryScore = scores[secondaryKey] ?? 0;
  const dominance = primaryScore / ((primaryScore + secondaryScore) || 1);
  const raw = Math.round(config.MATCH_PCT_MIN + dominance * (config.MATCH_PCT_MAX - config.MATCH_PCT_MIN));
  return clamp(raw, config.MATCH_PCT_MIN, config.MATCH_PCT_MAX);
}

/**
 * Redacta la explicación personalizada del resultado.
 * @param {string} pokemonName
 * @param {string} pokemonTypesText Tipos del Pokémon ya traducidos ("Fuego / Volador").
 * @param {object} primaryProfile Perfil del tipo dominante del usuario.
 * @param {object} secondaryProfile Perfil del tipo secundario del usuario.
 * @returns {string}
 */
function composeExplanation(pokemonName, pokemonTypesText, primaryProfile, secondaryProfile) {
  const secondaryTrait = secondaryProfile.adj.split(',')[0];
  return (
    `Durante el test has demostrado ser ${primaryProfile.adj}, con un lado más ${secondaryTrait}. ` +
    `Esa mezcla encaja de lleno con ${pokemonName}, un Pokémon de tipo ${pokemonTypesText} ` +
    `que, igual que tú, ${primaryProfile.line}.`
  );
}

/**
 * Traduce un tipo de la API a su presentación (nombre + color).
 * @param {{type: {name: string}}} apiTypeEntry
 * @returns {{es: string, color: string}}
 */
function toDisplayType(apiTypeEntry) {
  const profile = POKEMON_TYPES[apiTypeEntry.type.name];
  return profile
    ? { es: profile.es, color: profile.color }
    : { es: apiTypeEntry.type.name, color: '#777' };
}

/**
 * Construye el modelo de vista del resultado final.
 * @param {object} params
 * @param {object} params.pokemon Respuesta cruda de /pokemon/{id}.
 * @param {string} params.primaryKey Tipo dominante del usuario.
 * @param {string} params.secondaryKey Tipo secundario del usuario.
 * @param {Readonly<Record<string, number>>} params.scores Puntuaciones finales.
 * @param {object} params.config Configuración de la aplicación.
 * @returns {object} Modelo listo para pintar en la vista de resultado.
 */
export function buildResult({ pokemon, primaryKey, secondaryKey, scores, config }) {
  const name = formatPokemonName(pokemon.name);
  const officialArtwork = pokemon.sprites.other?.['official-artwork']?.front_default;
  const artwork = officialArtwork ?? pokemon.sprites.front_default;

  const displayTypes = pokemon.types.map(toDisplayType);
  const typesText = displayTypes.map((type) => type.es).join(' / ');

  const primaryProfile = POKEMON_TYPES[primaryKey];
  const secondaryProfile = POKEMON_TYPES[secondaryKey];

  const stats = pokemon.stats.map((stat) => ({
    label: STAT_LABELS[stat.stat.name] ?? stat.stat.name,
    value: stat.base_stat,
    percent: clamp(Math.round((stat.base_stat / config.STAT_MAX_VALUE) * 100), 0, 100),
  }));

  return {
    name,
    artwork,
    dexNumber: padNumber(pokemon.id, 3),
    matchPercent: computeMatchPercent(scores, primaryKey, secondaryKey, config),
    types: displayTypes,
    explanation: composeExplanation(name, typesText, primaryProfile, secondaryProfile),
    strengths: primaryProfile.fort,
    weaknesses: primaryProfile.debil,
    stats,
  };
}
