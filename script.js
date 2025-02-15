document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const counter = document.getElementById("counter");
    const congratsContainer = document.getElementById("congrats-container");
    const surpriseButton = document.getElementById("surprise-button");
    let heartsCaught = 0;

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.left = `${Math.random() * 90 + 5}%`;
        heart.style.top = "-10px";
        heart.addEventListener("click", (event) => handleHeartClick(event));
        heart.addEventListener("touchstart", (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            handleHeartClick(touch);
        });
        gameContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }

    function handleHeartClick(event) {
        const rect = gameContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        heartsCaught++;
        counter.innerText = `Corazones atrapados: ${heartsCaught} / 10`;
        createParticles(x, y);
        event.target.remove();
        if (heartsCaught === 1) {
            endGame();
        }
    }

    function createParticles(x, y) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            particle.innerHTML = "✨";
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            gameContainer.appendChild(particle);
            setTimeout(() => particle.remove(), 500);
        }
    }

    function endGame() {
        gameContainer.innerHTML = "";
        counter.style.display = "none";
        document.querySelector("h1").style.display = "none";
        congratsContainer.style.display = "flex";
        setTimeout(() => {
            congratsContainer.style.opacity = "1";
            surpriseButton.style.display = "block";
        }, 100);
        
        if (navigator.vibrate) {
            navigator.vibrate(300);
        }
    }

    surpriseButton.addEventListener("click", () => {
        window.location.href = "sorpresa.html";
    });

    setInterval(createHeart, 800);
});
