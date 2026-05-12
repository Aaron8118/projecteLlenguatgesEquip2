function inicio() {
  document.addEventListener("DOMContentLoaded", cargar);
}

function cargar() {
  window.body = document.body;
  window.cont = document.querySelector(".contacto");

  if (!cont) return;

  window.colores = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'
  ];

  window.addEventListener("keydown", teclado);
  window.addEventListener("copy", copiar);

  iniciarValidacion();
  iniciarSlider();
  iniciarFormComentario();
}

function teclado(e) {
  if (e.ctrlKey && e.key.toLowerCase() === 'c') {
    e.preventDefault();
    colorAleatorio();
  }
  if (e.key === 'Alt') {
    e.preventDefault();
    restaurarFondo();
  }
}

function copiar(e) {
  e.preventDefault();
  colorAleatorio();
}

function colorAleatorio() {
  let color = colores[Math.floor(Math.random() * colores.length)];
  if (color === '#000000') {
    const lista = colores.filter(c => c !== '#000000');
    color = lista[Math.floor(Math.random() * lista.length)];
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

inicio();


const REGEX_CORREO   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_NOMBRE   = /^[a-zA-ZàáâäèéêëìíîïòóôöùúûüñÑÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ' -]{2,50}$/;
const REGEX_TELEFONO = /^\+[0-9]{2}[0-9]{9}$/;
const MAX_NOMBRE  = 50;
const MAX_CORREO  = 100;
const MAX_ASUNTO  = 80;
const MAX_MENSAJE = 500;

function iniciarValidacion() {
  const form = document.getElementById('formulario');
  if (!form) return;

  const textarea = document.getElementById('mensaje');
  const contador = crearContador(textarea, MAX_MENSAJE);

  textarea.addEventListener('input', function() {
    actualizarContador(contador, textarea.value.length, MAX_MENSAJE);
  });

  document.getElementById('nombre').addEventListener('blur', function() { validarNombre(); });
  document.getElementById('correo').addEventListener('blur', function() { validarCorreo(); });
  document.getElementById('telefono').addEventListener('blur', function() { validarTelefono(); });
  document.getElementById('asunto').addEventListener('blur', function() { validarAsunto(); });
  document.getElementById('mensaje').addEventListener('blur', function() { validarMensaje(); });
  document.getElementById('categoria').addEventListener('change', function() { validarCategoria(); });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validarTodo()) {
      window.location.hash = 'modal-bienvenida';
      form.reset();
      actualizarContador(contador, 0, MAX_MENSAJE);
      limpiarErrores();
    }
  });

  const btnReset = form.querySelector('[type="reset"]');
  if (btnReset) {
    btnReset.addEventListener('click', function() {
      setTimeout(function() {
        actualizarContador(contador, 0, MAX_MENSAJE);
        limpiarErrores();
      }, 10);
    });
  }
}

function validarNombre() {
  var campo = document.getElementById('nombre');
  var valor = campo.value.trim();
  if (!valor) {
    return errorCampo(campo, 'err-nombre', 'El nombre es obligatorio.');
  }
  if (valor.length > MAX_NOMBRE) {
    return errorCampo(campo, 'err-nombre', 'Maximo ' + MAX_NOMBRE + ' caracteres.');
  }
  if (!REGEX_NOMBRE.test(valor)) {
    return errorCampo(campo, 'err-nombre', 'Solo letras y espacios. Minimo 2 caracteres.');
  }
  return okCampo(campo, 'err-nombre');
}

function validarCorreo() {
  var campo = document.getElementById('correo');
  var valor = campo.value.trim();
  if (!valor) {
    return errorCampo(campo, 'err-correo', 'El correo es obligatorio.');
  }
  if (valor.length > MAX_CORREO) {
    return errorCampo(campo, 'err-correo', 'Maximo ' + MAX_CORREO + ' caracteres.');
  }
  if (!REGEX_CORREO.test(valor)) {
    return errorCampo(campo, 'err-correo', 'Formato invalido. Ej: usuario@dominio.com');
  }
  return okCampo(campo, 'err-correo');
}

function validarTelefono() {
  var campo = document.getElementById('telefono');
  var valor = campo.value.trim();
  if (!valor) {
    return errorCampo(campo, 'err-telefono', 'El telefono es obligatorio.');
  }
  if (!REGEX_TELEFONO.test(valor)) {
    return errorCampo(campo, 'err-telefono', 'Formato: +34XXXXXXXXX');
  }
  return okCampo(campo, 'err-telefono');
}

function validarAsunto() {
  var campo = document.getElementById('asunto');
  var valor = campo.value.trim();
  if (!valor) {
    return errorCampo(campo, 'err-asunto', 'El asunto es obligatorio.');
  }
  if (valor.length > MAX_ASUNTO) {
    return errorCampo(campo, 'err-asunto', 'Maximo ' + MAX_ASUNTO + ' caracteres.');
  }
  return okCampo(campo, 'err-asunto');
}

function validarMensaje() {
  var campo = document.getElementById('mensaje');
  var valor = campo.value.trim();
  if (!valor) {
    return errorCampo(campo, 'err-mensaje', 'El mensaje es obligatorio.');
  }
  if (valor.length > MAX_MENSAJE) {
    return errorCampo(campo, 'err-mensaje', 'Maximo ' + MAX_MENSAJE + ' caracteres.');
  }
  return okCampo(campo, 'err-mensaje');
}

function validarCategoria() {
  var campo = document.getElementById('categoria');
  if (!campo.value) {
    campo.style.borderColor = '#cc0000';
    mostrarError('err-categoria', 'Selecciona una categoria.');
    return false;
  }
  campo.style.borderColor = '#2d7a2d';
  ocultarError('err-categoria');
  return true;
}

function validarTodo() {
  var resultados = [
    validarNombre(),
    validarCorreo(),
    validarTelefono(),
    validarAsunto(),
    validarMensaje(),
    validarCategoria()
  ];
  return resultados.every(function(r) { return r === true; });
}

function errorCampo(campo, id, mensaje) {
  campo.style.borderColor = '#cc0000';
  campo.style.background  = '#fff5f5';
  mostrarError(id, mensaje);
  return false;
}

function okCampo(campo, id) {
  campo.style.borderColor = '#2d7a2d';
  campo.style.background  = '#f5fff5';
  ocultarError(id);
  return true;
}

function mostrarError(id, mensaje) {
  var span = document.getElementById(id);
  if (!span) {
    span = document.createElement('span');
    span.id = id;
    span.className = 'val-error';
    var campo = document.getElementById(id.replace('err-', ''));
    if (campo) {
      campo.insertAdjacentElement('afterend', span);
    }
  }
  span.textContent = mensaje;
  span.style.display = 'block';
}

function ocultarError(id) {
  var span = document.getElementById(id);
  if (span) {
    span.style.display = 'none';
  }
}

function limpiarErrores() {
  var campos = ['nombre', 'correo', 'telefono', 'asunto', 'mensaje', 'categoria'];
  for (var i = 0; i < campos.length; i++) {
    var campo = document.getElementById(campos[i]);
    if (campo) {
      campo.style.borderColor = '';
      campo.style.background  = '';
    }
    ocultarError('err-' + campos[i]);
  }
}

function crearContador(textarea, max) {
  var span = document.createElement('span');
  span.className = 'val-comptador';
  span.textContent = '0 / ' + max + ' caracteres';
  textarea.insertAdjacentElement('afterend', span);
  return span;
}

function actualizarContador(span, len, max) {
  span.textContent = len + ' / ' + max + ' caracteres';
  if (len >= max) {
    span.style.color = '#cc0000';
    span.style.fontWeight = 'bold';
  } else if (len >= max * 0.8) {
    span.style.color = '#b85c00';
    span.style.fontWeight = 'bold';
  } else {
    span.style.color = '#555';
    span.style.fontWeight = 'normal';
  }
}


const MS_POR_SLIDE = 4000;
const AVATARES = ['⚔️', '🏹', '💎', '🌾', '🔥', '🏰', '🧪', '🛡️', '🎯', '🪓', '🧱', '🌙'];

var comentariosGuardados = JSON.parse(localStorage.getItem('mc_comentarios') || '[]');
var sliderIndex = 0;
var sliderTimer = null;

function iniciarSlider() {
  var track = document.getElementById('slider-track');
  if (!track) return;

  var slides = track.querySelectorAll('.comentario-slide');
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.minWidth = '100%';
  }

  for (var j = 0; j < comentariosGuardados.length; j++) {
    agregarSlide(comentariosGuardados[j]);
  }

  arrancarSlider();
}

function arrancarSlider() {
  if (sliderTimer) {
    clearInterval(sliderTimer);
  }
  sliderIndex = 0;
  moverA(0, false);
  arrancarBarra();
  sliderTimer = setInterval(avanzarSlide, MS_POR_SLIDE);
}

function avanzarSlide() {
  var track = document.getElementById('slider-track');
  var total = track.querySelectorAll('.comentario-slide').length;
  sliderIndex = (sliderIndex + 1) % total;
  moverA(sliderIndex, true);
  arrancarBarra();
}

function moverA(index, animado) {
  var track = document.getElementById('slider-track');
  if (!track) return;
  if (animado) {
    track.style.transition = 'transform 0.45s ease-in-out';
  } else {
    track.style.transition = 'none';
  }
  track.style.transform = 'translateX(-' + (index * 100) + '%)';
}

function arrancarBarra() {
  var barra = document.getElementById('slider-barra');
  if (!barra) return;
  barra.style.transition = 'none';
  barra.style.width = '0%';
  barra.offsetHeight;
  barra.style.transition = 'width ' + MS_POR_SLIDE + 'ms linear';
  barra.style.width = '100%';
}

function agregarSlide(comentario) {
  var track = document.getElementById('slider-track');
  if (!track) return;

  var slide = document.createElement('div');
  slide.className = 'comentario-slide comentario-nuevo';
  slide.style.minWidth = '100%';
  slide.innerHTML =
    '<div class="comentario-header">' +
      '<div class="comentario-avatar">' + comentario.avatar + '</div>' +
      '<div>' +
        '<div class="comentario-autor">' + escapar(comentario.nombre) + '</div>' +
        '<div class="comentario-estrellas">' + estrellas(comentario.estrellas) + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="comentario-texto">"' + escapar(comentario.texto) + '"</div>';

  track.appendChild(slide);
}


function iniciarFormComentario() {
  var form       = document.getElementById('form-comentario');
  var textarea   = document.getElementById('com-texto');
  var contador   = document.getElementById('com-comptador');
  var btnLimpiar = document.getElementById('btn-limpiar-com');

  if (!form) return;

  textarea.addEventListener('input', function() {
    var len = textarea.value.length;
    contador.textContent = len + ' / 200 caracteres';
    if (len >= 200) {
      contador.style.color = '#cc0000';
      contador.style.fontWeight = 'bold';
    } else if (len >= 160) {
      contador.style.color = '#b85c00';
      contador.style.fontWeight = 'bold';
    } else {
      contador.style.color = '#555';
      contador.style.fontWeight = 'normal';
    }
  });

  btnLimpiar.addEventListener('click', function() {
    form.reset();
    contador.textContent = '0 / 200 caracteres';
    contador.style.color = '#555';
    contador.style.fontWeight = 'normal';
    limpiarErrCom();
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validarFormCom()) return;

    var nuevo = {
      id:        Date.now(),
      nombre:    document.getElementById('com-nombre').value.trim(),
      texto:     textarea.value.trim(),
      estrellas: parseInt(document.querySelector('input[name="com-estrellas"]:checked').value),
      avatar:    AVATARES[Math.floor(Math.random() * AVATARES.length)]
    };

    comentariosGuardados.push(nuevo);
    localStorage.setItem('mc_comentarios', JSON.stringify(comentariosGuardados));

    agregarSlide(nuevo);

    var track = document.getElementById('slider-track');
    var total = track.querySelectorAll('.comentario-slide').length;
    sliderIndex = total - 1;

    if (sliderTimer) {
      clearInterval(sliderTimer);
    }
    moverA(sliderIndex, true);
    arrancarBarra();
    sliderTimer = setInterval(avanzarSlide, MS_POR_SLIDE);

    form.reset();
    contador.textContent = '0 / 200 caracteres';
    contador.style.color = '#555';
    contador.style.fontWeight = 'normal';
    limpiarErrCom();
    mostrarConfirmacion();
  });
}

function validarFormCom() {
  var ok       = true;
  var nombre   = document.getElementById('com-nombre').value.trim();
  var texto    = document.getElementById('com-texto').value.trim();
  var estrella = document.querySelector('input[name="com-estrellas"]:checked');

  if (nombre.length < 2) {
    mostrarErrCom('err-com-nombre', 'El nombre es obligatorio (min. 2 caracteres).');
    ok = false;
  } else {
    ocultarErrCom('err-com-nombre');
  }

  if (texto.length < 5) {
    mostrarErrCom('err-com-texto', 'El comentario es obligatorio (min. 5 caracteres).');
    ok = false;
  } else if (texto.length > 200) {
    mostrarErrCom('err-com-texto', 'Maximo 200 caracteres.');
    ok = false;
  } else {
    ocultarErrCom('err-com-texto');
  }

  if (!estrella) {
    mostrarErrCom('err-com-estrellas', 'Selecciona una valoracion.');
    ok = false;
  } else {
    ocultarErrCom('err-com-estrellas');
  }

  return ok;
}

function mostrarErrCom(id, mensaje) {
  var span = document.getElementById(id);
  if (span) {
    span.textContent = mensaje;
    span.style.display = 'block';
  }
}

function ocultarErrCom(id) {
  var span = document.getElementById(id);
  if (span) {
    span.textContent = '';
    span.style.display = 'none';
  }
}

function limpiarErrCom() {
  ocultarErrCom('err-com-nombre');
  ocultarErrCom('err-com-texto');
  ocultarErrCom('err-com-estrellas');
}

function mostrarConfirmacion() {
  var caja = document.getElementById('caja-nuevo-comentario');
  if (!caja) return;
  var msg = document.createElement('div');
  msg.textContent = '✅ ¡Comentario publicado!';
  msg.style.cssText = 'color:#2d7a2d;font-weight:bold;text-align:center;padding:0.5rem;font-family:monospace;';
  caja.querySelector('.info-contenido').prepend(msg);
  setTimeout(function() { msg.remove(); }, 2500);
}

function estrellas(n) {
  var llenas = '★'.repeat(n);
  var vacias = '☆'.repeat(5 - n);
  return llenas + vacias;
}

function escapar(str) {
  var resultado = String(str);
  resultado = resultado.replace(/&/g, '&amp;');
  resultado = resultado.replace(/</g, '&lt;');
  resultado = resultado.replace(/>/g, '&gt;');
  resultado = resultado.replace(/"/g, '&quot;');
  resultado = resultado.replace(/'/g, '&#39;');
  return resultado;
}