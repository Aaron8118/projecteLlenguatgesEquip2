function crearAviso(colorFondo, colorBorde) {

    let nombrePagina = "MINECRAFT";
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "80px";
    div.style.left = "20px";
    div.style.background = colorFondo;
    div.style.color = "white";
    div.style.padding = "15px";
    div.style.border = "2px solid " + colorBorde;
    div.style.fontFamily = "monospace";
    div.style.zIndex = "9999";
    div.style.boxShadow = "0 0 10px black";

    //div donde esta el saludo
    div.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>¡Has entrado a ${nombrePagina}!</span>
            <span id="cerrar" style="cursor:pointer;margin-left:10px;">✖</span>
        </div>
    `;

    document.body.appendChild(div);

    avisoActual = div;

    let botonCerrar = document.getElementById("cerrar");

    botonCerrar.addEventListener("click", cerrarAvisoPagina);
}

let avisoActual = null;

//para cerrar el aviso de la pagina de arriba
function cerrarAvisoPagina() {

    if (avisoActual) {

        document.body.removeChild(avisoActual);

        avisoActual = null;
    }
}

//funcion inicio para empezar y para crear aviso con el color
function inicio() {
    crearAviso("#1e1e2e", "#55aa55");
}

window.addEventListener("load", inicio);