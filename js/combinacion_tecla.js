// Seleccionem body, wrapper i main per canviar el fons a totes les pàgines
let body = document.body;
let wrapper = document.getElementById('wrapper');
let main = document.querySelector('main');
let coloreselec = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white'];
function cambiarColor(e) {
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        let colorAleatorio = coloreselec[Math.floor(Math.random() * 7)];
        body.style.backgroundColor = colorAleatorio;
        body.style.backgroundImage = "none";
        if (wrapper) {
            wrapper.style.backgroundColor = colorAleatorio;
            wrapper.style.backgroundImage = "none";
        }
        if (main) {
            main.style.backgroundColor = colorAleatorio;
            main.style.backgroundImage = "none";
        }
    }

    if (e.key === "Alt") {
        body.style.backgroundColor = "";
        body.style.backgroundImage = "";
        if (wrapper) {
            wrapper.style.backgroundColor = "";
            wrapper.style.backgroundImage = "";
        }
        if (main) {
            main.style.backgroundColor = "";
            main.style.backgroundImage = "";
        }
    }
}

//funcion inicio para llamar cuando pulsas la tecla
function inicio() {
    window.addEventListener("keydown", cambiarColor);
}

window.addEventListener("load", inicio);