/**
 * Perfil de personalidad asociado a cada tipo Pokémon.
 *
 * - `es` / `color`: presentación.
 * - `adj` / `line` / `fort` / `debil`: textos del resultado.
 * - `keywords`: vocabulario que se busca en la entrada real de la Pokédex
 *   para medir cuánto encaja un Pokémon con este perfil (ver descriptionMatcher).
 */
export const POKEMON_TYPES = Object.freeze({
  fire: {
    es: 'Fuego', color: '#e6402a',
    adj: 'apasionado, enérgico y valiente',
    line: 'ardes con determinación y contagias tu fuego a los demás',
    fort: ['Iniciativa', 'Pasión', 'Coraje'], debil: ['Impaciencia', 'Cabezonería'],
    keywords: ['fuego', 'llama', 'llamas', 'arde', 'ardiente', 'quema', 'calor', 'incendio', 'magma', 'brasa', 'fogosa', 'temperatura', 'abrasa'],
  },
  water: {
    es: 'Agua', color: '#2f8fe0',
    adj: 'tranquilo, adaptable y profundo',
    line: 'fluyes con calma pero escondes una fuerza inmensa',
    fort: ['Calma', 'Empatía', 'Adaptabilidad'], debil: ['Indecisión', 'Te lo guardas todo'],
    keywords: ['agua', 'mar', 'oceano', 'nada', 'nadar', 'lluvia', 'acuatico', 'rio', 'marino', 'bucea', 'corriente', 'ola', 'humedad', 'lago'],
  },
  grass: {
    es: 'Planta', color: '#4aa03f',
    adj: 'paciente, cuidador y natural',
    line: 'creces a tu ritmo y cuidas de quienes te rodean',
    fort: ['Paciencia', 'Lealtad', 'Cuidado'], debil: ['Testarudez', 'Evitas el conflicto'],
    keywords: ['planta', 'hierba', 'flor', 'semilla', 'hoja', 'hojas', 'bosque', 'fotosintesis', 'polen', 'arbol', 'raices', 'crece', 'jardin', 'naturaleza'],
  },
  electric: {
    es: 'Eléctrico', color: '#f2c033',
    adj: 'chispeante, sociable y vivaz',
    line: 'llenas de energía cualquier lugar al que llegas',
    fort: ['Energía', 'Carisma', 'Espontaneidad'], debil: ['Dispersión', 'Impulsividad'],
    keywords: ['electricidad', 'electrico', 'rayo', 'chispa', 'voltaje', 'descarga', 'trueno', 'energia', 'corriente electrica', 'electrizante'],
  },
  psychic: {
    es: 'Psíquico', color: '#ef5487',
    adj: 'intuitivo, reflexivo e ingenioso',
    line: 'ves más allá de lo evidente y confías en tu intuición',
    fort: ['Intuición', 'Ingenio', 'Análisis'], debil: ['Sobrepensar', 'Aislarte'],
    keywords: ['mente', 'mental', 'psiquico', 'telepatia', 'inteligencia', 'cerebro', 'hipnosis', 'sueno', 'suenos', 'concentracion', 'poderes', 'predecir', 'coeficiente'],
  },
  fighting: {
    es: 'Lucha', color: '#e07a2a',
    adj: 'decidido, disciplinado y tenaz',
    line: 'nunca te rindes y das la cara por lo que crees',
    fort: ['Determinación', 'Disciplina', 'Valentía'], debil: ['Terquedad', 'Exigirte de más'],
    keywords: ['lucha', 'luchar', 'combate', 'puno', 'punos', 'fuerza', 'entrenamiento', 'entrena', 'karate', 'golpe', 'musculo', 'marciales', 'pelea'],
  },
  ghost: {
    es: 'Fantasma', color: '#6a4a8f',
    adj: 'misterioso, creativo e independiente',
    line: 'habitas tu propio mundo y sorprendes cuando menos se espera',
    fort: ['Creatividad', 'Independencia', 'Misterio'], debil: ['Distancia', 'Enigmático de más'],
    keywords: ['fantasma', 'espiritu', 'alma', 'oscuridad', 'sombra', 'desaparece', 'maldicion', 'miedo', 'noche', 'invisible', 'aparece', 'tinieblas'],
  },
  dark: {
    es: 'Siniestro', color: '#5a4a45',
    adj: 'astuto, libre y auténtico',
    line: 'juegas con tus propias reglas y no le temes a la sombra',
    fort: ['Astucia', 'Autenticidad', 'Independencia'], debil: ['Desconfianza', 'Rebeldía'],
    keywords: ['astuto', 'engana', 'trampa', 'acecha', 'oculta', 'siniestro', 'cruel', 'traicion', 'sigilo', 'presa', 'caza', 'nocturno'],
  },
  fairy: {
    es: 'Hada', color: '#ee78c8',
    adj: 'amable, optimista y encantador',
    line: 'sacas lo mejor de los demás con tu luz',
    fort: ['Empatía', 'Optimismo', 'Encanto'], debil: ['Complacer de más', 'Sensibilidad'],
    keywords: ['hada', 'amor', 'alegria', 'felicidad', 'encanto', 'dulce', 'bondad', 'corazon', 'luna', 'brillo', 'canta', 'adorable', 'carino'],
  },
  dragon: {
    es: 'Dragón', color: '#4a5ee0',
    adj: 'ambicioso, orgulloso y leal',
    line: 'persigues tus sueños con una fuerza legendaria',
    fort: ['Ambición', 'Liderazgo', 'Lealtad'], debil: ['Orgullo', 'Impaciencia'],
    keywords: ['dragon', 'legendario', 'poderoso', 'antiguo', 'majestuoso', 'temible', 'mitico', 'leyenda', 'raro', 'orgullo'],
  },
  ice: {
    es: 'Hielo', color: '#4fc7e8',
    adj: 'sereno, elegante y reservado',
    line: 'mantienes la calma incluso en plena tormenta',
    fort: ['Serenidad', 'Elegancia', 'Autocontrol'], debil: ['Frialdad aparente', 'Reserva'],
    keywords: ['hielo', 'frio', 'nieve', 'congela', 'gelido', 'helado', 'invierno', 'ventisca', 'glaciar', 'escarcha'],
  },
  rock: {
    es: 'Roca', color: '#b0a468',
    adj: 'firme, confiable y constante',
    line: 'aguantas lo que haga falta sin moverte un centímetro',
    fort: ['Fiabilidad', 'Constancia', 'Firmeza'], debil: ['Rigidez', 'Resistencia al cambio'],
    keywords: ['roca', 'rocas', 'piedra', 'montana', 'duro', 'dureza', 'resistente', 'solido', 'cantera', 'peso'],
  },
  ground: {
    es: 'Tierra', color: '#c08a3e',
    adj: 'práctico, estable y con los pies en la tierra',
    line: 'construyes cosas sólidas que duran',
    fort: ['Sensatez', 'Estabilidad', 'Constancia'], debil: ['Cabezonería', 'Poco flexible'],
    keywords: ['tierra', 'suelo', 'subterraneo', 'excava', 'arena', 'desierto', 'cueva', 'tunel', 'madriguera', 'terreno'],
  },
  steel: {
    es: 'Acero', color: '#6aa6bd',
    adj: 'resiliente, metódico y fuerte',
    line: 'resistes todo y no te doblas ante la presión',
    fort: ['Resiliencia', 'Método', 'Fuerza'], debil: ['Perfeccionismo', 'Guardarte lo que sientes'],
    keywords: ['acero', 'metal', 'metalico', 'hierro', 'armadura', 'coraza', 'blindado', 'resistente', 'defensa', 'iman'],
  },
  bug: {
    es: 'Bicho', color: '#98a626',
    adj: 'trabajador, curioso y adaptable',
    line: 'nunca dejas de evolucionar y aprender',
    fort: ['Esfuerzo', 'Curiosidad', 'Adaptación'], debil: ['Autoexigencia', 'Impaciencia'],
    keywords: ['insecto', 'bicho', 'larva', 'capullo', 'nido', 'colmena', 'seda', 'antenas', 'aguijon', 'enjambre', 'evoluciona'],
  },
  normal: {
    es: 'Normal', color: '#9098a0',
    adj: 'equilibrado, cercano y versátil',
    line: 'te llevas bien con todos y te adaptas a todo',
    fort: ['Equilibrio', 'Cercanía', 'Versatilidad'], debil: ['Miedo a destacar', 'Complacer'],
    keywords: ['comun', 'tranquilo', 'amistoso', 'docil', 'adapta', 'pacifico', 'corriente', 'domestico', 'confia', 'compania'],
  },
  flying: {
    es: 'Volador', color: '#79aee8',
    adj: 'libre, aventurero y soñador',
    line: 'necesitas horizonte y no soportas las jaulas',
    fort: ['Libertad', 'Optimismo', 'Aventura'], debil: ['Inconstancia', 'Huir de lo rutinario'],
    keywords: ['vuela', 'volar', 'alas', 'cielo', 'aire', 'viento', 'pajaro', 'planea', 'altura', 'nube', 'plumas', 'migra'],
  },
  poison: {
    es: 'Veneno', color: '#9a4ac0',
    adj: 'ingenioso, atrevido y provocador',
    line: 'no pasas desapercibido y te encanta romper moldes',
    fort: ['Ingenio', 'Audacia', 'Originalidad'], debil: ['Provocar de más', 'Impulsividad'],
    keywords: ['veneno', 'venenoso', 'toxico', 'toxina', 'gas', 'acido', 'paraliza', 'ponzona', 'contamina', 'hedor'],
  },
});

/** Claves de todos los tipos disponibles. */
export const TYPE_KEYS = Object.freeze(Object.keys(POKEMON_TYPES));
