/* The one-page negotiation sheet: the five sections of the book's appendix.
 *
 * Each section declares its storage key, the kind of input it needs, and the
 * didactic scaffolding (why it exists, how many entries, starter templates).
 * The UI is generated from this list, so adding a section means editing data,
 * not markup.
 *
 * kind: 'text'  -> single textarea, stored as a string
 *       'list'  -> N textareas, stored as an array of strings
 */
window.PLIEGO = window.PLIEGO || {};

PLIEGO.SHEET = [
  {
    key: 'objetivo',
    n: 'I',
    kind: 'text',
    title: 'El objetivo',
    ask: 'Escribí un solo objetivo: el mejor resultado razonable, no tu mínimo.',
    why:
      'Pensá en los dos extremos, el mejor y el peor, pero anotá únicamente el de arriba. ' +
      'El número que escribís es el que tu cabeza va a defender bajo presión, y la trampa ' +
      'clásica es anotar la alternativa de reserva: apenas la escribís, se convierte en tu ' +
      'techo y vas a conceder todo lo que esté por encima.',
    how: [
      'Fijá un objetivo optimista pero razonable y definilo con claridad.',
      'Anotalo.',
      'Comentáselo a un colega: así te cuesta más acobardarte.',
      'Llevalo escrito a la mesa.'
    ],
    placeholder:
      'Ej.: cerrar el contrato anual en 120.000 con pago trimestral adelantado y dos ' +
      'casos de éxito publicables.'
  },
  {
    key: 'resumen',
    n: 'II',
    kind: 'text',
    title: 'El resumen',
    ask: 'Resumí en dos o tres frases los hechos conocidos que dan pie a esta negociación.',
    why:
      'No alcanza con decir lo que querés. Tenés que poder describir la situación de las ' +
      'dos partes tan bien que el otro responda «así es». Si no te lo dice, el resumen ' +
      'está mal escrito: volvé a empezar.',
    how: [
      '¿Por qué estás ahí?',
      '¿Qué querés?',
      '¿Qué quiere la otra parte, y por qué?'
    ],
    placeholder:
      'Ej.: trabajamos juntos hace tres años; su equipo duplicó el volumen y el contrato ' +
      'actual quedó corto; ellos tienen presupuesto congelado hasta marzo y un nuevo ' +
      'director que necesita mostrar ahorro.'
  },
  {
    key: 'etiquetas',
    n: 'III',
    kind: 'list',
    slots: 3,
    title: 'Etiquetas y auditoría de acusaciones',
    ask: 'Anticipá lo peor que pueden pensar de tu propuesta y convertilo en etiquetas.',
    why:
      'Listá las acusaciones que te podrían hacer, por injustas o ridículas que suenen, y ' +
      'preparate para decirlas vos primero. Una acusación que vos pusiste sobre la mesa ya ' +
      'no sirve como arma.',
    how: [
      '«Parece que _____ tiene mucho valor para vos.»',
      '«Parece que no te gusta _____.»',
      '«Parece que _____ lo haría más fácil.»',
      '«Parece que recelás de _____.»'
    ],
    placeholder: 'Ej.: parece que subir el precio ahora te deja mal parado frente a tu director.'
  },
  {
    key: 'preguntas',
    n: 'IV',
    kind: 'list',
    slots: 5,
    title: 'Preguntas calibradas',
    ask: 'Escribí de tres a cinco preguntas con «cómo» o «qué». Ninguna con «por qué».',
    why:
      'Sirven para dos cosas: descubrir qué valora de verdad la otra parte, y desenterrar ' +
      'lo que puede matar el acuerdo más tarde — casi siempre alguien que no está sentado ' +
      'en la mesa. Hacelas de a dos o tres: son parecidas a propósito, y eso obliga a ' +
      'mirar el mismo problema desde ángulos distintos.',
    how: [
      '¿Cuál es el mayor reto al que se enfrentan?',
      '¿Cómo afecta esto al resto de tu equipo?',
      '¿Qué pasa si no hacen nada? ¿Qué les cuesta?',
      '¿Cómo beneficia este acuerdo a aquello de lo que la empresa se enorgullece?',
      '¿Qué hace que valga la pena?'
    ],
    placeholder: 'Ej.: ¿cómo encaja este contrato en los objetivos del área para el año?'
  },
  {
    key: 'noEconomicas',
    n: 'V',
    kind: 'list',
    slots: 4,
    title: 'Ofertas no económicas',
    ask: 'Listá qué tiene la otra parte, además de dinero, que a vos te sirva.',
    why:
      'Preguntate: «¿qué me podrían dar para que yo hiciera esto gratis?». Un porcentaje ' +
      'altísimo de las negociaciones no gira alrededor del dinero sino de la autoestima, el ' +
      'estatus, la autonomía y el riesgo percibido. Lo que a ellos les cuesta poco puede ' +
      'valer mucho para vos — y al revés.',
    how: [
      'Visibilidad: menciones, casos de éxito, referencias, un artículo.',
      'Acceso: a su gente, a sus datos, a su red de contactos.',
      'Tiempo: plazos de pago, prioridad, exclusividad.',
      'Riesgo: garantías que los hacen quedar bien ante su jefe.'
    ],
    placeholder: 'Ej.: que nos dejen publicar el caso de éxito con su logo.'
  }
];

PLIEGO.sheetKeys = function () {
  return PLIEGO.SHEET.map(function (s) { return s.key; });
};
