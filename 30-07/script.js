// ==========================================
// 1. INYECTAR ESTILOS CSS CON JS
// ==========================================
const style = document.createElement('style');
style.textContent = `
  * { box-sizing: border-box; font-family: Arial, sans-serif; }
  body { background-color: #f4f6f9; padding: 20px; display: flex; justify-content: center; }
  .tarjeta { background: white; padding: 30px; border-radius: 8px; max-width: 500px; width: 100%; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
  h2 { text-align: center; color: #333; margin-top: 0; }
  .campo { margin-bottom: 16px; display: flex; flex-direction: column; }
  .campo label { font-weight: bold; margin-bottom: 6px; color: #444; }
  .campo input[type="text"], .campo input[type="email"], .campo input[type="password"],
  .campo input[type="number"], .campo input[type="date"], .campo select, .campo textarea {
    width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;
  }
  .opciones { display: flex; gap: 15px; flex-wrap: wrap; }
  .opciones label { font-weight: normal; cursor: pointer; }
  .checkbox-unico { flex-direction: row; align-items: center; gap: 8px; }
  button { background-color: #27ae60; color: white; border: none; padding: 12px; border-radius: 4px; font-size: 16px; font-weight: bold; cursor: pointer; width: 100%; }
  button:hover { background-color: #219150; }
`;
document.head.appendChild(style);

// ==========================================
// 2. CREAR EL FORMULARIO EN EL DOM
// ==========================================
const app = document.getElementById('app');

const tarjeta = document.createElement('div');
tarjeta.className = 'tarjeta';

const titulo = document.createElement('h2');
titulo.textContent = 'Registro de Estudiante';
tarjeta.appendChild(titulo);

const formulario = document.createElement('form');

// Función de apoyo para envolver elementos con su etiqueta
function agregarCampo(labelText, elementoInput) {
  const div = document.createElement('div');
  div.className = 'campo';
  
  if (labelText) {
    const label = document.createElement('label');
    label.textContent = labelText;
    div.appendChild(label);
  }
  
  div.appendChild(elementoInput);
  formulario.appendChild(div);
}

// 1. input type="text" → nombre
const inputNombre = document.createElement('input');
inputNombre.type = 'text';
inputNombre.placeholder = 'Nombre completo';
inputNombre.required = true;
agregarCampo('Nombre:', inputNombre);

// 2. input type="email" → correo
const inputCorreo = document.createElement('input');
inputCorreo.type = 'email';
inputCorreo.placeholder = 'correo@ejemplo.com';
inputCorreo.required = true;
agregarCampo('Correo:', inputCorreo);

// 3. input type="password" → contraseña
const inputPassword = document.createElement('input');
inputPassword.type = 'password';
inputPassword.required = true;
agregarCampo('Contraseña:', inputPassword);

// 4. input type="number" → edad
const inputEdad = document.createElement('input');
inputEdad.type = 'number';
inputEdad.min = '15';
inputEdad.max = '99';
agregarCampo('Edad:', inputEdad);

// 5. input type="date" → fecha de nacimiento
const inputFecha = document.createElement('input');
inputFecha.type = 'date';
agregarCampo('Fecha de nacimiento:', inputFecha);

// 6. input type="range" → nivel de experiencia (1-10)
const inputRango = document.createElement('input');
inputRango.type = 'range';
inputRango.min = '1';
inputRango.max = '10';
inputRango.value = '5';
agregarCampo('Nivel de experiencia (1-10):', inputRango);

// 7. input type="radio" (grupo) → modalidad (presencial/virtual)
const divModalidad = document.createElement('div');
divModalidad.className = 'opciones';
['Presencial', 'Virtual'].forEach((opcion, index) => {
  const lbl = document.createElement('label');
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'modalidad';
  radio.value = opcion.toLowerCase();
  if (index === 0) radio.checked = true;
  lbl.appendChild(radio);
  lbl.appendChild(document.createTextNode(` ${opcion}`));
  divModalidad.appendChild(lbl);
});
agregarCampo('Modalidad:', divModalidad);

// 8. input type="checkbox" (varios) → lenguajes que conoce
const divLenguajes = document.createElement('div');
divLenguajes.className = 'opciones';
['JavaScript', 'Python', 'Java'].forEach(lang => {
  const lbl = document.createElement('label');
  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.name = 'lenguajes';
  chk.value = lang.toLowerCase();
  lbl.appendChild(chk);
  lbl.appendChild(document.createTextNode(` ${lang}`));
  divLenguajes.appendChild(lbl);
});
agregarCampo('Lenguajes que conoce:', divLenguajes);

// 9. select con option → país
const selectPais = document.createElement('select');
const paises = ['Colombia', 'México', 'Argentina', 'España', 'Otro'];
const optDefault = document.createElement('option');
optDefault.value = '';
optDefault.textContent = 'Selecciona un país';
selectPais.appendChild(optDefault);

paises.forEach(p => {
  const opt = document.createElement('option');
  opt.value = p.toLowerCase();
  opt.textContent = p;
  selectPais.appendChild(opt);
});
agregarCampo('País:', selectPais);

// 10. textarea → comentarios
const txtComentarios = document.createElement('textarea');
txtComentarios.rows = 4;
txtComentarios.placeholder = 'Comentarios adicionales...';
agregarCampo('Comentarios:', txtComentarios);

// 11. input type="file" → foto de perfil
const inputFoto = document.createElement('input');
inputFoto.type = 'file';
inputFoto.accept = 'image/*';
agregarCampo('Foto de perfil:', inputFoto);

// 12. input type="color" → color favorito
const inputColor = document.createElement('input');
inputColor.type = 'color';
inputColor.value = '#3498db';
agregarCampo('Color favorito:', inputColor);

// 13. input type="checkbox" (uno solo) → aceptar términos
const divTerminos = document.createElement('div');
divTerminos.className = 'campo checkbox-unico';
const lblTerminos = document.createElement('label');
const chkTerminos = document.createElement('input');
chkTerminos.type = 'checkbox';
chkTerminos.required = true;
lblTerminos.appendChild(chkTerminos);
lblTerminos.appendChild(document.createTextNode(' Acepto los términos y condiciones'));
divTerminos.appendChild(lblTerminos);
formulario.appendChild(divTerminos);

// 14. button type="submit" → enviar
const btnSubmit = document.createElement('button');
btnSubmit.type = 'submit';
btnSubmit.textContent = 'Enviar Registro';
agregarCampo('', btnSubmit);

// Ensamblar todo dentro de la tarjeta
tarjeta.appendChild(formulario);
app.appendChild(tarjeta);

// ==========================================
// 3. EVENTO DE ENVÍO Y PROCESAMIENTO
// ==========================================
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Capturar valores seleccionados
  const lenguajesElegidos = Array.from(
    formulario.querySelectorAll('input[name="lenguajes"]:checked')
  ).map(cb => cb.value);

  const modalidadElegida = formulario.querySelector('input[name="modalidad"]:checked')?.value;

  const datosRecogidos = {
    nombre: inputNombre.value,
    correo: inputCorreo.value,
    password: inputPassword.value,
    edad: inputEdad.value,
    fechaNacimiento: inputFecha.value,
    experiencia: inputRango.value,
    modalidad: modalidadElegida,
    lenguajes: lenguajesElegidos,
    pais: selectPais.value,
    comentarios: txtComentarios.value,
    foto: inputFoto.files[0] ? inputFoto.files[0].name : 'Sin archivo',
    colorFavorito: inputColor.value,
    terminosAceptados: chkTerminos.checked
  };

  console.log('Objeto completo generado:', datosRecogidos);
  alert(`¡Formulario enviado con éxito por ${datosRecogidos.nombre}!`);
});