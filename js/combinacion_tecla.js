//en el body para así poder afectar a todos los body de las paginas
let body = document.body;
let coloreselec = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white'];
function cambiarColor(e) {
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        let colorAleatorio = coloreselec[Math.floor(Math.random() * 7)];
        body.style.backgroundColor = colorAleatorio;
        body.style.backgroundImage = "none";
    }

    if (e.key === "Alt") {
        body.style.backgroundColor = "";
        body.style.backgroundImage = "";
    }
}

//funcion iicio para llamar
function inicio() {
    window.addEventListener("keydown", cambiarColor);
}

window.addEventListener("load", inicio);