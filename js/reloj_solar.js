// letiables del reloj
let video = document.getElementById("relojVideo");
let modoDebug = false;
let horaDebugH = 0;
let horaDebugM = 0;
let horaDebugS = 0;

// letiables del chat
let chatOverlay = document.getElementById("chat-overlay");
let chatInput = document.getElementById("chat-input");
let chatMessages = document.getElementById("chat-messages");
let chatSend = document.getElementById("chat-send");
let autocomplete = document.getElementById("autocomplete");

let chatAbierto = false;
let selectedIndex = -1;

// Comandos disponibles
let comandos = [
    { cmd: "/help", desc: "Muestra todos los comandos disponibles" },
    { cmd: "/time set day 0", desc: "Pone el reloj a las 9:00 (mañana)" },
    { cmd: "/time set day 1", desc: "Pone el reloj a las 00:00 (medianoche)" },
    { cmd: "/time set noon", desc: "Pone el reloj a las 12:00 (mediodía)" },
    { cmd: "/time set night", desc: "Pone el reloj a las 21:00 (noche)" },
    { cmd: "/time set real", desc: "Vuelve a la hora actual de España" },
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

// OBTENER HORA DE ESPAÑA SIN ERRORES
function obtenerHoraEspaña() {

    let ahora = new Date();

    let partes = new Intl.DateTimeFormat("es-ES", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).formatToParts(ahora);

    let h = 0;
    let m = 0;
    let s = 0;

    for (let i = 0; i < partes.length; i++) {
        if (partes[i].type === "hour") h = parseInt(partes[i].value);
        if (partes[i].type === "minute") m = parseInt(partes[i].value);
        if (partes[i].type === "second") s = parseInt(partes[i].value);
    }

    return { h: h, m: m, s: s };
}

// Función para actualizar el reloj
function actualizarRelojSolar() {

    let h, m, s;

    if (modoDebug) {

        avanzarTiempoDebug();

        h = horaDebugH;
        m = horaDebugM;
        s = horaDebugS;

    } else {

        let hora = obtenerHoraEspaña();
        h = hora.h;
        m = hora.m;
        s = hora.s;
    }

    if (isNaN(h) || isNaN(m) || isNaN(s)) return;

    document.getElementById("hora-actual").textContent =
        ("0" + h).slice(-2) + ":" +
        ("0" + m).slice(-2) + ":" +
        ("0" + s).slice(-2);

    let fase = "";

    if (h >= 6 && h < 12) fase = "🌅 Mañana";
    else if (h >= 12 && h < 18) fase = "☀️ Tarde";
    else if (h >= 18 && h < 21) fase = "🌆 Atardecer";
    else fase = "🌙 Noche";

    document.getElementById("info-dia").textContent = fase;

    let horaInvertida = (12 - h + 24) % 24;
    let segundosDia = horaInvertida * 3600 + (59 - m) * 60 + (59 - s);
    let progreso = segundosDia / 86400;

    if (video.duration) {
        video.currentTime = video.duration * progreso;
    }
}

// Funciones del Chat
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

function addMessage(texto, tipo) {

    if (!tipo) tipo = "normal";

    let msg = document.createElement("div");

    msg.className = "chat-message " + tipo;
    msg.textContent = texto;

    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function mostrarAyuda() {

    addMessage("=== COMANDOS DISPONIBLES ===", "system");

    for (let i = 0; i < comandos.length; i++) {
        addMessage(comandos[i].cmd + " - " + comandos[i].desc, "info");
    }
}

function setHoraForzada(horas, minutos, segundos) {

    modoDebug = true;

    horaDebugH = horas;
    horaDebugM = minutos;
    horaDebugS = segundos;

    actualizarRelojSolar();
}

function volverHoraReal() {

    modoDebug = false;

    actualizarRelojSolar();
}

function procesarComando(texto) {

    let partes = texto.trim().toLowerCase().split(" ");

    let cmd = partes[0];
    let subcmd = partes[1];
    let valor = partes[2];
    let extra = partes[3];

    addMessage("> " + texto, "normal");

    if (cmd === "/help") {

        mostrarAyuda();
    }

    else if (cmd === "/clear") {

        chatMessages.innerHTML = "";
        addMessage("Chat limpiado", "success");
    }

    else if (cmd === "/time" && subcmd === "set") {

        if (valor === "real") {

            volverHoraReal();
            addMessage("⏰ Reloj sincronizado con hora real de España", "success");
        }

        else if (valor === "day" && extra === "0") {

            setHoraForzada(9, 0, 0);
            addMessage("☀️ Hora establecida: 09:00 (Mañana)", "success");
        }

        else if (valor === "day" && extra === "1") {

            setHoraForzada(0, 0, 0);
            addMessage("🌙 Hora establecida: 00:00 (Medianoche)", "success");
        }

        else if (valor === "noon") {

            setHoraForzada(12, 0, 0);
            addMessage("☀️ Hora establecida: 12:00 (Mediodía)", "success");
        }

        else if (valor === "night") {

            setHoraForzada(21, 0, 0);
            addMessage("🌙 Hora establecida: 21:00 (Noche)", "success");
        }

        else {

            addMessage("❌ Uso: /time set [day 0|day 1|noon|night|real]", "error");
        }
    }

    else {

        addMessage("❌ Comando desconocido. Escribe /help", "error");
    }
}

// Eventos
document.addEventListener("keydown", function(e) {

    if (e.altKey && e.key === "t") {
        e.preventDefault();
        toggleChat();
    }

    if (chatAbierto && e.key === "Escape") {
        toggleChat();
    }
});

chatSend.addEventListener("click", function() {

    let texto = chatInput.value.trim();

    if (texto) {
        procesarComando(texto);
        chatInput.value = "";
        autocomplete.style.display = "none";
    }
});

chatInput.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {

        let texto = chatInput.value.trim();

        if (texto) {
            procesarComando(texto);
            chatInput.value = "";
            autocomplete.style.display = "none";
        }
    }
});

// Inicializar
video.addEventListener("loadedmetadata", function() {
    actualizarRelojSolar();
});

setInterval(actualizarRelojSolar, 1000);
actualizarRelojSolar();