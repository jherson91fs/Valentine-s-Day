document.addEventListener("DOMContentLoaded", () => {
    const envelopeContainer = document.getElementById("envelope-container");
    const envelope = document.getElementById("envelope");
    const flap = document.getElementById("flap");
    const letter = document.getElementById("letter");
    const message = document.getElementById("message");
    const closeButton = document.getElementById("close-button");
    const messageForm = document.getElementById("message-form");
    const customMessage = document.getElementById("custom-message");
    const sendMessageButton = document.getElementById("send-message");
    const heartsContainer = document.getElementById("hearts-container");

    let isTyping = false;

    // Ocultar el formulario al inicio
    messageForm.style.display = "none";

    envelopeContainer.addEventListener("click", openLetter);
    closeButton.addEventListener("click", closeLetter);
    sendMessageButton.addEventListener("click", sendMessage);

    function openLetter() {
        if (isTyping) return;

        envelopeContainer.removeEventListener("click", openLetter);

        flap.style.transform = "rotateX(180deg)";
        flap.style.transition = "transform 0.8s ease-in-out";

        setTimeout(() => {
            envelope.style.transform = "translateY(100px)";
            envelope.style.opacity = "0";
            envelope.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
            letter.style.transform = "translateY(-50px)";
            letter.style.opacity = "1";
            typeMessage();
        }, 800);

        setTimeout(() => {
            addHearts();
        }, 1000);
    }

    function typeMessage() {
        const text = "Querida persona especial,\n\nEspero que esta carta ilumine tu día. Eres increíble y mereces toda la felicidad del mundo.\n\nCon cariño,\nTu persona especial 💖";
        let i = 0;
        message.innerHTML = "";
        isTyping = true;

        function typing() {
            if (i < text.length) {
                message.innerHTML += text.charAt(i);
                i++;
                letter.style.height = `${message.scrollHeight + 40}px`;
                setTimeout(typing, 50);
            } else {
                isTyping = false;
                closeButton.style.display = "block";
            }
        }

        typing();
    }

    function closeLetter() {
        letter.style.transform = "translateY(100%)";
        letter.style.opacity = "0";
        closeButton.style.display = "none";
        message.innerHTML = "";
    
        setTimeout(() => {
            envelope.style.transform = "translateY(0)";
            envelope.style.opacity = "1";
            flap.style.transform = "rotateX(0)";
            envelopeContainer.addEventListener("click", openLetter);
        }, 1000);
    
        // 🛠 Ajustar el tiempo para mostrar el formulario después de cerrar la carta
        setTimeout(() => {
            messageForm.style.display = "flex";
        }, 1200);
    }

    function sendMessage() {
        let userMessage = customMessage.value.trim();
        if (userMessage === "") {
            alert("Por favor, escribe un mensaje antes de enviarlo.");
            return;
        }

        // 🟢 REEMPLAZA con el enlace de tu formulario de Google Forms
        let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSerg2PqKnZ-EZHKytd92c3UirHqX07c_CF26gAMYekkxwXGiQ/formResponse";

        // 🟢 REEMPLAZA 'entry.TU_CAMPO' con el identificador del campo en tu formulario
        let formData = new FormData();
        formData.append("entry.1586503523", userMessage);

        fetch(googleFormURL, {
            method: "POST",
            body: formData,
            mode: "no-cors" // Importante para evitar problemas con CORS
        })
        .then(() => {
            alert("📩 Mensaje enviado correctamente.");
            customMessage.value = ""; // Limpia el cuadro de texto después de enviarlo
            messageForm.style.display = "none"; // Oculta el formulario tras el envío
        })
        .catch(error => {
            console.error("Error al enviar el mensaje:", error);
            alert("❌ Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
        });
    }

    function addHearts() {
        let maxHearts = 20; // Evita demasiados corazones en pantalla

        setInterval(() => {
            if (document.querySelectorAll(".heart-animation").length < maxHearts) {
                let heart = document.createElement("div");
                heart.innerHTML = "💖";
                heart.classList.add("heart-animation");
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.top = `${Math.random() * 100}%`;
                heartsContainer.appendChild(heart);
                setTimeout(() => { heart.remove(); }, 3000);
            }
        }, 500);
    }
});


document.getElementById('message-form').style.display = 'flex';
document.getElementById('envelope-container').style.marginBottom = "50px"; // Agrega espacio cuando se muestra el cuadro
