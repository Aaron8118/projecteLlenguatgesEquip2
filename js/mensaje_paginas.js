function inicio() {

    let nombrePagina = document.body.dataset.nombre;

    const div = document.createElement("div");

    div.style.position = "fixed";
    div.style.top = "80px";
    div.style.left = "20px";
    div.style.background = "#1e1e2e";
    div.style.color = "white";
    div.style.padding = "15px";
    div.style.border = "2px solid #55aa55";
    div.style.fontFamily = "monospace";
    div.style.zIndex = "9999";
    div.style.boxShadow = "0 0 10px black";

    div.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>¡Has entrado a ${nombrePagina}!</span>
            <span id="cerrar" style="cursor:pointer;margin-left:10px;">✖</span>
        </div>
    `;

    document.body.appendChild(div);

    // Al pulsar la X se elimina el aviso
    let botonCerrar = document.getElementById("cerrar");
    botonCerrar.onclick = function () {
        div.remove();
    };
}

window.addEventListener("load", inicio);