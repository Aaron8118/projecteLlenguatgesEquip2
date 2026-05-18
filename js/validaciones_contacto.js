// Patrones válidos
let rxCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let rxNom = /^[a-zA-ZàáâäèéêëìíîïòóôöùúûüñÑÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ' -]{2,50}$/;
let rxTel = /^\+[0-9]{2}[0-9]{9}$/;

// Límites de caracteres
let maxNom = 50;
let maxMail = 100;
let maxAs = 80;
let maxMsg = 500;

function inicio() {
  document.getElementById('nombre').addEventListener('input', comprobarN);
  document.getElementById('correo').addEventListener('input', comprobarMail);
  document.getElementById('telefono').addEventListener('input', comprobarTelef);
  document.getElementById('asunto').addEventListener('input', comprobarAs);
  document.getElementById('mensaje').addEventListener('input', comprobarMsg);
  document.getElementById('categoria').addEventListener('change', comprobarCat);
}

//aqui van todas las valdiaciones de aqui para abajo
function comprobarN() {
  let nombre1 = document.getElementById('nombre');
  let textoNom = nombre1.value.trim();

  if (!textoNom) {
    return err(nombre1, 'err-nombre', 'El nombre es obligatorio.');
  }
  if (textoNom.length > maxNom) {
    return err(nombre1, 'err-nombre', 'Maximo ' + maxNom + ' caracteres.');
  }
  if (!rxNom.test(textoNom)) {
    return err(nombre1, 'err-nombre', 'Solo letras y espacios. Minimo 2 caracteres.');
  }
  return ok(nombre1, 'err-nombre');
}

function comprobarMail() {
  let mail1 = document.getElementById('correo');
  let mailValor = mail1.value.trim();

  if (!mailValor) {
    return err(mail1, 'err-correo', 'El correo es obligatorio.');
  }
  if (mailValor.length > maxMail) {
    return err(mail1, 'err-correo', 'Maximo ' + maxMail + ' caracteres.');
  }
  if (!rxCorreo.test(mailValor)) {
    return err(mail1, 'err-correo', 'Formato invalido. Ej: usuario@dominio.com');
  }
  return ok(mail1, 'err-correo');
}

function comprobarTelef() {
  let telefono1 = document.getElementById('telefono');
  let valorTel = telefono1.value.trim();

  if (!valorTel) {
    return err(telefono1, 'err-telefono', 'El telefono es obligatorio.');
  }
  if (!rxTel.test(valorTel)) {
    return err(telefono1, 'err-telefono', 'Formato: +34XXXXXXXXX');
  }
  return ok(telefono1, 'err-telefono');
}

function comprobarAs() {
  let asunto1 = document.getElementById('asunto');
  let asuntoValor = asunto1.value.trim();

  if (!asuntoValor) {
    return err(asunto1, 'err-asunto', 'El asunto es obligatorio.');
  }
  if (asuntoValor.length > maxAs) {
    return err(asunto1, 'err-asunto', 'Maximo ' + maxAs + ' caracteres.');
  }
  return ok(asunto1, 'err-asunto');
}

function comprobarMsg() {
  let mensaje1 = document.getElementById('mensaje');
  let textoMensaje = mensaje1.value.trim();

  if (!textoMensaje) {
    return err(mensaje1, 'err-mensaje', 'El mensaje es obligatorio.');
  }
  if (textoMensaje.length > maxMsg) {
    return err(mensaje1, 'err-mensaje', 'Maximo ' + maxMsg + ' caracteres.');
  }
  return ok(mensaje1, 'err-mensaje');
}

function comprobarCat() {
  let categoria1 = document.getElementById('categoria');

  if (!categoria1.value) {
    return err(categoria1, 'err-categoria', 'Selecciona una categoria.');
  }
  return ok(categoria1, 'err-categoria');
}

//si falla es rojo 
function err(input1, id, msg) {
  input1.style.borderColor = '#cc0000';
  input1.style.background = '#fff5f5';
  mostrarErr(id, msg);
  return false;
}

//si el patron cumple es verde
function ok(inputOk, id) {
  inputOk.style.borderColor = '#2d7a2d';
  inputOk.style.background = '#f5fff5';
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