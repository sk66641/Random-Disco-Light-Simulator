setTimeout(function () {
    window.location.href = './index.html';
}, 5000);

// Generate stars
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
});
