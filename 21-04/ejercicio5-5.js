//### Ejercicio 5.5 — break y continue
//Usando un `for` del 1 al 20:
//- Salta (con `continue`) los múltiplos de 3.
//- Detén (con `break`) el bucle si encuentras el número 17.
//- Imprime los demás números.

for (let i = 1; i <= 20; i++) 
{
  
if(i % 3 == 0) continue;

  if (i == 17) break;

  console.log(i);

}