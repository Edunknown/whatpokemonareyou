import { SCREENS, SCREEN_LIST } from '../constants/ui.js';

const HIDDEN_CLASS = 'hidden';

/**
 * Controla qué pantalla está visible y los elementos ligados a ella
 * (barra de progreso y contador, exclusivos del quiz).
 */
export class ScreenManager {
  #screens;
  #progress;
  #counter;

  /**
   * @param {Record<string, HTMLElement>} refs Referencias del DOM.
   */
  constructor(refs) {
    this.#screens = {
      [SCREENS.LANDING]: refs.screenLanding,
      [SCREENS.QUIZ]: refs.screenQuiz,
      [SCREENS.LOADING]: refs.screenLoading,
      [SCREENS.RESULT]: refs.screenResult,
      [SCREENS.ERROR]: refs.screenError,
    };
    this.#progress = refs.progress;
    this.#counter = refs.counter;
  }

  /**
   * Muestra la pantalla indicada y oculta el resto.
   * @param {string} name Uno de los valores de SCREENS.
   */
  show(name) {
    SCREEN_LIST.forEach((screenName) => {
      this.#screens[screenName].classList.toggle(HIDDEN_CLASS, screenName !== name);
    });
    const isQuiz = name === SCREENS.QUIZ;
    this.#progress.classList.toggle(HIDDEN_CLASS, !isQuiz);
    this.#counter.classList.toggle(HIDDEN_CLASS, !isQuiz);
  }
}
