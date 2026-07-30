/**
 * Construcción del DOM del componente Pokéball.
 * Centralizado aquí para no repetir el mismo marcado en cada pantalla.
 */

/** Partes que componen una pokéball, en orden de apilado. */
const POKEBALL_PARTS = Object.freeze([
  { tag: 'div', className: 'pokeball-half pokeball-top', part: 'top' },
  { tag: 'div', className: 'pokeball-half pokeball-bottom', part: 'bottom' },
  { tag: 'div', className: 'pokeball-band', part: 'band' },
  { tag: 'div', className: 'pokeball-button', part: 'button' },
  { tag: 'div', className: 'pokeball-shine', part: 'shine' },
]);

/**
 * Crea una pokéball completa.
 * @param {string} [modifier] Clase modificadora (p. ej. "pokeball--hero").
 * @returns {HTMLElement}
 */
export function createPokeball(modifier = '') {
  const ball = document.createElement('div');
  ball.className = modifier ? `pokeball ${modifier}` : 'pokeball';
  ball.setAttribute('aria-hidden', 'true');

  POKEBALL_PARTS.forEach(({ tag, className, part }) => {
    const element = document.createElement(tag);
    element.className = className;
    element.dataset.part = part;
    if (part === 'button') {
      const core = document.createElement('span');
      core.className = 'pokeball-button-core';
      element.appendChild(core);
    }
    ball.appendChild(element);
  });

  return ball;
}

/**
 * Crea varias pokéballs decorativas de fondo.
 * @param {number} count Cuántas generar.
 * @returns {HTMLElement[]}
 */
export function createDriftPokeballs(count) {
  return Array.from({ length: count }, () => createPokeball('pokeball--drift'));
}
