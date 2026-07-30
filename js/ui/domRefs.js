/**
 * Punto único de acceso al DOM: recoge todas las referencias una vez.
 * Si un id cambia en el HTML, solo hay que tocar este archivo.
 */

/** Ids requeridos, agrupados por área, con el nombre con el que se exponen. */
const REQUIRED_ELEMENTS = Object.freeze({
  driftLayer: 'driftLayer',
  progress: 'progress',
  progressFill: 'progressFill',
  counter: 'counter',

  screenLanding: 'screen-landing',
  screenQuiz: 'screen-quiz',
  screenLoading: 'screen-loading',
  screenResult: 'screen-result',
  screenError: 'screen-error',

  landingInner: 'landingInner',
  heroPokeballSlot: 'heroPokeball',
  loadingPokeballSlot: 'loadingPokeball',

  quizKicker: 'quizKicker',
  quizText: 'quizText',
  quizOptions: 'quizOptions',

  artworkWrap: 'artworkWrap',
  revealFlash: 'revealFlash',
  resultAffinity: 'resAffinity',
  resultArtwork: 'resArt',
  resultDexNumber: 'resDex',
  resultBody: 'resultBody',
  resultName: 'resName',
  resultTypes: 'resTypes',
  resultGenus: 'resGenus',
  resultPokedexEntry: 'resPokedex',
  resultExplanation: 'resExplanation',
  resultStrengths: 'resFort',
  resultWeaknesses: 'resDebil',
  resultStats: 'resStats',
  copiedNote: 'copiedNote',

  buttonStart: 'btnStart',
  buttonShare: 'btnShare',
  buttonRepeat: 'btnRepeat',
  buttonRetry: 'btnRetry',
  buttonHome: 'btnHome',
});

/**
 * @returns {Record<string, HTMLElement>} Referencias a los nodos de la app.
 * @throws {Error} Si falta alguno de los elementos requeridos.
 */
export function getDomRefs() {
  return Object.fromEntries(
    Object.entries(REQUIRED_ELEMENTS).map(([name, id]) => {
      const element = document.getElementById(id);
      if (!element) {
        throw new Error(`Elemento requerido no encontrado: #${id}`);
      }
      return [name, element];
    }),
  );
}
