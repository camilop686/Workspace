//### Ejercicio 5.9 — FizzBuzz clásico
//Imprime los números del 1 al 100. Pero:
//- Si el número es múltiplo de 3 → imprime `"Fizz"`
//- Si es múltiplo de 5 → imprime `"Buzz"`
//- Si es múltiplo de ambos → imprime `"FizzBuzz"`
//- Si no → imprime el número

for (let i = 1; i <= 100; i++) {

  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }

}