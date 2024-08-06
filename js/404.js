document.addEventListener('DOMContentLoaded', function () {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }

    const darkModeToggle = document.getElementById('themeToggle');
    darkModeToggle.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode');
    });

    let n = 10; // seconds
    setTimeout(function () {
        window.location.href = 'index.html';
    }, n * 1000);

    const countdownElement = document.querySelector('.text4').getElementsByTagName('strong')[0];
    countdownElement.innerHTML = n;
    setInterval(() => {
        countdownElement.innerHTML = --n;
    }, 1000);
});
