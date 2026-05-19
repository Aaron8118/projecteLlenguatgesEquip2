// Patrones válidos
let rxCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let rxNom = /^[a-zA-ZàáâäèéêëìíîïòóôöùúûüñÑÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ' -]{2,50}$/;
let rxEdad = /^(1[89]|[2-9][0-9]|100)$/;

// Límites de caracteres
let maxNom = 50;
let maxMail = 100;
let maxAs = 80;
let maxMsg = 500;

function inicio() {
  document.getElementById('nombre').addEventListener('input', comprobarN);
  document.getElementById('edad').addEventListener('input', comprobarEdad);
  document.getElementById('correo').addEventListener('input', comprobarMail);
  document.getElementById('asunto').addEventListener('input', comprobarAs);
  document.getElementById('mensaje').addEventListener('input', comprobarMsg);
  document.getElementById('mensaje').addEventListener('input', contadorMsg);
  document.getElementById('categoria').addEventListener('change', comprobarCat);

  contadorMsg();
}

// contador textArea
function contadorMsg() {
  let mensaje1 = document.getElementById('mensaje');
  let contador = document.getElementById('contador-msg');
  contador.style.marginLeft = "20px";
  contador.style.marginBottom = "20px";
  let actualValorlongit = mensaje1.value.length;
  if (contador) {
    contador.textContent = actualValorlongit + " / " + maxMsg + " caracteres";

    if (actualValorlongit > maxMsg) {
      contador.style.color = "red";
    } else {
      contador.style.color = "green";
    }
  }

  if (actualValorlongit > maxMsg) {
    mensaje1.value = mensaje1.value.substring(0, maxMsg);
  }
}
//aqui van todas las valdiaciones de aqui para abajo
function comprobarN() {
  let nombre1 = document.getElementById('nombre');
  let textoNom = nombre1.value.trim();

  if (!textoNom) {
    return errormostrar(nombre1, 'err-nombre', 'El nombre es obligatorio.');
  }
  if (textoNom.length > maxNom) {
    return errormostrar(nombre1, 'err-nombre', 'Maximo ' + maxNom + ' caracteres.');
  }
  if (!rxNom.test(textoNom)) {
    return errormostrar(nombre1, 'err-nombre', 'Solo letras y espacios. Minimo 2 caracteres.');
  }
  return okvalidado(nombre1, 'err-nombre');
}

function comprobarEdad() {
  let edad1 = document.getElementById('edad');
  let edadValor = edad1.value.trim();

  if (!edadValor) {
    return errormostrar(edad1, 'err-edad', 'La edad es obligatoria.');
  }
  if (!rxEdad.test(edadValor)) {
    return errormostrar(edad1, 'err-edad', 'La edad debe estar entre 18 y 100.');
  }
  return okvalidado(edad1, 'err-edad');
}

function comprobarMail() {
  let mail1 = document.getElementById('correo');
  let mailValor = mail1.value.trim();

  if (!mailValor) {
    return errormostrar(mail1, 'err-correo', 'El correo es obligatorio.');
  }
  if (mailValor.length > maxMail) {
    return errormostrar(mail1, 'err-correo', 'Maximo ' + maxMail + ' caracteres.');
  }
  if (!rxCorreo.test(mailValor)) {
    return errormostrar(mail1, 'err-correo', 'Formato invalido. Ej: usuario@dominio.com');
  }
  return okvalidado(mail1, 'err-correo');
}

function comprobarAs() {
  let asunto1 = document.getElementById('asunto');
  let asuntoValor = asunto1.value.trim();

  if (!asuntoValor) {
    return errormostrar(asunto1, 'err-asunto', 'El asunto es obligatorio.');
  }
  if (asuntoValor.length > maxAs) {
    return errormostrar(asunto1, 'err-asunto', 'Maximo ' + maxAs + ' caracteres.');
  }
  return okvalidado(asunto1, 'err-asunto');
}

function comprobarMsg() {
  let mensaje1 = document.getElementById('mensaje');
  let textoMensaje = mensaje1.value.trim();

  if (!textoMensaje) {
    return errormostrar(mensaje1, 'err-mensaje', 'El mensaje es obligatorio.');
  }
  if (textoMensaje.length > maxMsg) {
    return errormostrar(mensaje1, 'err-mensaje', 'Maximo ' + maxMsg + ' caracteres.');
  }
  return okvalidado(mensaje1, 'err-mensaje');
}

function comprobarCat() {
  let categoria1 = document.getElementById('categoria');

  if (!categoria1.value) {
    return errormostrar(categoria1, 'err-categoria', 'Selecciona una categoria.');
  }
  return okvalidado(categoria1, 'err-categoria');
}

//si falla es rojo 
function errormostrar(input1, id, msg) {
  input1.style.borderColor = '#cc0000';
  input1.style.background = '#fff5f5';
  mostrarErr(id, msg);
  return false;
}

//si el patron cumple es verde
function okvalidado(input2, id) {
  input2.style.borderColor = '#2d7a2d';
  input2.style.background = '#f5fff5';
  ocultarErr(id);
  return true;
}

//para mostrar error
function mostrarErr(id, msg) {
  let spanError = document.getElementById(id);

  if (spanError) {
    spanError.textContent = msg;
    spanError.style.display = 'block';
  }
}

//para ocultar el error
function ocultarErr(id) {
  let spanOcultar = document.getElementById(id);

  if (spanOcultar) {
    spanOcultar.style.display = 'none';
  }
}

window.addEventListener('load', inicio);