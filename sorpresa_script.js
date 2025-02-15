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
    let isOpen = false; 

    messageForm.style.display = "none";

    envelopeContainer.addEventListener("click", openLetter);
    closeButton.addEventListener("click", closeLetter);
    sendMessageButton.addEventListener("click", sendMessage);

    function openLetter() {
        if (isTyping || isOpen) return;

        envelopeContainer.removeEventListener("click", openLetter);
        isOpen = true;

        flap.style.transform = "rotateX(180deg)";
        flap.style.transition = "transform 0.8s ease-in-out";

        setTimeout(() => {
            envelope.style.transform = "translateY(100px)";
            envelope.style.opacity = "0";
            letter.style.opacity = "1";
            typeMessage();
        }, 800);

        setTimeout(() => {
            addHearts();
        }, 1000);

        messageForm.style.display = "none";
    }

    function typeMessage() {
        const text = `Mi niña hermosa y dueña de mi corazón,
        \n\n Ya paso más de dos meses desde que tuvimos lo nuestro, recuerdo todo como si fuera ayer, recuerdo el día en que te conocí, 
        el día que nos acercamos y tuvimos nuestro primer beso, la primera vez que salimos solo los dos juntos y recuerdo cada momento que pasamos juntos aunque hayan sido pocos, 
        recuerdo la última vez que te vi, donde ese día te regale un pequeño collar porque sabía que no te veria por un largo tiempo y me pregunto: ¿Que sera de ese collar?,
        ¿si le habra gustado?, perdon si nunca pregunte por el.
        \n Estamos tanto tiempo sin vernos, pero aun así en mi corazón, mente y pensamiento sigues estando tu mi niña Angie. No hay día que no piense al menos un momento en ti,
        porque llegaste a ser alguien importante para mi en muy poco tiempo.
        \n Tal como te lo dije una vez, cada día que te dije un Te Quiero o un Te Amo fue para demostrarte que todos los dias nunca deje de sentir amor por ti y si deje de decirlo, no 
        significa que deje de quererte, puedo reafirmar ahora que mi amor crece cada día y crece tanto que no tengo palabras para describirlo o expresarlo.
        \n Pero si quisiera decirlo, seria iniciando con un Te Amo y Te Amo tanto que nunca quisiera verte triste y si estuviste triste este tiempo, lamento no haber estado 
        ahí para ti, quisiera estar a tu lado para compartirte la alegría que siento con cada mensaje tuyo, hacerte reir, solo para ver esa hermosa sonrisa que tienes y
        perderme en tus lindos ojos.
        \n Quiero agradecerte por los momentos que tuvimos juntos y que nunca olvidare, eres un chica especial para mí, una luz en mi mundo a la cual admiro mucho, dueña 
        de mis pensamientos, la razón por la que sonrío sin motivos, quiero conocerte mas de cerca, 
        verte feliz siempre, escucharte, abrazarte y demostarte lo mucho que significas para mí.  
        \n\nAunque la distancia nos separe espero que esta carta te recuerde lo mucho que Te Amo, lo increíble que eres y que mereces toda la felicidad del mundo.
        \nFeliz San Valentín a mi niña Angie, mi niña que siempre has estado en mi corazón, Te Amo Angie Lucero
        \n\nCon mucho cariño y amor,
        \nEl niño que esta en tu corazón 💖, nunca olvidare eso`
        ;
        let i = 0;
        message.innerHTML = "";
        closeButton.style.display = "none"; // 🔹 Ocultamos el botón desde el inicio
        isTyping = true;
    
        function typing() {
            if (i < text.length) {
                message.innerHTML += text.charAt(i);
                i++;
    
                // Ajustar la altura de la carta en cada iteración
                letter.style.height = `${message.scrollHeight + 60}px`; // Asegura espacio extra para el texto
    
                setTimeout(typing, 50);
            } else {
                isTyping = false;
    
                // Espaciado extra para que el botón no se superponga
                closeButton.style.opacity = "1"; // 🔹 Se muestra con una transición suave
                closeButton.style.display = "block";
            }
        }
    
        typing();
    }
    

    function closeLetter() {
        if (!isOpen) return;

        letter.style.transform = "translateY(100%)";
        letter.style.opacity = "0";
        closeButton.style.display = "none";
        message.innerHTML = "";
        isOpen = false;

        setTimeout(() => {
            envelope.style.transform = "translateY(0)";
            envelope.style.opacity = "1";
            flap.style.transform = "rotateX(0)";
            envelopeContainer.addEventListener("click", openLetter);
        }, 1000);

        setTimeout(() => {
            messageForm.style.display = "flex";
            envelopeContainer.style.marginBottom = "50px";
        }, 1200);
    }

    function sendMessage() {
        let userMessage = customMessage.value.trim();
        if (userMessage === "") {
            alert("Por favor, escribe un mensaje antes de enviarlo.");
            return;
        }

        let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSerg2PqKnZ-EZHKytd92c3UirHqX07c_CF26gAMYekkxwXGiQ/formResponse";

        let formData = new FormData();
        formData.append("entry.1586503523", userMessage);

        fetch(googleFormURL, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        })
        .then(() => {
            alert("📩 Mensaje enviado correctamente.");
            customMessage.value = "";
            messageForm.style.display = "none";
        })
        .catch(error => {
            console.error("Error al enviar el mensaje:", error);
            alert("❌ Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
        });
    }

    function addHearts() {
        let maxHearts = 20;

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
