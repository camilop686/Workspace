//### Ejercicio 5.4 — do...while
//Crea un contador que empiece en 5 y se decremente en 1. Usa `do...while` para imprimir el conteo y al llegar a 0 imprima `"¡Despegue!"`.

let contador = 5;

do {
  console.log(contador);
  contador--;
} while (contador > 0);

console.log("¡Despegue!");
