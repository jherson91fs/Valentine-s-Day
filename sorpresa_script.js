document.addEventListener("DOMContentLoaded", () => {
    const envelopeContainer = document.getElementById("envelope-container");
    const envelope = document.getElementById("envelope");
    const flap = document.getElementById("flap");
    const letter = document.getElementById("letter");
    const message = document.getElementById("message");
    const closeButton = document.getElementById("close-button");

    let isTyping = false; // Bloquear clics mientras se escribe

    envelopeContainer.addEventListener("click", openLetter);
    closeButton.addEventListener("click", closeLetter);

    function openLetter() {
        if (isTyping) return; // Evita clics mientras se escribe

        envelopeContainer.removeEventListener("click", openLetter); // Desactiva clics mientras se abre

        flap.style.transform = "rotateX(180deg)";
        flap.style.transition = "transform 0.8s ease-in-out";

        setTimeout(() => {
            envelope.style.transform = "translateY(100px)";
            envelope.style.opacity = "0";
            envelope.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out"; // Transición suave
            letter.style.transform = "translateY(-50px)";
            letter.style.opacity = "1";
            typeMessage();
        }, 800);

        setTimeout(() => {
            addHearts(); // Corazones animados
        }, 1000);
    }

    function typeMessage() {
        const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquid animi officia in odio explicabo quae voluptas nostrum beatae eum, voluptatibus, cupiditate ex dicta incidunt atque, exercitationem blanditiis repellat eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquid animi officia in odio explicabo quae voluptas nostrum beatae eum, voluptatibus, cupiditate ex dicta incidunt atque, exercitationem blanditiis repellat eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquid animi officia in odio explicabo quae voluptas nostrum beatae eum, voluptatibus, cupiditate ex dicta incidunt atque, exercitationem blanditiis repellat eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquid animi officia in odio explicabo quae voluptas nostrum beatae eum, voluptatibus, cupiditate ex dicta incidunt atque, exercitationem blanditiis repellat eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquid animi officia in odio explicabo quae voluptas nostrum beatae eum, voluptatibus, cupiditate ex dicta incidunt atque, exercitationem blanditiis repellat eveniet.Querida persona especial,\n\nEspero que esta carta ilumine tu día. Eres increíble y mereces toda la felicidad del mundo.\n\nCon cariño,\nTu persona especial 💖";
        let i = 0;
        message.innerHTML = "";
        isTyping = true; // Bloquear clics hasta que termine de escribir
    
        function typing() {
            if (i < text.length) {
                message.innerHTML += text.charAt(i);
                i++;
                letter.style.height = `${message.scrollHeight + 40}px`; // Ajusta la altura según el contenido
                setTimeout(typing, 50);
            } else {
                isTyping = false; // Desbloquear después de escribir
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
            envelopeContainer.addEventListener("click", openLetter); // Reactiva el clic
        }, 1000);
    }

    function addHearts() {
        setInterval(() => {
            let heart = document.createElement("div");
            heart.innerHTML = "❤️";
            heart.classList.add("heart-animation");
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`; // Ahora los corazones aparecen en toda la pantalla
            document.body.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 3000);
        }, 500);
    }
});
