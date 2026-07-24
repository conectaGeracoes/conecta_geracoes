
fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });

    fetch("./components/chatbot.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("chatbot-container").innerHTML = data;
        iniciarChatbot();
    });
