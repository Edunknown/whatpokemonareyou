/** Luminancia (0-255) por encima de la cual el texto legible es oscuro. */
const DARK_TEXT_LUMINANCE_THRESHOLD = 150;

const DARK_TEXT_COLOR = '#10131a';
const LIGHT_TEXT_COLOR = '#fff';

/**
 * Devuelve el color de texto (claro u oscuro) con mejor contraste
 * sobre el color de fondo indicado.
 * @param {string} hexColor Color de fondo en formato "#rrggbb".
 * @returns {string} Color de texto recomendado.
 */
export function getReadableTextColor(hexColor) {
  const hex = hexColor.replace('#', '');
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
  return luminance > DARK_TEXT_LUMINANCE_THRESHOLD ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR;
}
