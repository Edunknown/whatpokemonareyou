import { pickRandom } from '../utils/randomUtils.js';

/**
 * Motor del test: selección de preguntas, puntuación y progreso.
 * No conoce el DOM ni la API externa (lógica pura, testeable).
 */
export class QuizEngine {
  #questionBank;
  #typeKeys;
  #questionsPerTest;

  /** @type {object[]} Preguntas seleccionadas para la partida actual. */
  #questions = [];
  #currentIndex = 0;
  /** @type {Record<string, number>} */
  #scores = {};
  /** @type {number[]} Índice de la opción elegida en cada pregunta. */
  #answers = [];

  /**
   * @param {readonly object[]} questionBank Banco completo de preguntas.
   * @param {readonly string[]} typeKeys Claves de todos los tipos puntuables.
   * @param {number} questionsPerTest Preguntas que se muestran por partida.
   */
  constructor(questionBank, typeKeys, questionsPerTest) {
    this.#questionBank = questionBank;
    this.#typeKeys = typeKeys;
    this.#questionsPerTest = questionsPerTest;
  }

  /** Comienza una partida nueva con un subconjunto aleatorio de preguntas. */
  start() {
    this.#questions = pickRandom(this.#questionBank, this.#questionsPerTest);
    this.#currentIndex = 0;
    this.#answers = [];
    this.#scores = Object.fromEntries(this.#typeKeys.map((key) => [key, 0]));
  }

  get currentQuestion() {
    return this.#questions[this.#currentIndex];
  }

  /** Número de la pregunta actual, empezando en 1. */
  get currentNumber() {
    return this.#currentIndex + 1;
  }

  get totalQuestions() {
    return this.#questions.length;
  }

  /** Progreso de la partida en porcentaje entero (0-100). */
  get progressPercent() {
    const lastIndex = Math.max(1, this.totalQuestions - 1);
    return Math.round((this.#currentIndex / lastIndex) * 100);
  }

  get isLastQuestion() {
    return this.#currentIndex >= this.totalQuestions - 1;
  }

  /** @returns {readonly number[]} */
  get answers() {
    return [...this.#answers];
  }

  /** @returns {Readonly<Record<string, number>>} */
  get scores() {
    return { ...this.#scores };
  }

  /**
   * Registra la respuesta a la pregunta actual y suma sus puntos.
   * @param {number} optionIndex Índice de la opción elegida.
   */
  answerCurrent(optionIndex) {
    const option = this.currentQuestion.options[optionIndex];
    for (const [typeKey, value] of Object.entries(option.points)) {
      this.#scores[typeKey] = (this.#scores[typeKey] ?? 0) + value;
    }
    this.#answers.push(optionIndex);
  }

  /** Avanza a la siguiente pregunta. */
  advance() {
    this.#currentIndex += 1;
  }

  /**
   * Claves de los tipos con mayor puntuación, de mayor a menor.
   * @param {number} count Cuántos tipos devolver.
   * @returns {string[]}
   */
  getTopTypes(count) {
    return Object.keys(this.#scores)
      .sort((a, b) => this.#scores[b] - this.#scores[a])
      .slice(0, count);
  }
}
