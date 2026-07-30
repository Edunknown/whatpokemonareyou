/**
 * Utilidades puras de aleatoriedad.
 */

/**
 * Devuelve una copia barajada de la lista (Fisher-Yates).
 * No muta la lista original.
 * @template T
 * @param {readonly T[]} list
 * @returns {T[]}
 */
export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Selecciona `count` elementos aleatorios de la lista, sin repetición.
 * @template T
 * @param {readonly T[]} list
 * @param {number} count
 * @returns {T[]}
 */
export function pickRandom(list, count) {
  return shuffle(list).slice(0, Math.min(count, list.length));
}
