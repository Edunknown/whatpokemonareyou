import { getReadableTextColor } from '../utils/colorUtils.js';

const HIDDEN_CLASS = 'hidden';

/**
 * Vista del resultado: pinta el modelo generado por resultBuilder.
 */
export class ResultView {
  #refs;
  #copyFeedbackMs;
  #copiedNoteTimer = 0;

  /**
   * @param {Record<string, HTMLElement>} refs Referencias del DOM.
   * @param {number} copyFeedbackMs Duración del aviso "copiado".
   */
  constructor(refs, copyFeedbackMs) {
    this.#refs = refs;
    this.#copyFeedbackMs = copyFeedbackMs;
  }

  /**
   * Pinta el resultado completo.
   * @param {object} result Modelo de vista (ver buildResult).
   */
  render(result) {
    this.#refs.resultAffinity.textContent = `Afinidad ${result.matchPercent}%`;
    this.#refs.resultArtwork.src = result.artwork;
    this.#refs.resultArtwork.alt = `Ilustración oficial de ${result.name}`;
    this.#refs.resultDexNumber.textContent = `Nº ${result.dexNumber} · POKÉDEX NACIONAL`;
    this.#refs.resultName.textContent = result.name;
    this.#refs.resultExplanation.textContent = result.explanation;

    this.#renderTypeBadges(result.types);
    this.#renderTraitList(this.#refs.resultStrengths, result.strengths, '▸', '');
    this.#renderTraitList(this.#refs.resultWeaknesses, result.weaknesses, '▹', 'b');
    this.#renderStats(result.stats);

    this.#refs.copiedNote.classList.add(HIDDEN_CLASS);
  }

  /** Muestra temporalmente el aviso "copiado al portapapeles". */
  showCopiedNote() {
    this.#refs.copiedNote.classList.remove(HIDDEN_CLASS);
    clearTimeout(this.#copiedNoteTimer);
    this.#copiedNoteTimer = setTimeout(
      () => this.#refs.copiedNote.classList.add(HIDDEN_CLASS),
      this.#copyFeedbackMs,
    );
  }

  /**
   * @param {readonly {es: string, color: string}[]} types
   */
  #renderTypeBadges(types) {
    const badges = types.map((type) => {
      const badge = document.createElement('span');
      badge.className = 'type-badge';
      badge.style.background = type.color;
      badge.style.color = getReadableTextColor(type.color);
      badge.textContent = type.es;
      return badge;
    });
    this.#refs.resultTypes.replaceChildren(...badges);
  }

  /**
   * @param {HTMLElement} container
   * @param {readonly string[]} items
   * @param {string} marker Carácter decorativo de cada fila.
   * @param {string} extraClass Clase adicional de la fila ('' o 'b').
   */
  #renderTraitList(container, items, marker, extraClass) {
    const rows = items.map((text) => {
      const row = document.createElement('div');
      row.className = extraClass ? `trait-row ${extraClass}` : 'trait-row';

      const mark = document.createElement('span');
      mark.className = 'mk';
      mark.textContent = marker;
      mark.setAttribute('aria-hidden', 'true');

      row.append(mark, document.createTextNode(text));
      return row;
    });
    container.replaceChildren(...rows);
  }

  /**
   * @param {readonly {label: string, value: number, percent: number}[]} stats
   */
  #renderStats(stats) {
    const rows = stats.map((stat) => {
      const row = document.createElement('div');
      row.className = 'stat-row';

      const label = document.createElement('span');
      label.className = 'stat-label';
      label.textContent = stat.label;

      const track = document.createElement('div');
      track.className = 'stat-track';
      const fill = document.createElement('div');
      fill.className = 'stat-fill';
      fill.style.width = `${stat.percent}%`;
      track.appendChild(fill);

      const value = document.createElement('span');
      value.className = 'stat-val';
      value.textContent = String(stat.value);

      row.append(label, track, value);
      return row;
    });
    this.#refs.resultStats.replaceChildren(...rows);
  }
}
