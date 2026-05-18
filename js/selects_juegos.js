let filtroCatalogo = null;
let juegos = [];
let segundoSelect = null;

//esilos del select
function styleSelect(select) {
    select.style.padding = '0.5rem 0.85rem';
    select.style.border = '1px solid #555';
    select.style.borderRadius = '0.6rem';
    select.style.backgroundColor = '#111';
    select.style.color = '#f9f9f9';
    select.style.minWidth = '200px';
    select.style.display = 'block';
    select.style.position = 'absolute';
}

//muestra todos los juegos
function mostrarTodos() {
    juegos.forEach((juego) => {
        juego.style.display = 'block';
    });
}

//para mostrar solo 1
function mostrarSolo(index) {
    juegos.forEach((juego, idx) => {
        if (idx === index) {
            juego.style.display = 'block';
        } else {
            juego.style.display = 'none';
        }
    });
}

//para crear un segundo select para los juegos individuales
function crearSegundoSelect() {
    segundoSelect = document.createElement('select');
    segundoSelect.id = 'filtroCatalogoJuego';
    segundoSelect.title = 'Selecciona un juego para mostrar';
    styleSelect(segundoSelect);

    juegos.forEach((juego, index) => {
        const titulo = juego.querySelector('h3')?.textContent.trim() || `Juego ${index + 1}`;
        const opcion = new Option(titulo, index.toString());
        segundoSelect.appendChild(opcion);
    });

    filtroCatalogo.after(segundoSelect);

    segundoSelect.addEventListener('change', function () {
        const selectedIndex = parseInt(this.value, 10);
        if (!Number.isNaN(selectedIndex)) {
            mostrarSolo(selectedIndex);
        }
    });

    return segundoSelect;
}


//para cambiar
function cambiar() {
    if (filtroCatalogo.value === 'Todos') {
        if (segundoSelect) {
            segundoSelect.remove();
            segundoSelect = null;
        }
        mostrarTodos();
    }

    if (filtroCatalogo.value === 'Individual') {
        let selectJuego = crearSegundoSelect();
        selectJuego.selectedIndex = 0;
        mostrarSolo(parseInt(selectJuego.value, 10));
    }
}


//todos los eventos
window.onload = function () {
    filtroCatalogo = document.getElementById('filtroCatalogo');
    juegos = Array.from(document.querySelectorAll('.juegos'));
    styleSelect(filtroCatalogo);
    filtroCatalogo.addEventListener('change', cambiar);
    mostrarTodos();
};