# Taller: Cookies en aplicaciones web (React + Supabase)

## Parte 1. Investigación teórica

### 1. ¿Qué es una cookie?

Una cookie es un pequeño dato que una página web guarda en el navegador para recordar cierta información. Por ejemplo, puede ayudar a mantener una sesión iniciada, recordar el idioma de una página o guardar una preferencia del usuario.

Las cookies normalmente se envían automáticamente al servidor cuando el navegador realiza peticiones que cumplen las condiciones de esa cookie.

#### Diferencias entre cookies, localStorage y sessionStorage

| Característica | Cookie | localStorage | sessionStorage |
|---|---|---|---|
| ¿Se envía automáticamente al servidor? | Sí, si la petición cumple las condiciones de la cookie. | No, hay que enviarlo desde JavaScript si se necesita. | No, hay que enviarlo desde JavaScript si se necesita. |
| ¿Sobrevive a cerrar el navegador? | Depende de su duración. Una cookie persistente puede seguir guardada. | Sí, normalmente permanece hasta que se borra. | Normalmente no; se elimina al terminar la sesión de la pestaña. |
| ¿Tiene expiración configurable? | Sí, con atributos como `Expires` y `Max-Age`. | No tiene una expiración automática incorporada. | Su duración depende de la sesión de la pestaña. |
| ¿Tamaño máximo aproximado? | Alrededor de 4 KB por cookie. | Aproximadamente entre 5 y 10 MB, según el navegador. | Aproximadamente entre 5 y 10 MB, según el navegador. |
| ¿Es accesible desde JavaScript? | Sí, excepto cuando tiene el atributo `HttpOnly`. | Sí, desde el mismo origen. | Sí, desde el mismo origen y la sesión correspondiente. |

*Nota: los tamaños son aproximados y pueden variar según el navegador.*

#### ¿Por qué HTTP es sin estado (*stateless*) y qué problema resuelven las cookies?

HTTP es un protocolo sin estado porque cada petición se procesa de forma independiente. Por sí solo, el servidor no recuerda automáticamente qué hizo el usuario en peticiones anteriores.

Por ejemplo, después de iniciar sesión, el servidor necesita alguna forma de reconocer al usuario cuando cambia de página. Las cookies ayudan a resolver este problema porque permiten enviar información en peticiones posteriores, como un identificador de sesión, para que el servidor pueda reconocerla.

### 2. Cómo se crea una cookie

#### ¿Qué encabezado HTTP usa el servidor para crear una cookie y cuál usa el navegador para enviarla?

El servidor utiliza el encabezado `Set-Cookie` para indicarle al navegador que guarde una cookie. Después, cuando el navegador realiza otra petición al mismo sitio y se cumplen las condiciones necesarias, la envía mediante el encabezado `Cookie`.

Por ejemplo:

```http
Set-Cookie: tema=oscuro; Path=/; Max-Age=3600
```

Esta línea indica que el navegador debe guardar una cookie llamada `tema`, con el valor `oscuro`, durante una hora.

Cuando el navegador la envía en una petición posterior, se vería así:

```http
Cookie: tema=oscuro
```

#### ¿Cómo se crea una cookie desde JavaScript con `document.cookie` y por qué es incómodo usarlo directamente?

Desde JavaScript se puede crear una cookie utilizando `document.cookie`. Por ejemplo:

```js
document.cookie = "tema=oscuro; path=/; max-age=3600";
```

Esta instrucción guarda una cookie llamada `tema` con el valor `oscuro` durante una hora.

Para leer las cookies que JavaScript tiene permitido consultar, se puede utilizar:

```js
console.log(document.cookie);
```

Esta forma de trabajar es un poco incómoda porque `document.cookie` utiliza cadenas de texto para crear y consultar cookies. Además, al leerlo se obtiene una cadena con las cookies disponibles, por lo que hay que separar sus valores para encontrar una específica. Tampoco permite leer las cookies que tienen el atributo `HttpOnly`.

#### ¿Cuál es la diferencia entre una cookie creada por el servidor y una creada por JavaScript?

La cookie creada por el servidor se envía mediante `Set-Cookie`. El servidor puede configurarla con atributos de seguridad como `HttpOnly`, que impide que JavaScript pueda leerla.

La cookie creada desde JavaScript se configura con `document.cookie` directamente en el navegador. Esta forma no permite establecer el atributo `HttpOnly`, por lo que hay que tener cuidado con la información que se guarda.

En conclusión, ambas permiten almacenar información en el navegador, pero las cookies creadas por el servidor ofrecen opciones de configuración que JavaScript no puede establecer por su cuenta.

### 3. Atributos de una cookie

Los atributos de una cookie sirven para controlar cuánto dura, en qué páginas se envía y qué medidas de seguridad tiene.

#### Expires y Max-Age

- **Expires:** indica la fecha y hora en que la cookie deja de ser válida. Si no se configura, normalmente se considera una cookie de sesión.
- **Max-Age:** indica cuántos segundos debe durar la cookie. Por ejemplo, `Max-Age=3600` significa que dura una hora.
- **Si se omiten ambos:** normalmente se crea una cookie de sesión, que se elimina cuando termina la sesión del navegador. Algunos navegadores pueden restaurar las sesiones, por lo que no siempre desaparece al cerrar la ventana.

Ejemplo:

```http
Set-Cookie: usuario=Camilo; Max-Age=3600; Path=/
```

#### Domain y Path

- **Domain:** indica a qué dominio se puede enviar la cookie. Si se omite, la cookie queda limitada al servidor que la creó. Si se configura explícitamente, puede compartirse con subdominios que cumplan las condiciones del dominio.
- **Path:** indica para qué rutas del sitio se envía la cookie. Si se omite, el navegador utiliza una ruta predeterminada basada en la dirección de la página que la creó.

Ejemplo:

```http
Set-Cookie: preferencias=verde; Domain=ejemplo.com; Path=/
```

Esta cookie puede enviarse a las rutas del dominio configurado y, según las reglas del navegador, a sus subdominios.

#### Secure

El atributo `Secure` indica que la cookie solo debe enviarse mediante conexiones HTTPS seguras. Si se omite, la cookie podría enviarse también por HTTP, dependiendo de las demás condiciones.

En un sitio que utiliza `http://`, una cookie marcada como `Secure` normalmente no se envía por esa conexión. Existen algunas excepciones para entornos locales.

Ejemplo:

```http
Set-Cookie: sesion=abc123; Secure; Path=/
```

#### HttpOnly

El atributo `HttpOnly` impide que JavaScript pueda leer la cookie mediante `document.cookie`. Esto ayuda a proteger información como los identificadores de sesión si ocurre un ataque XSS, porque el script malicioso no puede acceder directamente a esa cookie.

Sin embargo, `HttpOnly` no elimina por completo el riesgo de XSS: un script malicioso todavía podría intentar realizar acciones en la página con los permisos del usuario.

Si se omite, JavaScript normalmente podrá leer la cookie, siempre que las demás condiciones lo permitan.

Ejemplo:

```http
Set-Cookie: sesion=abc123; HttpOnly; Secure; Path=/
```

#### SameSite

El atributo `SameSite` controla cuándo se envía una cookie en peticiones que se originan desde otros sitios. Ayuda a reducir ataques CSRF.

- **Strict:** la cookie no se envía en las peticiones que el navegador considera provenientes de otro sitio. Por ejemplo, si alguien entra a una página desde un enlace externo, es posible que tenga que iniciar sesión nuevamente.
- **Lax:** permite la cookie en algunas navegaciones normales hacia el sitio, como entrar mediante un enlace externo, pero bloquea muchas peticiones entre sitios, como formularios POST. Es un equilibrio entre comodidad y seguridad.
- **None:** permite enviar la cookie en contextos entre sitios, por ejemplo, cuando una página se integra dentro de un `iframe` de otro dominio. Para utilizarlo, el navegador exige normalmente que también se configure `Secure`.

Si se omite `SameSite`, los navegadores modernos suelen aplicar un comportamiento similar a `Lax`, aunque hay detalles que dependen del navegador.

Ejemplo:

```http
Set-Cookie: sesion=abc123; SameSite=Lax; Secure; HttpOnly; Path=/
```

#### Partitioned (CHIPS)

`Partitioned` permite guardar una cookie en un espacio separado según el sitio desde el que se utiliza. Esto busca que algunos servicios integrados en páginas de terceros puedan mantener funciones necesarias sin compartir la misma cookie entre todos los sitios que los incluyen.

Por ejemplo, un servicio de soporte integrado en varias páginas podría necesitar recordar una preferencia por separado en cada una. La partición ayuda a evitar que esa información se comparta de la misma manera entre sitios diferentes.

Este atributo se usa junto con `Secure` en los navegadores que lo admiten.

Ejemplo:

```http
Set-Cookie: preferencia=chat; Partitioned; Secure; SameSite=None; Path=/
```

#### Ejemplo de una cookie con varios atributos

```http
Set-Cookie: sesion=abc123; Max-Age=3600; Path=/; Secure; HttpOnly; SameSite=Lax
```

En este ejemplo, la cookie dura una hora, se envía en las rutas correspondientes del sitio, utiliza una conexión segura, no puede leerse desde JavaScript y aplica las reglas de `SameSite=Lax`.

### 4. Cookies de primera parte vs. terceros

#### ¿Qué es una cookie de primera parte y una de terceros?

Una cookie de primera parte (*first-party*) es la que utiliza el mismo sitio web que estamos visitando. Por ejemplo, cuando entramos a una tienda virtual y esta guarda una cookie para recordar nuestro carrito de compras.

Una cookie de terceros (*third-party*) pertenece a un servicio de otro dominio que está integrado en la página que visitamos. Por ejemplo, una página puede incluir publicidad o contenido de una empresa externa que intenta guardar cookies en nuestro navegador.

#### ¿Por qué los navegadores están bloqueando las cookies de terceros?

Navegadores como Safari y Firefox han restringido las cookies de terceros, y Chrome también ha implementado medidas de privacidad y controles relacionados con ellas.

La razón principal es que estas cookies pueden utilizarse para seguir la actividad de una persona en diferentes páginas web, crear perfiles de sus intereses y mostrar publicidad personalizada. Las restricciones buscan mejorar la privacidad y reducir el rastreo entre sitios.

Sin embargo, algunas funciones legítimas también pueden depender de cookies de terceros, por lo que los servicios web han tenido que buscar otras formas de funcionar.

#### Ejemplos de uso legítimo y de rastreo publicitario

- **Uso legítimo:** una página incorpora un servicio externo que necesita mantener una sesión para permitir que un usuario utilice una herramienta integrada. Dependiendo de cómo esté diseñado el servicio y de las restricciones del navegador, puede necesitar cookies.
- **Rastreo publicitario:** una empresa de publicidad utiliza cookies para reconocer el navegador de una persona en diferentes páginas y conocer sus intereses para mostrarle anuncios personalizados.

En conclusión, las cookies de terceros no son necesariamente maliciosas, pero pueden afectar la privacidad cuando se usan para seguir a los usuarios sin que estos lo sepan o lo acepten.

### 5. Sesiones y autenticación

#### ¿Qué es una sesión del lado del servidor?

Una sesión es una forma de recordar que un usuario ya inició sesión en una página web. El servidor guarda información relacionada con ese usuario y normalmente le entrega al navegador una cookie con un identificador de sesión.

Cuando el usuario hace otra petición, el navegador envía la cookie y el servidor utiliza ese identificador para reconocer la sesión. La cookie normalmente no contiene todos los datos del usuario, sino un identificador que permite encontrar la información guardada en el servidor.

#### Diferencia entre autenticación con cookies de sesión y autenticación con JWT

La autenticación mediante una cookie de sesión utiliza un identificador que el servidor relaciona con la sesión del usuario. El servidor comprueba ese identificador para saber si el usuario puede acceder.

La autenticación mediante un JWT utiliza un token que contiene información y datos que permiten verificar su validez. Según el sistema, el token puede guardarse en una cookie, en `localStorage` o temporalmente en la memoria de la aplicación.

#### ¿Dónde se suele guardar un JWT?

Un JWT puede guardarse en distintos lugares, dependiendo de cómo esté construida la aplicación:

- **Cookie `HttpOnly`:** JavaScript no puede leer directamente el token, lo que reduce el riesgo de que un ataque XSS lo robe.
- **`localStorage`:** el token permanece guardado en el navegador y JavaScript puede acceder a él.
- **Memoria:** el token se mantiene mientras la aplicación está activa, pero normalmente se pierde al recargar la página, salvo que se recupere mediante otro mecanismo.

#### Riesgos de guardar un JWT en `localStorage` frente a una cookie `HttpOnly`

Si un JWT se guarda en `localStorage` y un atacante consigue ejecutar JavaScript malicioso mediante un ataque XSS, podría intentar leerlo y robarlo para acceder a la cuenta de la víctima.

Una cookie `HttpOnly` impide que JavaScript lea directamente su valor, por lo que dificulta ese tipo de robo. Sin embargo, no evita por sí sola todos los ataques XSS ni impide que un script malicioso intente realizar acciones desde la sesión de la víctima.

#### ¿Qué riesgo tienen las cookies frente a CSRF y por qué `localStorage` no tiene el mismo riesgo?

Las cookies se envían automáticamente en las peticiones que cumplen sus condiciones. Un atacante podría intentar aprovechar este comportamiento para hacer que el navegador envíe una petición no deseada a un sitio donde la víctima tiene una sesión iniciada. Esto se conoce como CSRF.

En cambio, el navegador no envía automáticamente los datos de `localStorage` al servidor. La aplicación debe leerlos desde JavaScript y agregarlos a la petición, por ejemplo, mediante un encabezado de autorización. Por eso, guardar un token en `localStorage` no presenta el mismo riesgo de CSRF, aunque sí tiene riesgos relacionados con XSS.

#### ¿Qué es un refresh token y por qué se protege especialmente?

Un *refresh token* es un token que permite obtener nuevos tokens de acceso cuando los actuales vencen, sin tener que iniciar sesión nuevamente cada vez.

Normalmente se protege especialmente porque puede permitir mantener el acceso a una cuenta durante más tiempo. Si alguien lo roba, podría utilizarlo para renovar tokens y continuar accediendo. Por eso es importante almacenarlo de forma segura, limitar su duración cuando corresponda y utilizar mecanismos de renovación y revocación adecuados.

### 6. Seguridad: los dos ataques clásicos

#### ¿Qué es XSS y cómo puede robar una cookie?

XSS (*Cross-Site Scripting*) es un ataque que ocurre cuando una página web permite que se ejecute código JavaScript malicioso que alguien ha introducido.

Por ejemplo, si una página muestra comentarios sin controlar correctamente su contenido, un atacante podría intentar insertar un script que lea información accesible desde el navegador y la envíe a otro lugar. Si la cookie de sesión puede leerse desde JavaScript, podría intentar robarla y utilizarla para acceder a la cuenta de la víctima.

El atributo `HttpOnly` ayuda a evitar ese robo porque impide que JavaScript lea directamente el valor de la cookie mediante `document.cookie`. Sin embargo, no elimina todos los riesgos de XSS, ya que un script malicioso todavía podría intentar realizar acciones dentro de la página.

Para reducir el riesgo de XSS, es importante validar y tratar correctamente los datos recibidos, evitar insertar contenido HTML inseguro y configurar medidas de seguridad como una política de seguridad de contenido (CSP).

#### ¿Qué es CSRF y cómo funciona?

CSRF (*Cross-Site Request Forgery*) es un ataque en el que una página maliciosa intenta hacer que el navegador de una persona envíe una petición no deseada a otro sitio donde ya tiene una sesión iniciada.

Un ejemplo sería el siguiente:

1. Una persona inicia sesión en una página bancaria y el navegador guarda su cookie de sesión.
2. Después, la persona entra a una página maliciosa mientras la sesión bancaria sigue activa.
3. Esa página intenta provocar una petición al banco para realizar una transferencia.
4. Si el banco confía únicamente en la cookie de sesión y no comprueba que la petición sea legítima, podría procesarla si el navegador envía la cookie y se cumplen las condiciones necesarias.

Por eso, una aplicación no debe confiar solamente en que la petición incluya una cookie válida. También debe comprobar que la acción esté autorizada y que la petición sea legítima.

#### ¿Cómo ayudan SameSite y los tokens CSRF?

El atributo `SameSite` ayuda a reducir el riesgo de CSRF controlando cuándo se envían las cookies en peticiones que se originan desde otros sitios.

- **`SameSite=Strict`:** restringe más el envío de cookies en peticiones entre sitios.
- **`SameSite=Lax`:** permite algunas navegaciones normales, pero bloquea muchas peticiones entre sitios, como ciertos envíos de formularios.
- **Tokens CSRF:** son valores que el servidor utiliza para comprobar que una petición sensible procede de una interacción legítima con la aplicación y no simplemente de una página externa.

`SameSite` no es una protección completa por sí sola. Su comportamiento depende del tipo de petición y de la configuración del navegador. Por eso puede combinarse con tokens CSRF, comprobaciones de origen y otras medidas de seguridad.

En conclusión, XSS busca aprovechar la ejecución de código malicioso dentro de una página, mientras que CSRF intenta aprovechar las sesiones que el navegador ya tiene abiertas. Ambos riesgos deben tenerse en cuenta al desarrollar aplicaciones web.

### 7. Cookies y privacidad / normativa

#### ¿Qué exigen el RGPD y las leyes de protección de datos sobre las cookies?

El RGPD es una normativa europea que protege los datos personales de las personas. En términos generales, cuando una página utiliza cookies para recopilar información con fines de analítica o publicidad, normalmente debe informar al usuario y obtener su consentimiento antes de activarlas, cuando así lo exige la normativa aplicable.

En Colombia, la Ley 1581 de 2012 establece reglas para el tratamiento de datos personales. Cuando las cookies permiten recopilar o utilizar datos personales, la página debe cumplir las obligaciones correspondientes, como informar sobre el tratamiento y obtener la autorización cuando sea necesaria.

Las obligaciones exactas dependen del tipo de cookie, de la información recopilada y de las normas que se apliquen al sitio.

#### Diferencia entre cookies estrictamente necesarias y cookies de analítica o marketing

- **Cookies estrictamente necesarias:** permiten que la página funcione correctamente, por ejemplo, para mantener una sesión, proteger una cuenta o recordar elementos necesarios del carrito de compras. Generalmente no necesitan consentimiento previo cuando son realmente indispensables para el servicio solicitado.
- **Cookies de analítica:** ayudan a conocer cómo utilizan las personas una página, por ejemplo, qué secciones visitan. Según la normativa aplicable y la forma en que se recopilan los datos, pueden requerir consentimiento.
- **Cookies de marketing:** se utilizan para medir campañas publicitarias o mostrar anuncios personalizados. Normalmente requieren consentimiento previo cuando están sujetas a las reglas de consentimiento para cookies.

Una página no debe considerar todas sus cookies como necesarias si en realidad se utilizan para analizar el comportamiento o mostrar publicidad.

#### ¿Qué es un banner o gestor de consentimiento de cookies?

Un banner de consentimiento es un aviso que aparece en una página para explicar el uso de cookies y permitir que el usuario decida cuáles acepta.

Como mínimo, debería permitir:

- Aceptar las cookies que necesitan consentimiento.
- Rechazar las cookies no necesarias con una opción clara.
- Elegir las categorías que desea permitir, como analítica o marketing.
- Consultar información sobre las cookies y su finalidad.
- Cambiar o retirar su consentimiento posteriormente.

En conclusión, las páginas web deben ser transparentes sobre el uso de cookies y respetar las decisiones de los usuarios. No todas las cookies requieren consentimiento, pero las que no son necesarias deben tratarse de acuerdo con la normativa aplicable.

### 8. Cookies en el mundo real: Supabase

#### ¿Cómo maneja Supabase Auth la sesión en el navegador?

Por defecto, cuando se utiliza Supabase Auth en una aplicación web normal, la sesión se guarda en `localStorage`. Allí se almacenan los datos necesarios para mantener la autenticación, como el token de acceso y el refresh token.

Cuando se trabaja con renderizado del lado del servidor (SSR), por ejemplo con Next.js, se puede utilizar el paquete `@supabase/ssr` para guardar y administrar la sesión mediante cookies. Esto permite que tanto el navegador como el servidor puedan acceder a la sesión de forma coordinada.

#### ¿Por qué una aplicación React sin servidor propio suele usar localStorage?

Una aplicación React de una sola página (SPA) funciona principalmente en el navegador. Si no tiene un servidor propio que gestione las sesiones, es más sencillo utilizar la configuración habitual de Supabase, que guarda la sesión en `localStorage`.

En cambio, una cookie `HttpOnly` no puede ser leída directamente por JavaScript. Para administrarla se necesita una configuración que permita al servidor crearla y gestionar la sesión correctamente.

Aunque `localStorage` es práctico, tiene un riesgo: si ocurre un ataque XSS, un script malicioso podría intentar leer y robar los tokens. Por eso es importante proteger la aplicación contra la ejecución de código malicioso.

#### ¿Qué cabecera se relaciona con CORS para permitir peticiones desde GitHub Pages?

La cabecera principal es `Access-Control-Allow-Origin`. Se utiliza en las respuestas del servidor para indicar qué origen puede acceder a los recursos mediante peticiones desde el navegador.

Por ejemplo, si la aplicación está publicada en GitHub Pages, el origen podría tener esta forma:

```http
Access-Control-Allow-Origin: https://usuario.github.io
```

El valor exacto debe coincidir con el origen real de la aplicación. Si el proyecto está publicado dentro de un repositorio, la dirección de la página puede incluir el nombre del repositorio, pero el origen no incluye esa ruta.

En el caso de Supabase, hay que revisar la configuración de CORS del servicio que se está consultando y asegurarse de que permita el origen correspondiente. No se debe confundir esta cabecera con la configuración de las URL de redirección de Supabase Auth, que se utiliza para los procesos de inicio de sesión.

### 9. Herramientas del navegador

#### ¿Dónde se ven las cookies en Chrome y Firefox?

En Chrome, las cookies se pueden consultar abriendo las herramientas de desarrollador (*DevTools*), entrando en la pestaña **Application** y seleccionando **Storage → Cookies**. Después se elige el dominio que se quiere revisar.

En Firefox, se abre DevTools y se entra en la pestaña **Almacenamiento (Storage)**. Allí se selecciona **Cookies** y el dominio correspondiente.

Estas herramientas permiten revisar las cookies que el navegador tiene guardadas para un sitio web.

#### ¿Qué columnas aparecen y qué información muestran?

En Chrome, la tabla de cookies puede mostrar las siguientes columnas:

- **Name:** nombre de la cookie.
- **Value:** valor almacenado en la cookie.
- **Domain:** dominio al que pertenece.
- **Path:** rutas en las que se puede enviar.
- **Expires / Max-Age:** fecha de vencimiento o duración. Si aparece `Session`, normalmente significa que es una cookie de sesión.
- **Size:** tamaño aproximado de la cookie.
- **HttpOnly:** indica si JavaScript tiene prohibido leer la cookie.
- **Secure:** indica si la cookie está limitada a conexiones seguras.
- **SameSite:** muestra la política de envío de la cookie en peticiones entre sitios.

Las columnas disponibles pueden variar según el navegador y su versión.

#### ¿Cómo se borra una cookie específica desde DevTools?

En Chrome, se puede abrir **Application → Storage → Cookies**, seleccionar el dominio y buscar la cookie que se quiere eliminar. Luego se selecciona esa fila y se utiliza la opción para eliminarla, o se presiona la tecla Suprimir si la versión del navegador lo permite.

En Firefox, se puede abrir **Storage → Cookies**, seleccionar el dominio, buscar la cookie y utilizar la opción para eliminar únicamente ese registro.

De esta manera, se elimina una cookie específica sin necesidad de borrar todas las cookies del sitio.

En conclusión, DevTools permite revisar, comprobar y eliminar cookies para entender cómo funciona una página web y detectar posibles problemas durante su desarrollo.

### Parte 2. Ejercicio A — Inspeccionar cookies reales

**Página inspeccionada:** [(https://ielacandelariamedellin.edu.co)].

**Resultados de la inspección:**

- Cookie con duración de sesión: [PHPSESSID].
- Cookie con fecha de expiración fija: [__Secure-1PAPISID].
- ¿Encontraste alguna cookie con `HttpOnly`?: [sí].
- ¿Encontraste alguna cookie con `Secure`?: [sí].
- ¿Aparecen todas las cookies en `document.cookie`?: No necesariamente. Las cookies protegidas con `HttpOnly` no son accesibles desde JavaScript. Además, pueden existir otras restricciones según la cookie y el sitio inspeccionado.
