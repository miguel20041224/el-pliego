/* Guided practice. Three short scenarios, four beats each, three replies per
 * beat. There is no simulation engine on purpose: every option is scored at
 * authoring time, so the feedback can explain the reasoning instead of a
 * number. That is the whole didactic bet of this app.
 *
 * verdict: 'good'    -> applies the technique as the book describes it
 *          'partial' -> right instinct, wrong execution
 *          'bad'     -> the common mistake
 * tech: id from PLIEGO.TECHNIQUES, so feedback can link back to the card.
 */
window.PLIEGO = window.PLIEGO || {};

PLIEGO.DRILLS = [
  {
    id: 'aumento',
    title: 'Pedir un aumento',
    context:
      'Hace dos años que no te suben el sueldo. Tomaste responsabilidades nuevas y tu jefa ' +
      'lo sabe. Ella acaba de volver de una reunión de presupuesto y está de mal humor.',
    beats: [
      {
        them: 'Pasá, pero rápido que tengo otra reunión en diez minutos.',
        options: [
          {
            text: '¿Tenés unos minutos para hablar de mi sueldo?',
            verdict: 'bad',
            tech: 'no',
            why:
              'Pediste un «sí» de entrada, y encima le pedís tiempo a alguien que acaba de ' +
              'decirte que no lo tiene. Si te dice que sí, es un sí de compromiso: lo va a ' +
              'cumplir mirando el reloj.'
          },
          {
            text: '¿Es mal momento para hablar de algo importante?',
            verdict: 'good',
            tech: 'no',
            why:
              'Diseñaste la pregunta para que el «no» sea la respuesta cómoda. Al decir ' +
              '«no, dale», ella misma decide dedicarte el tiempo: siente que manda, y por ' +
              'eso escucha.'
          },
          {
            text: 'Vengo a pedirte un aumento del 20 %.',
            verdict: 'partial',
            tech: 'realidad',
            why:
              'Anclar primero es correcto, pero no antes de saber qué pasó en esa reunión ' +
              'de presupuesto. Estás tirando tu número al aire sin información.'
          }
        ]
      },
      {
        them: 'No, dale, hablemos. Aunque te adelanto que este año no hay plata para aumentos.',
        options: [
          {
            text: '¿No hay plata para aumentos?',
            verdict: 'good',
            tech: 'espejo',
            why:
              'Reflejo puro: pocas palabras y silencio. Ella va a ampliar, y en esa ' +
              'ampliación aparece la información real — si el congelamiento es de toda la ' +
              'empresa, de tu área, o sólo de este trimestre.'
          },
          {
            text: 'Pero yo asumí el doble de trabajo este año.',
            verdict: 'bad',
            tech: 'espejo',
            why:
              'Argumento interesado y a la defensiva. Acabás de convertir la charla en una ' +
              'discusión sobre si tu esfuerzo alcanza, que es el terreno donde perdés.'
          },
          {
            text: '¿Por qué congelaron los aumentos?',
            verdict: 'partial',
            tech: 'calibrada',
            why:
              'Buscás información, bien. Pero «por qué» suena a reproche y la pone a ' +
              'defender la decisión de otro. Probá «¿qué cambió en el presupuesto?».'
          }
        ]
      },
      {
        them:
          'Recortaron el área un 15 %. Yo peleé por el equipo y perdí. Me da bronca, pero es lo que hay.',
        options: [
          {
            text: 'Parece que te dejaron con las manos atadas.',
            verdict: 'good',
            tech: 'etiqueta',
            why:
              'Etiqueta neutra sobre la emoción que domina la mesa. Nombrada, la bronca ' +
              'baja; ignorada, habría contaminado todo lo que digas después.'
          },
          {
            text: 'Entiendo cómo te sentís, a mí me pasó algo parecido.',
            verdict: 'bad',
            tech: 'etiqueta',
            why:
              'Metiste tu «yo» y tu anécdota. Eso no es empatía táctica: le sacaste el foco ' +
              'a ella para ponértelo encima.'
          },
          {
            text: 'Entonces no tiene sentido seguir hablando.',
            verdict: 'bad',
            tech: 'no',
            why:
              'Convertiste un «todavía no» en un «no» definitivo vos mismo. El presupuesto ' +
              'es una restricción, no una respuesta.'
          }
        ]
      },
      {
        them: 'Exacto. Y encima tengo que explicarle a cada uno por qué no hay nada.',
        options: [
          {
            text: 'Dame el aumento cuando se descongele y lo dejamos por escrito.',
            verdict: 'partial',
            tech: 'ejecucion',
            why:
              'Pedir el compromiso por escrito está bien, pero todavía no apareció el ' +
              '«cómo». Una promesa sin plan de implementación se la lleva el próximo recorte.'
          },
          {
            text:
              '¿Cómo hago para estar primero en la lista cuando se libere el presupuesto? ' +
              'Y mientras tanto, ¿qué de lo que no cuesta plata podés moverme?',
            verdict: 'good',
            tech: 'calibrada',
            why:
              'Dos preguntas calibradas en bloque: una la pone a diseñar tu futuro aumento ' +
              'con sus propios recursos, la otra abre la mesa a lo no económico — título, ' +
              'días, formación, autonomía. Ahí es donde hay margen hoy.'
          },
          {
            text: 'Bueno, lo hablamos el año que viene.',
            verdict: 'bad',
            tech: 'ejecucion',
            why:
              'Te fuiste con un «sí» vacío, sin criterio, sin fecha y sin testigo. El año ' +
              'que viene arrancás de cero con otra excusa.'
          }
        ]
      }
    ],
    debrief:
      'La plata estaba congelada desde antes de que entraras: eso no se negociaba. Lo que sí ' +
      'se negociaba era tu lugar en la fila y todo lo que no sale de la línea de sueldos. ' +
      'Para encontrarlo hubo que dejarla hablar primero.'
  },

  {
    id: 'proveedor',
    title: 'El proveedor que sube el precio',
    context:
      'Tu proveedor clave avisa por mail que sube 30 % a partir del mes que viene. Cambiar ' +
      'de proveedor te costaría tres meses de integración. Él lo sabe.',
    beats: [
      {
        them: 'Es un ajuste general, se lo mandamos a todos los clientes. No es personal.',
        options: [
          {
            text: 'Un 30 % es imposible. Buscamos otro proveedor.',
            verdict: 'bad',
            tech: 'realidad',
            why:
              'Amenaza que no podés cumplir: él ya calculó tus tres meses de integración. ' +
              'Una palanca negativa falsa, cuando la descubren, te deja sin ninguna.'
          },
          {
            text:
              'Antes de hablar de números: imagino que pensás que somos el cliente que ' +
              'siempre pide excepción y que nunca está conforme.',
            verdict: 'good',
            tech: 'etiqueta',
            why:
              'Auditoría de acusaciones. Dijiste primero lo peor que él podía pensar de ' +
              'vos, y con eso le sacaste el argumento antes de que lo usara.'
          },
          {
            text: '¿Nos podés hacer una excepción?',
            verdict: 'bad',
            tech: 'no',
            why:
              'Pregunta de sí/no que invita al «no» más barato del mundo. Y encima te pone ' +
              'en el lugar de quien pide un favor.'
          }
        ]
      },
      {
        them:
          'La verdad, sí. Son los que más soporte consumen. Pero el ajuste es por costos, no por ustedes.',
        options: [
          {
            text: '¿Los que más soporte consumen?',
            verdict: 'good',
            tech: 'espejo',
            why:
              'Ahí está el cisne negro asomando. El reflejo lo obliga a detallar qué le ' +
              'cuesta atenderte — y eso es exactamente lo que vas a poder negociar.'
          },
          {
            text: 'No consumimos más soporte que nadie.',
            verdict: 'bad',
            tech: 'espejo',
            why:
              'Discutís el dato en vez de explorarlo. Aunque tuvieras razón, acabás de ' +
              'cerrar la única puerta que se abrió.'
          },
          {
            text: 'Entonces hagamos 15 % y listo.',
            verdict: 'bad',
            tech: 'realidad',
            why:
              'Partiste la diferencia a los dos minutos. Dos posiciones sin fundamento ' +
              'promediadas dan una posición sin fundamento, y le enseñaste que pedir de más ' +
              'con vos funciona.'
          }
        ]
      },
      {
        them:
          'Tus desarrolladores abren tickets por cosas que están en la documentación. Son cuatro horas por semana de mi equipo.',
        options: [
          {
            text:
              'A ver si entiendo: el problema no es el precio, es que atendernos te cuesta ' +
              'medio día semanal de un ingeniero, y ese costo hoy no lo estás cobrando. ¿Es así?',
            verdict: 'good',
            tech: 'asies',
            why:
              'Resumen que reconstruye su mundo sin opinar. Si contesta «así es», la ' +
              'negociación dejó de ser sobre el 30 % y pasó a ser sobre las cuatro horas, ' +
              'que es un problema que vos podés resolver barato.'
          },
          {
            text: 'Tenés razón, deberíamos leer más la documentación.',
            verdict: 'partial',
            tech: 'asies',
            why:
              '«Tenés razón» es la frase con la que uno se saca al otro de encima; no genera ' +
              'ningún cambio. Y concediste culpa sin pedir nada a cambio.'
          },
          {
            text: '¿Por qué no nos avisaron antes?',
            verdict: 'bad',
            tech: 'calibrada',
            why:
              '«Por qué» en modo acusación. Lo ponés a la defensiva justo cuando te estaba ' +
              'entregando la información más valiosa de la charla.'
          }
        ]
      },
      {
        them: 'Así es. Es eso, básicamente.',
        options: [
          {
            text:
              '¿Cómo te serviría que centralicemos los tickets en una sola persona de ' +
              'nuestro lado y te armemos un resumen mensual de lo que más se pregunta?',
            verdict: 'good',
            tech: 'cisne',
            why:
              'Oferta no económica que ataca su costo real y encima le da algo que puede ' +
              'mostrar como mejora. Palanca positiva: le estás dando lo que quiere sin ' +
              'tocar tu precio.'
          },
          {
            text: 'Entonces bajá el ajuste al 10 % y nos arreglamos.',
            verdict: 'partial',
            tech: 'ackerman',
            why:
              'Volviste al número justo cuando habías salido de él. Primero resolvé su ' +
              'problema; el precio se acomoda después y desde otra posición.'
          },
          {
            text: 'Perfecto, entonces quedamos en que lo revisás.',
            verdict: 'bad',
            tech: 'ejecucion',
            why:
              'Un «sí» sin un «cómo». No hay plan, no hay fecha, no hay forma de saber si ' +
              'se cumple. El mes que viene llega la factura con el 30 %.'
          }
        ]
      }
    ],
    debrief:
      'El 30 % nunca fue el tema. El tema eran cuatro horas semanales de soporte no ' +
      'facturado, y eso sólo apareció porque reflejaste en vez de discutir. Lo que resuelve ' +
      'la mesa casi nunca está en la primera frase.'
  },

  {
    id: 'cliente',
    title: '«Tu precio no es justo»',
    context:
      'Presentaste una propuesta de 80.000. El cliente te quiere, el proyecto le sirve, pero ' +
      'tiene un comité que revisa todo gasto por encima de 50.000.',
    beats: [
      {
        them: 'Mirá, 80.000 no es un precio justo. Nosotros sólo queremos lo que corresponde.',
        options: [
          {
            text: 'Es un precio de mercado, te puedo mostrar comparables.',
            verdict: 'bad',
            tech: 'realidad',
            why:
              'Caíste en la bomba J. Te pusiste a defender tu justicia, que es exactamente ' +
              'lo que esa palabra busca. Ahora discutís en su marco, no en el tuyo.'
          },
          {
            text: 'Perdón: ¿qué te hace sentir que no estoy siendo justo?',
            verdict: 'good',
            tech: 'realidad',
            why:
              'La única respuesta correcta a «justo». Devolvés la carga de la prueba con ' +
              'calma y, o bien te dan información real, o se desinfla la acusación.'
          },
          {
            text: 'Puedo llegar a 70.000.',
            verdict: 'bad',
            tech: 'ackerman',
            why:
              'Concediste 10.000 ante una palabra. Le acabás de enseñar que decir «injusto» ' +
              'le rinde 10.000 por vez.'
          }
        ]
      },
      {
        them: 'No es contra vos. Es que arriba de 50.000 tengo que pasar por comité y es un calvario.',
        options: [
          {
            text: 'Parece que el problema no es el monto sino lo que te cuesta defenderlo.',
            verdict: 'good',
            tech: 'etiqueta',
            why:
              'Etiqueta que separa el precio del verdadero obstáculo. Y el obstáculo no es ' +
              'económico: es estatus y riesgo personal frente al comité.'
          },
          {
            text: 'Entonces lo dejamos en 49.000 y listo.',
            verdict: 'bad',
            tech: 'realidad',
            why:
              'Regalaste 31.000 para evitarle una reunión. Y un número redondo justo debajo ' +
              'del límite se lee como lo que es: un precio inventado.'
          },
          {
            text: '¿Quién más está en ese comité?',
            verdict: 'partial',
            tech: 'ejecucion',
            why:
              'Buena intuición — hay gente detrás de la mesa — pero es una pregunta cerrada ' +
              'que te da una lista de nombres. «¿Cómo evalúa el comité una propuesta como ' +
              'ésta?» te da el criterio, que vale mucho más.'
          }
        ]
      },
      {
        them: 'Y si me lo rechazan quedo yo como el que trajo un gasto desmedido.',
        options: [
          {
            text: '¿Cómo tendría que verse esta propuesta para que a vos te haga quedar bien?',
            verdict: 'good',
            tech: 'calibrada',
            why:
              'Lo ponés a diseñar la solución desde su propio mundo. Nadie discute con una ' +
              'propuesta que armó él mismo, y de paso te dicta el formato que el comité aprueba.'
          },
          {
            text: 'No te preocupes, el comité lo va a aprobar.',
            verdict: 'bad',
            tech: 'cisne',
            why:
              'Minimizaste su miedo, que es lo único que está bloqueando el acuerdo. Negar ' +
              'una emoción la refuerza.'
          },
          {
            text: '¿Qué pasa si no hacen nada este año?',
            verdict: 'partial',
            tech: 'realidad',
            why:
              'Aversión a la pérdida bien usada, pero llega temprano: todavía no resolviste ' +
              'su miedo personal. Guardala para cuando él ya esté de tu lado.'
          }
        ]
      },
      {
        them:
          'Si viniera por etapas, con una primera de 45.000 y un resultado medible en noventa días, lo apruebo yo solo.',
        options: [
          {
            text:
              'Hagamos eso: fase uno 47.400, y si a los noventa días llegamos al número que ' +
              'definas, seguimos con el resto. ¿Cómo vamos a saber que vamos bien?',
            verdict: 'good',
            tech: 'ejecucion',
            why:
              'Cerraste con cifra no redonda — parece calculada, no inventada —, dejaste el ' +
              'criterio de éxito en sus manos y pediste el «cómo». Eso es un acuerdo que ' +
              'sobrevive a la implementación.'
          },
          {
            text: 'Perfecto, 45.000 la primera fase. Arrancamos el lunes.',
            verdict: 'partial',
            tech: 'ackerman',
            why:
              'Aceptaste su número redondo sin tocarlo y sin definir qué es «resultado ' +
              'medible». Dentro de noventa días esa frase va a significar lo que él necesite ' +
              'que signifique.'
          },
          {
            text: 'Dale, pero entonces el total sube a 90.000 por el trabajo extra.',
            verdict: 'bad',
            tech: 'cisne',
            why:
              'Te acaba de regalar la solución a su propio bloqueo y respondés castigándolo. ' +
              'Así se quema una palanca positiva.'
          }
        ]
      }
    ],
    debrief:
      'El comité era el cisne negro: nunca estuvo en la mesa y decidía todo. Y la objeción ' +
      'real no era el precio sino el riesgo personal de quien tenías enfrente. Resolvele eso ' +
      'y el número deja de ser el problema.'
  }
];

PLIEGO.drillById = function (id) {
  for (var i = 0; i < PLIEGO.DRILLS.length; i++) {
    if (PLIEGO.DRILLS[i].id === id) return PLIEGO.DRILLS[i];
  }
  return null;
};
