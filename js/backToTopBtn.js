document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    function handleScroll() {
        if (window.scrollY === 0) {
            backToTopButton.classList.add('disabled');
            backToTopButton.style.display = 'none'; // Hide button at top
        } else {
            backToTopButton.classList.remove('disabled');
            backToTopButton.style.display = 'block'; // Show button when scrolling
        }
    }

    window.startSimulation = function() {
        backToTopButton.style.display = 'none';
    }

    window.backToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});


