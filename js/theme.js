document.addEventListener('DOMContentLoaded', function() {
    var savedTheme = localStorage.getItem('theme');
    const slider = document.getElementById('themeToggle');

    if (savedTheme === 'dark-mode') {
        slider.checked = true;
    } else {
        slider.checked = false;
    }

    //load saved theme
    if (savedTheme) {
        document.body.className = savedTheme;
    } else {
        slider.checked = true;
        darkMode();
    }

    // Toggle between light and dark modes when the toggle button is clicked
    slider.addEventListener('click', toggleTheme);

    function toggleTheme() {
        if (slider.checked) {
            darkMode();
        } else {
            lightMode();
        }

        // Store theme preference in localStorage
        localStorage.setItem('theme', document.body.className);
    }

    function darkMode() {
        let element = document.body;
        element.className = "dark-mode";
    }

    function lightMode() {
        let element = document.body;
        element.className = "light-mode";
    }
});