// Variables del reloj
const video = document.getElementById("relojVideo");
let modoDebug = false;
let horaDebugH = 0;
let horaDebugM = 0;
let horaDebugS = 0;

// Variables del chat
const chatOverlay = document.getElementById("chat-overlay");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const chatSend = document.getElementById("chat-send");
const autocomplete = document.getElementById("autocomplete");

let chatAbierto = false;
let selectedIndex = -1;

// Comandos disponibles
const comandos = [
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

// Función para actualizar el reloj
function actualizarRelojSolar() {
    let h, m, s, d, mes, a;
    if (modoDebug) {
        avanzarTiempoDebug();
        h = horaDebugH;
        m = horaDebugM;
        s = horaDebugS;
        d = new Date().getDate();
        mes = new Date().getMonth() + 1;
        a = new Date().getFullYear();
    } else {
        const ahora = new Date();
        const horaEspanya = new Date(
            ahora.toString("es-ES", { timeZone: "Europe/Madrid" })
        );
        h = horaEspanya.getHours();
        m = horaEspanya.getMinutes();
        s = horaEspanya.getSeconds();
        d = horaEspanya.getDate();
        mes = horaEspanya.getMonth() + 1;
        a = horaEspanya.getFullYear();
    }

    // Mostrar hora
    document.getElementById("hora-actual").textContent =
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0");

    // Muestra fecha
    document.getElementById("fecha-actual").textContent =
        String(d).padStart(2, "0") + "/" +
        String(mes).padStart(2, "0") + "/" +
        String(a).padStart(4, "0");

    // Fase del día
    let fase = "";

    if (h >= 6 && h < 12) fase = "🌅 Mañana";
    else if (h >= 12 && h < 18) fase = "☀️ Tarde";
    else if (h >= 18 && h < 21) fase = "🌆 Atardecer";
    else fase = "🌙 Noche";

    document.getElementById("info-dia").textContent = fase;

    // Progreso del día para el video
    const horaInvertida = (12 - h + 24) % 24;
    const segundosDia = horaInvertida * 3600 + (59 - m) * 60 + (59 - s);
    const progreso = segundosDia / 86400;

    if (video.duration) {
        video.currentTime = video.duration * parseFloat(progreso);
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

function addMessage(texto, tipo = "normal") {

    const msg = document.createElement("div");

    msg.className = "chat-message " + tipo;
    msg.textContent = texto;

    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function mostrarAyuda() {

    addMessage("=== COMANDOS DISPONIBLES ===", "system");

    comandos.forEach(c => {
        addMessage(c.cmd + " - " + c.desc, "info");
    });
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

    const partes = texto.trim().toLowerCase().split(" ");

    const cmd = partes[0];
    const subcmd = partes[1];
    const valor = partes[2];
    const extra = partes[3];

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

// Autocompletado
function mostrarAutocomplete(texto) {

    if (!texto.startsWith("/")) {
        autocomplete.style.display = "none";
        return;
    }

    const coincidencias = comandos.filter(c => c.cmd.startsWith(texto));

    if (coincidencias.length === 0) {
        autocomplete.style.display = "none";
        return;
    }

    autocomplete.innerHTML = "";

    coincidencias.forEach((c, index) => {

        const item = document.createElement("div");

        item.className = "autocomplete-item";

        if (index === selectedIndex) item.classList.add("selected");

        item.innerHTML = c.cmd + '<span class="cmd-desc">' + c.desc + '</span>';

        item.onclick = () => {

            chatInput.value = c.cmd;

            autocomplete.style.display = "none";

            chatInput.focus();
        };

        autocomplete.appendChild(item);
    });

    autocomplete.style.display = "block";
}

// Eventos del Chat
document.addEventListener("keydown", (e) => {

    if (e.altKey && e.key === "t") {

        e.preventDefault();

        toggleChat();
    }

    if (chatAbierto && e.key === "Escape") {

        toggleChat();
    }
});

chatInput.addEventListener("input", (e) => {

    selectedIndex = -1;

    mostrarAutocomplete(e.target.value);
});

chatSend.addEventListener("click", () => {

    const texto = chatInput.value.trim();

    if (texto) {

        procesarComando(texto);

        chatInput.value = "";

        autocomplete.style.display = "none";
    }
});

chatInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        const texto = chatInput.value.trim();

        if (texto) {

            procesarComando(texto);

            chatInput.value = "";

            autocomplete.style.display = "none";
        }
    }
});

// Inicializar
video.addEventListener("loadedmetadata", () => {
    actualizarRelojSolar();
});

setInterval(actualizarRelojSolar, 1000);

actualizarRelojSolar();