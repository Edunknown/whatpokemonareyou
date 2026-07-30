/**
 * Perfil de personalidad asociado a cada tipo Pokémon.
 * Cada entrada define nombre en español, color de marca y los textos
 * con los que se construye la explicación del resultado.
 */
export const POKEMON_TYPES = Object.freeze({
  fire: { es: 'Fuego', color: '#e6402a', adj: 'apasionado, enérgico y valiente', line: 'ardes con determinación y contagias tu fuego a los demás', fort: ['Iniciativa', 'Pasión', 'Coraje'], debil: ['Impaciencia', 'Cabezonería'] },
  water: { es: 'Agua', color: '#2f8fe0', adj: 'tranquilo, adaptable y profundo', line: 'fluyes con calma pero escondes una fuerza inmensa', fort: ['Calma', 'Empatía', 'Adaptabilidad'], debil: ['Indecisión', 'Te lo guardas todo'] },
  grass: { es: 'Planta', color: '#4aa03f', adj: 'paciente, cuidador y natural', line: 'creces a tu ritmo y cuidas de quienes te rodean', fort: ['Paciencia', 'Lealtad', 'Cuidado'], debil: ['Testarudez', 'Evitas el conflicto'] },
  electric: { es: 'Eléctrico', color: '#f2c033', adj: 'chispeante, sociable y vivaz', line: 'llenas de energía cualquier lugar al que llegas', fort: ['Energía', 'Carisma', 'Espontaneidad'], debil: ['Dispersión', 'Impulsividad'] },
  psychic: { es: 'Psíquico', color: '#ef5487', adj: 'intuitivo, reflexivo e ingenioso', line: 'ves más allá de lo evidente y confías en tu intuición', fort: ['Intuición', 'Ingenio', 'Análisis'], debil: ['Sobrepensar', 'Aislarte'] },
  fighting: { es: 'Lucha', color: '#e07a2a', adj: 'decidido, disciplinado y tenaz', line: 'nunca te rindes y das la cara por lo que crees', fort: ['Determinación', 'Disciplina', 'Valentía'], debil: ['Terquedad', 'Exigirte de más'] },
  ghost: { es: 'Fantasma', color: '#6a4a8f', adj: 'misterioso, creativo e independiente', line: 'habitas tu propio mundo y sorprendes cuando menos se espera', fort: ['Creatividad', 'Independencia', 'Misterio'], debil: ['Distancia', 'Enigmático de más'] },
  dark: { es: 'Siniestro', color: '#5a4a45', adj: 'astuto, libre y auténtico', line: 'juegas con tus propias reglas y no le temes a la sombra', fort: ['Astucia', 'Autenticidad', 'Independencia'], debil: ['Desconfianza', 'Rebeldía'] },
  fairy: { es: 'Hada', color: '#ee78c8', adj: 'amable, optimista y encantador', line: 'sacas lo mejor de los demás con tu luz', fort: ['Empatía', 'Optimismo', 'Encanto'], debil: ['Complacer de más', 'Sensibilidad'] },
  dragon: { es: 'Dragón', color: '#4a5ee0', adj: 'ambicioso, orgulloso y leal', line: 'persigues tus sueños con una fuerza legendaria', fort: ['Ambición', 'Liderazgo', 'Lealtad'], debil: ['Orgullo', 'Impaciencia'] },
  ice: { es: 'Hielo', color: '#4fc7e8', adj: 'sereno, elegante y reservado', line: 'mantienes la calma incluso en plena tormenta', fort: ['Serenidad', 'Elegancia', 'Autocontrol'], debil: ['Frialdad aparente', 'Reserva'] },
  rock: { es: 'Roca', color: '#b0a468', adj: 'firme, confiable y constante', line: 'aguantas lo que haga falta sin moverte un centímetro', fort: ['Fiabilidad', 'Constancia', 'Firmeza'], debil: ['Rigidez', 'Resistencia al cambio'] },
  ground: { es: 'Tierra', color: '#c08a3e', adj: 'práctico, estable y con los pies en la tierra', line: 'construyes cosas sólidas que duran', fort: ['Sensatez', 'Estabilidad', 'Constancia'], debil: ['Cabezonería', 'Poco flexible'] },
  steel: { es: 'Acero', color: '#6aa6bd', adj: 'resiliente, metódico y fuerte', line: 'resistes todo y no te doblas ante la presión', fort: ['Resiliencia', 'Método', 'Fuerza'], debil: ['Perfeccionismo', 'Guardarte lo que sientes'] },
  bug: { es: 'Bicho', color: '#98a626', adj: 'trabajador, curioso y adaptable', line: 'nunca dejas de evolucionar y aprender', fort: ['Esfuerzo', 'Curiosidad', 'Adaptación'], debil: ['Autoexigencia', 'Impaciencia'] },
  normal: { es: 'Normal', color: '#9098a0', adj: 'equilibrado, cercano y versátil', line: 'te llevas bien con todos y te adaptas a todo', fort: ['Equilibrio', 'Cercanía', 'Versatilidad'], debil: ['Miedo a destacar', 'Complacer'] },
  flying: { es: 'Volador', color: '#79aee8', adj: 'libre, aventurero y soñador', line: 'necesitas horizonte y no soportas las jaulas', fort: ['Libertad', 'Optimismo', 'Aventura'], debil: ['Inconstancia', 'Huir de lo rutinario'] },
  poison: { es: 'Veneno', color: '#9a4ac0', adj: 'ingenioso, atrevido y provocador', line: 'no pasas desapercibido y te encanta romper moldes', fort: ['Ingenio', 'Audacia', 'Originalidad'], debil: ['Provocar de más', 'Impulsividad'] },
});

/** Claves de todos los tipos disponibles. */
export const TYPE_KEYS = Object.freeze(Object.keys(POKEMON_TYPES));
