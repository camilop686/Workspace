//### Ejercicio 5.8 — Triángulo
//Usando bucles anidados, imprime un triángulo de asteriscos:
//```
//*
//* *
//* * *
//* * * *
//* * * * *
//```

for (let i = 1; i <= 5; i++) {
  let fila = "";

  for (let j = 1; j <= i; j++) {
    fila += "* ";
  }

  console.log(fila);
}