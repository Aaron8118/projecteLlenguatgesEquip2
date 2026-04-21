/* ================================================
   contacto_control.js
   - Funcions originals: colors de fons (Ctrl+C / Alt)
   - Validació JS sobre el formulari existent
   ================================================ */


/* ------------------------------------------------
   BLOC 1 — Colors de fons (codi original intacte)
   ------------------------------------------------ */

function inicio() {
  document.addEventListener("DOMContentLoaded", cargar);
}

function cargar() {
  window.body = document.body;
  window.cont = document.querySelector(".contacto");

  if (!cont) return;

  window.colores = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFFFFF',
    '#000000'
  ];

  window.addEventListener("keydown", teclado);
  window.addEventListener("copy", copiar);

  /* Arrancar validació del formulari */
  iniciarValidacio();
}

function teclado(e) {
  // CTRL + C → color random
  if (e.ctrlKey && e.key.toLowerCase() === 'c') {
    e.preventDefault();
    ponerColorAleatorio();
  }

  // ALT → restaurar fondo
  if (e.key === 'Alt') {
    e.preventDefault();
    restaurarFondo();
  }
}

function copiar(e) {
  e.preventDefault();
  ponerColorAleatorio();
}

function ponerColorAleatorio() {
  let color = colores[Math.floor(Math.random() * colores.length)];

  // evitar negro
  if (color === '#000000') {
    let candidatos = colores.filter(c => c !== '#000000');
    color = candidatos[Math.floor(Math.random() * candidatos.length)];
  }

  body.style.backgroundColor = color;
  body.style.backgroundImage = 'none';

  cont.classList.add('sin-fondo');
  cont.style.backgroundColor = 'transparent';
  cont.style.color = '#000000';
}

function restaurarFondo() {
  body.style.backgroundColor = '';
  body.style.backgroundImage = '';

  cont.classList.remove('sin-fondo');
  cont.style.backgroundColor = '';
  cont.style.color = '';
}

// Arrancar
inicio();


/* ------------------------------------------------
   BLOC 2 — Validació sobre el formulari existent
   ------------------------------------------------ */

/* --- Regex --- */
const REGEX_CORREO   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_NOMBRE   = /^[a-zA-ZàáâäèéêëìíîïòóôöùúûüñÑÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ' -]{2,50}$/;
const REGEX_TELEFONO = /^\+[0-9]{2}[0-9]{9}$/;
const REGEX_EDAD     = /^(1[89]|[2-9]\d|100)$/;   // 18–100

/* --- Límits màxims --- */
const MAX_NOMBRE  = 50;
const MAX_CORREO  = 100;
const MAX_ASUNTO  = 80;
const MAX_MENSAJE = 500;

/* --- Categoria obligatoria (radio simulat amb select) --- */
// El formulari original té un <select id="categoria">, s'usa com a camp obligatori


function iniciarValidacio() {
  const form = document.getElementById('formulario');
  if (!form) return;

  /* --- Comptador de caràcters del textarea --- */
  const textarea   = document.getElementById('mensaje');
  const comptador  = crearComptador(textarea, MAX_MENSAJE);

  textarea.addEventListener('input', () => {
    actualitzarComptador(comptador, textarea.value.length, MAX_MENSAJE);
  });

  /* --- Validació en temps real (blur) --- */
  document.getElementById('nombre').addEventListener('blur',   () => validarNombre());
  document.getElementById('correo').addEventListener('blur',   () => validarCorreo());
  document.getElementById('telefono').addEventListener('blur', () => validarTelefono());
  document.getElementById('asunto').addEventListener('blur',   () => validarAsunto());
  document.getElementById('mensaje').addEventListener('blur',  () => validarMensaje());
  document.getElementById('categoria').addEventListener('change', () => validarCategoria());

  /* --- Botó enviar --- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarTot()) {
      mostrarModalExit();
      form.reset();
      actualitzarComptador(comptador, 0, MAX_MENSAJE);
      netejarTotsErrors();
    }
  });

  /* --- Botó reset: neteja errors visuals també --- */
  const btnReset = form.querySelector('[type="reset"]');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      setTimeout(() => {
        actualitzarComptador(comptador, 0, MAX_MENSAJE);
        netejarTotsErrors();
      }, 10);
    });
  }

  /* Tancar modal si existeix */
  const btnTancar = document.getElementById('btn-tancar-modal-exit');
  if (btnTancar) {
    btnTancar.addEventListener('click', tancarModalExit);
  }
}


/* ---- Funcions de validació individuals ---- */

function validarNombre() {
  const camp = document.getElementById('nombre');
  const val  = camp.value.trim();
  if (val === '')               return error(camp, 'err-nombre', 'El nombre es obligatorio.');
  if (val.length > MAX_NOMBRE)  return error(camp, 'err-nombre', 'Máximo ' + MAX_NOMBRE + ' caracteres.');
  if (!REGEX_NOMBRE.test(val))  return error(camp, 'err-nombre', 'Solo letras y espacios. Mínimo 2 caracteres.');
  return ok(camp, 'err-nombre');
}

function validarCorreo() {
  const camp = document.getElementById('correo');
  const val  = camp.value.trim();
  if (val === '')               return error(camp, 'err-correo', 'El correo es obligatorio.');
  if (val.length > MAX_CORREO)  return error(camp, 'err-correo', 'Máximo ' + MAX_CORREO + ' caracteres.');
  if (!REGEX_CORREO.test(val))  return error(camp, 'err-correo', 'Formato inválido. Ej: usuario@dominio.com');
  return ok(camp, 'err-correo');
}

function validarTelefono() {
  const camp = document.getElementById('telefono');
  const val  = camp.value.trim();
  if (val === '')                return error(camp, 'err-telefono', 'El teléfono es obligatorio.');
  if (!REGEX_TELEFONO.test(val)) return error(camp, 'err-telefono', 'Formato: +34XXXXXXXXX');
  return ok(camp, 'err-telefono');
}

function validarAsunto() {
  const camp = document.getElementById('asunto');
  const val  = camp.value.trim();
  if (val === '')              return error(camp, 'err-asunto', 'El asunto es obligatorio.');
  if (val.length > MAX_ASUNTO) return error(camp, 'err-asunto', 'Máximo ' + MAX_ASUNTO + ' caracteres.');
  return ok(camp, 'err-asunto');
}

function validarMensaje() {
  const camp = document.getElementById('mensaje');
  const val  = camp.value.trim();
  if (val === '')               return error(camp, 'err-mensaje', 'El mensaje es obligatorio.');
  if (val.length > MAX_MENSAJE) return error(camp, 'err-mensaje', 'Máximo ' + MAX_MENSAJE + ' caracteres.');
  return ok(camp, 'err-mensaje');
}

function validarCategoria() {
  const camp = document.getElementById('categoria');
  if (!camp.value) {
    camp.style.borderColor = '#cc0000';
    mostrarSpanError('err-categoria', 'Selecciona una categoría.');
    return false;
  }
  camp.style.borderColor = '#2d7a2d';
  ocultarSpanError('err-categoria');
  return true;
}

function validarTot() {
  const r1 = validarNombre();
  const r2 = validarCorreo();
  const r3 = validarTelefono();
  const r4 = validarAsunto();
  const r5 = validarMensaje();
  const r6 = validarCategoria();
  return r1 && r2 && r3 && r4 && r5 && r6;
}


/* ---- Helpers d'error ---- */

function error(camp, idSpan, missatge) {
  camp.style.borderColor = '#cc0000';
  camp.style.background  = '#fff5f5';
  mostrarSpanError(idSpan, missatge);
  return false;
}

function ok(camp, idSpan) {
  camp.style.borderColor = '#2d7a2d';
  camp.style.background  = '#f5fff5';
  ocultarSpanError(idSpan);
  return true;
}

function mostrarSpanError(id, missatge) {
  let span = document.getElementById(id);
  if (!span) {
    span = document.createElement('span');
    span.id = id;
    span.className = 'val-error';
    /* Inserir just després del camp corresponent */
    const camp = document.getElementById(id.replace('err-', ''));
    if (camp) camp.insertAdjacentElement('afterend', span);
  }
  span.textContent = missatge;
  span.style.display = 'block';
}

function ocultarSpanError(id) {
  const span = document.getElementById(id);
  if (span) span.style.display = 'none';
}

function netejarTotsErrors() {
  ['nombre','correo','telefono','asunto','mensaje','categoria'].forEach(id => {
    const camp = document.getElementById(id);
    if (camp) {
      camp.style.borderColor = '';
      camp.style.background  = '';
    }
    ocultarSpanError('err-' + id);
  });
}


/* ---- Comptador de caràcters ---- */

function crearComptador(textarea, max) {
  const span = document.createElement('span');
  span.className = 'val-comptador';
  span.textContent = '0 / ' + max + ' caracteres';
  textarea.insertAdjacentElement('afterend', span);
  return span;
}

function actualitzarComptador(span, len, max) {
  span.textContent = len + ' / ' + max + ' caracteres';
  span.style.color = len >= max ? '#cc0000' : len >= max * 0.8 ? '#b85c00' : '#555';
  span.style.fontWeight = len >= max * 0.8 ? 'bold' : 'normal';
}


/* ---- Modal d'èxit ---- */

function mostrarModalExit() {
  /* Reutilitza el modal-bienvenida que ja existeix al HTML */
  window.location.hash = 'modal-bienvenida';
}

function tancarModalExit() {
  const modal = document.getElementById('modal-exit');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}