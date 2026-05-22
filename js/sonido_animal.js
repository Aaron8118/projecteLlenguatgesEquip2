let suma = 0;
let audioActual = null;

function inicio() {
    let audios = document.querySelectorAll('so[id$="_sonido"]');
    for (let i = 0; i < audios.length; i++) {
        audios[i].addEventListener('ended', finalizarAudio);
    }
    let botones = document.querySelectorAll('button[data-sonido]');
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', pulsarBotonSonido);
    }
}

function finalizarAudio() {
    suma = 0;
    audioActual = null;
}

function pulsarBotonSonido() {
    reproducirSonido(this.dataset.sonido);
}

//para reproducir el sonido del animal
function reproducirSonido(id) {
    if (suma === 1 && audioActual !== null) {
        audioActual.pause();
        audioActual.currentTime = 0;
    }

    let so = document.getElementById(id);
    so.play();

    suma = 1;
    audioActual = so;
}

window.addEventListener('load', inicio);