//### Ejercicio 4.3 — switch
//Declara una variable `dia` (número del 1 al 7). Usando `switch`, imprime el nombre del día de la semana correspondiente. Si el número está fuera de rango, imprime `"Día inválido"`.
let dia = 7;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  case 4:
    console.log("Jueves");
    break;
  case 5:
    console.log("Viernes");
    break;
  case 6:
    console.log("Sábado");
    break;
  case 7:
    console.log("Domingo");
    break;
  default:
    console.log("Día inválido");
    break;
}