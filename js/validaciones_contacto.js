// patrones válidos
let rxCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let rxNom = /^[a-zA-ZàáâäèéêëìíîïòóôöùúûüñÑÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜ' -]{2,50}$/;
let rxEdad = /^(1[89]|[2-9][0-9]|100)$/;

// límites de caracteres
let maxNom = 50;
let maxMail = 100;
let maxAs = 80;
let maxMsg = 500;

// suma validaciones
let sumaValidacion = 0;

function inicio() {
    let campoNom = document.getElementById('nombre');
    let años = document.getElementById('edad');
    let mail = document.getElementById('correo');
    let asun = document.getElementById('asunto');
    let mensj = document.getElementById('mensaje');
    let cate = document.getElementById('categoria');
    let btnBorrar = document.getElementsByClassName('boton-secundario');
    btnBorrar1 = btnBorrar[0];

    campoNom.addEventListener('input', comprobarN);
    años.addEventListener('input', comprobarEdad);
    mail.addEventListener('input', comprobarMail);
    asun.addEventListener('input', comprobarAs);
    mensj.addEventListener('input', comprobarMsg);
    mensj.addEventListener('input', contadorMsg);
    cate.addEventListener('change', comprobarCat);
    btnBorrar1.addEventListener('click', borrartodo1);
  document.querySelector('form').addEventListener('submit', validarTodo);

  contadorMsg();
}

function borrartodo1() {
  let campos = ['nombre', 'edad', 'correo', 'asunto', 'mensaje', 'categoria'];
  let errores = ['err-nombre', 'err-edad', 'err-correo', 'err-asunto', 'err-mensaje', 'err-categoria'];

  for (let i = 0; i < campos.length; i++) {
    let campo = document.getElementById(campos[i]);
    campo.style.borderColor = '';
    campo.style.background = '';
  }

  for (let i = 0; i < errores.length; i++) {
    let span = document.getElementById(errores[i]);
    span.textContent = '';
    span.style.display = 'none';
  }

  sumaValidacion = 0;
  contadorMsg();
}

// contador textArea
function contadorMsg() {
  let mensaje1 = document.getElementById('mensaje');
  let contador = document.getElementById('contador-msg');
  contador.style.marginLeft = "20px";
  contador.style.marginBottom = "20px";
  let actualValorlongit = mensaje1.value.length;
  if (contador) {
    contador.textContent = actualValorlongit + " / " + maxMsg + " caracteres";

    if (actualValorlongit > maxMsg) {
      contador.style.color = "red";
    } else {
      contador.style.color = "green";
    }
  }

  if (actualValorlongit > maxMsg) {
    mensaje1.value = mensaje1.value.substring(0, maxMsg);
  }
}

// validación global formulario
function validarTodo(e) {
  e.preventDefault();

  sumaValidacion = 0;

  comprobarN();
  comprobarEdad();
  comprobarMail();
  comprobarAs();
  comprobarMsg();
  comprobarCat();

  if (sumaValidacion === 6) {
    alert("Formulario validado correctamente");
    e.target.submit();
  } else {
    alert("Hay errores en el formulario");
  }
}

//aqui van todas las validaciones de aqui para abajo
function comprobarN() {
  let nombre1 = document.getElementById('nombre');
  let spanError = document.getElementById('err-nombre');
  let textoNom = nombre1.value.trim();
  let numero1 = 0;
  let msg = '';

  if (!textoNom) {
    numero1 = 1;
    msg = 'El nombre es obligatorio.';
  } else if (textoNom.length > maxNom) {
    numero1 = 1;
    msg = 'Maximo ' + maxNom + ' caracteres.';
  } else if (!rxNom.test(textoNom)) {
    numero1 = 1;
    msg = 'Solo letras y espacios. Minimo 2 caracteres.';
  }

  if (numero1 === 1) {
    nombre1.style.borderColor = '#cc0000';
    nombre1.style.background = '#fff5f5';
    spanError.textContent = msg;
    spanError.style.display = 'block';
  } else {
    nombre1.style.borderColor = '#2d7a2d';
    nombre1.style.background = '#f5fff5';
    spanError.style.display = 'none';
    sumaValidacion++;
  }
}

//comprbacion edad
function comprobarEdad() {
  let edad1 = document.getElementById('edad');
  let spanError = document.getElementById('err-edad');
  let edadValor = edad1.value.trim();
  let numero2 = 0;
  let msg = '';

  if (!edadValor) {
    numero2 = 1;
    msg = 'La edad es obligatoria.';
  } else if (!rxEdad.test(edadValor)) {
    numero2 = 1;
    msg = 'La edad debe estar entre 18 y 100.';
  }

  if (numero2 === 1) {
    edad1.style.borderColor = '#cc0000';
    edad1.style.background = '#fff5f5';
    spanError.textContent = msg;
    spanError.style.display = 'block';
  } else {
    edad1.style.borderColor = '#2d7a2d';
    edad1.style.background = '#f5fff5';
    spanError.style.display = 'none';
    sumaValidacion++;
  }
}

//comprobacion email
function comprobarMail() {
  let mail1 = document.getElementById('correo');
  let spanError = document.getElementById('err-correo');
  let mailValor = mail1.value.trim();
  let numero3 = 0;
  let msg = '';

  if (!mailValor) {
    numero3 = 1;
    msg = 'El correo es obligatorio.';
  } else if (mailValor.length > maxMail) {
    numero3 = 1;
    msg = 'Maximo ' + maxMail + ' caracteres.';
  } else if (!rxCorreo.test(mailValor)) {
    numero3 = 1;
    msg = 'Formato invalido. Ej: usuario@dominio.com';
  }

  if (numero3 === 1) {
    mail1.style.borderColor = '#cc0000';
    mail1.style.background = '#fff5f5';
    spanError.textContent = msg;
    spanError.style.display = 'block';
  } else {
    mail1.style.borderColor = '#2d7a2d';
    mail1.style.background = '#f5fff5';
    spanError.style.display = 'none';
    sumaValidacion++;
  }
}

//comprobacion asunto
function comprobarAs() {
  let asunto1 = document.getElementById('asunto');
  let spanError = document.getElementById('err-asunto');
  let asuntoValor = asunto1.value.trim();
  let numero4 = 0;
  let msg = '';

  if (!asuntoValor) {
    numero4 = 1;
    msg = 'El asunto es obligatorio.';
  } else if (asuntoValor.length > maxAs) {
    numero4 = 1;
    msg = 'Maximo ' + maxAs + ' caracteres.';
  }

  if (numero4 === 1) {
    asunto1.style.borderColor = '#cc0000';
    asunto1.style.background = '#fff5f5';
    spanError.textContent = msg;
    spanError.style.display = 'block';
  } else {
    asunto1.style.borderColor = '#2d7a2d';
    asunto1.style.background = '#f5fff5';
    spanError.style.display = 'none';
    sumaValidacion++;
  }
}

//comprobacion mensaje
function comprobarMsg() {
  let mensaje1 = document.getElementById('mensaje');
  let spanError = document.getElementById('err-mensaje');
  let textoMensaje = mensaje1.value.trim();
  let numero5 = 0;
  let msg = '';

  if (!textoMensaje) {
    numero5 = 1;
    msg = 'El mensaje es obligatorio.';
  } else if (textoMensaje.length > maxMsg) {
    numero5 = 1;
    msg = 'Maximo ' + maxMsg + ' caracteres.';
  }

  if (numero5 === 1) {
    mensaje1.style.borderColor = '#cc0000';
    mensaje1.style.background = '#fff5f5';
    spanError.textContent = msg;
    spanError.style.display = 'block';
  } else {
    mensaje1.style.borderColor = '#2d7a2d';
    mensaje1.style.background = '#f5fff5';
    spanError.style.display = 'none';
    sumaValidacion++;
  }
}

//comprobar categoria
function comprobarCat() {
  let categoria1 = document.getElementById('categoria');
  let spanError = document.getElementById('err-categoria');
  let numero6 = 0;
  let msg = '';

  if (!categoria1.value) {
    numero6 = 1;
    msg = 'Selecciona una categoria.';
  }

  if (numero6 === 1) {
    categoria1.style.borderColor = '#cc0000';
    categoria1.style.background = '#fff5f5';
    spanError.textContent = msg;
    spanError.style.display = 'block';
  } else {
    categoria1.style.borderColor = '#2d7a2d';
    categoria1.style.background = '#f5fff5';
    spanError.style.display = 'none';
    sumaValidacion++;
  }
}

window.addEventListener('load', inicio);