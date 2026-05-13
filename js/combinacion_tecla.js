function inicio() {
    const body = document.body;

    const colores = [
        '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'
    ];

    // Detecta teclas pulsadas
    window.addEventListener("keydown", function (e) {

        // Ctrl + C cambia color
        if (e.ctrlKey && e.key.toLowerCase() === "c") {
            e.preventDefault();

            let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            body.style.backgroundColor = colorAleatorio;
            body.style.backgroundImage = "none";
        }

        // Alt restaura fondo original
        if (e.key === "Alt") {
            body.style.backgroundColor = "";
            body.style.backgroundImage = "";
        }
    });
}

window.addEventListener("load", inicio);