// Slider principal
document.addEventListener('DOMContentLoaded', iniciar);

function iniciar() {

    const slides = document.getElementById('slides');
    const info1 = document.getElementById('info1-slides');
    const info2 = document.getElementById('info2-slides');
    const contenedor = document.getElementById('slider-container');

    const total = 10;
    let actual = 0;
    let timer = null;
    const tiempo = 2000;

    // Mueve el slider
    function mover() {
        const pos = -(actual * 100);

        slides.style.transform = `translateX(${pos}%)`;
        info1.style.transform = `translateX(${pos}%)`;
        info2.style.transform = `translateX(${pos}%)`;
    }

    //para pasar al de despues
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
        if (!timer) {
            timer = setInterval(siguiente, tiempo);
        }
    }

    //cuando te pones encima se para
    function pararAuto() {
        clearInterval(timer);
        timer = null;
    }

    //para iniciar el slide
    function iniciarSlider() {
        anterior();
        siguiente();
        iniciarAuto();
    }

    //eventos de movimiento del raton y todos los otros
    function inicio() {
        window.addEventListener('load', iniciarSlider);

        contenedor.addEventListener('mouseenter', pararAuto);
        contenedor.addEventListener('mouseleave', iniciarAuto);
    }

    inicio();
}