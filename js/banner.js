
let slides;
let info1;
let info2;
let contenedor;

const total = 10;
let actual = 0;
let tiempointervalo = null;
const tiempo = 2000;

// Mueve el slider
function mover() {
    const pos = -(actual * 100);

    slides.style.transform = `translateX(${pos}%)`;
    info1.style.transform = `translateX(${pos}%)`;
    info2.style.transform = `translateX(${pos}%)`;
}

//para pasar al de despues (cabe destacar que la info la tenemos en el html porque seria una mala practica meterlo todo mediante appendChild)
function siguiente() {
    actual = (actual + 1) % total;
    mover();
}

//pasamos al de antes
function anterior() {
    actual = (actual - 1 + total) % total;
    mover();
}

//se inicia automatico
function iniciarAuto() {
    if (!tiempointervalo) {
        tiempointervalo = setInterval(siguiente, tiempo);
    }
}

//cuando te pones encima se para
function pararAuto() {
    clearInterval(tiempointervalo);
    tiempointervalo = null;
}

//para iniciar el slide
function iniciarSlider() {
    anterior();
    siguiente();
    iniciarAuto();
}

//eventos de movimiento del raton y todos los otros
function inicio() {
    slides = document.getElementById('slides');
    info1 = document.getElementById('info1-slides');
    info2 = document.getElementById('info2-slides');
    contenedor = document.getElementById('slider-container');

    iniciarSlider();

    contenedor.addEventListener('mouseenter', pararAuto);
    contenedor.addEventListener('mouseleave', iniciarAuto);
}

// Slider principal
window.addEventListener('load', inicio);
