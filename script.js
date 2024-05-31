document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    const timerDisplay = document.getElementById('timerDisplay');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    let timerInterval;

    if (submitButton && resetButton && timerDisplay && fullscreenBtn) {
        submitButton.addEventListener('click', run);
        resetButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            window.location.reload();
        });

        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen()
                    .then(() => {
                        fullscreenBtn.textContent = 'Exit Fullscreen';
                    })
                    .catch(err => {
                        console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
                    });
            } else {
                document.exitFullscreen()
                    .then(() => {
                        fullscreenBtn.textContent = 'Fullscreen';
                    })
                    .catch(err => {
                        console.error(`Error attempting to disable fullscreen mode: ${err.message} (${err.name})`);
                    });
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                fullscreenBtn.textContent = 'Fullscreen';
            }
        });
    }

    function startCountdown(duration) {
        let timer = duration;
        timerDisplay.style.display = 'block';

        timerInterval = setInterval(() => {
            let minutes = Math.floor(timer / 60);
            let seconds = timer % 60;

            timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;

            if (--timer < 0) {
                clearInterval(timerInterval);
                stopSimulation();
                timerDisplay.style.display = 'none';
            }
        }, 1000);
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function stopSimulation() {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.style.display = 'block';
        }
    
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    function run() {
        const countdownValue = document.getElementById('countdown').value;
        const n = document.getElementById('color').value;
        const set_time = document.getElementById('time').value;
        const unit = document.getElementById('unit').value;
        const view = document.getElementById('view').value;
        const soundEffect = document.getElementById('sound').value;
        const color1 = document.getElementById('color1').value;
        const color2 = document.getElementById('color2').value;
        const errorElement = document.getElementById('error');

        if (validateForm(countdownValue, n, set_time, unit, view, soundEffect, color1, color2)) {
            errorElement.innerHTML = "";
            startSimulation(n, set_time, unit, view);
            startCountdown(countdownValue);

            const audio = document.getElementById(soundEffect);
            if (audio) {
                audio.loop = true;
                audio.play();
            }
        } else {
            errorElement.innerHTML = "<strong>Please fill out all required fields correctly!</strong>";
            errorElement.style.color = "red";
        }
    }

    function validateForm(countdownValue, n, set_time, unit, view, soundEffect, color1, color2) {
        if (!countdownValue || countdownValue <= 0) return false;
        if (Number(n) < 0 || !Number.isInteger(Number(n)) || n === "") return false;
        if (set_time === "" || isNaN(set_time)) return false;
        if (unit === "unit") return false;
        if (view === "select") return false;
        if (!isValidHex(color1) || !isValidHex(color2)) return false;
        if (soundEffect === "select") return false;
        return true;
    }

    function isValidHex(color) {
        return /^#[0-9A-F]{6}$/i.test(color);
    }

    function startSimulation(n, set_time, unit, view) {
        alert("Double click on the screen to reload!");
        const color1 = document.getElementById('color1').value;
        const color2 = document.getElementById('color2').value;
        const rgbColor1 = hexToRgb(color1);
        const rgbColor2 = hexToRgb(color2);

        document.body.children[0].style.display = 'none';
        document.body.children[1].style.display = 'none';
        document.body.style.cursor = "pointer";

        document.body.addEventListener('dblclick', () => {
            if (confirm("Are you sure you want to reload?")) {
                window.location.reload();
            }
        });

        if (unit === "seconds") {
            set_time *= 1000;
        }

        function getRandomColorBetween(color1, color2) {
            const randomR = Math.floor(Math.random() * (color2.r - color1.r + 1)) + color1.r;
            const randomG = Math.floor(Math.random() * (color2.g - color1.g + 1)) + color1.g;
            const randomB = Math.floor(Math.random() * (color2.b - color1.b + 1)) + color1.b;
            return `rgb(${randomR}, ${randomG}, ${randomB})`;
        }

        function numberColorsBetween(color1, color2, num) {
            let colors = `${getRandomColorBetween(color1, color2)}`;
            while (num > 1) {
                colors += `, ${getRandomColorBetween(color1, color2)}`;
                num--;
            }
            return colors;
        }

        if (n == 1) {
            document.body.style.backgroundColor = getRandomColorBetween(rgbColor1, rgbColor2);
            setInterval(() => {
                document.body.style.backgroundColor = getRandomColorBetween(rgbColor1, rgbColor2);
            }, set_time);
        } else {
            let gradientType = view === "conic" ? "conic-gradient" : view === "linear" ? "linear-gradient" : "radial-gradient";
            document.body.style.background = `${gradientType}(${numberColorsBetween(rgbColor1, rgbColor2, n - 1)}, ${getRandomColorBetween(rgbColor1, rgbColor2)})`;
            setInterval(() => {
                document.body.style.background = `${gradientType}(${numberColorsBetween(rgbColor1, rgbColor2, n - 1)}, ${getRandomColorBetween(rgbColor1, rgbColor2)})`;
            }, set_time);
        }
    }

    function hexToRgb(hex) {
        let bigint = parseInt(hex.slice(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return { r, g, b };
    }
});
