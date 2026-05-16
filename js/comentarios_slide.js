// Tiempo entre slides
let tiempo = 4000;
let avatares = ['⚔️', '🏹', '💎', '🔥', '🏰'];
let slideActual = 0;
let timer;

// Array de mensajes iniciales
let mensajesJSON = [
  {
    nombre: 'Steve',
    edad: 22,
    correo: 'steve@gmail.com',
    asunto: 'Bug',
    mensaje: 'Tengo un problema con creepers',
    estrellas: 5
  },
  {
    nombre: 'Alex',
    edad: 25,
    correo: 'alex@gmail.com',
    asunto: 'Ayuda',
    mensaje: 'No puedo acceder al servidor',
    estrellas: 4
  },
  {
    nombre: 'Notch',
    edad: 30,
    correo: 'notch@gmail.com',
    asunto: 'Idea',
    mensaje: 'Añadid más diamantes',
    estrellas: 5
  },
  {
    nombre: 'Herobrine',
    edad: 99,
    correo: 'hero@gmail.com',
    asunto: 'Error',
    mensaje: 'Aparezco en partidas',
    estrellas: 3
  },
  {
    nombre: 'Enderman',
    edad: 40,
    correo: 'end@gmail.com',
    asunto: 'Consulta',
    mensaje: 'No mires directamente',
    estrellas: 4
  }
];

// Array principal de objetos
let mensajes = [];

// Clase Missatge
class Missatge {
  constructor(nombre, edad, correo, asunto, mensaje, estrellas) {
    this.nombre = nombre;
    this.edad = edad;
    this.correo = correo;
    this.asunto = asunto;
    this.mensaje = mensaje;
    this.estrellas = estrellas;
  }
}

// Evento de carga
window.addEventListener('load', iniciar);

function iniciar() {
  cargar();
  moverBarra();
  timer = setInterval(siguienteSlide, tiempo);
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
    let nuevo = new Missatge(m.nombre, m.edad, m.correo, m.asunto, m.mensaje, m.estrellas);
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

    for (let j = 0; j < m.estrellas; j++) {
      estrellasTexto += '★';
    }

    track2.innerHTML += '<div class="comentario-slide">' +
      '<button onclick="eliminarMensaje(' + i + ')" style="float:right;"></button>' +
      '<h3>' + avatar + ' ' + m.nombre + '</h3>' +
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
  if (slideActual >= mensajes.length) slideActual = 0;
  renderSild();
  mostrarMensajes();
  moverSlide(slideActual);
}

// Valida y envia el formulario
function enviarFormulario(e) {
  e.preventDefault();

  let nombre    = document.getElementById('com-nombre').value;
  let texto     = document.getElementById('com-texto').value;
  let estrellas = document.querySelector('input[name="com-estrellas"]:checked');

  if (nombre.length < 2) {
    alert('Escribe un nombre');
    return;
  }
  if (texto.length < 5) {
    alert('Escribe un comentario');
    return;
  }
  if (!estrellas) {
    alert('Selecciona estrellas');
    return;
  }

  let nuevo = new Missatge(nombre, 18, 'nuevo@gmail.com', 'Comentario', texto, parseInt(estrellas.value));
  mensajes.push(nuevo);

  renderSild();
  mostrarMensajes();
  clearInterval(timer);
  timer = setInterval(siguienteSlide, tiempo);
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
  slideActual++;
  if (slideActual >= slides.length) slideActual = 0;
  moverSlide(slideActual);
  moverBarra();
}

// Mueve el track al slide indicado
function moverSlide(num) {
  document.getElementById('slider-track').style.transform = 'translateX(-' + (num * 100) + '%)';
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