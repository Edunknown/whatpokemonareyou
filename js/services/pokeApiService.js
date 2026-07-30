/**
 * Cliente de la PokeAPI.
 * Única pieza de la aplicación que conoce la forma de la API externa.
 */
export class PokeApiService {
  #baseUrl;

  /**
   * @param {string} baseUrl URL base de la API, sin barra final.
   */
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  /**
   * @param {string} path Ruta relativa (p. ej. "type/fire").
   * @returns {Promise<object>} Respuesta JSON.
   */
  async #fetchJson(path) {
    const response = await fetch(`${this.#baseUrl}/${path}`);
    if (!response.ok) {
      throw new Error(`PokeAPI respondió ${response.status} para ${path}`);
    }
    return response.json();
  }

  /**
   * Datos de combate y sprites de un Pokémon.
   * @param {number|string} idOrName
   * @returns {Promise<object>}
   */
  fetchPokemon(idOrName) {
    return this.#fetchJson(`pokemon/${idOrName}`);
  }

  /**
   * Datos de especie: es donde vive la entrada de la Pokédex.
   * @param {number|string} idOrName
   * @returns {Promise<object>}
   */
  fetchSpecies(idOrName) {
    return this.#fetchJson(`pokemon-species/${idOrName}`);
  }

  /**
   * Ids de Pokémon (ordenados y acotados a la generación configurada) que
   * comparten los dos tipos indicados. Si la intersección es vacía,
   * devuelve todos los del tipo primario.
   * @param {string} primaryType Clave del tipo dominante.
   * @param {string} secondaryType Clave del tipo secundario.
   * @param {number} maxDex Nº máximo de Pokédex a incluir.
   * @returns {Promise<number[]>}
   */
  async fetchPokemonPoolByTypes(primaryType, secondaryType, maxDex) {
    const [primaryData, secondaryData] = await Promise.all([
      this.#fetchJson(`type/${primaryType}`),
      this.#fetchJson(`type/${secondaryType}`),
    ]);

    const primaryIds = PokeApiService.#extractPokemonIds(primaryData, maxDex);
    const secondaryIds = new Set(PokeApiService.#extractPokemonIds(secondaryData, maxDex));

    const intersection = primaryIds.filter((id) => secondaryIds.has(id));
    const pool = intersection.length > 0 ? intersection : primaryIds;
    return pool.sort((a, b) => a - b);
  }

  /**
   * Descarga la entrada de Pokédex de varios candidatos a la vez.
   * Los que fallen se descartan en silencio: basta con que quede alguno.
   * @param {readonly number[]} ids
   * @param {readonly string[]} languages Idiomas por orden de preferencia.
   * @returns {Promise<{id: number, description: string, genus: string}[]>}
   */
  async fetchPokedexEntries(ids, languages) {
    const results = await Promise.allSettled(ids.map((id) => this.fetchSpecies(id)));

    return results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => {
        const species = result.value;
        return {
          id: species.id,
          description: PokeApiService.#pickLocalizedText(
            species.flavor_text_entries,
            languages,
            'flavor_text',
          ),
          genus: PokeApiService.#pickLocalizedText(species.genera, languages, 'genus'),
        };
      })
      .filter((entry) => entry.description.length > 0);
  }

  /**
   * Elige un texto en el primer idioma disponible de la lista de preferencia.
   * @param {readonly object[]} entries Entradas con campo `language`.
   * @param {readonly string[]} languages Códigos de idioma por preferencia.
   * @param {string} field Nombre del campo de texto.
   * @returns {string} Texto ya limpio, o cadena vacía si no hay ninguno.
   */
  static #pickLocalizedText(entries, languages, field) {
    for (const language of languages) {
      const match = entries.find((entry) => entry.language.name === language);
      if (match) {
        return PokeApiService.#cleanFlavorText(match[field]);
      }
    }
    return '';
  }

  /**
   * Las entradas de Pokédex traen saltos de página y de línea heredados
   * de los juegos originales; aquí se convierten en un párrafo normal.
   * @param {string} text
   * @returns {string}
   */
  static #cleanFlavorText(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * Extrae los ids numéricos de la respuesta de un tipo.
   * @param {object} typeData Respuesta de /type/{name}.
   * @param {number} maxDex
   * @returns {number[]}
   */
  static #extractPokemonIds(typeData, maxDex) {
    return typeData.pokemon
      .map((entry) => {
        const match = entry.pokemon.url.match(/\/pokemon\/(\d+)\//);
        return match ? Number(match[1]) : 0;
      })
      .filter((id) => id > 0 && id <= maxDex);
  }
}
