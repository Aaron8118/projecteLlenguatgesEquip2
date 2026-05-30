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
let segundosPantalla = 3;
let fondoenviado = null;
let contadorEnviado = null;
let formularioEnviado = null;
let cuentaAtrasEnviado = null;

function inicio() {
    let campoNom = document.getElementById('nombre');
    let años = document.getElementById('edad');
    let mail = document.getElementById('correo');
    let asun = document.getElementById('asunto');
    let mensj = document.getElementById('mensaje');
    let estrellas = document.getElementById('valoracion-radios');
    let btnBorrar = document.getElementsByClassName('boton-secundario');
    btnBorrar1 = btnBorrar[0];

    campoNom.addEventListener('input', comprobarN);
    años.addEventListener('input', comprobarEdad);
    mail.addEventListener('input', comprobarMail);
    asun.addEventListener('input', comprobarAs);
    mensj.addEventListener('input', comprobarMsg);
    mensj.addEventListener('input', comprobarlongiMensa);
    mensj.addEventListener('input', contadorMsg);
    estrellas.addEventListener('change', comprobarEstr);
    btnBorrar1.addEventListener('click', borrartodo1);
  let formulariosVarioss = document.getElementsByTagName('form');
  let formulariobueno = formulariosVarioss[0];
  formulariobueno.addEventListener('submit', validarTodo);
  contadorMsg();
}

function borrartodo1() {
  let campos = ['nombre', 'edad', 'correo', 'asunto', 'mensaje'];
  let errores = ['err-nombre', 'err-edad', 'err-correo', 'err-asunto', 'err-mensaje', 'err-valoracion'];

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
  comprobarlongiMensa();
  comprobarEstr();

  if (sumaValidacion === 7) {
    enviadoMensaje();
  } else {
    alert("Hay errores en el formulario");
  }
}
//pantalla cuan tot esta ben validat
function enviadoMensaje() {
  formularioEnviado = document.getElementsByTagName('form')[0];
  segundosPantalla = 3;

  fondoenviado = document.createElement('div');
  fondoenviado.style.position = 'fixed';
  fondoenviado.style.top = '0';
  fondoenviado.style.left = '0';
  fondoenviado.style.width = '100%';
  fondoenviado.style.height = '100%';
  fondoenviado.style.background = 'rgba(0,0,0,0.7)';
  fondoenviado.style.display = 'flex';
  fondoenviado.style.justifyContent = 'center';
  fondoenviado.style.alignItems = 'center';
  fondoenviado.style.zIndex = '10000';

  let caja = document.createElement('div');
  caja.style.background = '#1e1e2e';
  caja.style.border = '3px solid #55aa55';
  caja.style.borderRadius = '12px';
  caja.style.padding = '40px';
  caja.style.textAlign = 'center';
  caja.style.color = 'white';
  caja.style.fontFamily = 'monospace';
  caja.style.boxShadow = '0 0 20px black';

  let icono = document.createElement('div');
  icono.textContent = '📬';
  icono.style.fontSize = '48px';

  let titulo = document.createElement('h2');
  titulo.textContent = 'Mensaje enviado';
  titulo.style.margin = '10px 0';

  contadorEnviado = document.createElement('p');
  contadorEnviado.style.fontSize = '20px';
  contadorEnviado.style.margin = '10px 0';
  contadorEnviado.textContent = 'Reiniciando en ' + segundosPantalla + 's';

  caja.appendChild(icono);
  caja.appendChild(titulo);
  caja.appendChild(contadorEnviado);
  fondoenviado.appendChild(caja);
  document.body.appendChild(fondoenviado);

  cuentaAtrasEnviado = setInterval(actualizarContador, 1000);
}

function actualizarContador() {
  segundosPantalla--;

  if (segundosPantalla <= 0) {
    clearInterval(cuentaAtrasEnviado);
    document.body.removeChild(fondoenviado);
    formularioEnviado.submit();
    borrartodo1();
    fondoenviado = null;
    contadorEnviado = null;
    formularioEnviado = null;
    cuentaAtrasEnviado = null;
  } else {
    contadorEnviado.textContent = 'Reiniciando en ' + segundosPantalla + 's';
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

//comprobacion longitud mensaje
function comprobarlongiMensa() {
  let mensaje1 = document.getElementById('mensaje');
  let spanError = document.getElementById('err-mensaje');
  let textoMensaje = mensaje1.value.trim();

  if (!textoMensaje) {
    sumaValidacion++;
    return;
  }

  if (textoMensaje.length > maxMsg) {
    mensaje1.style.borderColor = '#cc0000';
    mensaje1.style.background = '#fff5f5';
    spanError.textContent = 'Maximo ' + maxMsg + ' caracteres.';
    spanError.style.display = 'block';
  } else {
    mensaje1.style.borderColor = '#2d7a2d';
    mensaje1.style.background = '#f5fff5';
    spanError.style.display = 'none';
    sumaValidacion++;
  }
}

//comprobar valoracion
function comprobarEstr() {
  let spanError = document.getElementById('err-valoracion');
  let seleccionado = document.querySelector('input[name="valoracion"]:checked');
  let numero6 = 0;
  let msg = '';

  if (!seleccionado) {
    numero6 = 1;
    msg = 'Selecciona una valoracion.';
  }

  if (numero6 === 1) {
    spanError.textContent = msg;
    spanError.style.display = 'block';
  } else {
    spanError.style.display = 'none';
    sumaValidacion++;
  }
}

window.addEventListener('load', inicio);