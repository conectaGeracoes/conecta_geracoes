const cards = document.querySelectorAll(".card-plano");
const container = document.querySelector(".cards-planos");

let atual = 0;
let intervalo = null;

function trocarCard(){

    cards[atual].classList.remove("ativo");

    atual = (atual + 1) % cards.length;

    cards[atual].classList.add("ativo");

}

function iniciar(){

    if(!intervalo){

        intervalo = setInterval(trocarCard,6000);

    }

}

function parar(){

    clearInterval(intervalo);

    intervalo = null;

}

container.addEventListener("mouseenter",parar);

container.addEventListener("mouseleave",iniciar);

iniciar();