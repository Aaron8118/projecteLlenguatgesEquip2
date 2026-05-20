// Tiempo entre slides
let tiempo = 4000;
let emojisavatares = ['⚔️', '🏹', '💎', '🔥', '🏰'];
let slide1 = 0;
let timerTiempo;
let rxCorreoCom = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let rxNomCom = /^[a-zA-ZàáâäèéêëìíîïòóôöùúûüñÑÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ' -]{2,50}$/;
let rxEdadCom = /^(1[89]|[2-9][0-9]|100)$/;

// Límites de caracteres comentarios
let maxNombre = 30;
let maxasunto = 80;
let maxcomentario = 200;

 // Array de mensajes iniciales
let mensajesJSON = [
  {
    nombre: 'Steve',
    edad: 22,
    correo: 'steve@gmail.com',
    asunto: 'Bug',
    mensaje: 'Tengo un problema con creepers',
    estrellasMarcadas: 5
  },
  {
    nombre: 'Alex',
    edad: 25,
    correo: 'alex@gmail.com',
    asunto: 'Ayuda',
    mensaje: 'No puedo acceder al servidor',
    estrellasMarcadas: 4
  },
  {
    nombre: 'Notch',
    edad: 30,
    correo: 'notch@gmail.com',
    asunto: 'Idea',
    mensaje: 'Añadid más diamantes',
    estrellasMarcadas: 5
  },
  {
    nombre: 'Herobrine',
    edad: 99,
    correo: 'hero@gmail.com',
    asunto: 'Error',
    mensaje: 'Aparezco en partidas',
    estrellasMarcadas: 3
  },
  {
    nombre: 'Enderman',
    edad: 40,
    correo: 'end@gmail.com',
    asunto: 'Consulta',
    mensaje: 'No mires directamente',
    estrellasMarcadas: 4
  }
];

  // Array principal de objetos
let mensajes = [];

 // Clase Missatge
class Missatge {
  constructor(nombre, edad, correo, asunto, mensaje, estrellasMarcadas) {
    this.nombre = nombre;
    this.edad = edad;
    this.correo = correo;
    this.asunto = asunto;
    this.mensaje = mensaje;
    this.estrellasMarcadas = estrellasMarcadas;
  }
}

function inicio() {
  cargar();
  moverBarra();
  timerTiempo = setInterval(siguienteSlide, tiempo);
  document.getElementById('abrir-comentario').addEventListener('click', abrirModal);
  document.getElementById('cerrar-comentario').addEventListener('click', cerrarModal);
  document.getElementById('form-comentario').addEventListener('submit', enviarFormulario);
  document.getElementById('btn-limpiar-com').addEventListener('click', limpiarFormulario);
}

// Abrir y cerrar modal
function abrirModal(e) {
  e.preventDefault();
  document.getElementById('modal-comentario').style.display = 'flex';
}

function cerrarModal(e) {
  if (e) e.preventDefault();
  document.getElementById('modal-comentario').style.display = 'none';
}

// Carga el JSON y rellena el array
function cargar() {
  for (let i = 0; i < mensajesJSON.length; i++) {
    let m1 = mensajesJSON[i];
    let nuevo = new Missatge(m1.nombre,m1.edad,m1.correo,m1.asunto,m1.mensaje,m1.estrellasMarcadas);
    mensajes.push(nuevo);
  }

  renderSild();
  mostrarMensajes();
}

// Renderiza los slides del slider
function renderSild() {
  let track2 = document.getElementById('slider-track');
  track2.innerHTML = '';

  for (let i = 0; i < mensajes.length; i++) {
    let m1 = mensajes[i];
    let avatar = emojisavatares[Math.floor(Math.random() * emojisavatares.length)];
    let estrellasTexto = '';

    for (let j = 0; j < m1.estrellasMarcadas; j++) {
      estrellasTexto += '★';
    }

    track2.innerHTML +=
      '<div class="comentario-slide">' +
      '<button onclick="eliminarMensaje(' + i + ')" style="float:right;"></button>' +
      '<h3>' + avatar + ' ' + m1.nombre + ' (' + m1.edad + ')</h3>' +
      '<p><strong>Correo:</strong> ' + m1.correo + '</p>' +
      '<p><strong>Asunto:</strong> ' + m1.asunto + '</p>' +
      '<p>' + estrellasTexto + '</p>' +
      '<p>"' + m1.mensaje + '"</p>' +
      '</div>';
  }
}

// Muestra los mensajes bajo el formulario
function mostrarMensajes() {
  let contenedor = document.getElementById('lista-mensajes');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  for (let i = 0; i < mensajes.length; i++) {
    let m1 = mensajes[i];

    contenedor.innerHTML +=
      '<div class="mensaje-card">' +
      '<h3>' + m1.nombre + '</h3>' +
      '<p><strong>Edad:</strong> ' + m1.edad + '</p>' +
      '<p><strong>Email:</strong> ' + m1.correo + '</p>' +
      '<p><strong>Asunto:</strong> ' + m1.asunto + '</p>' +
      '<p>' + m1.mensaje + '</p>' +
      '<button onclick="eliminarMensaje(' + i + ')">❌ Eliminar</button>' +
      '</div>';
  }
}

// Elimina un mensaje del array
function eliminarMensaje(index) {
  mensajes.splice(index, 1);

  if (slide1 >= mensajes.length) {
    slide1 = 0;
  }

  renderSild();
  mostrarMensajes();
  moverSlide(slide1);
}

// Muestra error en el modal de comentarios
function mostrarError(input1, id, msg) {
  input1.style.borderColor = '#cc0000';
  input1.style.background = '#fff5f5';
  let spanError = document.getElementById(id);
  if (spanError) {
    spanError.textContent = msg;
    spanError.style.display = 'block';
  }
}

// Limpia el error en el modal de comentarios
function comentariovalido(input1, id) {
  input1.style.borderColor = '#2d7a2d';
  input1.style.background = '#f5fff5';
  let spanOcultar = document.getElementById(id);
  if (spanOcultar) {
    spanOcultar.style.display = 'none';
  }
}

// Valida y envia el formulario
function enviarFormulario(vnt) {
  vnt.preventDefault();
  let comNombre = document.getElementById('com-nombre');
  let comEdad = document.getElementById('com-edad');
  let comCorreo = document.getElementById('com-correo');
  let comAsunto = document.getElementById('com-asunto');
  let comTexto = document.getElementById('com-texto');
  let estrellasMarcadas = document.querySelector('input[name="com-estrellas"]:checked');
  let valido = true;

  // Validacion nombre
  let textoNomCom = comNombre.value.trim();
  if (!textoNomCom) {
    mostrarError(comNombre, 'err-com-nombre', 'El nombre es obligatorio.');
    valido = false;
  } else if (textoNomCom.length > maxNombre) {
    mostrarError(comNombre, 'err-com-nombre', 'Maximo ' + maxNombre + ' caracteres.');
    valido = false;
  } else if (!rxNomCom.test(textoNomCom)) {
    mostrarError(comNombre, 'err-com-nombre', 'Solo letras y espacios. Minimo 2 caracteres.');
    valido = false;
  } else {
    comentariovalido(comNombre, 'err-com-nombre');
  }

  // Validacion edad
  let textoEdadCom = comEdad.value.trim();
  if (!textoEdadCom) {
    mostrarError(comEdad, 'err-com-edad', 'La edad es obligatoria.');
    valido = false;
  } else if (!rxEdadCom.test(textoEdadCom)) {
    mostrarError(comEdad, 'err-com-edad', 'La edad debe estar entre 18 y 100.');
    valido = false;
  } else {
    comentariovalido(comEdad, 'err-com-edad');
  }

  // Validacion correo
  let textoCorreoCom = comCorreo.value.trim();
  if (!textoCorreoCom) {
    mostrarError(comCorreo, 'err-com-correo', 'El correo es obligatorio.');
    valido = false;
  } else if (!rxCorreoCom.test(textoCorreoCom)) {
    mostrarError(comCorreo, 'err-com-correo', 'Formato invalido. Ej: usuario@dominio.com');
    valido = false;
  } else {
    comentariovalido(comCorreo, 'err-com-correo');
  }

  // Validacion asunto
  let textoAsuntoCom = comAsunto.value.trim();
  if (!textoAsuntoCom) {
    mostrarError(comAsunto, 'err-com-asunto', 'El asunto es obligatorio.');
    valido = false;
  } else if (textoAsuntoCom.length > maxasunto) {
    mostrarError(comAsunto, 'err-com-asunto', 'Maximo ' + maxasunto + ' caracteres.');
    valido = false;
  } else {
    comentariovalido(comAsunto, 'err-com-asunto');
  }

  // Validacion mensaje
  let textoMsgCom = comTexto.value.trim();
  if (!textoMsgCom) {
    mostrarError(comTexto, 'err-com-texto', 'El mensaje es obligatorio.');
    valido = false;
  } else if (textoMsgCom.length < 5) {
    mostrarError(comTexto, 'err-com-texto', 'Minimo 5 caracteres.');
    valido = false;
  } else if (textoMsgCom.length > maxcomentario) {
    errorostrarCom(comTexto, 'err-com-texto', 'Maximo ' + maxcomentario + ' caracteres.');
    valido = false;
  } else {
    comentariovalido(comTexto, 'err-com-texto');
  }

  // Validacion estrellas
  if (!estrellasMarcadas) {
    let spanEst = document.getElementById('err-com-estrellas');
    if (spanEst) {
      spanEst.textContent = 'Selecciona una valoracion.';
      spanEst.style.display = 'block';
    }
    valido = false;
  } else {
    let spanEst = document.getElementById('err-com-estrellas');
    if (spanEst) spanEst.style.display = 'none';
  }

  if (!valido) {
  return;
  }

  let edadParseada = parseInt(comEdad.value);
  let nuevo = new Missatge(comNombre.value,edadParseada,comCorreo.value,comAsunto.value,comTexto.value,parseInt(estrellasMarcadas.value));
  mensajes.push(nuevo);

  renderSild();
  mostrarMensajes();
  clearInterval(timerTiempo);
  timerTiempo = setInterval(siguienteSlide, tiempo);
  moverBarra();

  document.getElementById('form-comentario').reset();
  alert('Comentario añadido');
  cerrarModal();
}

// Limpia el formulario
function limpiarFormulario() {
  document.getElementById('form-comentario').reset();
}

// Avanza al siguiente slide
function siguienteSlide() {
  let slides = document.querySelectorAll('.comentario-slide');
  slide1++;

 if (slide1 >= slides.length) {
  slide1 = 0;
}
  moverSlide(slide1);
  moverBarra();
}

// Mueve el track al slide indicado
function moverSlide(num) {
  document.getElementById('slider-track').style.transform =
    'translateX(-' + (num * 100) + '%)';
}

// Anima la barra de progreso
function moverBarra() {
  let barra = document.getElementById('slider-barra');
  barra.style.transition = 'none';
  barra.style.width = '0%';
  barra.offsetWidth;
  barra.style.transition = 'width ' + tiempo + 'ms linear';
  barra.style.width = '100%';
}

// Evento de carga
window.addEventListener('load', inicio);