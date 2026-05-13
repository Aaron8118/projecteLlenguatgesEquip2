// Patrones válidos
let rxCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let rxNom    = /^[a-zA-ZàáâäèéêëìíîïòóôöùúûüñÑÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ' -]{2,50}$/;
let rxTel    = /^\+[0-9]{2}[0-9]{9}$/;

// Límites de caracteres
let maxNom  = 50;
let maxMail = 100;
let maxAs   = 80;
let maxMsg  = 500;

function inicio() {
  document.addEventListener('DOMContentLoaded', cargar);
}

function cargar() {
  let f = document.getElementById('formulario');
  if (!f) return;

  // Contador del textarea
  let tx  = document.getElementById('mensaje');
  let cnt = crearContador(tx, maxMsg);
  tx.addEventListener('input', function () {
    actualizarContador(cnt, tx.value.length, maxMsg);
  });

  // Validar al salir de cada campo
  document.getElementById('nombre').addEventListener('blur', validarNom);
  document.getElementById('correo').addEventListener('blur', validarMail);
  document.getElementById('telefono').addEventListener('blur', validarTel);
  document.getElementById('asunto').addEventListener('blur', validarAs);
  document.getElementById('mensaje').addEventListener('blur', validarMsg);
  document.getElementById('categoria').addEventListener('change', validarCat);

  // Enviar
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validarTodo()) {
      window.location.hash = 'modal-bienvenida';
      f.reset();
      actualizarContador(cnt, 0, maxMsg);
      limpiarErrores();
    }
  });

  // Reset
  let btnR = f.querySelector('[type="reset"]');
  if (btnR) {
    btnR.addEventListener('click', function () {
      setTimeout(function () {
        actualizarContador(cnt, 0, maxMsg);
        limpiarErrores();
      }, 10);
    });
  }
}

function validarNom() {
  let c = document.getElementById('nombre');
  let v = c.value.trim();
  if (!v)               return err(c, 'err-nombre', 'El nombre es obligatorio.');
  if (v.length > maxNom)  return err(c, 'err-nombre', 'Maximo ' + maxNom + ' caracteres.');
  if (!rxNom.test(v))     return err(c, 'err-nombre', 'Solo letras y espacios. Minimo 2 caracteres.');
  return ok(c, 'err-nombre');
}

function validarMail() {
  let c = document.getElementById('correo');
  let v = c.value.trim();
  if (!v)                return err(c, 'err-correo', 'El correo es obligatorio.');
  if (v.length > maxMail)  return err(c, 'err-correo', 'Maximo ' + maxMail + ' caracteres.');
  if (!rxCorreo.test(v))   return err(c, 'err-correo', 'Formato invalido. Ej: usuario@dominio.com');
  return ok(c, 'err-correo');
}

function validarTel() {
  let c = document.getElementById('telefono');
  let v = c.value.trim();
  if (!v)           return err(c, 'err-telefono', 'El telefono es obligatorio.');
  if (!rxTel.test(v)) return err(c, 'err-telefono', 'Formato: +34XXXXXXXXX');
  return ok(c, 'err-telefono');
}

function validarAs() {
  let c = document.getElementById('asunto');
  let v = c.value.trim();
  if (!v)              return err(c, 'err-asunto', 'El asunto es obligatorio.');
  if (v.length > maxAs)  return err(c, 'err-asunto', 'Maximo ' + maxAs + ' caracteres.');
  return ok(c, 'err-asunto');
}

function validarMsg() {
  let c = document.getElementById('mensaje');
  let v = c.value.trim();
  if (!v)               return err(c, 'err-mensaje', 'El mensaje es obligatorio.');
  if (v.length > maxMsg)  return err(c, 'err-mensaje', 'Maximo ' + maxMsg + ' caracteres.');
  return ok(c, 'err-mensaje');
}

function validarCat() {
  let c = document.getElementById('categoria');
  if (!c.value) {
    c.style.borderColor = '#cc0000';
    mostrarErr('err-categoria', 'Selecciona una categoria.');
    return false;
  }
  c.style.borderColor = '#2d7a2d';
  ocultarErr('err-categoria');
  return true;
}

// Llama a todos y devuelve true solo si pasan todos
function validarTodo() {
  let res = [validarNom(), validarMail(), validarTel(), validarAs(), validarMsg(), validarCat()];
  return res.every(function (r) { return r === true; });
}

// Pinta el campo en rojo
function err(c, id, msg) {
  c.style.borderColor = '#cc0000';
  c.style.background  = '#fff5f5';
  mostrarErr(id, msg);
  return false;
}

// Pinta el campo en verde
function ok(c, id) {
  c.style.borderColor = '#2d7a2d';
  c.style.background  = '#f5fff5';
  ocultarErr(id);
  return true;
}

function mostrarErr(id, msg) {
  let s = document.getElementById(id);
  if (!s) {
    s = document.createElement('span');
    s.id = id;
    s.className = 'val-error';
    let c = document.getElementById(id.replace('err-', ''));
    if (c) c.insertAdjacentElement('afterend', s);
  }
  s.textContent = msg;
  s.style.display = 'block';
}

function ocultarErr(id) {
  let s = document.getElementById(id);
  if (s) s.style.display = 'none';
}

// Quita todos los estilos de error
function limpiarErrores() {
  let campos = ['nombre', 'correo', 'telefono', 'asunto', 'mensaje', 'categoria'];
  for (let i = 0; i < campos.length; i++) {
    let c = document.getElementById(campos[i]);
    if (c) { c.style.borderColor = ''; c.style.background = ''; }
    ocultarErr('err-' + campos[i]);
  }
}

function crearContador(tx, max) {
  let s = document.createElement('span');
  s.className = 'val-comptador';
  s.textContent = '0 / ' + max + ' caracteres';
  tx.insertAdjacentElement('afterend', s);
  return s;
}

function actualizarContador(s, len, max) {
  s.textContent = len + ' / ' + max + ' caracteres';
  if (len >= max) {
     s.style.color = '#cc0000';
     s.style.fontWeight = 'bold'; 
    } else if (len >= max * 0.8) { 
      s.style.color = '#b85c00'; 
      s.style.fontWeight = 'bold'; 
    } else { 
      s.style.color = '#555';
      s.style.fontWeight = 'normal';
    }
}

inicio();