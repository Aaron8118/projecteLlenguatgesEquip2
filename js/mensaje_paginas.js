//funcion inicio para empezar y para crear aviso con el color
function inicio() {
    avisoporPantalla("#1e1e2e", "#55aa55");
}

//para crear el aviso de arriba y sobreponerlo con el zzindex
function avisoporPantalla(colorFondo, colorBorde) {
    let nombrePagina = document.body.dataset.nombre;    
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
    avisoprimero1 = div;
    let botonCerrar = document.getElementById("cerrar");

    botonCerrar.addEventListener("click", cerrarAvisoPagina);
}

let avisoprimero1 = null;

//para cerrar el aviso de la pagina de arriba
function cerrarAvisoPagina() {

    if (avisoprimero1) {
        document.body.removeChild(avisoprimero1);
        avisoprimero1 = null;
    }
}



window.addEventListener("load", inicio);