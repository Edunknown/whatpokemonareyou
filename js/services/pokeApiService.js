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
   * Datos completos de un Pokémon por id o nombre.
   * @param {number|string} idOrName
   * @returns {Promise<object>}
   */
  fetchPokemon(idOrName) {
    return this.#fetchJson(`pokemon/${idOrName}`);
  }

  /**
   * Ids de Pokémon (ordenados y acotados a la Pokédex nacional) que
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
