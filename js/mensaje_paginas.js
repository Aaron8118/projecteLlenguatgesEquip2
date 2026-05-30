let color1 = "#1e1e2e";
let color2 = "#55aa55";

//comporbar el nombre de la coloresnombresDataina para el color
function inicio() {
    let coloresnombresData = document.body.dataset.nombre;

    if (coloresnombresData === "MINECRAFT") {
       
        color1 = "#1e1e2e";
        color2 = "#55aa55";
    } else if (coloresnombresData === "BIOMAS") {
         color1 = "#1a3a2a";
        color2 = "#4caf50";
    } else if (coloresnombresData === "MOBS") {
        color1 = "#3a1a1a";
        color2 = "#e53935";
    } else if (coloresnombresData === "OBJETOS") {
        color1 = "#1a1a3a";
        color2 = "#5c6bc0";
    } else if (coloresnombresData === "EFECTOS") {
        color1 = "#2a1a3a";
        color2 = "#ab47bc";
    } else if (coloresnombresData === "CONTACTO") {
        color1 = "#1a2a3a";
        color2 = "#42a5f5";
    } else if (coloresnombresData === "MINECRAFT OFFLINE") {
        color1 = "#2a1a1a";
        color2 = "#ff7043";
    } else if (coloresnombresData === "MINECRAFT ONLINE") {
        color1 = "#1a2a2a";
        color2 = "#26c6da";
    }

    avisoporPantalla(color1, color2);
}

//para crear el aviso de arriba y sobreponerlo con el zzindex
function avisoporPantalla(colorFondo, colorBorde) {
    let nombrecoloresnombresDataina = document.body.dataset.nombre;    
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
            <span>¡Has entrado a ${nombrecoloresnombresDataina}!</span>
            <span id="cerrar" style="cursor:pointer;margin-left:10px;">✖</span>
        </div>
    `;

    document.body.appendChild(div);
    avisoprimero1 = div;
    let botonCerrar = document.getElementById("cerrar");

    botonCerrar.addEventListener("click", cerrarAvisocoloresnombresDataina);
}

let avisoprimero1 = null;

//para cerrar el aviso de la coloresnombresDataina de arriba
function cerrarAvisocoloresnombresDataina() {

    if (avisoprimero1) {
        document.body.removeChild(avisoprimero1);
        avisoprimero1 = null;
    }
}



window.addEventListener("load", inicio);