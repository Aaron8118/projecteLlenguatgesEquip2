let avisos = [
    {
        titulo: "⛏️ Prueba el Juego Real",
        msg: "Juega Minecraft Offline ahora",
        link: "./html/minecraftEntero/Client/index.html",
        txt: "Jugar Ahora →"
    },
    {
        titulo: "🏰 Modo Creativo",
        msg: "Construye sin límites",
        link: "./html/minecraftEntero/Client/structureCreator.html",
        txt: "Explorar →"
    }
];

let activo = null;

function ponerPos(el) {
    let w = innerWidth - el.offsetWidth - 20;
    let h = innerHeight - el.offsetHeight - 20;

    el.style.left = Math.random() * w + "px";
    el.style.top = Math.random() * h + "px";
}

function mover(el) {
    let x = 0;
    let y = 0;
    let mov = false;

    el.onmousedown = empezarMover;
    document.onmousemove = moverCaja;
    document.onmouseup = soltarCaja;

    function empezarMover(evnt) {
        mov = true;
        x = evnt.clientX - el.offsetLeft;
        y = evnt.clientY - el.offsetTop;
        el.style.cursor = "grabbing";
    }

    function moverCaja(e) {
        if (!mov) return;

        el.style.left = e.clientX - x + "px";
        el.style.top = e.clientY - y + "px";
    }

    function soltarCaja() {
        if (mov) {
            mov = false;
            el.style.cursor = "grab";
        }
    }

    el.style.cursor = "grab";
}

function cerrarAviso() {
    if (activo) {
        activo.remove();
        activo = null;
    }
}

function borrarAutomatico() {
    if (activo && activo.parentNode) {
        activo.remove();
        activo = null;
    }
}

function mostrarAviso(a) {
    let datos = a || avisos[Math.floor(Math.random() * avisos.length)];

    if (!a && activo) {
        setTimeout(mostrarAviso, 5000);
        return;
    }

    let caja = document.createElement("div");

    caja.style.position = "fixed";
    caja.style.width = "320px";
    caja.style.minHeight = "100px";
    caja.style.background = "#1e1e2e";
    caja.style.border = "3px solid #55aa55";
    caja.style.color = "white";
    caja.style.fontFamily = "monospace";
    caja.style.padding = "16px";
    caja.style.zIndex = "9999";
    caja.style.boxShadow = "0 0 10px black";

    let header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";

    let titulo = document.createElement("b");
    titulo.textContent = datos.titulo;

    let cerrar = document.createElement("span");
    cerrar.textContent = "✖";
    cerrar.style.cursor = "pointer";
    cerrar.onclick = cerrarAviso;

    header.appendChild(titulo);
    header.appendChild(cerrar);

    let msg = document.createElement("p");
    msg.textContent = datos.msg;

    let link = document.createElement("a");
    link.href = datos.link;
    link.target = "_blank";
    link.textContent = datos.txt;
    link.style.color = "#00ffaa";
    link.style.textDecoration = "none";

    caja.appendChild(header);
    caja.appendChild(msg);
    caja.appendChild(link);

    document.body.appendChild(caja);

    ponerPos(caja);
    mover(caja);

    activo = caja;

    setTimeout(borrarAutomatico, 15000);

    if (!a) {
        setTimeout(mostrarAviso, 5000);
    }
}

function iniciarAvisos() {
    setTimeout(mostrarPrimero, 2000);
}

function mostrarPrimero() {
    mostrarAviso({
        titulo: "⛏️ Prueba el Juego Real",
        msg: "Juega Minecraft Offline ahora",
        link: "./html/minecraftEntero/Client/index.html",
        txt: "Jugar Ahora →"
    });

    setTimeout(mostrarAviso, 5000);
}

addEventListener("load", iniciarAvisos);