1) Explicar con tus propias palabras
   -Que es una etiqueta html
   R// Una etiqueta HTML es una instrucción que le dice al navegador qué es y cómo debe mostrarse un elemento de una página web.
   
   -Que etiquetas componen la estructura de un archivo HTML
   R// Las principales etiquetas que forman la estructura básica de un archivo HTML son:
   1. <html>
   2. <head>
   3. <title>
   4. <body>

   -Explicar 5 etiquetas de texto en html
   R// <h1> = Crea un título principal.
<h2> = Crea un subtítulo.
<p> = Crea un párrafo de texto.
<strong> = Pone un texto en negrita y le da importancia.
<br> = Hace un salto de línea.

-Como funciona un link en HTML y que etiquetas se usan
R// Un link en HTML sirve para llevar al usuario a otra página o sitio web.

La etiqueta principal que se usa es <a> (ancla)
<a> → crea el enlace.
href → indica a dónde lleva el enlace.
Por ejemplo asi: <a href="https://www.google.com">Ir a Google</a>
Ir a Google → es el texto que el usuario puede hacer clic.

2) Investigar
-CSS en 5 renglones
R// CSS es un lenguaje que se utiliza para darle estilo y diseño a una página web.
Permite cambiar colores, tamaños, fuentes y posiciones de los elementos.
También ayuda a organizar cómo se ven los elementos en la página.
Se puede usar junto con HTML para mejorar la apariencia de un sitio web.
En pocas palabras, HTML crea la estructura y CSS se encarga del diseño.

-Selectores CSS
R// Los selectores CSS sirven para indicar a qué elementos HTML queremos aplicar un estilo.

Los más comunes son:

Selector de etiqueta: p → afecta todos los párrafos.
Selector de clase: .titulo → afecta elementos con esa clase.
Selector de ID: #menu → afecta un elemento específico.
Selector universal: * → afecta todos los elementos.
Selector de atributo: input[type="text"] → afecta elementos que cumplen esa condición.

-Como una etiqueta puede ser modificada por multiples selectores CSS
R// Una etiqueta HTML puede ser modificada por varios selectores CSS al mismo tiempo. CSS combina los estilos de los selectores que coinciden, aunque si hay conflictos, se aplica el estilo que tenga mayor prioridad.

Ejemplo:

p {
  color: blue;
}


.texto {
  font-size: 20px;
}

Si un <p> tiene la clase texto, tendrá color azul y tamaño de 20px.
href → indica a dónde lleva el enlace.

3) Explicar cpn tus propias palabras
- Que es un componente de react
  R// Un componente de React es como una parte de una página web que podemos crear por separado.
Por ejemplo, podemos hacer un componente para un botón, un menú o un formulario.
Cada componente puede tener su propio diseño y funcionamiento.
La idea es poder reutilizarlo cuando lo necesitemos.

-Como los componentes se relacionan con las etiquetas HTML, diferencias y parecidos
R// Los componentes de React y las etiquetas HTML se parecen porque ambos sirven para crear partes de una página.
La diferencia es que una etiqueta HTML ya viene definida, mientras que un componente lo creamos nosotros.
Por ejemplo, <button> es una etiqueta HTML, pero podemos crear un componente llamado Boton.
Además, los componentes pueden tener lógica y funciones, no solo mostrar contenido.

4) Averiguar
- Tipos de variables en un componente de React
  R// En un componente de React se pueden usar varios tipos de variables, dependiendo de lo que necesitemos:

const → para valores que no vamos a reasignar.
let → para valores que pueden cambiar.
useState → para datos que cambian y necesitan actualizar la pantalla.
props → datos que recibe un componente desde otro componente.
useRef → guarda un valor sin provocar una actualización de la pantalla.

- Que son los props de un componente
  R// Los props (propiedades) son datos que un componente de React recibe desde otro componente. Sirven para pasar información y hacer que un componente sea más reutilizable.

Por ejemplo, un componente Saludo puede recibir un nombre:

function Saludo({ nombre }) {
  return <h1>Hola, {nombre}</h1>;
}

Y desde otro componente:

<Saludo nombre="Camilo" />

Aquí, nombre es un prop que recibe el componente Saludo.

- Que es UseState
- R// useState es una función de React que sirve para guardar información que puede cambiar dentro de un componente.

Por ejemplo, puede guardar un nombre, contador o estado de un botón. Cuando ese valor cambia, React actualiza la pantalla para mostrar el nuevo valor.

En pocas palabras: useState sirve para guardar y cambiar datos dentro de un componente.

- Que es UseEffect
R// useEffect es una función de React que sirve para ejecutar algo después de que el componente se muestra o cambia.

Por ejemplo, se puede usar para cargar datos, hacer una petición a una API o detectar cambios.

En pocas palabras: useEffect sirve para realizar acciones que ocurren como consecuencia de cambios en un componente.

- Diferencias entre UseState y UseEffect
  R//
  useState → sirve para guardar y cambiar datos dentro de un componente.
useEffect → sirve para ejecutar acciones cuando el componente se muestra o cuando ciertos datos cambian.

Ejemplo sencillo:
useState sería como guardar el número de un contador.
useEffect sería como hacer algo cada vez que ese contador cambie.

En resumen: useState maneja datos y useEffect maneja acciones que ocurren por cambios.
   
