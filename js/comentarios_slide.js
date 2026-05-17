// Tiempo entre slides
let tiempo = 4000;
let avatares = ['⚔️', '🏹', '💎', '🔥', '🏰'];
let slide1 = 0;
let timerTiempo;

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

function iniciar() {
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
    let m = mensajesJSON[i];
    let nuevo = new Missatge(
      m.nombre,
      m.edad,
      m.correo,
      m.asunto,
      m.mensaje,
      m.estrellasMarcadas
    );
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
    let m = mensajes[i];
    let avatar = avatares[Math.floor(Math.random() * avatares.length)];
    let estrellasTexto = '';

    for (let j = 0; j < m.estrellasMarcadas; j++) {
      estrellasTexto += '★';
    }

    track2.innerHTML +=
      '<div class="comentario-slide">' +
      '<button onclick="eliminarMensaje(' + i + ')" style="float:right;"></button>' +
      '<h3>' + avatar + ' ' + m.nombre + ' (' + m.edad + ')</h3>' +
      '<p><strong>Correo:</strong> ' + m.correo + '</p>' +
      '<p><strong>Asunto:</strong> ' + m.asunto + '</p>' +
      '<p>' + estrellasTexto + '</p>' +
      '<p>"' + m.mensaje + '"</p>' +
      '</div>';
  }
}

// Muestra los mensajes bajo el formulario
function mostrarMensajes() {
  let contenedor = document.getElementById('lista-mensajes');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  for (let i = 0; i < mensajes.length; i++) {
    let m = mensajes[i];

    contenedor.innerHTML +=
      '<div class="mensaje-card">' +
      '<h3>' + m.nombre + '</h3>' +
      '<p><strong>Edad:</strong> ' + m.edad + '</p>' +
      '<p><strong>Email:</strong> ' + m.correo + '</p>' +
      '<p><strong>Asunto:</strong> ' + m.asunto + '</p>' +
      '<p>' + m.mensaje + '</p>' +
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

// Valida y envia el formulario
function enviarFormulario(vnt) {
  vnt.preventDefault();

  let nombre = document.getElementById('com-nombre').value;
  let edad = document.getElementById('com-edad').value;
  let correo = document.getElementById('com-correo').value;
  let asunto = document.getElementById('com-asunto').value;
  let texto = document.getElementById('com-texto').value;
  let estrellasMarcadas = document.querySelector('input[name="com-estrellas"]:checked');

  if (
    nombre.length < 2 ||
    edad === '' ||
    correo === '' ||
    asunto === '' ||
    texto.length < 5 ||
    !estrellasMarcadas
  ) {
    alert('Rellena todos los campos correctamente');
    return;
  }

  let edadParseada = parseInt(edad);
  let nuevo = new Missatge(nombre,edadParseada,correo,asunto,texto,parseInt(estrellasMarcadas.value));

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

  if (slide1 >= slides.length) slide1 = 0;

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
window.addEventListener('load', iniciar);