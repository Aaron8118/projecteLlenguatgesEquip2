// letiables del reloj
let video = document.getElementById("relojVideo");
let modoDebug = false;
let horaDebugH = 0;
let horaDebugM = 0;
let horaDebugS = 0;

// letiables del chat
let chatOverlay = document.getElementById("chat-overlay");
let chatInput = document.getElementById("chat-input");
let mensajechat = document.getElementById("chat-messages");
let chatSend = document.getElementById("chat-send");
let autocomplete = document.getElementById("autocomplete");

let chatAbierto = false;

// Comandos disponibles
let comandos = [
    { cmd: "/help", desc: "Muestra todos los comandos disponibles" },
    { cmd: "/time set day 0", desc: "Pone el reloj a las 9:00 (mañana)" },
    { cmd: "/time set day 1", desc: "Pone el reloj a las 00:00 (medianoche)" },
    { cmd: "/time set noon", desc: "Pone el reloj a las 12:00 (mediodía)" },
    { cmd: "/time set night", desc: "Pone el reloj a las 21:00 (noche)" },
    { cmd: "/time set real", desc: "Vuelve a la hora del PC" },
    { cmd: "/clear", desc: "Limpia el chat" }
];

// SUMAR 1 SEGUNDO AL RELOJ DEBUG
function avanzarTiempoDebug() {

    horaDebugS++;

    if (horaDebugS >= 60) {
        horaDebugS = 0;
        horaDebugM++;
    }

    if (horaDebugM >= 60) {
        horaDebugM = 0;
        horaDebugH++;
    }

    if (horaDebugH >= 24) {
        horaDebugH = 0;
    }
}

// OBTENER HORA DEL PC
function obtenerHoraPC() {
    let ahora = new Date();

    return {
        h1: ahora.getHours(),
        m2: ahora.getMinutes(),
        s3: ahora.getSeconds()
    };
}

// Función para actualizar el reloj
function actualizarRelojSolar() {
    let h1, m2, s3, dia1, mes1, anyo1;
    if (modoDebug) {

        avanzarTiempoDebug();

        h1 = horaDebugH;
        m2 = horaDebugM;
        s3 = horaDebugS;

        let fecha = new Date();
        dia1 = fecha.getDate();
        mes1 = fecha.getMonth() + 1;
        anyo1 = fecha.getFullYear();

    } else {

        let horaSistemapc = obtenerHoraPC();

        h1 = horaSistemapc.h1;
        m2 = horaSistemapc.m2;
        s3 = horaSistemapc.s3;

        let fechaSistema = new Date();
        dia1 = fechaSistema.getDate();
        mes1 = fechaSistema.getMonth() + 1;
        anyo1 = fechaSistema.getFullYear();
    }

    if (isNaN(h1) || isNaN(m2) || isNaN(s3)) {
        return;
    }

    document.getElementById("hora-actual").textContent =
        ("0" + h1).slice(-2) + ":" +
        ("0" + m2).slice(-2) + ":" +
        ("0" + s3).slice(-2);

    // Muestra fecha
    document.getElementById("fecha-actual").textContent =
        dia1.toString().padStart(2, "0") + "/" +
        mes1.toString().padStart(2, "0") + "/" +
        anyo1.toString();

    // Fase del día
    let faseDia = "";

    if (h1 >= 6 && h1 < 12) {
        faseDia = "🌅 Mañana";
    } else if (h1 >= 12 && h1 < 18) {
        faseDia = "☀️ Tarde";
    } else if (h1 >= 18 && h1 < 21) {
        faseDia = "🌆 Atardecer";
    } else {
        faseDia = "🌙 Noche";
    }

    document.getElementById("info-dia").textContent = faseDia;

    let horaInvertida = (12 - h1 + 24) % 24;
    let segundosDia = horaInvertida * 3600 + (59 - m2) * 60 + (59 - s3);
    let progreso = segundosDia / 86400;

    if (video.duration) {
        video.currentTime = video.duration * progreso;
    }
}

// abrir y cerrar chat
function toggleChat() {

    chatAbierto = !chatAbierto;

    if (chatAbierto) {
        chatOverlay.style.display = "flex";
        chatInput.focus();
    } else {
        chatOverlay.style.display = "none";
        autocomplete.style.display = "none";
        chatInput.value = "";
    }
}

function mensajeparaterminal(textoMsg, tipoMsg) {

    if (!tipoMsg) {
        tipoMsg = "normal";
    }

    let cajaMensaje = document.createElement("div");

    cajaMensaje.className = "chat-message " + tipoMsg;
    cajaMensaje.textContent = textoMsg;

    mensajechat.appendChild(cajaMensaje);
    mensajechat.scrollTop = mensajechat.scrollHeight;
}

// ayuda
function mostrarAyuda() {

    mensajeparaterminal("=== COMANDOS DISPONIBLES ===", "system");

    for (let i = 0; i < comandos.length; i++) {
        mensajeparaterminal(comandos[i].cmd + " - " + comandos[i].desc, "info");
    }
}

// poner hora manual
function ponerHoraDebug(hh, mm, ss) {

    modoDebug = true;

    horaDebugH = hh;
    horaDebugM = mm;
    horaDebugS = ss;

    actualizarRelojSolar();
}

// volver a hora real del PC
function volverHoraReal() {
    modoDebug = false;
    actualizarRelojSolar();
}

// procesar comandos
function procesarComando(textoEntrada) {

    let partes = textoEntrada.trim().toLowerCase().split(" ");

    let cmd1 = partes[0];
    let cmd2 = partes[1];
    let valor1 = partes[2];
    let valor2 = partes[3];

    mensajeparaterminal("> " + textoEntrada, "normal");

    if (cmd1 === "/help") {
        mostrarAyuda();
    }

    else if (cmd1 === "/clear") {
        mensajechat.innerHTML = "";
        mensajeparaterminal("Chat limpiado", "success");
    }

    else if (cmd1 === "/time" && cmd2 === "set") {

        if (valor1 === "real") {
            volverHoraReal();
            mensajeparaterminal("⏰ Hora del PC activada", "success");
        }

        else if (valor1 === "day" && valor2 === "0") {
            ponerHoraDebug(9, 0, 0);
            mensajeparaterminal("☀️ 09:00 mañana", "success");
        }

        else if (valor1 === "day" && valor2 === "1") {
            ponerHoraDebug(0, 0, 0);
            mensajeparaterminal("🌙 00:00 medianoche", "success");
        }

        else if (valor1 === "noon") {
            ponerHoraDebug(12, 0, 0);
            mensajeparaterminal("☀️ 12:00 mediodía", "success");
        }

        else if (valor1 === "night") {
            ponerHoraDebug(21, 0, 0);
            mensajeparaterminal("🌙 21:00 noche", "success");
        }

        else {
            mensajeparaterminal("❌ comando incorrecto", "error");
        }
    }

    else {
        mensajeparaterminal("❌ desconocido", "error");
    }
}

// eventos
function teclaGlobal(e) {

    if (e.altKey && e.key === "t") {
        e.preventDefault();
        toggleChat();
    }

    if (chatAbierto && e.key === "Escape") {
        toggleChat();
    }
}

function botonEnviar() {

    let textoChat1 = chatInput.value.trim();

    if (textoChat1) {
        procesarComando(textoChat1);
        chatInput.value = "";
        autocomplete.style.display = "none";
    }
}

function teclaInputChat(e) {

    if (e.key === "Enter") {

        let textoEnter = chatInput.value.trim();

        if (textoEnter) {
            procesarComando(textoEnter);
            chatInput.value = "";
            autocomplete.style.display = "none";
        }
    }
}

function cargarVideo() {
    actualizarRelojSolar();
}

// inicializar todo
function inicio() {

    document.addEventListener("keydown", teclaGlobal);
    chatSend.addEventListener("click", botonEnviar);
    chatInput.addEventListener("keypress", teclaInputChat);
    video.addEventListener("loadedmetadata", cargarVideo);

    setInterval(actualizarRelojSolar, 1000);
    actualizarRelojSolar();
}

window.addEventListener("load", inicio);