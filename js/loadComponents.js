

// CARREGAR COMPONENTES DA PÁGINA

document.addEventListener("DOMContentLoaded", async () => {


    // CARREGAR PÁGINA BASE

    const paginaBase = document.getElementById("pagina-base");
    if (paginaBase) {
        try {
            const respostaBase = await fetch("/components/pagina-base.html");
            if (!respostaBase.ok) {
                throw new Error("Não foi possível carregar a página base.");
            }
            const baseHTML = await respostaBase.text();
            paginaBase.innerHTML = baseHTML;
            // Depois que a base foi carregada,
            // colocamos o conteúdo específico da página dentro dela.
            const conteudoBase = document.getElementById("conteudo-pagina");
            const template = document.getElementById("conteudo-pagina-template");
            if (conteudoBase && template) {
                conteudoBase.appendChild(
                    template.content.cloneNode(true)
                );
            }
        } catch (error) {
            console.error("Erro ao carregar a página base:", error);
        }
    }



    // CARREGAR HEADER

    const header = document.getElementById("header");

    if (header) {
        try {
            const respostaHeader = await fetch("/components/header.html");
            if (!respostaHeader.ok) {
                throw new Error("Não foi possível carregar o header.");
            }
            const headerHTML = await respostaHeader.text();
            header.innerHTML = headerHTML;
            // Inicializa o menu depois que o header foi carregado
            if (typeof iniciarMenu === "function") {
                iniciarMenu();
            }
        } catch (error) {
            console.error("Erro ao carregar o header:", error);
        }
    }



    // CARREGAR FOOTER

    const footer = document.getElementById("footer");

    if (footer) {
        try {
            const respostaFooter = await fetch("/components/footer.html");
            if (!respostaFooter.ok) {
                throw new Error("Não foi possível carregar o footer.");
            }
            const footerHTML = await respostaFooter.text();
            footer.innerHTML = footerHTML;
        } catch (error) {
            console.error("Erro ao carregar o footer:", error);
        }
    }
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