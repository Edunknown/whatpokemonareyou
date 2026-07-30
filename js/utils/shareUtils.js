/** Resultados posibles al intentar compartir un texto. */
export const SHARE_OUTCOMES = Object.freeze({
  SHARED: 'shared',
  COPIED: 'copied',
});

/**
 * Comparte un texto con la API nativa si está disponible;
 * si no, lo copia al portapapeles.
 * @param {{title: string, text: string}} payload Contenido a compartir.
 * @returns {Promise<string>} Uno de los valores de SHARE_OUTCOMES.
 */
export async function shareOrCopy({ title, text }) {
  if (navigator.share) {
    await navigator.share({ title, text }).catch(() => {});
    return SHARE_OUTCOMES.SHARED;
  }
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* Sin permiso de portapapeles: se muestra el aviso igualmente. */
  }
  return SHARE_OUTCOMES.COPIED;
}
