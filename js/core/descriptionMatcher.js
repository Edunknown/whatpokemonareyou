import { POKEMON_TYPES } from '../constants/pokemonTypes.js';

/**
 * Emparejamiento entre el perfil de personalidad del usuario y la
 * entrada real de la Pokédex de cada candidato.
 *
 * La idea: en vez de elegir un Pokémon solo por su tipo, se lee lo que
 * la Pokédex dice de él y se busca cuál describe mejor a esta persona.
 */

/** Peso de una coincidencia con el tipo dominante del usuario. */
const PRIMARY_MATCH_WEIGHT = 3;
/** Peso de una coincidencia con el tipo secundario. */
const SECONDARY_MATCH_WEIGHT = 2;

/** Equivalencias sin acento, para comparar texto en español. */
const ACCENT_MAP = Object.freeze({
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n',
});

/**
 * Normaliza un texto para comparar: minúsculas y sin acentos.
 * @param {string} text
 * @returns {string}
 */
function normalize(text) {
  return text.toLowerCase().replace(/[áéíóúüñ]/g, (char) => ACCENT_MAP[char]);
}

/**
 * Palabras clave del perfil que aparecen en la descripción.
 * @param {string} normalizedDescription Descripción ya normalizada.
 * @param {readonly string[]} keywords
 * @returns {string[]} Palabras encontradas, sin repetir.
 */
function findMatches(normalizedDescription, keywords) {
  return keywords.filter((keyword) => normalizedDescription.includes(normalize(keyword)));
}

/**
 * Puntúa a un candidato según cuánto encaja su entrada de Pokédex
 * con el perfil de personalidad del usuario.
 * @param {string} description Entrada de Pokédex del candidato.
 * @param {string} primaryKey Tipo dominante del usuario.
 * @param {string} secondaryKey Tipo secundario del usuario.
 * @returns {{score: number, matchedWords: string[]}}
 */
export function scoreDescription(description, primaryKey, secondaryKey) {
  const normalized = normalize(description);

  const primaryMatches = findMatches(normalized, POKEMON_TYPES[primaryKey].keywords);
  const secondaryMatches = findMatches(normalized, POKEMON_TYPES[secondaryKey].keywords);

  const score =
    primaryMatches.length * PRIMARY_MATCH_WEIGHT +
    secondaryMatches.length * SECONDARY_MATCH_WEIGHT;

  // Las del tipo dominante van primero: son las que mejor te describen.
  const matchedWords = [...new Set([...primaryMatches, ...secondaryMatches])];

  return { score, matchedWords };
}

/**
 * Elige, entre los candidatos, aquel cuya entrada de Pokédex encaja
 * mejor con el perfil. En caso de empate gana el de menor número de
 * Pokédex, de modo que el resultado sea reproducible.
 * @param {readonly {id: number, description: string}[]} candidates
 * @param {string} primaryKey
 * @param {string} secondaryKey
 * @returns {{candidate: object, score: number, matchedWords: string[]}}
 */
export function pickBestMatch(candidates, primaryKey, secondaryKey) {
  const scored = candidates.map((candidate) => ({
    candidate,
    ...scoreDescription(candidate.description, primaryKey, secondaryKey),
  }));

  return scored.reduce((best, current) => {
    if (current.score !== best.score) {
      return current.score > best.score ? current : best;
    }
    return current.candidate.id < best.candidate.id ? current : best;
  });
}
