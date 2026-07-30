import { CONFIG } from './config.js';
import { QUESTION_BANK } from './constants/questions.js';
import { TYPE_KEYS } from './constants/pokemonTypes.js';
import { SCREENS } from './constants/ui.js';
import { QuizEngine } from './core/quizEngine.js';
import { buildResult, pickPokemonId } from './core/resultBuilder.js';
import { PokeApiService } from './services/pokeApiService.js';
import { getDomRefs } from './ui/domRefs.js';
import { QuizView } from './ui/quizView.js';
import { ResultView } from './ui/resultView.js';
import { ScreenManager } from './ui/screenManager.js';
import { SHARE_OUTCOMES, shareOrCopy } from './utils/shareUtils.js';

/**
 * Controlador de la aplicación: orquesta motor, servicios y vistas.
 * Es la única pieza que conoce a todas las demás (raíz de composición).
 */
class App {
  #engine;
  #api;
  #screens;
  #quizView;
  #resultView;

  /** @type {object|null} Último resultado calculado. */
  #result = null;
  /** Evita responder dos veces la misma pregunta durante la pausa. */
  #answerLocked = false;

  constructor() {
    const refs = getDomRefs();

    this.#engine = new QuizEngine(QUESTION_BANK, TYPE_KEYS, CONFIG.QUESTIONS_PER_TEST);
    this.#api = new PokeApiService(CONFIG.API_BASE_URL);
    this.#screens = new ScreenManager(refs);
    this.#quizView = new QuizView(refs);
    this.#resultView = new ResultView(refs, CONFIG.COPY_FEEDBACK_MS);

    refs.buttonStart.addEventListener('click', () => this.#startQuiz());
    refs.buttonRepeat.addEventListener('click', () => this.#goHome());
    refs.buttonHome.addEventListener('click', () => this.#goHome());
    refs.buttonRetry.addEventListener('click', () => this.#computeResult());
    refs.buttonShare.addEventListener('click', () => this.#shareResult());
  }

  #startQuiz() {
    this.#engine.start();
    this.#result = null;
    this.#renderCurrentQuestion();
    this.#screens.show(SCREENS.QUIZ);
  }

  #goHome() {
    this.#result = null;
    this.#screens.show(SCREENS.LANDING);
  }

  #renderCurrentQuestion() {
    this.#answerLocked = false;
    this.#quizView.render(
      this.#engine.currentQuestion,
      {
        number: this.#engine.currentNumber,
        total: this.#engine.totalQuestions,
        progressPercent: this.#engine.progressPercent,
      },
      (optionIndex) => this.#handleAnswer(optionIndex),
    );
  }

  /**
   * @param {number} optionIndex Opción elegida por el usuario.
   */
  #handleAnswer(optionIndex) {
    if (this.#answerLocked) {
      return;
    }
    this.#answerLocked = true;

    this.#engine.answerCurrent(optionIndex);
    this.#quizView.markPicked(optionIndex);

    const isLast = this.#engine.isLastQuestion;
    setTimeout(() => {
      if (isLast) {
        this.#computeResult();
      } else {
        this.#engine.advance();
        this.#renderCurrentQuestion();
      }
    }, CONFIG.ADVANCE_MS);
  }

  async #computeResult() {
    this.#screens.show(SCREENS.LOADING);
    try {
      const [primaryKey, secondaryKey] = this.#engine.getTopTypes(2);
      const pool = await this.#api.fetchPokemonPoolByTypes(primaryKey, secondaryKey, CONFIG.MAX_DEX);
      const pokemonId = pickPokemonId(pool, this.#engine.answers);
      const pokemon = await this.#api.fetchPokemon(pokemonId);

      this.#result = buildResult({
        pokemon,
        primaryKey,
        secondaryKey,
        scores: this.#engine.scores,
        config: CONFIG,
      });

      this.#resultView.render(this.#result);
      this.#screens.show(SCREENS.RESULT);
    } catch {
      this.#screens.show(SCREENS.ERROR);
    }
  }

  async #shareResult() {
    if (!this.#result) {
      return;
    }
    const outcome = await shareOrCopy({
      title: '¿Qué Pokémon eres?',
      text: `He hecho el test y soy ${this.#result.name} (${this.#result.matchPercent}% de afinidad). ¿Qué Pokémon eres tú?`,
    });
    if (outcome === SHARE_OUTCOMES.COPIED) {
      this.#resultView.showCopiedNote();
    }
  }
}

new App();
