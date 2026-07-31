/**
 * Compartir en móvil (Android e iOS) mediante la Web Share API,
 * con reserva a copiar al portapapeles en escritorio.
 *
 * REGLA IMPORTANTE: `navigator.share()` exige activación por gesto del
 * usuario. En iOS Safari, cualquier `await` previo dentro del manejador
 * consume esa activación y la llamada falla con NotAllowedError. Por eso
 * estas funciones NO son `async`: invocan `navigator.share()` de forma
 * síncrona y el fichero debe venir ya construido desde fuera.
 */

/** Desenlace de un intento de compartir. */
export const SHARE_OUTCOMES = Object.freeze({
  SHARED: 'shared',
  COPIED: 'copied',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
});

/**
 * ¿Puede este dispositivo compartir estos ficheros?
 * iOS 15+ y Android Chrome dicen que sí; escritorio, casi siempre que no.
 * @param {readonly File[]} files
 * @returns {boolean}
 */
export function canShareFiles(files) {
  if (!files?.length || typeof navigator.canShare !== 'function') {
    return false;
  }
  try {
    return navigator.canShare({ files: [...files] });
  } catch {
    return false;
  }
}

/**
 * Copia el texto al portapapeles.
 * @param {string} text
 * @returns {Promise<string>} Desenlace.
 */
function copyToClipboard(text) {
  if (!navigator.clipboard?.writeText) {
    return Promise.resolve(SHARE_OUTCOMES.FAILED);
  }
  return navigator.clipboard
    .writeText(text)
    .then(() => SHARE_OUTCOMES.COPIED)
    .catch(() => SHARE_OUTCOMES.FAILED);
}

/**
 * Abre la ventana nativa de compartir con imagen, texto y enlace.
 * Si el dispositivo no admite ficheros, comparte solo texto y enlace;
 * si no admite compartir, copia al portapapeles.
 *
 * Debe llamarse SIN `await` previo dentro del manejador del clic.
 *
 * @param {object} payload
 * @param {string} payload.title
 * @param {string} payload.text
 * @param {string} payload.url
 * @param {readonly File[]} [payload.files] Imagen ya generada, si la hay.
 * @returns {Promise<string>} Uno de los valores de SHARE_OUTCOMES.
 */
export function shareResult({ title, text, url, files }) {
  const fallbackText = `${text} ${url}`;

  if (typeof navigator.share !== 'function') {
    return copyToClipboard(fallbackText);
  }

  const payload = { title, text, url };
  if (canShareFiles(files)) {
    payload.files = [...files];
  }

  return navigator
    .share(payload)
    .then(() => SHARE_OUTCOMES.SHARED)
    .catch((error) => {
      // El usuario cerró la hoja de compartir: no es un fallo.
      if (error?.name === 'AbortError') {
        return SHARE_OUTCOMES.CANCELLED;
      }
      return copyToClipboard(fallbackText);
    });
}
