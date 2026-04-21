//### Ejercicio 5.10 — Suma acumulada
//Usando un bucle, calcula la suma de todos los números del 1 al 100 y muestra el resultado al final. (El resultado esperado es 5050).

//---

let suma = 0;

for (let i = 1; i <= 100; i++) {
  suma += i;
}

console.log(suma);