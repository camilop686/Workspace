//### Ejercicio 4.5 — Validación de formulario
//Declara variables `usuario` (string) y `contrasena` (string).  
//- Si `usuario` está vacío o `contrasena` tiene menos de 8 caracteres, imprime el error correspondiente.
//- Si todo es válido, imprime `"Login exitoso"`.
//usar if, length
//let usuario = "";         
//let contrasena = "12345";

//OPCION MENOS EIFICIENTE

//if (usuario.length === 0) {
  //console.log("Error: el usuario está vacío");
//
//if (contrasena.length < 8) {
 // console.log("Error: la contraseña debe tener al menos 8 caracteres");
//}

//if (usuario.length > 0 && contrasena.length >= 8) {
  //console.log("Login exitoso");
//}

//OPCION EFICIENTE

usuario = "pepito@gmail.com";
contrasena = "lamejorcontrasena123";

if(usuario == ""){
    console.log("usuario vacio");
}else if(contrasena.length <8){
    console.log("contrasena demasiado corta");
}else{
    console.log("Login exitoso");
}