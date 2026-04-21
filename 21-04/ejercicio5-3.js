//### Ejercicio 5.3 — while
//Declara `let saldo = 1000`. Mientras el saldo sea mayor a 0, réstale 150 e imprime el saldo en cada iteración. Al terminar, imprime `"Saldo agotado"`.

let saldo = 1000;

while (saldo > 0) {
  saldo = saldo - 150;
  console.log(saldo);
}

console.log("Saldo agotado");