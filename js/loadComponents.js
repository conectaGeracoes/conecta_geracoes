//para carregar o header da página
fetch("../components/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });


    //para carregar o footer da página
    document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("footer");
    if (!footer) return;
    let caminho = "/components/footer.html";
    if (
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname.endsWith("/conecta_geracoes/")
    ) {
        caminho = "/components/footer.html";
    }

    fetch(caminho)
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data;
        })
        .catch(error => console.error("Erro ao carregar o footer:", error));

});


//chamando o chatbot
    // fetch("./components/chatbot.html")
    // .then(response => response.text())
    // .then(data => {
    //     document.getElementById("chatbot-container").innerHTML = data;
    //     iniciarChatbot();
    // });


//funçao para ativar o hambuger no responsivo do header
document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    if (!header) return;
    let caminho = "/components/header.html";
    if (
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname.endsWith("/conecta_geracoes/")
    ) {
        caminho = "/components/header.html";
    }

    fetch(caminho)
        .then(response => response.text())
        .then(html => {
            header.innerHTML = html;

            // Inicializa o menu APÓS carregar o header
            iniciarMenu();
        })
        .catch(error => {
            console.error("Erro ao carregar o header:", error);
        });

});