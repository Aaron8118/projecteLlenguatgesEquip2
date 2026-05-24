//variables para usar
let body = document.body;
let contactoBloque = document.getElementsByClassName("contacto");
let contacto = contactoBloque[0];

//array de colores (pd: equipo no se me ocurren mas en ingles)
let coloreselec = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white'];
function cambiarColor(e) {
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        let colorAleatorio = coloreselec[Math.floor(Math.random() * 7)];
        body.style.backgroundColor = colorAleatorio;
        body.style.backgroundImage = "none";
        contacto.style.backgroundImage = "none";
        contacto.style.backgroundColor = colorAleatorio;
    }

    if (e.key === "Alt") {
        body.style.backgroundColor = "";
        body.style.backgroundImage = "";
        contacto.style.backgroundImage = "";
        contacto.style.backgroundColor = "";
    }
}

//funcion iicio para llamar
function inicio() {
    window.addEventListener("keydown", cambiarColor);
}

window.addEventListener("load", inicio);