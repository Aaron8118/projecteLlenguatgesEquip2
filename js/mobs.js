window.onload=function(){
    let mobs = document.querySelectorAll(".tarjeta_mob");
    mobs.forEach(element => {
        element.addEventListener("mouseenter", entrar);
        element.addEventListener("mouseleave", salir);
        element.addEventListener("mousemove", encima);
    });
}


function entrar(evt) {
    let texto = document.createElement("p");
    texto.appendChild(document.createTextNode(evt.target.querySelector("h3").innerHTML));
    texto.setAttribute("id","mousemove");
    texto.style.position="absolute";
    texto.style.backgroundColor="rgba(29, 5, 53, 0.788)";
    texto.style.border="#2f009e solid 2px";
    texto.style.borderRadius="5px";
    texto.style.padding="5px";
    document.body.appendChild(texto);
}

function salir(evt) {
    document.body.querySelector("#mousemove").remove();
}

function encima(evt) {
    let texto = document.body.querySelector("#mousemove");
    texto.style.top=(evt.pageY+5)+"px";
    texto.style.left=(evt.pageX+5)+"px";
}