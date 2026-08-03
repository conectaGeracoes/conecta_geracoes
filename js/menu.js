
//menu hamburger do header
function iniciarMenu() {

    const abrirMenu = document.getElementById("abrirMenu");
    const fecharMenu = document.getElementById("fecharMenu");
    const menu = document.getElementById("menuMobile");
    const overlay = document.getElementById("overlay");

    // Se algum elemento não existir, não faz nada
    if (!abrirMenu || !fecharMenu || !menu || !overlay) {
        return;
    }

    abrirMenu.addEventListener("click", () => {
        menu.classList.add("active");
        overlay.classList.add("active");
    });

    function fechar() {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    }

    fecharMenu.addEventListener("click", fechar);
    overlay.addEventListener("click", fechar);

    // Fecha ao clicar em um link
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", fechar);
    });

}