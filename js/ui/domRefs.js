/**
 * Punto único de acceso al DOM: recoge todas las referencias una vez.
 * Si un id cambia en el HTML, solo hay que tocar este archivo.
 */

/**
 * @returns {Record<string, HTMLElement>} Referencias a los nodos de la app.
 */
export function getDomRefs() {
  const byId = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Elemento requerido no encontrado: #${id}`);
    }
    return element;
  };

  return {
    progress: byId('progress'),
    progressFill: byId('progressFill'),
    counter: byId('counter'),

    screenLanding: byId('screen-landing'),
    screenQuiz: byId('screen-quiz'),
    screenLoading: byId('screen-loading'),
    screenResult: byId('screen-result'),
    screenError: byId('screen-error'),

    quizKicker: byId('quizKicker'),
    quizText: byId('quizText'),
    quizOptions: byId('quizOptions'),

    resultAffinity: byId('resAffinity'),
    resultArtwork: byId('resArt'),
    resultDexNumber: byId('resDex'),
    resultName: byId('resName'),
    resultTypes: byId('resTypes'),
    resultExplanation: byId('resExplanation'),
    resultStrengths: byId('resFort'),
    resultWeaknesses: byId('resDebil'),
    resultStats: byId('resStats'),
    copiedNote: byId('copiedNote'),

    buttonStart: byId('btnStart'),
    buttonShare: byId('btnShare'),
    buttonRepeat: byId('btnRepeat'),
    buttonRetry: byId('btnRetry'),
    buttonHome: byId('btnHome'),
  };
}
