let suma = 0;
let audioActual = null;

function inicio() {
    let audios = document.querySelectorAll('audio[id$="_sonido"]');
    for (let i = 0; i < audios.length; i++) {
        audios[i].addEventListener('ended', function() {
            suma = 0;
            audioActual = null;
        });
    }

    let botones = document.querySelectorAll('button[data-sonido]');
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', function() {
            reproducirSonido(this.dataset.sonido);
        });
    }
}

function reproducirSonido(id) {
    if (suma === 1 && audioActual !== null) {
        audioActual.pause();
        audioActual.currentTime = 0;
    }
    let audio = document.getElementById(id);
    audio.play();
    suma = 1;
    audioActual = audio;
}

window.addEventListener('load', inicio);