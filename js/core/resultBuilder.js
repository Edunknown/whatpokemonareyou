import { POKEMON_TYPES } from '../constants/pokemonTypes.js';
import { STAT_LABELS } from '../constants/ui.js';
import { clamp, formatPokemonName, padNumber } from '../utils/formatUtils.js';

/**
 * Construcción del modelo de resultado a partir de las puntuaciones,
 * de los datos de la PokeAPI y de la entrada real de la Pokédex.
 * Lógica pura: sin DOM ni red.
 */

/**
 * Selecciona una ventana de candidatos del conjunto, empezando en una
 * posición derivada de las respuestas: así el test es reproducible y
 * a la vez no analiza siempre los mismos Pokémon.
 * @param {readonly number[]} pool Ids candidatos, no vacío.
 * @param {readonly number[]} answers Opciones elegidas por el usuario.
 * @param {number} sampleSize Cuántos candidatos analizar a fondo.
 * @returns {number[]}
 */
export function selectCandidates(pool, answers, sampleSize) {
  if (pool.length <= sampleSize) {
    return [...pool];
  }
  const seed = answers.reduce((sum, answer, index) => sum + (answer + 1) * (index * 7 + 13), 0);
  const start = seed % pool.length;
  return Array.from({ length: sampleSize }, (_, offset) => pool[(start + offset) % pool.length]);
}

/**
 * Porcentaje de afinidad: combina cuánto domina tu tipo principal con
 * lo bien que la entrada de Pokédex encaja con tu perfil.
 * @param {object} params
 * @returns {number}
 */
function computeMatchPercent({ scores, primaryKey, secondaryKey, matchedWordCount, config }) {
  const primaryScore = scores[primaryKey];
  const secondaryScore = scores[secondaryKey] ?? 0;
  const dominance = primaryScore / ((primaryScore + secondaryScore) || 1);

  const range = config.MATCH_PCT_MAX - config.MATCH_PCT_MIN;
  // El perfil pesa dos tercios; lo que dice la Pokédex, el tercio restante.
  const descriptionBonus = Math.min(1, matchedWordCount / 3);
  const blended = dominance * (2 / 3) + descriptionBonus * (1 / 3);

  return clamp(
    Math.round(config.MATCH_PCT_MIN + blended * range),
    config.MATCH_PCT_MIN,
    config.MATCH_PCT_MAX,
  );
}

/**
 * Redacta la explicación citando lo que la Pokédex dice del Pokémon.
 * @param {object} params
 * @returns {string}
 */
function composeExplanation({ name, typesText, primaryProfile, secondaryProfile, matchedWords }) {
  const secondaryTrait = secondaryProfile.adj.split(',')[0];
  const base =
    `Durante el test has demostrado ser ${primaryProfile.adj}, con un lado más ${secondaryTrait}. ` +
    `Por eso te ha tocado ${name}, un Pokémon de tipo ${typesText} que, igual que tú, ${primaryProfile.line}.`;

  if (matchedWords.length === 0) {
    return base;
  }

  const highlighted = matchedWords.slice(0, 3).join(', ');
  return `${base} Su propia entrada de la Pokédex lo confirma: habla de ${highlighted}, justo el terreno donde tú te mueves.`;
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
 * @param {{description: string, genus: string}} params.entry Entrada de Pokédex elegida.
 * @param {readonly string[]} params.matchedWords Palabras del perfil halladas en la entrada.
 * @param {string} params.primaryKey Tipo dominante del usuario.
 * @param {string} params.secondaryKey Tipo secundario del usuario.
 * @param {Readonly<Record<string, number>>} params.scores Puntuaciones finales.
 * @param {object} params.config Configuración de la aplicación.
 * @returns {object} Modelo listo para pintar en la vista de resultado.
 */
export function buildResult({ pokemon, entry, matchedWords, primaryKey, secondaryKey, scores, config }) {
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
    genus: entry.genus,
    pokedexEntry: entry.description,
    matchPercent: computeMatchPercent({
      scores,
      primaryKey,
      secondaryKey,
      matchedWordCount: matchedWords.length,
      config,
    }),
    types: displayTypes,
    explanation: composeExplanation({
      name,
      typesText,
      primaryProfile,
      secondaryProfile,
      matchedWords,
    }),
    strengths: primaryProfile.fort,
    weaknesses: primaryProfile.debil,
    stats,
  };
}
