import { AnimationDirector } from './animations/animationDirector.js';
import { CONFIG } from './config.js';
import { QUESTION_BANK } from './constants/questions.js';
import { TYPE_KEYS } from './constants/pokemonTypes.js';
import { SCREENS } from './constants/ui.js';
import { pickBestMatch } from './core/descriptionMatcher.js';
import { QuizEngine } from './core/quizEngine.js';
import { buildResult, selectCandidates } from './core/resultBuilder.js';
import { PokeApiService } from './services/pokeApiService.js';
import { buildShareCard } from './services/shareCardService.js';
import { getDomRefs } from './ui/domRefs.js';
import { createDriftPokeballs, createPokeball } from './ui/pokeballFactory.js';
import { QuizView } from './ui/quizView.js';
import { ResultView } from './ui/resultView.js';
import { ScreenManager } from './ui/screenManager.js';
import { SHARE_OUTCOMES, shareResult } from './utils/shareUtils.js';

/** Cuántas pokéballs decorativas flotan de fondo. */
const DRIFT_POKEBALL_COUNT = 4;

/**
 * Monta las pokéballs del documento y devuelve sus elementos.
 * @param {Record<string, HTMLElement>} refs
 * @returns {{hero: HTMLElement, loading: HTMLElement, result: HTMLElement, drift: HTMLElement[]}}
 */
function mountPokeballs(refs) {
  const hero = createPokeball('pokeball--hero');
  refs.heroPokeballSlot.appendChild(hero);

  const loading = createPokeball('pokeball--loading pokeball--css-wobble');
  refs.loadingPokeballSlot.appendChild(loading);

  const result = createPokeball('pokeball--result');
  refs.artworkWrap.appendChild(result);

  const drift = createDriftPokeballs(DRIFT_POKEBALL_COUNT);
  refs.driftLayer.append(...drift);

  return { hero, loading, result, drift };
}

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
  #director;

  /** @type {object|null} Último resultado calculado. */
  #result = null;
  /**
   * Imagen para compartir, generada por adelantado.
   * Debe estar lista ANTES del clic: en iOS, esperar dentro del manejador
   * invalidaría el gesto del usuario y la ventana nativa no se abriría.
   * @type {File|null}
   */
  #shareCard = null;
  /** Evita responder dos veces la misma pregunta durante la pausa. */
  #answerLocked = false;

  constructor() {
    const refs = getDomRefs();
    const pokeballs = mountPokeballs(refs);

    this.#engine = new QuizEngine(QUESTION_BANK, TYPE_KEYS, CONFIG.QUESTIONS_PER_TEST);
    this.#api = new PokeApiService(CONFIG.API_BASE_URL);
    this.#screens = new ScreenManager(refs);
    this.#quizView = new QuizView(refs);
    this.#resultView = new ResultView(refs, CONFIG.COPY_FEEDBACK_MS);
    this.#director = new AnimationDirector(refs, pokeballs);

    refs.buttonStart.addEventListener('click', () => this.#startQuiz());
    refs.buttonRepeat.addEventListener('click', () => this.#goHome());
    refs.buttonHome.addEventListener('click', () => this.#goHome());
    refs.buttonRetry.addEventListener('click', () => this.#computeResult());
    refs.buttonShare.addEventListener('click', () => this.#shareResult());

    this.#director.playLandingIntro();
  }

  async #startQuiz() {
    await this.#director.playStartTransition();
    this.#engine.start();
    this.#result = null;
    this.#shareCard = null;
    this.#screens.show(SCREENS.QUIZ);
    this.#renderCurrentQuestion();
  }

  #goHome() {
    this.#result = null;
    this.#shareCard = null;
    this.#screens.show(SCREENS.LANDING);
    this.#director.playLandingIntro();
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
    this.#director.playQuestionIn();
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

  /**
   * Calcula el resultado: reduce el perfil a dos tipos, reúne candidatos
   * de Kanto y Johto, lee su entrada real de Pokédex y se queda con el
   * que mejor describe a esta persona.
   */
  async #computeResult() {
    this.#screens.show(SCREENS.LOADING);
    this.#director.startCaptureLoop();

    try {
      const [primaryKey, secondaryKey] = this.#engine.getTopTypes(2);

      const pool = await this.#api.fetchPokemonPoolByTypes(primaryKey, secondaryKey, CONFIG.MAX_DEX);
      const candidateIds = selectCandidates(pool, this.#engine.answers, CONFIG.CANDIDATE_SAMPLE_SIZE);
      const entries = await this.#api.fetchPokedexEntries(candidateIds, CONFIG.POKEDEX_LANGUAGES);

      if (entries.length === 0) {
        throw new Error('Ningún candidato tiene entrada de Pokédex disponible');
      }

      const { candidate, matchedWords } = pickBestMatch(entries, primaryKey, secondaryKey);
      const pokemon = await this.#api.fetchPokemon(candidate.id);

      this.#result = buildResult({
        pokemon,
        entry: candidate,
        matchedWords,
        primaryKey,
        secondaryKey,
        scores: this.#engine.scores,
        config: CONFIG,
      });

      this.#resultView.render(this.#result);
      this.#director.stopCaptureLoop();
      this.#screens.show(SCREENS.RESULT);
      this.#director.playResultReveal();
      this.#prepareShareCard(this.#result);
    } catch {
      this.#director.stopCaptureLoop();
      this.#screens.show(SCREENS.ERROR);
    }
  }

  /**
   * Genera la tarjeta en segundo plano nada más mostrar el resultado.
   * Si falla (imagen sin CORS, canvas no disponible…), se compartirá
   * solo texto y enlace: nunca bloquea la acción de compartir.
   * @param {object} result
   */
  async #prepareShareCard(result) {
    this.#shareCard = null;
    try {
      const card = await buildShareCard(result, CONFIG.SHARE_CARD, CONFIG.SHARE_URL);
      // Puede haber cambiado de resultado mientras se generaba.
      if (this.#result === result) {
        this.#shareCard = card;
      }
    } catch {
      this.#shareCard = null;
    }
  }

  /**
   * Abre la ventana nativa de compartir. Ojo: no puede haber ningún
   * `await` antes de `shareResult()` o iOS rechazaría la llamada.
   */
  #shareResult() {
    if (!this.#result) {
      return;
    }
    const text = `He hecho el test y soy ${this.#result.name} (${this.#result.matchPercent}% de afinidad). ¿Qué Pokémon eres tú?`;

    shareResult({
      title: '¿Qué Pokémon eres?',
      text,
      url: CONFIG.SHARE_URL,
      files: this.#shareCard ? [this.#shareCard] : undefined,
    }).then((outcome) => {
      if (outcome === SHARE_OUTCOMES.COPIED) {
        this.#resultView.showCopiedNote();
      }
    });
  }
}

new App();
