// Tiempo entre slides
let tiempo = 4000;
let emojisavatares = ['⚔️', '🏹', '💎', '🔥', '🏰'];
let slide1 = 0;
let timerTiempo;
let rxCorreoCom = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let rxNomCom = /^[a-zA-ZàáâäèéêëìíîïòóôöùúûüñÑÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ' -]{2,50}$/;
let rxEdadCom = /^(1[89]|[2-9][0-9]|100)$/;

// límites de caracteres comentarios
let maxNombre = 30;
let maxasunto = 80;
let maxcomentario = 200;

// array de mensajes iniciales
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

// array principal de objetos
let mensajes = [];

// clase Missatge
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

  let btnAbrir = document.getElementById('abrir-comentario');
  let btnCerrar = document.getElementById('cerrar-comentario');
  let formCom = document.getElementById('form-comentario');
  let btnLimpCom = document.getElementById('btn-limpiar-com');

  btnAbrir.addEventListener('click', abrirModal);
  btnCerrar.addEventListener('click', cerrarModal);
  formCom.addEventListener('submit', enviarFormulario);
  btnLimpCom.addEventListener('click', limpiarFormulario);
}

// abrir y cerrar modal
function abrirModal(e) {
  e.preventDefault();
  document.getElementById('modal-comentario').style.display = 'flex';
}

function cerrarModal(e) {
  if (e) e.preventDefault();
  document.getElementById('modal-comentario').style.display = 'none';
}

// carga el JSON y rellena el array
function cargar() {
  for (let i = 0; i < mensajesJSON.length; i++) {
    let m1 = mensajesJSON[i];
    let nuevo = new Missatge(m1.nombre, m1.edad, m1.correo, m1.asunto, m1.mensaje, m1.estrellasMarcadas);
    mensajes.push(nuevo);
  }

  renderSild();
  mostrarMensajes();
}

// renderiza los slides del slider
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

// muestra los mensajes bajo el formulario
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

// elimina un mensaje del array
function eliminarMensaje(index) {
  mensajes.splice(index, 1);

  if (slide1 >= mensajes.length) {
    slide1 = 0;
  }

  renderSild();
  mostrarMensajes();
  moverSlide(slide1);
}

// valida y envia el formulario
function enviarFormulario(vnt) {
  vnt.preventDefault();

  let camNom = document.getElementById('com-nombre');
  let años = document.getElementById('com-edad');
  let mail = document.getElementById('com-correo');
  let tema = document.getElementById('com-asunto');
  let texto = document.getElementById('com-texto');
  let estrellasMarcadas = document.querySelector('input[name="com-estrellas"]:checked');
  let valido = true;

  // validacion nombre
  let textoNomCom = camNom.value.trim();
  let errorNom = false;

  if (!textoNomCom) {
    errorNom = true;
  } else if (textoNomCom.length > maxNombre) {
    errorNom = true;
  } else if (!rxNomCom.test(textoNomCom)) {
    errorNom = true;
  }

  let bloqueError1 = document.getElementById('err-com-nombre');
  if (errorNom == true) {
    camNom.style.borderColor = '#cc0000';
    camNom.style.background = '#fff5f5';
    if (!textoNomCom) {
      bloqueError1.textContent = 'El nombre es obligatorio.';
    } else if (textoNomCom.length > maxNombre) {
      bloqueError1.textContent = 'Maximo ' + maxNombre + ' caracteres.';
    } else {
      bloqueError1.textContent = 'Solo letras y espacios. Minimo 2 caracteres.';
    }
    bloqueError1.style.display = 'block';
    valido = false;
  } else {
    camNom.style.borderColor = '#2d7a2d';
    camNom.style.background = '#f5fff5';
    bloqueError1.style.display = 'none';
  }

  // validacion edad
  let edadVal = años.value.trim();
  let falloEdad = false;

  if (!edadVal) {
    falloEdad = true;
  } else if (!rxEdadCom.test(edadVal)) {
    falloEdad = true;
  }

  let bloqueError2 = document.getElementById('err-com-edad');
  if (falloEdad == true) {
    años.style.borderColor = '#cc0000';
    años.style.background = '#fff5f5';
    if (!edadVal) {
      bloqueError2.textContent = 'La edad es obligatoria.';
    } else {
      bloqueError2.textContent = 'La edad debe estar entre 18 y 100.';
    }
    bloqueError2.style.display = 'block';
    valido = false;
  } else {
    años.style.borderColor = '#2d7a2d';
    años.style.background = '#f5fff5';
    bloqueError2.style.display = 'none';
  }

  // validacion correo
  let mailVal = mail.value.trim();
  let estadoMail = 'si';

  if (!mailVal) {
    estadoMail = 'no';
  } else if (!rxCorreoCom.test(mailVal)) {
    estadoMail = 'no';
  }

  let bloqueError3 = document.getElementById('err-com-correo');
  if (estadoMail == 'no') {
    mail.style.borderColor = '#cc0000';
    mail.style.background = '#fff5f5';
    if (!mailVal) {
      bloqueError3.textContent = 'El correo es obligatorio.';
    } else {
      bloqueError3.textContent = 'Formato invalido. Ej: usuario@dominio.com';
    }
    bloqueError3.style.display = 'block';
    valido = false;
  } else {
    mail.style.borderColor = '#2d7a2d';
    mail.style.background = '#f5fff5';
    bloqueError3.style.display = 'none';
  }

  // validacion asunto
  let temaVal = tema.value.trim();
  let estadoTema = 'si';

  if (!temaVal) {
    estadoTema = 'no';
  } else if (temaVal.length > maxasunto) {
    estadoTema = 'no';
  }

  let bloqueError4 = document.getElementById('err-com-asunto');
  if (estadoTema == 'no') {
    tema.style.borderColor = '#cc0000';
    tema.style.background = '#fff5f5';
    if (!temaVal) {
      bloqueError4.textContent = 'El asunto es obligatorio.';
    } else {
      bloqueError4.textContent = 'Maximo ' + maxasunto + ' caracteres.';
    }
    bloqueError4.style.display = 'block';
    valido = false;
  } else {
    tema.style.borderColor = '#2d7a2d';
    tema.style.background = '#f5fff5';
    bloqueError4.style.display = 'none';
  }

  // validacion mensaje
  let textoVal = texto.value.trim();
  let mensajeMal = false;

  if (!textoVal) {
    mensajeMal = true;
  } else if (textoVal.length < 5) {
    mensajeMal = true;
  } else if (textoVal.length > maxcomentario) {
    mensajeMal = true;
  }

  let bloqueError5 = document.getElementById('err-com-texto');
  if (mensajeMal == true) {
    texto.style.borderColor = '#cc0000';
    texto.style.background = '#fff5f5';
    if (!textoVal) {
      bloqueError5.textContent = 'El mensaje es obligatorio.';
    } else if (textoVal.length < 5) {
      bloqueError5.textContent = 'Minimo 5 caracteres.';
    } else {
      bloqueError5.textContent = 'Maximo ' + maxcomentario + ' caracteres.';
    }
    bloqueError5.style.display = 'block';
    valido = false;
  } else {
    texto.style.borderColor = '#2d7a2d';
    texto.style.background = '#f5fff5';
    bloqueError5.style.display = 'none';
  }

  // validacion estrellas
  let sinEstrellas = false;

  if (!estrellasMarcadas) {
    sinEstrellas = true;
  }

  let bloqueError6 = document.getElementById('err-com-estrellas');
  if (sinEstrellas == true) {
    if (bloqueError6) {
      bloqueError6.textContent = 'Selecciona una valoracion.';
      bloqueError6.style.display = 'block';
    }
    valido = false;
  } else {
    if (bloqueError6) {
      bloqueError6.style.display = 'none';
    }
  }

  if (!valido) {
    return;
  }

  let edadParseada = parseInt(años.value);
  let nuevo = new Missatge(camNom.value, edadParseada, mail.value, tema.value, texto.value, parseInt(estrellasMarcadas.value));
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

// limpia el formulario y borra errores
function limpiarFormulario() {
  document.getElementById('form-comentario').reset();

  let campos = ['com-nombre', 'com-edad', 'com-correo', 'com-asunto', 'com-texto'];
  let errores = ['err-com-nombre', 'err-com-edad', 'err-com-correo', 'err-com-asunto', 'err-com-texto', 'err-com-estrellas'];

  for (let i = 0; i < campos.length; i++) {
    let campo = document.getElementById(campos[i]);
    campo.style.borderColor = '';
    campo.style.background = '';
  }

  for (let i = 0; i < errores.length; i++) {
    let span = document.getElementById(errores[i]);
    if (span) {
      span.textContent = '';
      span.style.display = 'none';
    }
  }
}

// avanza al siguiente slide
function siguienteSlide() {
  let slides = document.querySelectorAll('.comentario-slide');
  slide1++;

  if (slide1 >= slides.length) {
    slide1 = 0;
  }

  moverSlide(slide1);
  moverBarra();
}

// mueve el track al slide indicado
function moverSlide(num) {
  document.getElementById('slider-track').style.transform =
    'translateX(-' + (num * 100) + '%)';
}

// anima la barra de progreso
function moverBarra() {
  let barra = document.getElementById('slider-barra');
  barra.style.transition = 'none';
  barra.style.width = '0%';
  barra.offsetWidth;
  barra.style.transition = 'width ' + tiempo + 'ms linear';
  barra.style.width = '100%';
}

// evento de carga
window.addEventListener('load', inicio);