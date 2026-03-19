// Notificaciones Minecraft simplificadas, arrastrables y sin superposición
(function () {

    const notifications = [
        { title: "⛏️ Prueba el Juego Real", msg: "¡Juega Minecraft Offline ahora!", link: "./html/minecraftEntero/Client/index.html", text: "Jugar Ahora →" },
        { title: "🏰 Modo Creativo", msg: "Construye sin límites", link: "./html/minecraftEntero/Client/structureCreator.html", text: "Explorar →" }
    ];

    let activeNotification = null; // para evitar superposición

    function randomPosition(div) {
        const width = window.innerWidth - div.offsetWidth - 20;
        const height = window.innerHeight - div.offsetHeight - 20;
        const x = Math.random() * width;
        const y = Math.random() * height;
        div.style.left = x + "px";
        div.style.top = y + "px";
    }

    function makeDraggable(div) {
        let offsetX, offsetY, isDragging = false;

        div.onmousedown = function (e) {
            isDragging = true;
            offsetX = e.clientX - div.offsetLeft;
            offsetY = e.clientY - div.offsetTop;
            div.style.cursor = "grabbing";
        };

        document.onmousemove = function (e) {
            if (!isDragging) return;
            div.style.left = e.clientX - offsetX + "px";
            div.style.top = e.clientY - offsetY + "px";
        };

        document.onmouseup = function () {
            if (isDragging) {
                isDragging = false;
                div.style.cursor = "grab";
            }
        };

        div.style.cursor = "grab";
    }

    function showNotification(custom) {
    const data = custom || notifications[Math.floor(Math.random() * notifications.length)];

    if (!custom && activeNotification) {
        // No mostrar pero igual programamos la siguiente
        setTimeout(showNotification, 5000);
        return;
    }

    const div = document.createElement("div");
    div.style = `
        position:fixed;
        width:320px;
        min-height:100px;
        background:#1e1e2e;
        border:3px solid #55aa55;
        color:white;
        font-family:monospace;
        padding:16px;
        z-index:9999;
        box-shadow:0 0 10px black;
    `;
    div.innerHTML = `
        <div style="display:flex;justify-content:space-between;">
            <b>${data.title}</b>
            <span style="cursor:pointer">✖</span>
        </div>
        <p>${data.msg}</p>
        <a href="${data.link}" target="_blank" style="color:#00ffaa;text-decoration:none;">
            ${data.text}
        </a>
    `;
    document.body.appendChild(div);

    randomPosition(div);
    makeDraggable(div);
    activeNotification = div;

    // Cerrar manual
    div.querySelector("span").onclick = () => {
        div.remove();
        activeNotification = null;
    };

    // Cerrar automático
    setTimeout(() => {
        if (div.parentNode) {
            div.remove();
            activeNotification = null;
        }
    }, 15000);

    // Programar siguiente notificación siempre
    if (!custom) setTimeout(showNotification, 5000);
}

    // Primera notificación de prueba 2s después de cargar
    window.addEventListener('load', () => {
        setTimeout(() => {
            showNotification({
                title: "⛏️ Prueba el Juego Real",
                msg: "¡Juega Minecraft Offline ahora!",
                link: "./html/minecraftEntero/Client/index.html",
                text: "Jugar Ahora →"
            });

            // Iniciar ciclo de la segunda notificación cada 5s
            setTimeout(showNotification, 5000);

        }, 2000);
    });

})();