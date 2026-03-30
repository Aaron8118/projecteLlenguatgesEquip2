document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const cont = document.querySelector(".contacto");
  if (!cont) return;

  const setModoControl = (activo) => {
    if (activo) {
      body.classList.add("control-activo");
      cont.classList.add("sin-fondo");
    } else {
      body.classList.remove("control-activo");
      cont.classList.remove("sin-fondo");
    }
  };

  const colores = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFFFFF',
    '#000000'
  ];

  const ponerColorAleatorio = () => {
    let color = colores[Math.floor(Math.random() * colores.length)];

    if (color === '#000000') {
      const candidatos = colores.filter(c => c !== '#000000');
      color = candidatos[Math.floor(Math.random() * candidatos.length)];
    }

    body.style.backgroundColor = color;
    body.style.backgroundImage = 'none';
    cont.classList.add('sin-fondo');
    cont.style.backgroundColor = 'transparent';
    cont.style.color = '#000000';
  };

  const restaurarFondo = () => {
    body.style.backgroundColor = '';
    body.style.backgroundImage = '';
    cont.classList.remove('sin-fondo');
    cont.style.backgroundColor = '';
    cont.style.color = '';
  };

  window.addEventListener("keydown", (e) => {

    // CTRL + C → color random
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      ponerColorAleatorio();
    }

    // ALT → restaurar fondo
    if (e.key === 'Alt') {
      e.preventDefault();
      restaurarFondo();
    }
  });

  // Detecta también Ctrl+C vía evento copy
  window.addEventListener("copy", (e) => {
    e.preventDefault();
    ponerColorAleatorio();
  });
});