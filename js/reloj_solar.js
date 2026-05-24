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
let enviarconsola = document.getElementById("enviar1");
let autocomplete = document.getElementById("autocomplete");

enviarconsola.style.color = "black";
let chatAbierto = false;

// Comandos disponibles
let comandos = [
    {
        cmd: "/help",
        desc: "Muestra todos los comandos disponibles"
    },
    {
        cmd: "/time set day 0",
        desc: "Pone el reloj a las 9:00 (mañana)"
    },
    {
        cmd: "/time set day 1",
        desc: "Pone el reloj a las 00:00 (medianoche)"
    },
    {
        cmd: "/time set noon",
        desc: "Pone el reloj a las 12:00 (mediodía)"
    },
    {
        cmd: "/time set night",
        desc: "Pone el reloj a las 21:00 (noche)"
    },
    {
        cmd: "/time set real",
        desc: "Vuelve a la hora del PC"
    },
    {
        cmd: "/clear",
        desc: "Limpia el chat"
    }
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
    let h1 = ahora.getHours();
    let m2 = ahora.getMinutes();
    let s3 = ahora.getSeconds();
    return h1 + "," + m2 + "," + s3;
}

// Función para actualizar el reloj
function actualizarRelojSolar() {
    let h1 = "";
    let m2 = "";
    let s3 = "";
    let dia1 = "";
    let mes1 = "";
    let anyo1 = "";

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

        let horaSistemapc = obtenerHoraPC().split(",");

        h1 = parseInt(horaSistemapc[0]);
        m2 = parseInt(horaSistemapc[1]);
        s3 = parseInt(horaSistemapc[2]);

        let fechaSistema = new Date();
        dia1 = fechaSistema.getDate();
        mes1 = fechaSistema.getMonth() + 1;
        anyo1 = fechaSistema.getFullYear();
    }

    if (isNaN(h1) || isNaN(m2) || isNaN(s3)) {
        return;
    }

    let cajaHora = document.getElementById("hora-actual");
    let horaFormato = ("0" + h1).slice(-2) + ":" + ("0" + m2).slice(-2) + ":" + ("0" + s3).slice(-2);
    cajaHora.textContent = horaFormato;

    let cajaFecha = document.getElementById("fecha-actual");
    let diaFormato = dia1.toString().padStart(2, "0");
    let mesFormato = mes1.toString().padStart(2, "0");
    cajaFecha.textContent = diaFormato + "/" + mesFormato + "/" + anyo1;

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
function chat1() {

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

// procesar comandos
function procesarComando(textoEntrada) {

    let partes = textoEntrada.trim().toLowerCase().split(" ");

    let cmd1 = partes[0];
    let cmd2 = partes[1];
    let valor1 = partes[2];
    let valor2 = partes[3];

    let cajaNormal = document.createElement("div");
    cajaNormal.className = "chat-message normal";
    cajaNormal.textContent = "> " + textoEntrada;
    mensajechat.appendChild(cajaNormal);
    mensajechat.scrollTop = mensajechat.scrollHeight;

    if (cmd1 === "/help") {

        let cajaSystem = document.createElement("div");
        cajaSystem.className = "chat-message system";
        cajaSystem.textContent = "=== COMANDOS DISPONIBLES ===";
        mensajechat.appendChild(cajaSystem);
        mensajechat.scrollTop = mensajechat.scrollHeight;

        for (let i = 0; i < comandos.length; i++) {
            let linea = comandos[i].cmd + " - " + comandos[i].desc;
            let cajaInfo = document.createElement("div");
            cajaInfo.className = "chat-message info";
            cajaInfo.textContent = linea;
            mensajechat.appendChild(cajaInfo);
            mensajechat.scrollTop = mensajechat.scrollHeight;
        }

    } else if (cmd1 === "/clear") {

        mensajechat.innerHTML = "";
        let cajaSuccess = document.createElement("div");
        cajaSuccess.className = "chat-message success";
        cajaSuccess.textContent = "Chat limpiado";
        mensajechat.appendChild(cajaSuccess);
        mensajechat.scrollTop = mensajechat.scrollHeight;

    } else if (cmd1 === "/time" && cmd2 === "set") {

        if (valor1 === "real") {
            modoDebug = false;
            actualizarRelojSolar();
            let cajaSuccess = document.createElement("div");
            cajaSuccess.className = "chat-message success";
            cajaSuccess.textContent = "⏰ Hora del PC activada";
            mensajechat.appendChild(cajaSuccess);
            mensajechat.scrollTop = mensajechat.scrollHeight;

        } else if (valor1 === "day" && valor2 === "0") {
            modoDebug = true;
            horaDebugH = 9;
            horaDebugM = 0;
            horaDebugS = 0;
            actualizarRelojSolar();
            let cajaSuccess = document.createElement("div");
            cajaSuccess.className = "chat-message success";
            cajaSuccess.textContent = "☀️ 09:00 mañana";
            mensajechat.appendChild(cajaSuccess);
            mensajechat.scrollTop = mensajechat.scrollHeight;

        } else if (valor1 === "day" && valor2 === "1") {
            modoDebug = true;
            horaDebugH = 0;
            horaDebugM = 0;
            horaDebugS = 0;
            actualizarRelojSolar();
            let cajaSuccess = document.createElement("div");
            cajaSuccess.className = "chat-message success";
            cajaSuccess.textContent = "🌙 00:00 medianoche";
            mensajechat.appendChild(cajaSuccess);
            mensajechat.scrollTop = mensajechat.scrollHeight;

        } else if (valor1 === "noon") {
            modoDebug = true;
            horaDebugH = 12;
            horaDebugM = 0;
            horaDebugS = 0;
            actualizarRelojSolar();
            let cajaSuccess = document.createElement("div");
            cajaSuccess.className = "chat-message success";
            cajaSuccess.textContent = "☀️ 12:00 mediodía";
            mensajechat.appendChild(cajaSuccess);
            mensajechat.scrollTop = mensajechat.scrollHeight;

        } else if (valor1 === "night") {
            modoDebug = true;
            horaDebugH = 21;
            horaDebugM = 0;
            horaDebugS = 0;
            actualizarRelojSolar();
            let cajaSuccess = document.createElement("div");
            cajaSuccess.className = "chat-message success";
            cajaSuccess.textContent = "🌙 21:00 noche";
            mensajechat.appendChild(cajaSuccess);
            mensajechat.scrollTop = mensajechat.scrollHeight;

        } else {
            let cajaError = document.createElement("div");
            cajaError.className = "chat-message error";
            cajaError.textContent = "❌ comando incorrecto";
            mensajechat.appendChild(cajaError);
            mensajechat.scrollTop = mensajechat.scrollHeight;
        }

    } else {
        let cajaError = document.createElement("div");
        cajaError.className = "chat-message error";
        cajaError.textContent = "❌ desconocido";
        mensajechat.appendChild(cajaError);
        mensajechat.scrollTop = mensajechat.scrollHeight;
    }
}

// eventos
function teclaGlobal(e) {

    if (e.altKey && e.key === "t") {
        e.preventDefault();
        chat1();
    }

    if (chatAbierto && e.key === "Escape") {
        chat1();
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
    enviarconsola.addEventListener("click", botonEnviar);
    chatInput.addEventListener("keypress", teclaInputChat);
    video.addEventListener("loadedmetadata", cargarVideo);

    setInterval(actualizarRelojSolar, 1000);
    actualizarRelojSolar();
}

window.addEventListener("load", inicio);