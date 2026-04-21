//### Ejercicio 5.7 — Bucles anidados
//Imprime un cuadrado de asteriscos de 5x5 usando bucles anidados:
//```
//* * * * *
//* * * * *
//* * * * *
//* * * * *
//* * * * *
//```

for (let i = 1; i <= 5; i++) {
  let fila = "";

  for (let j = 1; j <= 5; j++) {
    fila += "* ";
  }

  console.log(fila);
}