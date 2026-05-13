// Tiempo entre slides
let tiempo = 4000;

// Emojis aleatorios
let avatares = ['⚔️', '🏹', '💎', '🔥', '🏰'];

let slideActual = 0;
let timer;

// Iniciar cuando cargue la página
document.addEventListener('DOMContentLoaded', iniciar);

function iniciar() {
  iniciarSlider();
  iniciarFormulario();
}

// ---------------- SLIDER ----------------

function iniciarSlider() {

  // Iniciar barra
  moverBarra();

  timer = setInterval(function () {
    siguienteSlide();
  }, tiempo);
}

function siguienteSlide() {
  let slides = document.querySelectorAll('.comentario-slide');

  slideActual++;

  if (slideActual >= slides.length) {
    slideActual = 0;
  }

  moverSlide(slideActual);

  // Reiniciar barra
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

  // Reiniciar
  barra.style.transition = 'none';
  barra.style.width = '0%';

  // Truco para actualizar
  barra.offsetWidth;

  // Animación
  barra.style.transition =
    'width ' + tiempo + 'ms linear';

  barra.style.width = '100%';
}

// ---------------- FORMULARIO ----------------

function iniciarFormulario() {

  let form = document.getElementById('form-comentario');

  form.addEventListener('submit', function (e) {

    e.preventDefault();

    let nombre =
      document.getElementById('com-nombre').value;

    let texto =
      document.getElementById('com-texto').value;

    let estrellas = document.querySelector(
      'input[name="com-estrellas"]:checked'
    );

    // Validaciones simples
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

    // Crear comentario
    let slide = document.createElement('div');

    slide.className = 'comentario-slide';

    // Emoji aleatorio
    let avatar =
      avatares[Math.floor(Math.random() * avatares.length)];

    // Crear estrellas
    let estrellasTexto = '';

    for (let i = 0; i < estrellas.value; i++) {
      estrellasTexto += '★';
    }

    slide.innerHTML =
      '<h3>' + avatar + ' ' + nombre + '</h3>' +
      '<p>' + estrellasTexto + '</p>' +
      '<p>"' + texto + '"</p>';

    // Añadir comentario
    document
      .getElementById('slider-track')
      .appendChild(slide);

    // Ir al nuevo slide
    let slides =
      document.querySelectorAll('.comentario-slide');

    slideActual = slides.length - 1;

    moverSlide(slideActual);

    // Reiniciar tiempo
    clearInterval(timer);

    moverBarra();

    timer = setInterval(function () {
      siguienteSlide();
    }, tiempo);

    // Limpiar formulario
    form.reset();

    alert('Comentario añadido');
  });
}