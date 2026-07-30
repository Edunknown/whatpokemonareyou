/**
 * Animaciones de una pokéball concreta: giro en reposo, forcejeo de
 * captura y apertura. Cada instancia gobierna un único elemento.
 */
export class PokeballAnimator {
  #gsap;
  #element;
  /** @type {object|null} Animación en curso, para poder detenerla. */
  #current = null;

  /**
   * @param {object} gsap Instancia de GSAP.
   * @param {HTMLElement} element Raíz de la pokéball.
   */
  constructor(gsap, element) {
    this.#gsap = gsap;
    this.#element = element;
  }

  /** @returns {HTMLElement} */
  get element() {
    return this.#element;
  }

  /**
   * @param {string} part Valor de data-part.
   * @returns {HTMLElement|null}
   */
  #part(part) {
    return this.#element.querySelector(`[data-part="${part}"]`);
  }

  /** Giro continuo y flotación suave: la pokéball "en espera". */
  playIdleSpin() {
    this.stop();
    const timeline = this.#gsap.timeline();

    timeline.to(this.#element, {
      rotation: 360,
      duration: 7,
      ease: 'none',
      repeat: -1,
    }, 0);

    timeline.to(this.#element, {
      y: -14,
      duration: 1.9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    }, 0);

    timeline.to(this.#part('button'), {
      boxShadow: '0 0 18px 5px rgba(255, 203, 5, 0.75)',
      duration: 1.1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    }, 0);

    this.#current = timeline;
    return timeline;
  }

  /**
   * Forcejeo de captura: la sacudida clásica de izquierda a derecha
   * con el destello del botón entre intento e intento.
   */
  playCaptureWobble() {
    this.stop();
    const timeline = this.#gsap.timeline({ repeat: -1, repeatDelay: 0.35 });
    const shakes = [-17, 14, -11, 7, 0];

    shakes.forEach((angle, index) => {
      timeline.to(this.#element, {
        rotation: angle,
        duration: index === 0 ? 0.28 : 0.22,
        ease: 'sine.inOut',
      });
    });

    timeline.to(this.#part('button'), {
      boxShadow: '0 0 22px 7px rgba(255, 203, 5, 0.95)',
      duration: 0.18,
      yoyo: true,
      repeat: 1,
    });

    this.#current = timeline;
    return timeline;
  }

  /**
   * Apertura: destello del botón, las dos mitades se separan y la
   * pokéball se desvanece dejando salir lo que había dentro.
   * @returns {object} Timeline de GSAP.
   */
  buildOpenTimeline() {
    this.stop();
    const timeline = this.#gsap.timeline();

    timeline.fromTo(this.#element,
      { scale: 0.4, opacity: 0, rotation: -25 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.7)' });

    [-14, 11, -7, 0].forEach((angle) => {
      timeline.to(this.#element, { rotation: angle, duration: 0.16, ease: 'sine.inOut' });
    });

    timeline.to(this.#part('button'), {
      boxShadow: '0 0 34px 12px rgba(255, 255, 255, 0.95)',
      duration: 0.22,
    });

    timeline.to(this.#part('top'), {
      y: '-=64', rotation: -18, opacity: 0, duration: 0.42, ease: 'power2.in',
    }, '<');
    timeline.to(this.#part('bottom'), {
      y: '+=64', rotation: 18, opacity: 0, duration: 0.42, ease: 'power2.in',
    }, '<');
    timeline.to([this.#part('band'), this.#part('button'), this.#part('shine')], {
      opacity: 0, duration: 0.28,
    }, '<');

    this.#current = timeline;
    return timeline;
  }

  /** Detiene lo que esté sonando y devuelve el elemento a su estado base. */
  stop() {
    this.#current?.kill();
    this.#current = null;
    this.#gsap.set(this.#element, { rotation: 0, y: 0, scale: 1, opacity: 1 });
  }

  /**
   * Restaura las piezas tras una apertura, para poder repetirla.
   * Cada pieza recupera solo lo que se le anima: escribir posición o
   * giro sobre las que no se mueven las descolocaría.
   */
  reset() {
    this.stop();
    this.#gsap.set([this.#part('top'), this.#part('bottom')], { y: 0, rotation: 0, opacity: 1 });
    this.#gsap.set([this.#part('band'), this.#part('shine')], { opacity: 1 });
    this.#gsap.set(this.#part('button'), { opacity: 1, boxShadow: 'none' });
  }
}
