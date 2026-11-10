# EL PLIEGO

Página didáctica de negociación aplicada. Enseña las **nueve técnicas** del método descrito
por Chris Voss en *Rompe la barrera del no*, te hace **escribir tu propio pliego de
preparación** de una página, y te pone a **probarlo en tres mesas** con decisión y devolución
inmediata.

No es un simulador. Es la herramienta que usás antes de entrar a negociar de verdad.

---

## Por qué existe

El libro deja una idea incómoda: bajo presión nadie se crece. Cada uno **cae a la altura de su
nivel de preparación**. Y la preparación no es "tener claro lo que quiero": es un documento de
una página, escrito, que llevás a la mesa.

Casi nadie lo escribe. Esta página existe para que lo escribas.

Tres secciones, en este orden deliberado:

1. **Las técnicas** — qué es cada herramienta, por qué funciona, cómo suena y cómo se arruina.
2. **Tu pliego** — las cinco secciones del pliego de negociación, con el andamio didáctico al lado.
3. **Práctica** — tres escenas reales donde elegís qué decir y te enterás por qué estuvo bien o mal.

---

## Las nueve técnicas

| # | Capítulo | Técnica | La idea en una línea |
|---|----------|---------|----------------------|
| 1 | 2 | El reflejo y la voz | Negociar no es discutir: es averiguar. |
| 2 | 3 | Etiquetar y la auditoría de acusaciones | Lo que se nombra, se desarma. |
| 3 | 4 | Domina el «no» | El «no» no cierra la conversación: la empieza. |
| 4 | 5 | Provocá un «así es» | Dos palabras que mueven la mesa entera. |
| 5 | 6 | Moldeá su realidad | Nunca partas la diferencia. |
| 6 | 7 | Preguntas calibradas | La ilusión de control: que la solución sea idea suya. |
| 7 | 8 | Garantizá la ejecución | Un «sí» sin un «cómo» no vale nada. |
| 8 | 9 | Regateá con sistema | No te crecés ante la presión: caés a tu nivel de preparación. |
| 9 | 10 | Buscá el cisne negro | Lo que no sabés que no sabés es lo que mueve la mesa. |

Cada ficha tiene la misma forma, para que siempre sepas dónde mirar:

- **Qué es** — la mecánica, sin adorno.
- **Por qué funciona** — el motivo psicológico, no la anécdota.
- **Cómo suena** — frases concretas, listas para usar.
- **El error que casi todos cometen** — porque la técnica mal aplicada es peor que no usarla.

---

## Tu pliego

Las cinco secciones del pliego de preparación:

| # | Sección | Qué escribís |
|---|---------|--------------|
| I | El objetivo | Un solo objetivo: el mejor resultado razonable. **No** tu mínimo. |
| II | El resumen | Dos o tres frases de hechos conocidos, tan bien dichas que el otro responda «así es». |
| III | Etiquetas y auditoría de acusaciones | Lo peor que pueden pensar de tu propuesta, convertido en etiquetas. |
| IV | Preguntas calibradas | Tres a cinco preguntas con «cómo» o «qué». Ninguna con «por qué». |
| V | Ofertas no económicas | Qué tiene la otra parte, además de dinero, que a vos te sirva. |

Catorce campos en total. Cada sección trae un bloque desplegable (**«Por qué esta sección
existe»**) con el motivo y plantillas de arranque, para que no empieces en blanco.

**Dónde vive lo que escribís:** únicamente en tu navegador, bajo la clave `pliego.v1` de
`localStorage`. No hay backend, no hay red, no hay analítica. Ese pliego es tu preparación para
una negociación real: no tiene por qué salir de tu equipo. Si querés conservarlo, el botón
**Descargar en .txt** te lo baja como archivo de texto.

Si el navegador bloquea el almacenamiento (modo privado, cookies de sitio deshabilitadas), la
página lo detecta y te avisa en pantalla en vez de perder tu trabajo en silencio.

---

## Práctica

Tres escenas, cuatro intervenciones cada una, tres opciones por intervención:

- **Pedir un aumento** — dos años sin ajuste, y tu jefa acaba de salir de la reunión de presupuesto de mal humor.
- **El proveedor que sube el precio** — un 30 % de golpe, y cambiar de proveedor te cuesta tres meses de integración. Él lo sabe.
- **«Tu precio no es justo»** — el cliente te quiere, pero tiene un comité que revisa todo gasto por encima de la mitad de tu propuesta.

No hay dados, no hay puntajes ocultos, no hay simulación: **cada respuesta trae su explicación,
también cuando acertás**. Elegís, te dice qué técnica estabas usando (con enlace directo a la
ficha) y por qué eso mueve o rompe la mesa. Al final, el recuento de las cuatro y el **debrief**:
qué estaba realmente en juego en esa escena.

Puntaje por intervención: 2 (bien jugado), 1 (a medias), 0 (error clásico). Máximo 8 por escena.

---

## Arquitectura

Vanilla JavaScript, sin build, sin dependencias. Abrí `index.html` y ya está.

```
EL_PLIEGO/
├── index.html              # cascarón: tres paneles, scripts en orden
├── assets/css/styles.css   # tokens en :root, tema oscuro, un solo archivo
├── tools/smoke.js          # smoke test headless (node tools/smoke.js)
└── src/
    ├── data/               # contenido didáctico, separado del código
    │   ├── techniques.js   # PLIEGO.TECHNIQUES — 9 fichas
    │   ├── sheet.js        # PLIEGO.SHEET — 5 secciones del pliego
    │   └── drills.js       # PLIEGO.DRILLS — 3 escenas × 4 intervenciones × 3 opciones
    └── app/
        ├── store.js        # persistencia en localStorage, progreso, export
        ├── ui.js           # render puro: datos -> HTML
        └── main.js         # wiring: pestañas, eventos delegados, autoguardado
```

### Decisiones que vale la pena conocer

**Contenido como datos, no como markup.** Las nueve fichas, las cinco secciones y las tres
escenas son arrays de objetos. Agregar una técnica es editar datos, no tocar HTML ni CSS. Si el
contenido estuviera incrustado en el markup, cada corrección pedagógica sería una corrección de
maquetado — y ahí es donde el material didáctico se muere.

**Namespace único, sin módulos.** Todo cuelga de `window.PLIEGO`. Sin bundler no hay `import`,
y un objeto global explícito es más honesto que diez variables sueltas. El orden de los
`<script>` en `index.html` **es** el grafo de dependencias: datos, store, render, wiring.

**Render puro.** `ui.js` sólo transforma datos en strings de HTML; no lee ni escribe estado. Todo
el estado mutable vive en `main.js`: el pliego y la corrida de práctica actual. Dos variables.

**Eventos delegados.** Un único `click` en `document`, despachado por atributos `data-*`. Como la
UI se re-renderiza entera con `innerHTML`, cualquier listener colgado de un nodo moriría con él.
Delegar es lo que hace que el re-render sea gratis.

**Escapado sin excepciones.** Todo lo que entra al HTML pasa por `PLIEGO.esc()`. El pliego
contiene texto que escribió el usuario, y ese texto se vuelve a inyectar en el DOM en cada
render: sin escapar, tu propio pliego sería el vector de XSS.

**Autoguardado con debounce de 400 ms.** Una escritura por pausa, no una por tecla. Y en
`beforeunload` se descarga lo pendiente, para que cerrar la pestaña a mitad de una frase no te
cueste la frase.

**Carga tolerante.** `PLIEGO.load()` reconcilia lo guardado contra la estructura actual: descarta
claves desconocidas, rellena listas cortas, y todo dentro de `try/catch`. Si mañana el pliego gana
una sección, los pliegos viejos siguen abriendo.

**Borrado en dos pasos, sin `confirm()`.** El primer clic arma el botón ("¿Seguro?"), el segundo
borra, y a los cinco segundos se desarma solo. Un diálogo modal del navegador bloquea el hilo y
rompe la lectura; esto no.

---

## Verificación

```bash
node tools/smoke.js
```

`tools/smoke.js` carga los scripts en un contexto `vm` de Node con `document` y
`localStorage` falsos, y comprueba:

- las 9 técnicas, 5 secciones y 3 escenas están completas y con campos no vacíos;
- cada opción de cada intervención referencia una técnica que **existe**;
- cada intervención tiene al menos una opción correcta;
- round-trip del pliego en `localStorage`, incluidas listas;
- `localStorage` corrupto o con claves viejas no rompe la carga;
- el conteo de progreso (14 campos) y la exportación a texto;
- el texto del usuario se escapa (una `<img onerror>` no sobrevive al render);
- una corrida completa de una escena eligiendo siempre bien da 8/8.

Resultado actual: **todas las comprobaciones pasan**.

---

## Cómo usarlo

```bash
xdg-open index.html     # o abrilo con doble clic
```

Sin servidor, sin `npm install`, sin build. Es un archivo HTML y siete archivos de texto.

El recorrido recomendado: leé las nueve fichas en orden la primera vez (cada una supone la
anterior), después escribí el pliego de la negociación que tengas por delante, y usá la práctica
para ver si las técnicas te salen cuando alguien te empuja.

---

## Sobre la fuente

El método es el que describe Chris Voss en *Rompe la barrera del no*. **Los textos, ejemplos,
escenas, frases y explicaciones de esta página son de elaboración propia**: enseñan el método con
palabras propias, no reproducen el contenido del libro. El PDF del libro no forma parte de este
repositorio y está excluido por `.gitignore`.

Si el tema te interesa de verdad, leé el libro. Esto es un andamio para aplicarlo, no un reemplazo.
