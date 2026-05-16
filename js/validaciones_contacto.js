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

function comprobarN() {
  let c = document.getElementById('nombre');
  let v = c.value.trim();
  if (!v) {
    return err(c, 'err-nombre', 'El nombre es obligatorio.');
  }
  if (v.length > maxNom) {
    return err(c, 'err-nombre', 'Maximo ' + maxNom + ' caracteres.');
  }
  if (!rxNom.test(v)) {
    return err(c, 'err-nombre', 'Solo letras y espacios. Minimo 2 caracteres.');
  }
  return ok(c, 'err-nombre');
}

function comprobarMail() {
  let c = document.getElementById('correo');
  let v = c.value.trim();
  if (!v) {
    return err(c, 'err-correo', 'El correo es obligatorio.');
  }
  if (v.length > maxMail) {
    return err(c, 'err-correo', 'Maximo ' + maxMail + ' caracteres.');
  }
  if (!rxCorreo.test(v)) {
    return err(c, 'err-correo', 'Formato invalido. Ej: usuario@dominio.com');
  }
  return ok(c, 'err-correo');
}

function comprobarTelef() {
  let c = document.getElementById('telefono');
  let v = c.value.trim();
  if (!v) {
    return err(c, 'err-telefono', 'El telefono es obligatorio.');
  }
  if (!rxTel.test(v)) {
    return err(c, 'err-telefono', 'Formato: +34XXXXXXXXX');
  }
  return ok(c, 'err-telefono');
}

function comprobarAs() {
  let c = document.getElementById('asunto');
  let v = c.value.trim();
  if (!v) {
    return err(c, 'err-asunto', 'El asunto es obligatorio.');
  }
  if (v.length > maxAs) {
    return err(c, 'err-asunto', 'Maximo ' + maxAs + ' caracteres.');
  }
  return ok(c, 'err-asunto');
}

function comprobarMsg() {
  let c = document.getElementById('mensaje');
  let v = c.value.trim();
  if (!v) {
    return err(c, 'err-mensaje', 'El mensaje es obligatorio.');
  }
  if (v.length > maxMsg) {
    return err(c, 'err-mensaje', 'Maximo ' + maxMsg + ' caracteres.');
  }
  return ok(c, 'err-mensaje');
}

function comprobarCat() {
  let c = document.getElementById('categoria');
  if (!c.value) {
    return err(c, 'err-categoria', 'Selecciona una categoria.');
  }
  return ok(c, 'err-categoria');
}

function err(c, id, msg) {
  c.style.borderColor = '#cc0000';
  c.style.background  = '#fff5f5';
  mostrarErr(id, msg);
  return false;
}

function ok(c, id) {
  c.style.borderColor = '#2d7a2d';
  c.style.background  = '#f5fff5';
  ocultarErr(id);
  return true;
}

function mostrarErr(id, msg) {
  let s = document.getElementById(id);
  if (s) {
    s.textContent = msg;
    s.style.display = 'block';
  }
}

function ocultarErr(id) {
  let s = document.getElementById(id);
  if (s) {
    s.style.display = 'none';
  }
}

window.addEventListener('load', inicio);