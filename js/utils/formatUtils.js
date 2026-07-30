/**
 * Utilidades puras de formato de texto y números.
 */

/**
 * Rellena un número con ceros a la izquierda.
 * @param {number} value Número a formatear.
 * @param {number} [length=2] Longitud mínima del resultado.
 * @returns {string}
 */
export function padNumber(value, length = 2) {
  return String(value).padStart(length, '0');
}

/**
 * Convierte el nombre crudo de la PokeAPI ("mr-mime") en un nombre
 * legible ("Mr Mime").
 * @param {string} rawName Nombre tal como lo devuelve la API.
 * @returns {string}
 */
export function formatPokemonName(rawName) {
  return rawName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Restringe un valor a un rango [min, max].
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
