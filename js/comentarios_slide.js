// Tiempo entre slides
let tiempo = 4000;
let slide1 = 0;
let timerTiempo;

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
      '<h3>' + avatar + ' ' + m1.nombre + ' (' +m1.edad + ')</h3>' +
      '<p><strong>Correo:</strong> ' + m1.correo + '</p>' +
      '<p><strong>Asunto:</strong> ' + m1.asunto + '</p>' +
      '<p>' + estrellasTexto + '</p>' +
      '<p>"' + m1.mensaje + '"</p>' +
      '</div>';
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

function inicio() {
  moverBarra();
  timerTiempo = setInterval(siguienteSlide, tiempo);
}

// evento de carga
window.addEventListener('load', inicio);
