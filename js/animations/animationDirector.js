import { getGsap, isMotionEnabled } from './motion.js';
import { PokeballAnimator } from './pokeballAnimator.js';

const CSS_WOBBLE_CLASS = 'pokeball--css-wobble';
const ACTIVE_CLASS = 'is-active';

/**
 * Orquesta todas las animaciones de la aplicación.
 *
 * Contrato importante: si GSAP no cargó o el usuario pidió reducir el
 * movimiento, cada método no hace nada y la interfaz queda en su estado
 * final visible. Ninguna animación es requisito para ver el contenido.
 */
export class AnimationDirector {
  #gsap;
  #enabled;
  #refs;
  #heroBall = null;
  #loadingBall = null;
  #resultBall = null;
  #driftBalls = [];

  /**
   * @param {Record<string, HTMLElement>} refs Referencias del DOM.
   * @param {{hero: HTMLElement, loading: HTMLElement, result: HTMLElement, drift: HTMLElement[]}} pokeballs
   */
  constructor(refs, pokeballs) {
    this.#refs = refs;
    this.#enabled = isMotionEnabled();
    this.#gsap = getGsap();

    if (!this.#enabled) {
      // Sin GSAP, el forcejeo de la pantalla de carga lo hace el CSS.
      return;
    }

    pokeballs.loading.classList.remove(CSS_WOBBLE_CLASS);
    this.#heroBall = new PokeballAnimator(this.#gsap, pokeballs.hero);
    this.#loadingBall = new PokeballAnimator(this.#gsap, pokeballs.loading);
    this.#resultBall = new PokeballAnimator(this.#gsap, pokeballs.result);
    this.#driftBalls = pokeballs.drift;

    this.#startBackgroundDrift();
  }

  /**
   * Deriva perpetua de las pokéballs de fondo.
   * Se lanza una sola vez: son decorado del escenario, no de una pantalla.
   */
  #startBackgroundDrift() {
    this.#driftBalls.forEach((ball, index) => {
      this.#gsap.to(ball, {
        y: index % 2 === 0 ? -34 : 30,
        x: index % 2 === 0 ? 18 : -22,
        rotation: index % 2 === 0 ? 200 : -200,
        duration: 16 + index * 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
  }

  /** Entrada de la portada. Puede repetirse al volver al inicio. */
  playLandingIntro() {
    if (!this.#enabled) {
      return;
    }
    this.#heroBall.playIdleSpin();

    this.#gsap.from(this.#refs.landingInner.children, {
      y: 26,
      opacity: 0,
      duration: 0.6,
      stagger: 0.09,
      ease: 'power3.out',
      clearProps: 'all',
    });
  }

  /**
   * Transición al pulsar "Iniciar escáner": la pokéball acelera y todo
   * sale de escena.
   * @returns {Promise<void>} Se resuelve cuando puede cambiarse de pantalla.
   */
  playStartTransition() {
    if (!this.#enabled) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const timeline = this.#gsap.timeline({ onComplete: resolve });
      timeline.to(this.#refs.landingInner, {
        scale: 0.94,
        opacity: 0,
        duration: 0.38,
        ease: 'power2.in',
      });
    });
  }

  /** Entrada en cascada de la pregunta y sus opciones. */
  playQuestionIn() {
    if (!this.#enabled) {
      return;
    }
    const options = this.#refs.quizOptions.querySelectorAll('button');

    this.#gsap.from([this.#refs.quizKicker, this.#refs.quizText], {
      y: 18,
      opacity: 0,
      duration: 0.42,
      stagger: 0.07,
      ease: 'power3.out',
      clearProps: 'all',
    });

    this.#gsap.from(options, {
      x: -22,
      opacity: 0,
      duration: 0.38,
      stagger: 0.055,
      delay: 0.12,
      ease: 'power3.out',
      clearProps: 'all',
    });
  }

  /** Arranca el forcejeo de captura mientras se consulta la Pokédex. */
  startCaptureLoop() {
    if (!this.#enabled) {
      return;
    }
    this.#loadingBall.playCaptureWobble();
  }

  /** Detiene el forcejeo de captura. */
  stopCaptureLoop() {
    if (!this.#enabled) {
      return;
    }
    this.#loadingBall.stop();
  }

  /**
   * Revelado del resultado: la pokéball se abre, estalla un destello y
   * el Pokémon aparece; luego entran insignias, texto y estadísticas.
   */
  playResultReveal() {
    if (!this.#enabled) {
      return;
    }
    const { resultArtwork, revealFlash, resultTypes, resultStats, resultBody } = this.#refs;
    const ball = this.#resultBall;

    ball.reset();
    ball.element.classList.add(ACTIVE_CLASS);

    const timeline = this.#gsap.timeline({
      onComplete: () => ball.element.classList.remove(ACTIVE_CLASS),
    });

    timeline.add(ball.buildOpenTimeline());

    timeline.fromTo(revealFlash,
      { scale: 0.2, opacity: 0.95 },
      { scale: 2.6, opacity: 0, duration: 0.65, ease: 'power2.out' }, '-=0.25');

    timeline.fromTo(resultArtwork,
      { scale: 0.25, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.5');

    timeline.from(resultBody.children, {
      y: 20,
      opacity: 0,
      duration: 0.45,
      stagger: 0.07,
      ease: 'power3.out',
      clearProps: 'all',
    }, '-=0.45');

    timeline.from(resultTypes.children, {
      scale: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(2.4)',
      clearProps: 'transform',
    }, '-=0.3');

    // Las barras de estadísticas crecen desde cero hasta su valor real.
    resultStats.querySelectorAll('.stat-fill').forEach((bar, index) => {
      timeline.from(bar, {
        width: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, `-=${index === 0 ? 0.25 : 0.42}`);
    });
  }
}
