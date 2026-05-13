// Tiempo entre slides
let tiempo = 4000;

// Emojis aleatorios
let avatares = ['⚔️', '🏹', '💎', '🔥', '🏰'];

let slideActual = 0;
let timer;

// Array JSON inicial
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

// Array principal
let mensajes = [];

// ---------------- CLASE ----------------

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

// Iniciar cuando cargue la página
document.addEventListener('DOMContentLoaded', iniciar);

function iniciar() {
  cargarMensajesIniciales();
  iniciarSlider();
  iniciarFormulario();
}

let modal = document.getElementById("modal-comentario");
let abrir = document.getElementById("abrir-comentario");
let cerrar = document.getElementById("cerrar-comentario");

function abrirModal(evt) {
    evt.preventDefault();
    modal.style.display = "flex";
}

function cerrarModal(e) {
    if (e) e.preventDefault();
    modal.style.display = "none";
}

abrir.addEventListener("click", abrirModal);
cerrar.addEventListener("click", cerrarModal);

// ---------------- SLIDES ----------------

function renderizarSlides() {

  let track = document.getElementById('slider-track');

  track.innerHTML = '';

  mensajes.forEach(function (m, index) {

    let avatar = avatares[Math.floor(Math.random() * avatares.length)];

    let estrellasTexto = '';

    function generarEstrellas() {
      for (let i = 0; i < m.estrellas; i++) {
        estrellasTexto += '★';
      }
    }

    generarEstrellas();

    track.innerHTML +=
      '<div class="comentario-slide">' +
      '<button onclick="eliminarMensaje(' + index + ')" style="float:right;"></button>' +
      '<h3>' + avatar + ' ' + m.nombre + '</h3>' +
      '<p>' + estrellasTexto + '</p>' +
      '<p>"' + m.mensaje + '"</p>' +
      '</div>';
  });
}

// ---------------- CARGAR JSON ----------------

function cargarMensajesIniciales() {

  function cargar() {
    mensajesJSON.forEach(function (m) {

      let nuevo = new Missatge(
        m.nombre,
        m.edad,
        m.correo,
        m.asunto,
        m.mensaje,
        m.estrellas
      );

      mensajes.push(nuevo);
    });

    renderizarSlides();
  }

  cargar();
}

// ---------------- SLIDER ----------------

function iniciarSlider() {

  moverBarra();

  function iniciar() {
    timer = setInterval(siguienteSlide, tiempo);
  }

  iniciar();
}

function siguienteSlide() {

  let slides = document.querySelectorAll('.comentario-slide');

  slideActual++;

  if (slideActual >= slides.length) {
    slideActual = 0;
  }

  moverSlide(slideActual);
  moverBarra();
}

function moverSlide(num) {

  let track = document.getElementById('slider-track');

  track.style.transform =
    'translateX(-' + (num * 100) + '%)';
}

// ---------------- BARRA ----------------

function moverBarra() {

  let barra = document.getElementById('slider-barra');

  function resetBarra() {
    barra.style.transition = 'none';
    barra.style.width = '0%';
    barra.offsetWidth;
  }

  function animarBarra() {
    barra.style.transition =
      'width ' + tiempo + 'ms linear';
    barra.style.width = '100%';
  }

  resetBarra();
  animarBarra();
}

// ---------------- FORMULARIO ----------------

function iniciarFormulario() {

  let form = document.getElementById('form-comentario');

  form.addEventListener('submit', function (e) {

    e.preventDefault();

    let nombre = document.getElementById('com-nombre').value;
    let texto = document.getElementById('com-texto').value;
    let estrellas = document.querySelector('input[name="com-estrellas"]:checked');

    function validar() {

      if (nombre.length < 2) {
        alert('Escribe un nombre');
        return false;
      }

      if (texto.length < 5) {
        alert('Escribe un comentario');
        return false;
      }

      if (!estrellas) {
        alert('Selecciona estrellas');
        return false;
      }

      return true;
    }

    if (!validar()) return;

    function crearMensaje() {
      let numeroconvertido = parseInt(estrellas.value);

      return new Missatge(
        nombre,
        18,
        'nuevo@gmail.com',
        'Comentario',
        texto,
        numeroconvertido
      );
    }

    mensajes.push(crearMensaje());

    renderizarSlides();

    clearInterval(timer);

    moverBarra();

    function reiniciarSlider() {
      timer = setInterval(siguienteSlide, tiempo);
    }

    reiniciarSlider();

    form.reset();

    alert('Comentario añadido');

    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  });
}

// ---------------- LIMPIAR ----------------

let btnLimpiar = document.getElementById("btn-limpiar-com");

function eliminarTodo() {
  document.getElementById("form-comentario").reset();
}

btnLimpiar.addEventListener("click", eliminarTodo);

// ---------------- CREAR SLIDE ----------------

function crearSlide(nombre, texto, estrellas) {

  function crear() {

    let slide = document.createElement('div');

    slide.className = 'comentario-slide';

    let avatar = avatares[Math.floor(Math.random() * avatares.length)];

    let estrellasTexto = '';

    function build() {
      for (let i = 0; i < estrellas; i++) {
        estrellasTexto += '★';
      }
    }

    build();

    slide.innerHTML =
      '<h3>' + avatar + ' ' + nombre + '</h3>' +
      '<p>' + estrellasTexto + '</p>' +
      '<p>"' + texto + '"</p>';

    document.getElementById('slider-track').appendChild(slide);

    let slides = document.querySelectorAll('.comentario-slide');

    slideActual = slides.length - 1;

    moverSlide(slideActual);
  }

  crear();
}

// ---------------- MOSTRAR MENSAJES ----------------

function mostrarMensajes() {

  let contenedor = document.getElementById('lista-mensajes');

  if (!contenedor) return;

  function render() {
    contenedor.innerHTML = '';
    mensajes.forEach(function (m, index) {
      contenedor.innerHTML +=
        '<div class="mensaje-card">' +
        '<h3>' + m.nombre + '</h3>' +
        '<p><strong>Edad:</strong> ' + m.edad + '</p>' +
        '<p><strong>Email:</strong> ' + m.correo + '</p>' +
        '<p><strong>Asunto:</strong> ' + m.asunto + '</p>' +
        '<p>' + m.mensaje + '</p>' +
        '<button onclick="eliminarMensaje(' + index + ')">❌ Eliminar</button>' +
        '</div>';
    });
  }

  render();
}

// ---------------- ELIMINAR ----------------

function eliminarMensaje(index) {

  function borrar() {
    mensajes.splice(index, 1);

    if (slideActual >= mensajes.length) {
      slideActual = 0;
    }

    renderizarSlides();
    moverSlide(slideActual);
  }

  borrar();
}