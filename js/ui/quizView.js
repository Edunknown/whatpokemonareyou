import { QUESTION_KINDS } from '../constants/questions.js';
import { OPTION_LETTERS, QUESTION_KIND_LABELS } from '../constants/ui.js';
import { padNumber } from '../utils/formatUtils.js';

const HIDDEN_CLASS = 'hidden';

/**
 * Vista del quiz: pinta la pregunta actual, sus opciones y el progreso.
 * No contiene lógica de puntuación (eso es del QuizEngine).
 */
export class QuizView {
  #refs;

  /**
   * @param {Record<string, HTMLElement>} refs Referencias del DOM.
   */
  constructor(refs) {
    this.#refs = refs;
  }

  /**
   * Pinta una pregunta completa.
   * @param {object} question Pregunta a mostrar.
   * @param {{number: number, total: number, progressPercent: number}} meta
   * @param {(optionIndex: number) => void} onSelect Callback al elegir opción.
   */
  render(question, meta, onSelect) {
    const paddedNumber = padNumber(meta.number);

    this.#refs.counter.textContent = `Pregunta ${paddedNumber} / ${meta.total}`;
    this.#refs.progressFill.style.width = `${meta.progressPercent}%`;
    this.#refs.progress.setAttribute('aria-valuenow', String(meta.progressPercent));
    this.#refs.quizKicker.textContent = `${paddedNumber} · ${QUESTION_KIND_LABELS[question.kind]}`;
    this.#refs.quizText.textContent = question.text;

    this.#refs.quizOptions.replaceChildren(
      question.kind === QUESTION_KINDS.SCENARIO
        ? this.#buildScenarioGrid(question.options, onSelect)
        : this.#buildChoiceList(question.options, onSelect),
    );
  }

  /**
   * Marca visualmente la opción elegida.
   * @param {number} optionIndex
   */
  markPicked(optionIndex) {
    const buttons = this.#refs.quizOptions.querySelectorAll('button');
    const dot = buttons[optionIndex]?.querySelector('[data-dot]');
    dot?.classList.remove(HIDDEN_CLASS);
  }

  /**
   * @param {readonly object[]} options
   * @param {(optionIndex: number) => void} onSelect
   * @returns {HTMLElement}
   */
  #buildChoiceList(options, onSelect) {
    const list = document.createElement('div');
    list.className = 'choice-list';

    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'choice';
      button.type = 'button';

      const letter = document.createElement('span');
      letter.className = 'choice-letter';
      letter.textContent = OPTION_LETTERS[index];

      const label = document.createElement('span');
      label.className = 'choice-label';
      label.textContent = option.label;

      const arrow = document.createElement('span');
      arrow.className = 'choice-arrow';
      arrow.textContent = '›';
      arrow.setAttribute('aria-hidden', 'true');

      button.append(letter, label, this.#buildPickDot(), arrow);
      button.addEventListener('click', () => onSelect(index));
      list.appendChild(button);
    });

    return list;
  }

  /**
   * @param {readonly object[]} options
   * @param {(optionIndex: number) => void} onSelect
   * @returns {HTMLElement}
   */
  #buildScenarioGrid(options, onSelect) {
    const grid = document.createElement('div');
    grid.className = 'scenario-grid';

    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'scenario';
      button.type = 'button';

      const head = document.createElement('div');
      head.className = 'scenario-head';

      const tag = document.createElement('span');
      tag.className = 'scenario-tag';
      tag.textContent = `Escenario ${OPTION_LETTERS[index]}`;

      head.append(tag, this.#buildPickDot());

      const label = document.createElement('span');
      label.className = 'scenario-label';
      label.textContent = option.label;

      const sub = document.createElement('span');
      sub.className = 'scenario-sub';
      sub.textContent = option.sub ?? '';

      button.append(head, label, sub);
      button.addEventListener('click', () => onSelect(index));
      grid.appendChild(button);
    });

    return grid;
  }

  /** @returns {HTMLElement} Indicador de opción elegida, oculto por defecto. */
  #buildPickDot() {
    const dot = document.createElement('span');
    dot.className = `pick-dot ${HIDDEN_CLASS}`;
    dot.dataset.dot = '1';
    return dot;
  }
}
