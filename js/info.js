//dos avisos que saldran por la pantalla
let avisos = [
    {
        titulo: "⌨️ Abrir Terminal",
        msg: "Pulsa ALT + T para abrir la terminal",
        txt: "Entendido →"
    },
    {
        titulo: "⛏️ Prueba el Juego Real",
        msg: "Juega Minecraft Offline ahora",
        link: "./juego/minecraftEntero/Client/index.html",
        txt: "Jugar Ahora →"
    },
    {
        titulo: "🏰 Modo Creativo",
        msg: "Construye sin límites",
        link: "./juego/minecraftEntero/Client/structureCreator.html",
        txt: "Explorar →"
    }
];

let activo1 = null;
let x = 0;
let y = 0;
let mov1 = false;
let cajaActual = null;

//random el sitio donde saldra
function ponerPos(el) {
    let w1 = innerWidth - el.offsetWidth - 20;
    let h1 = innerHeight - el.offsetHeight - 20;

    el.style.left = Math.random() * w1 + "px";
    el.style.top = Math.random() * h1 + "px";
}

function mover(el) {
    cajaActual = el;
    // addEventListener en vez de onmousemove/onmouseup para no machacar otros listeners de la página
    el.addEventListener("mousedown", empezarMover);
    document.addEventListener("mousemove", moverPorLaPantalla);
    document.addEventListener("mouseup", soltarCaja);

    el.style.cursor = "grab";
}

// no mover si se pulsa la X o un linkDentro
function empezarMover(evnt) {
    mov1 = true;
    x = evnt.clientX - cajaActual.offsetLeft;
    y = evnt.clientY - cajaActual.offsetTop;

    cajaActual.style.cursor = "grabbing";
}

//para mover la caja arrastrandola
function moverPorLaPantalla(e) {
    if (!mov1) {
        return;
    }

    cajaActual.style.left = e.clientX - x + "px";
    cajaActual.style.top = e.clientY - y + "px";
}

function soltarCaja() {
    if (mov1) {
        mov1 = false;
        cajaActual.style.cursor = "grab";
    }
}

function cerrarAviso() {
    if (activo1) {
        activo1.remove();
        activo1 = null;
    }
}

function borrarAutomatico() {
    if (activo1 && activo1.parentNode) {
        activo1.remove();
        activo1 = null;
    }
}

//para cerrar el aviso y parar la propagacion (se nos ponia en blanco la imagen por el propagation)
function tancarAviso(vt) {
    vt.stopPropagation();
    vt.preventDefault();

    cerrarAviso();
}

//para mostrar el aviso
function mostraravisos(avt) {
    let datos;

    if (avt) {
        datos = avt;
    } else {
        datos = avisos[Math.floor(Math.random() * avisos.length)];
    }
    if (!avt && activo1) {
        setTimeout(mostraravisos, 5000);
        return;
    }

    let caja = document.createElement("div");

    //estilos para la caja
    caja.style.position = "fixed";
    caja.style.width = "320px";
    caja.style.minHeight = "100px";
    caja.style.background = "#1e1e2e";
    caja.style.border = "3px solid #55aa55";
    caja.style.color = "white";
    caja.style.padding = "16px";
    caja.style.zIndex = "9999";
    caja.style.boxShadow = "0 0 10px black";

    let cabecera1 = document.createElement("div");
    cabecera1.style.display = "flex";
    cabecera1.style.justifyContent = "space-between";

    let titulo = document.createElement("b");
    titulo.textContent = datos.titulo;

    let cerrar = document.createElement("span");
    cerrar.textContent = "✖";
    cerrar.style.cursor = "pointer";

    cerrar.addEventListener("click", tancarAviso);

    cabecera1.appendChild(titulo);
    cabecera1.appendChild(cerrar);

    let msg = document.createElement("p");
    msg.textContent = datos.msg;

    //crear link de dentrok
    let linkDentro = document.createElement("a");

    if (datos.link) {
        linkDentro.href = datos.link;
        linkDentro.target = "_blank";
    }

    linkDentro.textContent = datos.txt;
    linkDentro.style.color = "#00ffaa";
    linkDentro.style.textDecoration = "none";

    caja.appendChild(cabecera1);
    caja.appendChild(msg);
    caja.appendChild(linkDentro);

    document.body.appendChild(caja);

    ponerPos(caja);
    mover(caja);

    activo1 = caja;
    setTimeout(borrarAutomatico, 15000);

    if (!avt) {
        setTimeout(mostraravisos, 5000);
    }
}

//esto es para iniciar Avisos
function inicio() {
    setTimeout(mostrarPrimero, 2000);
}

//para mostrar el primer aviso cuando entras avt los 5 segundos (asi raul lo ve el primero)
function mostrarPrimero() {
    mostraravisos({
        titulo: "⌨️ Abrir Terminal",
        msg: "Pulsa ALT + T para abrir la terminal",
        txt: "Entendido →"
    });

    setTimeout(mostraravisos, 5000);
}

addEventListener("load", inicio);