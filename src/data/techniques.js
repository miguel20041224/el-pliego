/* The nine techniques, one per chapter of the source book (chapters 2-10).
 * Each card follows the same didactic shape so the reader always knows where
 * to look: what it is, why it works, how it sounds, and how it is botched.
 *
 * Domain text is Spanish on purpose: the reader, the source material and the
 * sibling project are all Spanish.
 */
window.PLIEGO = window.PLIEGO || {};

PLIEGO.TECHNIQUES = [
  {
    id: 'espejo',
    n: 1,
    chapter: 2,
    name: 'El reflejo y la voz',
    claim: 'Negociar no es discutir: es averiguar.',
    what:
      'Repetí las últimas una a tres palabras que dijo la otra persona, con entonación ' +
      'ascendente, y después callate. Decilo con voz baja, lenta y descendente: la voz de ' +
      'locutor nocturno. El tono transmite calma, no sumisión.',
    why:
      'El reflejo activa un instinto social: ante una palabra propia devuelta, la persona ' +
      'amplía en vez de defenderse. Te regala contexto que no pensaba entregar y te da ' +
      'tiempo para pensar sin pedir una pausa. La voz calmada baja la temperatura de la ' +
      'mesa antes de que el contenido siquiera importe.',
    say: [
      '—No tenemos presupuesto para eso este trimestre. / —¿Presupuesto para eso este trimestre?',
      '—El equipo está saturado. / —¿Saturado?'
    ],
    mistake:
      'Hablar inmediatamente después del reflejo. El silencio de cuatro segundos es la ' +
      'mitad de la técnica; sin él sólo repetiste palabras.'
  },
  {
    id: 'etiqueta',
    n: 2,
    chapter: 3,
    name: 'Etiquetar y la auditoría de acusaciones',
    claim: 'Lo que se nombra, se desarma.',
    what:
      'Poné en palabras la emoción que ves enfrente, en tercera persona y sin apropiártela: ' +
      '«parece que…», «da la impresión de que…». Y antes de que te acusen, acusate vos: ' +
      'enumerá en voz alta lo peor que podrían decir de tu posición.',
    why:
      'Nombrar una emoción negativa reduce su intensidad; negarla la multiplica. La auditoría ' +
      'de acusaciones le saca munición al otro: ya no puede usar en tu contra algo que vos ' +
      'mismo pusiste sobre la mesa. Y las razones para no cerrar pesan más que las razones ' +
      'para cerrar, así que van primero.',
    say: [
      'Parece que esta propuesta llega en el peor momento posible.',
      'Voy a decir lo que seguro estás pensando: que somos el proveedor más caro y que ' +
      'encima pedimos cambiar un proceso que ya funciona.'
    ],
    mistake:
      'Decir «yo entiendo que estés molesto». El «yo» mete tu ego en la frase y suena a ' +
      'excusa. La etiqueta es neutra: «parece que esto te molestó».'
  },
  {
    id: 'no',
    n: 3,
    chapter: 4,
    name: 'Domina el «no»',
    claim: 'El «no» no cierra la conversación: la empieza.',
    what:
      'Dejá de perseguir el «sí». Diseñá tus preguntas para que la respuesta cómoda sea ' +
      '«no». Un «no» puede significar «todavía no», «no me siento cómodo» o «no entiendo»: ' +
      'todas son puertas abiertas.',
    why:
      'El «sí» temprano pone a la gente a la defensiva porque huele a compromiso. El «no» ' +
      'devuelve la sensación de control, y una persona que siente que manda escucha. ' +
      'Un «¿es mal momento?» consigue respuesta donde «¿tenés unos minutos?» consigue silencio.',
    say: [
      '¿Es mal momento para hablar de esto?',
      '¿Abandonaste este proyecto?',
      '¿Te parecería una locura revisar el alcance antes de hablar de precio?'
    ],
    mistake:
      'Arrancar una conversación de ventas con tres preguntas diseñadas para que te digan ' +
      '«sí». Eso es un «sí» de compromiso falso: no compra nada.'
  },
  {
    id: 'asies',
    n: 4,
    chapter: 5,
    name: 'Provocá un «así es»',
    claim: 'Dos palabras que mueven la mesa entera.',
    what:
      'Construí un resumen de la posición del otro: etiquetas más paráfrasis, su mundo ' +
      'contado por vos mejor de lo que lo contaría él. No agregues tu opinión. Terminá y callate.',
    why:
      'Cuando alguien escucha su propia realidad reconstruida con precisión, siente que lo ' +
      'entendieron de verdad y baja la guardia. El «así es» marca ese punto de inflexión. ' +
      'Ojo: «tenés razón» es lo contrario — es la frase con la que te sacan de encima.',
    say: [
      'Déjame ver si entendí: el equipo ya invirtió seis meses en el sistema actual, ' +
      'cambiarlo ahora te deja expuesto ante tu jefe, y lo que te preocupa no es el precio ' +
      'sino quedar como el que rompió algo que funcionaba. ¿Es así?'
    ],
    mistake:
      'Festejar un «tenés razón». Ese es el sonido de alguien que quiere que te vayas.'
  },
  {
    id: 'realidad',
    n: 5,
    chapter: 6,
    name: 'Moldeá su realidad',
    claim: 'Nunca partas la diferencia.',
    what:
      'Anclá primero con un número o un rango extremo pero defendible, preparalos ' +
      'emocionalmente para una cifra peor que la que vas a dar, y mostrá siempre qué pierden ' +
      'si no hacen nada. Si te tiran la bomba J («sólo queremos ser justos»), no te defiendas: ' +
      'preguntá por qué sienten que no estás siendo justo.',
    why:
      'La gente no valora en abstracto: compara contra una referencia. Quien pone la ' +
      'referencia define el campo de juego. Y una pérdida duele al menos el doble que una ' +
      'ganancia equivalente, así que «lo que perdés si no actuás» mueve más que «lo que ganás».',
    say: [
      'Empresas de tu tamaño suelen cerrar esto entre 90 y 110 mil.',
      'Te quiero ser honesto: el número que tengo probablemente no te va a gustar.',
      '¿Qué pasa si no hacen nada? ¿Qué les cuesta esperar seis meses más?'
    ],
    mistake:
      'Partir la diferencia para cerrar rápido. Dos posiciones malas promediadas dan una ' +
      'posición mala. Y el plazo que te mete presión también se la mete al otro.'
  },
  {
    id: 'calibrada',
    n: 6,
    chapter: 7,
    name: 'Preguntas calibradas',
    claim: 'La ilusión de control: que la solución sea idea suya.',
    what:
      'Preguntas abiertas que empiezan con «cómo» o «qué», nunca con «por qué». Sin ' +
      'preguntas de sí/no. Ante una exigencia imposible, respondé con una pregunta en lugar ' +
      'de con un rechazo.',
    why:
      'Quien escucha controla la conversación. Una pregunta calibrada obliga al otro a ' +
      'resolver tu problema con sus propios recursos, y nadie discute con una conclusión a ' +
      'la que llegó solo. «Por qué» suena a acusación en cualquier idioma: usalo únicamente ' +
      'cuando quieras que defienda una posición que te conviene.',
    say: [
      '¿Cómo se supone que hago eso?',
      '¿Cuál es el mayor desafío que tienen en esta área?',
      '¿Qué pasa si no llegamos a un acuerdo?'
    ],
    mistake:
      'Usar «¿por qué bajaste el presupuesto?». Convertilo en «¿qué cambió desde la última ' +
      'conversación?» y vas a recibir información en vez de una defensa.'
  },
  {
    id: 'ejecucion',
    n: 7,
    chapter: 8,
    name: 'Garantizá la ejecución',
    claim: 'Un «sí» sin un «cómo» no vale nada.',
    what:
      'Después del acuerdo, preguntá «¿cómo?» hasta que el plan exista: cómo sabremos que ' +
      'vamos bien, cómo lo resolvemos si nos desviamos. Conseguí tres confirmaciones ' +
      'distintas del mismo compromiso (regla de tres) y mirá el lenguaje: 7 % palabras, ' +
      '38 % tono, 55 % cuerpo. Si los tres no coinciden, algo no cierra.',
    why:
      'La mayoría de los acuerdos no se rompen en la mesa, se rompen en la implementación, ' +
      'y casi siempre por alguien que no estaba sentado ahí. Los pronombres te lo avisan: ' +
      'cuanto más dice «yo», menos poder tiene; cuanto más dice «nosotros» o «ellos», más ' +
      'probable es que esté decidiendo de verdad.',
    say: [
      '¿Cómo vamos a saber que vamos por buen camino?',
      '¿Qué hacemos si nos desviamos del plan?',
      '¿Cómo afecta esto al resto de tu equipo?'
    ],
    mistake:
      'Cerrar con el entusiasta que no firma nada. Si nunca aparece un «nosotros», estás ' +
      'negociando con un mensajero.'
  },
  {
    id: 'ackerman',
    n: 8,
    chapter: 9,
    name: 'Regateá con sistema',
    claim: 'No te crecés ante la presión: caés a tu nivel de preparación.',
    what:
      'Identificá el estilo del otro — acomodador (prioriza la relación), asertivo (prioriza ' +
      'ganar) o analista (prioriza no equivocarse) — y aplicá el plan Ackerman: fijá tu ' +
      'objetivo y ofrecé el 65 %, 85 %, 95 % y 100 % de ese número, con incrementos cada vez ' +
      'más chicos, cifras no redondas, y una oferta no económica en la última.',
    why:
      'Los incrementos decrecientes comunican, sin decirlo, que te estás quedando sin ' +
      'margen. Las cifras raras (37.893 en vez de 38.000) parecen calculadas, no inventadas. ' +
      'Entre oferta y oferta, usá preguntas calibradas para que sea el otro quien empuje ' +
      'contra sí mismo.',
    say: [
      'Objetivo 100 → ofrecés 65, después 85, después 95, cerrás en 100 (o 97.420).',
      'Antes de subir: «¿cómo se supone que puedo pagar eso?»'
    ],
    mistake:
      'Subir en saltos iguales. Si vas 65 → 80 → 95, el otro extrapola y espera el 110.'
  },
  {
    id: 'cisne',
    n: 9,
    chapter: 10,
    name: 'Buscá el cisne negro',
    claim: 'Lo que no sabés que no sabés es lo que mueve la mesa.',
    what:
      'Partí de que hay al menos tres cosas que desconocés y que cambiarían todo. Buscalas: ' +
      'reunite cara a cara, prestá atención a los momentos en que baja la guardia (el saludo, ' +
      'la despedida, el comentario fuera de tema) y entendé su «religión»: cómo ve el mundo, ' +
      'qué lo hace quedar bien ante los suyos.',
    why:
      'Hay tres palancas: positiva (podés darle lo que quiere), negativa (podés hacerle ' +
      'perder algo) y normativa (podés mostrarle que su propia norma contradice su posición). ' +
      'La normativa es la más potente y sólo aparece si entendiste su mundo. Y cuando alguien ' +
      'parece irracional, casi siempre tiene información mala, una restricción oculta o un ' +
      'interés que no te contó.',
    say: [
      '¿Qué es lo que nadie suele preguntarte sobre este tema?',
      '¿Cómo encaja esto con lo que ustedes dicen que valoran?'
    ],
    mistake:
      'Etiquetar al otro de irracional y dar la negociación por perdida. «Irracional» casi ' +
      'siempre significa «todavía no entendí sus restricciones».'
  }
];

PLIEGO.techniqueById = function (id) {
  for (var i = 0; i < PLIEGO.TECHNIQUES.length; i++) {
    if (PLIEGO.TECHNIQUES[i].id === id) return PLIEGO.TECHNIQUES[i];
  }
  return null;
};
