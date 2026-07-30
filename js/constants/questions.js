/**
 * Banco de 100 preguntas del test.
 * En cada partida el motor selecciona un subconjunto aleatorio
 * (ver CONFIG.QUESTIONS_PER_TEST). Cada opción suma puntos ocultos
 * a uno o varios tipos Pokémon; el texto nunca revela qué tipo puntúa.
 */

/** Clases de pregunta soportadas por la vista del quiz. */
export const QUESTION_KINDS = Object.freeze({
  CHOICE: 'choice',
  SCENARIO: 'scenario',
});

const { CHOICE, SCENARIO } = QUESTION_KINDS;

export const QUESTION_BANK = Object.freeze([
  /* ------------------------------------------------------------------ */
  /* Rutina y planes                                                     */
  /* ------------------------------------------------------------------ */
  { kind: CHOICE, text: 'Es sábado por la mañana y no tienes ningún plan. ¿Qué te pide el cuerpo?', options: [
    { label: 'Salir a moverme y buscar algo de acción', points: { fire: 2, fighting: 1 } },
    { label: 'Quedarme en casa dándole vueltas a mis cosas', points: { psychic: 2 } },
    { label: 'Escribir al grupo y ver quién se apunta a lo que sea', points: { electric: 2, fairy: 1 } },
    { label: 'Un paseo tranquilo al aire libre', points: { grass: 2, normal: 1 } }] },
  { kind: CHOICE, text: 'Suena la alarma un lunes. Lo primero que haces es…', options: [
    { label: 'Levantarme a la primera, sin negociar', points: { steel: 2, fighting: 1 } },
    { label: 'Posponerla tres veces como mínimo', points: { normal: 2, ghost: 1 } },
    { label: 'Quedarme un rato mirando al techo, pensando', points: { psychic: 2, ice: 1 } },
    { label: 'Poner música y arrancar con energía', points: { electric: 2, fire: 1 } }] },
  { kind: CHOICE, text: 'Tu manera de empezar el día dice mucho. ¿Cuál es la tuya?', options: [
    { label: 'Café cargado y a por todas', points: { fire: 2, dark: 1 } },
    { label: 'Un desayuno tranquilo, sin prisas', points: { grass: 2, water: 1 } },
    { label: 'Reviso todo lo que tengo pendiente antes de nada', points: { steel: 2, psychic: 1 } },
    { label: 'Cada día es distinto, odio las rutinas fijas', points: { flying: 2, electric: 1 } }] },
  { kind: CHOICE, text: 'Un domingo de lluvia sin compromisos. Tu plan perfecto es…', options: [
    { label: 'Cocinar algo elaborado sin mirar el reloj', points: { grass: 2, fairy: 1 } },
    { label: 'Maratón de pelis o series bajo la manta', points: { normal: 2, ghost: 1 } },
    { label: 'Ordenar, limpiar y dejarlo todo impecable', points: { steel: 2, ground: 1 } },
    { label: 'Salir igualmente: la lluvia no me para', points: { water: 2, fighting: 1 } }] },
  { kind: SCENARIO, text: 'Se va la luz en casa durante toda la noche.', options: [
    { label: 'Velas, mantas y conversación hasta tarde', sub: 'La oscuridad lo hace especial.', points: { ghost: 2, fairy: 1 } },
    { label: 'Linterna en mano, buscando la avería', sub: 'Algo se podrá hacer.', points: { electric: 2, steel: 1 } }] },
  { kind: CHOICE, text: 'Tu escritorio o tu habitación, siendo sinceros, suele estar…', options: [
    { label: 'Impecable: cada cosa en su sitio', points: { steel: 2, ice: 1 } },
    { label: 'Caos creativo: yo me entiendo', points: { ghost: 2, electric: 1 } },
    { label: 'Con plantas, fotos y cosas con historia', points: { grass: 2, fairy: 1 } },
    { label: 'Minimalista: cuanto menos, mejor', points: { ice: 2, psychic: 1 } }] },
  { kind: CHOICE, text: 'La noche antes de algo importante, tú…', options: [
    { label: 'Duermo como un tronco, ya está todo hecho', points: { rock: 2, ground: 1 } },
    { label: 'Repaso mentalmente cada detalle', points: { psychic: 2, steel: 1 } },
    { label: 'Me cuesta dormir de pura emoción', points: { electric: 2, fire: 1 } },
    { label: 'Hago como si no pasara nada mañana', points: { dark: 2, normal: 1 } }] },
  { kind: SCENARIO, text: 'Tu forma de cerrar el día.', options: [
    { label: 'Entrenando o creando algo con las manos', sub: 'Cuerpo en marcha, cabeza en calma.', points: { fighting: 2, steel: 1 } },
    { label: 'Perdiéndome en mis pensamientos', sub: 'Cabeza en marcha, cuerpo en calma.', points: { psychic: 2, ghost: 1 } }] },

  /* ------------------------------------------------------------------ */
  /* Lugares y entornos                                                  */
  /* ------------------------------------------------------------------ */
  { kind: CHOICE, text: 'Te toca elegir dónde vivir sin pensar en el dinero. ¿Cuál te llama más?', options: [
    { label: 'Un ático con vistas en pleno centro', points: { flying: 2 } },
    { label: 'Una casa pegada al mar', points: { water: 2 } },
    { label: 'Una cabaña perdida en el bosque', points: { grass: 1, bug: 2 } },
    { label: 'Un loft industrial de hormigón y acero', points: { steel: 2, rock: 1 } }] },
  { kind: CHOICE, text: 'En una casa nueva, ¿qué rincón te pedirías primero?', options: [
    { label: 'Una terraza abierta al cielo', points: { flying: 2, fire: 1 } },
    { label: 'Una biblioteca con butaca y silencio', points: { psychic: 2, ghost: 1 } },
    { label: 'Un jardín para cuidar y ver crecer', points: { grass: 2, bug: 1 } },
    { label: 'Un sótano-taller para mis proyectos', points: { steel: 2, rock: 1 } }] },
  { kind: SCENARIO, text: 'Puedes teletransportarte ahora mismo a uno de estos dos sitios.', options: [
    { label: 'Una playa vacía al amanecer', sub: 'Solo el mar y tú.', points: { water: 2, ice: 1 } },
    { label: 'Una ciudad desconocida en hora punta', sub: 'Ruido, luces, posibilidades.', points: { electric: 2, dark: 1 } }] },
  { kind: CHOICE, text: 'De viaje, el alojamiento que eliges suele ser…', options: [
    { label: 'Donde haya ambiente y gente nueva', points: { electric: 2, fairy: 1 } },
    { label: 'Un sitio con encanto aunque sea incómodo', points: { ghost: 2, grass: 1 } },
    { label: 'El mejor valorado: no me la juego', points: { steel: 2, normal: 1 } },
    { label: 'Cuanto más remoto y perdido, mejor', points: { dark: 2, rock: 1 } }] },
  { kind: SCENARIO, text: 'Una noche de verano perfecta.', options: [
    { label: 'Azotea, luces de ciudad y conversación', sub: 'El mundo a tus pies.', points: { flying: 2, electric: 1 } },
    { label: 'Hoguera en la playa con los tuyos', sub: 'Fuego, arena y calma.', points: { fire: 2, water: 1 } }] },
  { kind: CHOICE, text: 'Entras a una feria enorme. ¿Hacia dónde tiras primero?', options: [
    { label: 'A la atracción más bestia que haya', points: { fire: 2, flying: 1 } },
    { label: 'A los puestos de comida, sin dudarlo', points: { normal: 2, grass: 1 } },
    { label: 'A la casa del terror', points: { ghost: 2, dark: 1 } },
    { label: 'A los juegos de puntería y premios', points: { fighting: 2, steel: 1 } }] },
  { kind: SCENARIO, text: 'Te regalan una escapada y eliges destino.', options: [
    { label: 'Aguas termales en la montaña', sub: 'Vapor, silencio, descanso.', points: { water: 2, psychic: 1 } },
    { label: 'Parque de atracciones acuático', sub: 'Gritos, toboganes, risas.', points: { electric: 2, fighting: 1 } }] },
  { kind: SCENARIO, text: 'Dos entradas sobre la mesa. Solo puedes usar una.', options: [
    { label: 'Ruinas antiguas al atardecer', sub: 'Piedra, historia, misterio.', points: { rock: 2, ghost: 1 } },
    { label: 'Festival de luces y tecnología', sub: 'Neón, futuro, multitud.', points: { electric: 2, steel: 1 } }] },
  { kind: CHOICE, text: 'En plena naturaleza, lo que más te impresiona es…', options: [
    { label: 'Un acantilado frente al mar abierto', points: { water: 2, rock: 1 } },
    { label: 'Un bosque tan denso que no entra la luz', points: { grass: 2, dark: 1 } },
    { label: 'Una cumbre nevada contra el cielo', points: { ice: 2, flying: 1 } },
    { label: 'Un desierto infinito y en silencio', points: { ground: 2, ghost: 1 } }] },
  { kind: SCENARIO, text: 'Elige refugio para una semana desconectado del mundo.', options: [
    { label: 'Cabaña nevada con chimenea', sub: 'Frío fuera, calma dentro.', points: { ice: 2, fire: 1 } },
    { label: 'Isla tropical sin cobertura', sub: 'Sal, sol y nada que hacer.', points: { water: 2, grass: 1 } }] },

  /* ------------------------------------------------------------------ */
  /* Social y relaciones                                                 */
  /* ------------------------------------------------------------------ */
  { kind: CHOICE, text: 'En un trabajo en equipo, sin proponértelo, sueles acabar siendo quien…', options: [
    { label: 'Toma las decisiones y marca el ritmo', points: { dragon: 2, fighting: 1 } },
    { label: 'Suelta las ideas raras que al final funcionan', points: { psychic: 1, ghost: 2 } },
    { label: 'Mantiene a todo el mundo de buenas', points: { fairy: 2, normal: 1 } },
    { label: 'Se asegura de que nada quede a medias', points: { steel: 2, ground: 1 } }] },
  { kind: CHOICE, text: 'Llegas a una fiesta donde apenas conoces a nadie. ¿Qué haces?', options: [
    { label: 'En diez minutos ya estoy hablando con todos', points: { electric: 2, fairy: 1 } },
    { label: 'Busco a la única persona que conozco y me quedo cerca', points: { normal: 2, water: 1 } },
    { label: 'Observo un rato antes de decidir con quién hablar', points: { dark: 2, psychic: 1 } },
    { label: 'Me voy pronto: esto no es lo mío', points: { ghost: 2, ice: 1 } }] },
  { kind: CHOICE, text: 'Tu grupo discute a dónde ir a cenar y nadie se decide. Tú…', options: [
    { label: 'Corto por lo sano y elijo yo', points: { dragon: 2, fire: 1 } },
    { label: 'Propongo votar, que sea justo', points: { steel: 2, normal: 1 } },
    { label: 'Me adapto a lo que salga, me da igual', points: { water: 2, grass: 1 } },
    { label: 'Sugiero el sitio raro que nadie conoce', points: { ghost: 2, poison: 1 } }] },
  { kind: SCENARIO, text: 'En un grupo nuevo, tu primera jugada.', options: [
    { label: 'Hablar primero y romper el hielo', sub: 'Alguien tiene que hacerlo.', points: { fire: 2, electric: 1 } },
    { label: 'Escuchar y calar a cada uno', sub: 'La información es poder.', points: { dark: 2, psychic: 1 } }] },
  { kind: CHOICE, text: 'Un amigo te llama hundido a las 3 de la mañana. Tu papel es…', options: [
    { label: 'Escuchar sin juzgar, el tiempo que haga falta', points: { fairy: 2, water: 1 } },
    { label: 'Darle un plan de acción para arreglarlo', points: { steel: 2, fighting: 1 } },
    { label: 'Hacerle reír hasta que se le olvide', points: { electric: 2, normal: 1 } },
    { label: 'Plantarme en su casa sin avisar', points: { fire: 2, rock: 1 } }] },
  { kind: CHOICE, text: 'Cuando algo te molesta de verdad, tu manera de gestionarlo es…', options: [
    { label: 'Ir de frente y decirlo en el momento', points: { fire: 1, fighting: 2 } },
    { label: 'Esperar, observar y elegir bien mi momento', points: { dark: 2, psychic: 1 } },
    { label: 'Dejarlo pasar para no montar un pollo', points: { water: 2, fairy: 1 } },
    { label: 'Quitarle hierro con humor', points: { electric: 2, normal: 1 } }] },
  { kind: SCENARIO, text: 'Tu papel alrededor de una hoguera.', options: [
    { label: 'El que cuenta la historia que nadie olvida', sub: 'Todas las miradas puestas en ti.', points: { ghost: 2, fire: 1 } },
    { label: 'El que escucha y guarda cada detalle', sub: 'Las historias también son tuyas.', points: { psychic: 2, grass: 1 } }] },
  { kind: CHOICE, text: 'En las discusiones de sobremesa tú eres de los que…', options: [
    { label: 'Defienden su postura hasta el final', points: { fighting: 2, dragon: 1 } },
    { label: 'Sueltan un dato que lo cambia todo', points: { psychic: 2, steel: 1 } },
    { label: 'Provocan un poco para animar el debate', points: { poison: 2, dark: 1 } },
    { label: 'Median para que nadie se enfade', points: { fairy: 2, water: 1 } }] },
  { kind: CHOICE, text: '¿Qué es lo primero que notas en una persona al conocerla?', options: [
    { label: 'Su energía: si suma o resta', points: { electric: 2, fairy: 1 } },
    { label: 'Lo que no dice: gestos, silencios', points: { psychic: 2, dark: 1 } },
    { label: 'Si es de fiar o va de farol', points: { rock: 2, steel: 1 } },
    { label: 'Su sentido del humor', points: { normal: 2, poison: 1 } }] },
  { kind: SCENARIO, text: 'Te organizan una fiesta sorpresa.', options: [
    { label: 'Me encanta: emoción y gente querida', sub: 'Que no falte nadie.', points: { fairy: 2, electric: 1 } },
    { label: 'Sonrío por fuera, sufro por dentro', sub: 'Preferiría haberlo sabido.', points: { ghost: 2, ice: 1 } }] },
  { kind: CHOICE, text: 'El cumplido que más te llega es que te digan que eres…', options: [
    { label: 'Valiente', points: { fighting: 2, fire: 1 } },
    { label: 'Interesante', points: { ghost: 2, psychic: 1 } },
    { label: 'De fiar', points: { rock: 2, ground: 1 } },
    { label: 'Divertido', points: { electric: 2, normal: 1 } },
    { label: 'Buena persona', points: { fairy: 2, grass: 1 } }] },
  { kind: CHOICE, text: 'Escribes en el grupo y nadie contesta en horas. Tú…', options: [
    { label: 'Lo repito más alto, sin vergüenza', points: { fire: 2, electric: 1 } },
    { label: 'Paso: ya contestarán', points: { water: 2, normal: 1 } },
    { label: 'Tomo nota mental de quién está en línea', points: { dark: 2, psychic: 1 } },
    { label: 'Escribo a cada uno por privado', points: { steel: 2, fairy: 1 } }] },
  { kind: SCENARIO, text: 'Karaoke o sala de escape: tu grupo te deja elegir.', options: [
    { label: 'Karaoke, aunque cante fatal', sub: 'Lo importante es el show.', points: { electric: 2, fairy: 1 } },
    { label: 'Sala de escape, a resolverlo todo', sub: 'Lo importante es ganar.', points: { psychic: 2, steel: 1 } }] },

  /* ------------------------------------------------------------------ */
  /* Retos y decisiones                                                  */
  /* ------------------------------------------------------------------ */
  { kind: SCENARIO, text: 'Llegas a un cruce de caminos y solo puedes tomar uno.', options: [
    { label: 'El sendero iluminado que todos recorren', sub: 'Seguro, conocido, sin sorpresas.', points: { normal: 2, rock: 1 } },
    { label: 'El atajo oscuro que nadie se atreve a cruzar', sub: 'Incierto, silencioso, solo para ti.', points: { dark: 2, ghost: 1 } }] },
  { kind: CHOICE, text: 'Cambian tus planes de golpe y sin avisar. Tu primera reacción es…', options: [
    { label: 'Adaptarme sobre la marcha, sin drama', points: { water: 2, bug: 1 } },
    { label: 'Verlo como una oportunidad y lanzarme', points: { fire: 1, dragon: 2 } },
    { label: 'Necesitar un rato para hacerme a la idea', points: { rock: 2, ice: 1 } },
    { label: 'Encogerme de hombros: ya lo veía venir', points: { psychic: 1, dark: 2 } }] },
  { kind: CHOICE, text: 'Ante una decisión importante, confías sobre todo en…', options: [
    { label: 'Mi instinto: la primera corazonada', points: { fire: 2, flying: 1 } },
    { label: 'Una lista de pros y contras', points: { steel: 2, psychic: 1 } },
    { label: 'Lo que me diga la gente en la que confío', points: { fairy: 2, normal: 1 } },
    { label: 'El tiempo: dormirlo y decidir mañana', points: { grass: 2, water: 1 } }] },
  { kind: SCENARIO, text: 'Caja misteriosa o premio seguro.', options: [
    { label: 'La caja: necesito saber qué hay', sub: 'Puede ser cualquier cosa.', points: { ghost: 2, electric: 1 } },
    { label: 'El premio: más vale pájaro en mano', sub: 'Lo bueno conocido gana.', points: { ground: 2, normal: 1 } }] },
  { kind: CHOICE, text: 'Una fecha límite se acerca peligrosamente. Tu estilo es…', options: [
    { label: 'Lo tengo acabado desde hace días', points: { steel: 2, ice: 1 } },
    { label: 'Trabajo mejor con presión, saldrá en el último momento', points: { electric: 2, dark: 1 } },
    { label: 'Poco a poco, cada día un trozo', points: { grass: 2, bug: 1 } },
    { label: 'Sprint final épico de madrugada', points: { fire: 2, dragon: 1 } }] },
  { kind: SCENARIO, text: 'Duelo a elegir: ingenio o fuerza.', options: [
    { label: 'Una partida de estrategia a muerte', sub: 'Que gane la mejor mente.', points: { psychic: 2, dark: 1 } },
    { label: 'Un pulso, aquí y ahora', sub: 'Que gane el más fuerte.', points: { fighting: 2, rock: 1 } }] },
  { kind: CHOICE, text: 'Te ofrecen dirigir un proyecto que te queda grande. Tú…', options: [
    { label: 'Acepto: ya aprenderé por el camino', points: { dragon: 2, fire: 1 } },
    { label: 'Pido tiempo para prepararme antes', points: { steel: 2, rock: 1 } },
    { label: 'Propongo co-dirigirlo con alguien', points: { fairy: 2, normal: 1 } },
    { label: 'Lo rechazo: sé bien dónde estoy cómodo', points: { ground: 2, ice: 1 } }] },
  { kind: SCENARIO, text: 'El salto está delante de ti.', options: [
    { label: 'Saltar primero y mirar después', sub: 'El vértigo es parte del viaje.', points: { flying: 2, fire: 1 } },
    { label: 'Medir el salto antes de despegar', sub: 'El vértigo se calcula.', points: { steel: 2, psychic: 1 } }] },
  { kind: CHOICE, text: 'Pierdes en un juego que te importaba. Por dentro…', options: [
    { label: 'Revancha ya: no me quedo así', points: { fighting: 2, dragon: 1 } },
    { label: 'Analizo qué hice mal para la próxima', points: { psychic: 2, steel: 1 } },
    { label: 'Me río: es solo un juego', points: { normal: 2, fairy: 1 } },
    { label: 'Sonrío, pero no se me olvida', points: { dark: 2, ghost: 1 } }] },
  { kind: SCENARIO, text: 'Ajedrez o póker: elige tu mesa.', options: [
    { label: 'Ajedrez: todo a la vista, gana el mejor', sub: 'Sin suerte, sin excusas.', points: { psychic: 2, steel: 1 } },
    { label: 'Póker: nada a la vista, gana el más listo', sub: 'La cara lo es todo.', points: { dark: 2, poison: 1 } }] },
  { kind: CHOICE, text: 'Te toca un dinero inesperado. Lo primero que piensas es…', options: [
    { label: 'El viaje que llevo años posponiendo', points: { flying: 2, water: 1 } },
    { label: 'Ahorrarlo: nunca se sabe', points: { ground: 2, steel: 1 } },
    { label: 'Invitar a los míos a algo grande', points: { fairy: 2, fire: 1 } },
    { label: 'Ese capricho absurdo que nadie aprobaría', points: { poison: 2, electric: 1 } }] },
  { kind: CHOICE, text: 'En una emergencia de verdad, tu papel natural es…', options: [
    { label: 'Tomar el mando y repartir tareas', points: { dragon: 2, steel: 1 } },
    { label: 'Mantener la calma y tranquilizar al resto', points: { water: 2, fairy: 1 } },
    { label: 'Actuar el primero, pensar después', points: { fire: 2, fighting: 1 } },
    { label: 'Ver la salida que nadie está viendo', points: { psychic: 2, dark: 1 } }] },

  /* ------------------------------------------------------------------ */
  /* Gustos y aficiones                                                  */
  /* ------------------------------------------------------------------ */
  { kind: CHOICE, text: 'Te regalan una experiencia para vivir esta semana. Eliges…', options: [
    { label: 'Un salto en paracaídas', points: { flying: 2, fire: 1 } },
    { label: 'Un buceo nocturno', points: { water: 2, dark: 1 } },
    { label: 'Un retiro de silencio y meditación', points: { psychic: 2, grass: 1 } },
    { label: 'Un torneo donde competir en serio', points: { fighting: 2, dragon: 1 } }] },
  { kind: CHOICE, text: 'En un museo gigante solo te queda una hora. ¿A qué sala vas?', options: [
    { label: 'Dinosaurios y fósiles', points: { rock: 2, ground: 1 } },
    { label: 'Arte moderno incomprensible', points: { ghost: 2, poison: 1 } },
    { label: 'Máquinas, inventos y tecnología', points: { steel: 2, electric: 1 } },
    { label: 'Civilizaciones perdidas', points: { psychic: 2, dark: 1 } }] },
  { kind: CHOICE, text: 'Tu playlist más escuchada, sin filtros, es…', options: [
    { label: 'Energía pura para arrancar', points: { electric: 2, fighting: 1 } },
    { label: 'Melancolía bonita para los cascos', points: { ghost: 2, water: 1 } },
    { label: 'Clásicos de siempre que no fallan', points: { normal: 2, rock: 1 } },
    { label: 'Cosas raras que nadie más conoce', points: { poison: 2, psychic: 1 } }] },
  { kind: SCENARIO, text: 'Acuario o planetario: última entrada del día.', options: [
    { label: 'Acuario: el fondo del mar de cerca', sub: 'Otro mundo bajo el agua.', points: { water: 2, ice: 1 } },
    { label: 'Planetario: el universo sobre tu cabeza', sub: 'Otro mundo sobre el cielo.', points: { psychic: 2, flying: 1 } }] },
  { kind: CHOICE, text: 'Si te apuntaras mañana a una actividad nueva, sería…', options: [
    { label: 'Artes marciales o boxeo', points: { fighting: 2, steel: 1 } },
    { label: 'Cerámica o carpintería', points: { ground: 2, grass: 1 } },
    { label: 'Improvisación teatral', points: { electric: 2, ghost: 1 } },
    { label: 'Astronomía o ajedrez', points: { psychic: 2, ice: 1 } }] },
  { kind: CHOICE, text: 'De una cocina te quedas con…', options: [
    { label: 'El picante que hace llorar', points: { fire: 2, poison: 1 } },
    { label: 'El dulce que reconforta', points: { fairy: 2, normal: 1 } },
    { label: 'Lo fresco y ligero', points: { grass: 2, water: 1 } },
    { label: 'Lo contundente de toda la vida', points: { ground: 2, rock: 1 } }] },
  { kind: SCENARIO, text: 'Librería antigua o feria tecnológica: solo puedes entrar a una.', options: [
    { label: 'La librería que huele a papel viejo', sub: 'Historias que esperan siglos.', points: { ghost: 2, psychic: 1 } },
    { label: 'La feria del último invento', sub: 'El futuro en tus manos.', points: { electric: 2, steel: 1 } }] },
  { kind: CHOICE, text: 'Las fotos que más haces con el móvil son de…', options: [
    { label: 'Cielos, atardeceres, nubes', points: { flying: 2, fire: 1 } },
    { label: 'Gente: los míos en su salsa', points: { fairy: 2, normal: 1 } },
    { label: 'Detalles raros que nadie más mira', points: { bug: 2, ghost: 1 } },
    { label: 'Apenas hago fotos: prefiero vivirlo', points: { dark: 2, water: 1 } }] },
  { kind: SCENARIO, text: 'Pintar o esculpir: el taller es tuyo una tarde.', options: [
    { label: 'Pintar: color y libertad total', sub: 'Los errores son parte del cuadro.', points: { fairy: 2, flying: 1 } },
    { label: 'Esculpir: forma a base de paciencia', sub: 'Los errores se puliran después.', points: { rock: 2, steel: 1 } }] },
  { kind: CHOICE, text: 'Un documental te atrapa un domingo. Seguramente va de…', options: [
    { label: 'Depredadores en plena caza', points: { dark: 2, fire: 1 } },
    { label: 'Las profundidades del océano', points: { water: 2, ghost: 1 } },
    { label: 'Colonias de insectos y su organización', points: { bug: 2, steel: 1 } },
    { label: 'Volcanes y terremotos', points: { ground: 2, rock: 1 } }] },
  { kind: CHOICE, text: '¿Coleccionas o has coleccionado algo?', options: [
    { label: 'Sí, y lo tengo todo ordenadísimo', points: { steel: 2, bug: 1 } },
    { label: 'Recuerdos de viajes y momentos', points: { normal: 2, fairy: 1 } },
    { label: 'Cosas raras: cuanto más únicas, mejor', points: { ghost: 2, poison: 1 } },
    { label: 'No: acumular no va conmigo', points: { flying: 2, ice: 1 } }] },
  { kind: CHOICE, text: 'En una tienda de juegos de mesa te llevas…', options: [
    { label: 'El de estrategia de tres horas', points: { psychic: 2, dragon: 1 } },
    { label: 'El de risas para toda la familia', points: { normal: 2, electric: 1 } },
    { label: 'El cooperativo: o ganamos todos o nadie', points: { fairy: 2, bug: 1 } },
    { label: 'El de faroles y traiciones', points: { dark: 2, poison: 1 } }] },

  /* ------------------------------------------------------------------ */
  /* Personalidad profunda                                               */
  /* ------------------------------------------------------------------ */
  { kind: CHOICE, text: 'Sinceramente, ¿qué es lo que más te acaba agotando?', options: [
    { label: 'La rutina y que no pase nada', points: { fire: 2, electric: 1 } },
    { label: 'El ruido y el caos constante', points: { ice: 2, psychic: 1 } },
    { label: 'La gente que va de farol', points: { dark: 2, steel: 1 } },
    { label: 'Las malas caras y los conflictos', points: { fairy: 2, water: 1 } }] },
  { kind: CHOICE, text: 'Si pudieras quedarte con un solo superpoder para siempre…', options: [
    { label: 'Volar a donde quisiera', points: { flying: 2 } },
    { label: 'Leer la mente de los demás', points: { psychic: 2 } },
    { label: 'Una fuerza descomunal', points: { fighting: 2 } },
    { label: 'Volverme invisible cuando quiera', points: { ghost: 1, dark: 2 } },
    { label: 'Curar a quien lo necesite', points: { fairy: 2, grass: 1 } }] },
  { kind: CHOICE, text: 'En el fondo, y aunque no lo digas en voz alta, lo que más valoras es…', options: [
    { label: 'Tu libertad, por encima de todo', points: { flying: 1, dark: 2 } },
    { label: 'La lealtad de los tuyos', points: { rock: 1, fighting: 2 } },
    { label: 'Entender cómo funciona todo', points: { psychic: 2, steel: 1 } },
    { label: 'Sentirte conectado a los demás', points: { fairy: 2, water: 1 } }] },
  { kind: CHOICE, text: 'Tu energía, si tuvieras que describirla, se parece más a…', options: [
    { label: 'Estalla rápido y brilla fuerte', points: { fire: 2, electric: 1 } },
    { label: 'Constante y sin prisas, siempre ahí', points: { ground: 2, rock: 1 } },
    { label: 'Va por olas: subo y bajo', points: { water: 2, ice: 1 } },
    { label: 'Intensa, pero por dentro', points: { ghost: 2, poison: 1 } }] },
  { kind: CHOICE, text: 'Cuando algo te apasiona de verdad, lo típico es que…', options: [
    { label: 'Me obsesione y vaya con todo', points: { fire: 1, dragon: 2 } },
    { label: 'Investigue hasta el último detalle', points: { psychic: 1, bug: 2 } },
    { label: 'Se lo cuente a medio mundo', points: { fairy: 1, electric: 2 } },
    { label: 'Lo disfrute a mi ritmo y sin ruido', points: { grass: 2, ice: 1 } }] },
  { kind: CHOICE, text: 'Si preguntara a quienes te conocen, dirían que eres alguien…', options: [
    { label: 'Que ilumina la sala en cuanto entra', points: { fairy: 2, electric: 1 } },
    { label: 'Difícil de descifrar del todo', points: { ghost: 2, dark: 1 } },
    { label: 'En quien siempre se puede apoyar', points: { rock: 2, normal: 1 } },
    { label: 'Que va a su bola y ni caso', points: { poison: 2, flying: 1 } }] },
  { kind: CHOICE, text: 'Eso que te da un poco de miedo, aunque no lo vayas contando por ahí…', options: [
    { label: 'Quedarme quieto y no avanzar', points: { fire: 1, fighting: 2 } },
    { label: 'Perder a la gente que quiero', points: { fairy: 2, water: 1 } },
    { label: 'Que se me escape el control de todo', points: { steel: 2, dragon: 1 } },
    { label: 'Ser uno más del montón', points: { dark: 1, poison: 2 } }] },
  { kind: CHOICE, text: 'Tu humor, el de verdad, tira más a…', options: [
    { label: 'Ironía fina que no todos pillan', points: { dark: 2, psychic: 1 } },
    { label: 'Absurdo total, cuanto más random mejor', points: { ghost: 2, electric: 1 } },
    { label: 'Reírme de mí mismo sin problema', points: { normal: 2, water: 1 } },
    { label: 'Puyitas cariñosas a los míos', points: { poison: 2, fairy: 1 } }] },
  { kind: CHOICE, text: 'Cuando sueñas despierto, sueles estar…', options: [
    { label: 'Ganando algo delante de todos', points: { dragon: 2, fighting: 1 } },
    { label: 'En otra época u otro mundo', points: { ghost: 2, psychic: 1 } },
    { label: 'En una vida tranquila y sencilla', points: { grass: 2, normal: 1 } },
    { label: 'Recorriendo sitios que no existen en el mapa', points: { flying: 2, water: 1 } }] },
  { kind: CHOICE, text: 'Ser el centro de atención, para ti, es…', options: [
    { label: 'Mi hábitat natural', points: { electric: 2, fire: 1 } },
    { label: 'Soportable si lo controlo yo', points: { dragon: 2, dark: 1 } },
    { label: 'Incómodo: prefiero segunda fila', points: { grass: 2, ice: 1 } },
    { label: 'Depende del día y de la gente', points: { water: 2, normal: 1 } }] },
  { kind: CHOICE, text: 'De tu paso por el mundo te gustaría dejar sobre todo…', options: [
    { label: 'Algo construido que siga en pie', points: { steel: 2, rock: 1 } },
    { label: 'Huella en las personas que quise', points: { fairy: 2, water: 1 } },
    { label: 'Una historia que valga la pena contar', points: { fire: 2, dragon: 1 } },
    { label: 'Un misterio que dé que hablar', points: { ghost: 2, dark: 1 } }] },
  { kind: CHOICE, text: 'Lo que peor llevas de ti mismo, siendo honestos, es…', options: [
    { label: 'Que me caliento rápido', points: { fire: 2, fighting: 1 } },
    { label: 'Que le doy vueltas a todo', points: { psychic: 2, ghost: 1 } },
    { label: 'Que me cuesta decir que no', points: { fairy: 2, grass: 1 } },
    { label: 'Que desconfío por defecto', points: { dark: 2, ice: 1 } }] },

  /* ------------------------------------------------------------------ */
  /* Clima y naturaleza                                                  */
  /* ------------------------------------------------------------------ */
  { kind: CHOICE, text: 'Última: si fueras un fenómeno de la naturaleza, serías…', options: [
    { label: 'Un volcán', points: { fire: 2, ground: 1 } },
    { label: 'Una ola gigante', points: { water: 2 } },
    { label: 'Un rayo', points: { electric: 2 } },
    { label: 'Una montaña', points: { rock: 2, ground: 1 } },
    { label: 'Una aurora boreal', points: { ice: 1, psychic: 1, fairy: 1 } }] },
  { kind: CHOICE, text: 'Tu estación del año, la que te sienta bien de verdad, es…', options: [
    { label: 'Verano: calor, luz y días infinitos', points: { fire: 2, water: 1 } },
    { label: 'Otoño: manta, hojas y melancolía', points: { ghost: 2, grass: 1 } },
    { label: 'Invierno: frío fuera, refugio dentro', points: { ice: 2, dark: 1 } },
    { label: 'Primavera: todo arranca de nuevo', points: { grass: 2, fairy: 1 } }] },
  { kind: SCENARIO, text: 'Empieza una tormenta espectacular.', options: [
    { label: 'A la ventana: no pienso perdérmela', sub: 'Cada rayo, un espectáculo.', points: { electric: 2, flying: 1 } },
    { label: 'Libro, sofá y el sonido de fondo', sub: 'La mejor banda sonora.', points: { water: 2, psychic: 1 } }] },
  { kind: CHOICE, text: 'El sonido que más te relaja es…', options: [
    { label: 'Lluvia contra el cristal', points: { water: 2, grass: 1 } },
    { label: 'Viento entre los árboles', points: { flying: 2, ghost: 1 } },
    { label: 'Fuego crepitando', points: { fire: 2, rock: 1 } },
    { label: 'El silencio absoluto', points: { ice: 2, psychic: 1 } }] },
  { kind: SCENARIO, text: 'Luna llena o mediodía de sol: elige tu hora.', options: [
    { label: 'Paseo nocturno bajo la luna', sub: 'La noche cuenta otras cosas.', points: { dark: 2, ghost: 1 } },
    { label: 'Actividad a pleno sol', sub: 'El día está para quemarlo.', points: { fire: 2, grass: 1 } }] },
  { kind: SCENARIO, text: 'Cumbre o caverna: la expedición sale mañana.', options: [
    { label: 'Subir a la cima más alta', sub: 'El mundo, a vista de pájaro.', points: { flying: 2, rock: 1 } },
    { label: 'Bajar a la cueva más profunda', sub: 'El mundo que nadie ha visto.', points: { ground: 2, ghost: 1 } }] },
  /* ------------------------------------------------------------------ */
  /* Hipotéticos y fantasía                                              */
  /* ------------------------------------------------------------------ */
  { kind: SCENARIO, text: 'Vas a hacer un viaje largo y eliges con quién.', options: [
    { label: 'Alguien impredecible que te saca de tu zona', sub: 'Nunca sabes qué va a pasar.', points: { electric: 1, ghost: 2 } },
    { label: 'Alguien firme en quien apoyarte pase lo que pase', sub: 'Roca sólida, cero sorpresas.', points: { rock: 2, steel: 1 } }] },
  { kind: SCENARIO, text: 'Dos cuadros cuelgan frente a ti en una galería. Solo puedes llevarte uno.', options: [
    { label: 'Una tormenta eléctrica sobre la ciudad', sub: 'Tensión, energía, movimiento.', points: { electric: 2, flying: 1 } },
    { label: 'Un bosque en calma al amanecer', sub: 'Quietud, verde, aire limpio.', points: { grass: 2, normal: 1 } }] },
  { kind: SCENARIO, text: 'Te dejan elegir una criatura imaginaria como compañera.', options: [
    { label: 'Una pequeña y traviesa que no para quieta', sub: 'Rápida, lista, un poco gamberra.', points: { poison: 2, electric: 1 } },
    { label: 'Una enorme y noble que impone respeto', sub: 'Antigua, poderosa, tranquila.', points: { dragon: 2, rock: 1 } }] },
  { kind: CHOICE, text: 'Si vivieras en un cuento, serías…', options: [
    { label: 'Quien sale a matar al dragón', points: { fighting: 2, fire: 1 } },
    { label: 'El mago que lo sabe todo pero habla poco', points: { psychic: 2, ghost: 1 } },
    { label: 'El personaje secundario que roba escenas', points: { poison: 2, electric: 1 } },
    { label: 'Quien cuida el jardín del castillo en paz', points: { grass: 2, fairy: 1 } }] },
  { kind: CHOICE, text: 'Puedes hablar con animales durante un día. ¿Con cuál conversas primero?', options: [
    { label: 'Con un cuervo: seguro que sabe cosas', points: { dark: 2, flying: 1 } },
    { label: 'Con mi mascota, por fin', points: { normal: 2, fairy: 1 } },
    { label: 'Con una ballena en mitad del océano', points: { water: 2, psychic: 1 } },
    { label: 'Con las hormigas: quiero entender el sistema', points: { bug: 2, steel: 1 } }] },
  { kind: SCENARIO, text: 'Un genio te ofrece dos dones. Solo uno.', options: [
    { label: 'No cansarte jamás', sub: 'Energía infinita, sin descanso necesario.', points: { electric: 2, fighting: 1 } },
    { label: 'No necesitar dormir', sub: 'Ocho horas extra cada noche.', points: { ghost: 2, dark: 1 } }] },
  { kind: CHOICE, text: 'Si tu vida fuera una película, sería…', options: [
    { label: 'De aventuras, con persecución incluida', points: { fire: 2, flying: 1 } },
    { label: 'De misterio, con giro final', points: { ghost: 2, psychic: 1 } },
    { label: 'Una comedia de las que se ven en familia', points: { normal: 2, fairy: 1 } },
    { label: 'Cine independiente raro que gana premios', points: { poison: 2, ice: 1 } }] },
  { kind: SCENARIO, text: 'Puedes leer una página del libro de tu futuro.', options: [
    { label: 'La leo sin pensarlo', sub: 'Saber es poder, siempre.', points: { psychic: 2, dark: 1 } },
    { label: 'Ni loco: que la vida sorprenda', sub: 'El misterio es el motor.', points: { flying: 2, fire: 1 } }] },
  { kind: CHOICE, text: 'Tu casa empieza a arder (todos a salvo). ¿Qué rescatas?', options: [
    { label: 'Las fotos y recuerdos: eso no vuelve', points: { fairy: 2, ghost: 1 } },
    { label: 'El portátil: mi vida está ahí', points: { steel: 2, psychic: 1 } },
    { label: 'Nada material: salgo y punto', points: { water: 2, flying: 1 } },
    { label: 'Esa cosa que solo tiene valor para mí', points: { normal: 2, grass: 1 } }] },
  { kind: SCENARIO, text: 'Fama o anonimato: firma aquí.', options: [
    { label: 'Que todo el mundo sepa mi nombre', sub: 'Brillar tiene un precio y lo pago.', points: { dragon: 2, electric: 1 } },
    { label: 'Influir sin que nadie sepa quién soy', sub: 'El poder de verdad no posa.', points: { dark: 2, ghost: 1 } }] },

  /* ------------------------------------------------------------------ */
  /* Estilo y detalles                                                   */
  /* ------------------------------------------------------------------ */
  { kind: CHOICE, text: 'Al vestirte, lo que buscas sin darte cuenta es…', options: [
    { label: 'Comodidad ante todo', points: { normal: 2, grass: 1 } },
    { label: 'Que se me recuerde', points: { poison: 2, fire: 1 } },
    { label: 'Elegancia sin esfuerzo', points: { ice: 2, psychic: 1 } },
    { label: 'Práctico: bolsillos y a funcionar', points: { ground: 2, steel: 1 } }] },
  { kind: CHOICE, text: 'En tu mochila o bolso nunca falta…', options: [
    { label: 'Agua y algo de comer, por si acaso', points: { grass: 2, ground: 1 } },
    { label: 'Cargador y batería externa', points: { electric: 2, steel: 1 } },
    { label: 'Auriculares: mi burbuja portátil', points: { ghost: 2, ice: 1 } },
    { label: 'Nada: viajo ligero siempre', points: { flying: 2, dark: 1 } }] },
  { kind: CHOICE, text: 'Tus notas del móvil son…', options: [
    { label: 'Listas ordenadas de todo', points: { steel: 2, bug: 1 } },
    { label: 'Ideas sueltas a las 3 a.m.', points: { ghost: 2, psychic: 1 } },
    { label: 'Cosas de otros que quiero recordar', points: { fairy: 2, normal: 1 } },
    { label: 'Vacías: lo llevo todo en la cabeza', points: { dark: 2, dragon: 1 } }] },
  { kind: SCENARIO, text: 'Ventanilla o pasillo: vuelo largo.', options: [
    { label: 'Ventanilla: el mundo desde arriba', sub: 'Las nubes son parte del viaje.', points: { flying: 2, psychic: 1 } },
    { label: 'Pasillo: libertad de movimiento', sub: 'Control y salida rápida.', points: { steel: 2, dark: 1 } }] },
  { kind: CHOICE, text: 'Esperando una cola larga, tú…', options: [
    { label: 'Hablo con quien tenga al lado', points: { fairy: 2, electric: 1 } },
    { label: 'Cascos y a mi mundo', points: { ghost: 2, ice: 1 } },
    { label: 'Calculo si la otra cola va más rápida', points: { psychic: 2, dark: 1 } },
    { label: 'Espero y ya: no me altero', points: { rock: 2, water: 1 } }] },
  { kind: CHOICE, text: 'Tu relación con el móvil es…', options: [
    { label: 'Siempre en silencio: yo decido cuándo', points: { dark: 2, ice: 1 } },
    { label: 'Contesto al segundo, no lo puedo evitar', points: { electric: 2, fairy: 1 } },
    { label: 'Lo pierdo por casa constantemente', points: { normal: 2, ghost: 1 } },
    { label: 'Ordenado: carpetas, alarmas, todo al día', points: { steel: 2, psychic: 1 } }] },

  /* ------------------------------------------------------------------ */
  /* Trabajo y aprendizaje                                               */
  /* ------------------------------------------------------------------ */
  { kind: CHOICE, text: 'Aprendes mejor cuando…', options: [
    { label: 'Me tiro a la piscina y pruebo', points: { fire: 2, fighting: 1 } },
    { label: 'Leo y entiendo la teoría primero', points: { psychic: 2, steel: 1 } },
    { label: 'Alguien me lo explica con calma', points: { fairy: 2, grass: 1 } },
    { label: 'Observo cómo lo hacen los que saben', points: { dark: 2, bug: 1 } }] },
  { kind: CHOICE, text: 'Si pudieras estudiar cualquier cosa solo por gusto…', options: [
    { label: 'Psicología: entender por qué hacemos lo que hacemos', points: { psychic: 2, fairy: 1 } },
    { label: 'Supervivencia: valerme solo en cualquier parte', points: { ground: 2, fighting: 1 } },
    { label: 'Idiomas: hablar con todo el mundo', points: { normal: 2, water: 1 } },
    { label: 'Criminología: el lado oscuro de las cosas', points: { dark: 2, poison: 1 } }] },
  { kind: CHOICE, text: 'Tu mesa de trabajo ideal está…', options: [
    { label: 'En una oficina con gente y movimiento', points: { electric: 2, normal: 1 } },
    { label: 'En casa, a mi aire y con mis reglas', points: { ghost: 2, dark: 1 } },
    { label: 'Cerca de una ventana con vistas verdes', points: { grass: 2, flying: 1 } },
    { label: 'Donde sea: me concentro igual', points: { steel: 2, rock: 1 } }] },
  { kind: SCENARIO, text: 'Elige herramienta para un proyecto grande.', options: [
    { label: 'Un plan detallado paso a paso', sub: 'Nada queda al azar.', points: { steel: 2, psychic: 1 } },
    { label: 'Un objetivo claro e improvisación', sub: 'El camino se hace andando.', points: { fire: 2, flying: 1 } }] },
  { kind: CHOICE, text: 'Cuando te piden consejo, tu estilo es…', options: [
    { label: 'Decir la verdad aunque duela', points: { dark: 2, steel: 1 } },
    { label: 'Escuchar más que hablar', points: { water: 2, psychic: 1 } },
    { label: 'Animar: casi todo tiene arreglo', points: { fairy: 2, fire: 1 } },
    { label: 'Contar lo que yo haría y ya decidan', points: { normal: 2, ground: 1 } }] },
  /* ------------------------------------------------------------------ */
  /* Situaciones sociales límite                                         */
  /* ------------------------------------------------------------------ */
  { kind: SCENARIO, text: 'Un fin de semana ideal, sin culpa ni obligaciones.', options: [
    { label: 'Gente, música y luces hasta las tantas', sub: 'Cuanto más ambiente, mejor.', points: { electric: 2, fairy: 1 } },
    { label: 'Manta, peli y silencio absoluto', sub: 'El plan es no ver a nadie.', points: { ice: 2, psychic: 1 } }] },
  { kind: CHOICE, text: 'Alguien se cuela en la cola delante de ti. Tú…', options: [
    { label: 'Se lo digo alto y claro', points: { fighting: 2, fire: 1 } },
    { label: 'Miradas y suspiro pasivo-agresivo', points: { poison: 2, ghost: 1 } },
    { label: 'Lo dejo pasar: no me merece la pena', points: { water: 2, grass: 1 } },
    { label: 'Comentario irónico en voz baja', points: { dark: 2, normal: 1 } }] },
  { kind: CHOICE, text: 'Te equivocas delante de todos. ¿Qué haces?', options: [
    { label: 'Lo convierto en broma al instante', points: { electric: 2, normal: 1 } },
    { label: 'Lo asumo, corrijo y sigo como si nada', points: { steel: 2, rock: 1 } },
    { label: 'Me muero por dentro pero nadie lo nota', points: { ghost: 2, ice: 1 } },
    { label: 'Doblo la apuesta: ¿error? ¿qué error?', points: { dragon: 2, poison: 1 } }] },
  { kind: CHOICE, text: 'Un desconocido necesita ayuda evidente en la calle. Tú…', options: [
    { label: 'Voy directo, sin pensarlo', points: { fighting: 2, fairy: 1 } },
    { label: 'Evalúo primero la situación', points: { dark: 2, psychic: 1 } },
    { label: 'Busco a alguien más cualificado que yo', points: { normal: 2, steel: 1 } },
    { label: 'Me acerco con calma para no agobiar', points: { water: 2, grass: 1 } }] },
  { kind: SCENARIO, text: 'Toca hablar en público mañana.', options: [
    { label: 'Sin guion: fluyo mejor en directo', sub: 'La adrenalina juega a favor.', points: { fire: 2, electric: 1 } },
    { label: 'Ensayado al milímetro esta noche', sub: 'La preparación es la magia.', points: { steel: 2, ice: 1 } }] },
  { kind: CHOICE, text: 'Te llega un cotilleo jugoso de alguien cercano. Tú…', options: [
    { label: 'Se lo pregunto directamente a la persona', points: { fighting: 2, rock: 1 } },
    { label: 'Lo guardo: la información es oro', points: { dark: 2, psychic: 1 } },
    { label: 'No quiero saberlo, me incomoda', points: { grass: 2, ice: 1 } },
    { label: 'Defiendo a esa persona si no está', points: { fairy: 2, steel: 1 } }] },
]);
