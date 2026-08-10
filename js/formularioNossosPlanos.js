// ==========================================
// FORMULÁRIO DE CONTATO - CONECTA GERAÇÕES
// ==========================================

// Seleciona o formulário
// const formulario = document.querySelector(".formulario-contato");

// // Verifica se o formulário existe na página
// if (formulario) {

//     formulario.addEventListener("submit", function () {

//         // Seleciona o botão de envio
//         const botao = formulario.querySelector(".btn-enviar");

//         // Altera o texto do botão
//         botao.textContent = "Enviando...";

//         // Desabilita o botão para evitar envios duplicados
//         botao.disabled = true;

//         // Adiciona uma classe para podermos estilizar o botão
//         botao.classList.add("enviando");

//     });


    // ==========================================
    // MÁSCARA DE TELEFONE
    // ==========================================

    const telefone = document.querySelector("#telefone");

    if (telefone) {

        telefone.addEventListener("input", function () {

            let valor = telefone.value;

            // Remove tudo que não for número
            valor = valor.replace(/\D/g, "");

            // Limita a 11 números
            valor = valor.substring(0, 11);

            // Telefone com 11 números
            if (valor.length === 11) {

                valor = valor.replace(
                    /^(\d{2})(\d{5})(\d{4})$/,
                    "($1) $2-$3"
                );

            // Telefone com 10 números
            } else if (valor.length > 6) {

                valor = valor.replace(
                    /^(\d{2})(\d{4})(\d{0,4})$/,
                    "($1) $2-$3"
                );

            // Apenas DDD + começo do número
            } else if (valor.length > 2) {

                valor = valor.replace(
                    /^(\d{2})(\d+)/,
                    "($1) $2"
                );

            } else if (valor.length > 0) {

                valor = valor.replace(
                    /^(\d+)/,
                    "($1"
                );
            }

            telefone.value = valor;
        });
    }



    // // EVITA ESPAÇOS DESNECESSÁRIOS
    // const camposTexto = formulario.querySelectorAll(
    //     'input[type="text"], textarea'
    // );

    // camposTexto.forEach(function (campo) {
    //     campo.addEventListener("blur", function () {
    //         campo.value = campo.value.trim();
    //     });
    // });


//     // FEEDBACK VISUAL

//     const campos = formulario.querySelectorAll("input, textarea");

//     campos.forEach(function (campo) {
//         campo.addEventListener("focus", function () {
//             campo.parentElement.classList.add("campo-ativo");
//         });
//         campo.addEventListener("blur", function () {
//             campo.parentElement.classList.remove("campo-ativo");
//         });
//     });

// }

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('formConectaEmpresas');

//   if (form) {
//     form.addEventListener('submit', async (event) => {
//       event.preventDefault(); // Impede o recarregamento padrão da página

//       const btnSubmit = document.getElementById('btnEnviar');
//       btnSubmit.disabled = true;
//       btnSubmit.innerText = 'Enviando...';

//       const formData = new FormData(form);

//       try {
//         const response = await fetch('https://api.web3forms.com/submit', {
//           method: 'POST',
//           body: formData
//         });

//         const result = await response.json();

//         if (result.success) {
//           // Redireciona para a página de sucesso após o envio
//           window.location.href = 'sucesso.html';
//         } else {
//           alert('Ocorreu um erro ao enviar. Por favor, tente novamente.');
//           btnSubmit.disabled = false;
//           btnSubmit.innerText = 'Enviar Formulário';
//         }
//       } catch (error) {
//         console.error('Erro na requisição:', error);
//         alert('Erro de conexão. Verifique sua rede e tente novamente.');
//         btnSubmit.disabled = false;
//         btnSubmit.innerText = 'Enviar Formulário';
//       }
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
    console.log('JS DO FORMULÁRIO CARREGADO!');
    const form = document.getElementById('formConectaEmpresas');
    // restante...
});
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('formConectaEmpresas');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const btnSubmit = document.getElementById('btnEnviar');
            btnSubmit.disabled = true;
            btnSubmit.innerText = 'Enviando...';
            const formData = new FormData(form);
            try {
                const response = await fetch(
                    'https://api.web3forms.com/submit',
                    {
                        method: 'POST',
                        body: formData
                    }
                );
                const result = await response.json();
                if (result.success) {
                    window.location.href = 'sucesso.html';
                } else {
                    alert('Ocorreu um erro ao enviar. Por favor, tente novamente.');
                    btnSubmit.disabled = false;
                    btnSubmit.innerText = 'Enviar Mensagem';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Erro de conexão. Verifique sua rede e tente novamente.');
                btnSubmit.disabled = false;
                btnSubmit.innerText = 'Enviar Mensagem';
            }
        });
    }
});