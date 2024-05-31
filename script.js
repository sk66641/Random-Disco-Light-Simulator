document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    const timerDisplay = document.getElementById('timerDisplay');
    const musicDropdown = document.getElementById('musicDropdown'); 
    const formContainer = document.querySelector('.container'); // Added line to select the form container
    let timerInterval;
    let currentAudio;

    submitButton.addEventListener('click', run);
    resetButton.addEventListener('click', () => {
@@ -33,14 +36,12 @@ document.addEventListener('DOMContentLoaded', () => {
    }

    function stopSimulation() {
        // Display a message to the user
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';

        // Wait for a few seconds before reloading the page

        setTimeout(() => {
            window.location.reload();
        }, 3000); // Change this value to adjust the delay
        }, 3000);
    }

    function run() {
@@ -49,36 +50,47 @@ document.addEventListener('DOMContentLoaded', () => {
        let set_time = document.getElementById("time").value;
        let unit = document.getElementById("unit").value;
        let view = document.getElementById("view").value;
        let soundEffect = document.getElementById("sound").value;
        let soundEffect = document.getElementById("musicDropdown").value;

        if (countdownValue && countdownValue > 0 && Number(n) >= 0 && Number.isInteger(Number(n)) && n !== "" && unit !== "unit" && view !== "select") {
            // Clear error message if everything is correct
            document.getElementById("error").innerHTML = "";

            // Start the simulation
            startSimulation(n, set_time, unit, view);
            formContainer.style.display = 'none'; // Hide the form container

            // Start the countdown timer
            startSimulation(n, set_time, unit, view);
            startCountdown(countdownValue);

            // Start the sound effect
            const audio = document.getElementById(soundEffect);
            audio.loop = true; // Loop the audio
            audio.play();
            currentAudio = document.getElementById(soundEffect);
            if (currentAudio) {
                currentAudio.loop = true;
                currentAudio.play();
            }

            musicDropdown.style.display = 'block';
            musicDropdown.addEventListener('change', changeMusic);
        } else {
            // Display error message if any input is missing or invalid
            document.getElementById("error").innerHTML = "<strong>Please fill out all required fields correctly!</strong>";
            document.getElementById("error").style.color = "red";
            return;
        }
    }

    function changeMusic() {
        const selectedMusic = musicDropdown.value;
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = document.getElementById(selectedMusic);
        if (currentAudio) {
            currentAudio.loop = true;
            currentAudio.play();
        }
    }

    function startSimulation(n, set_time, unit, view) {
        // Move simulation code here
        alert("Double click on the screen to reload!");

        document.body.children[0].style.display = 'none';
        document.body.children[1].style.display = 'none';
        document.body.style.cursor = "pointer";

        document.body.addEventListener("dblclick", () => {
            let cnf1 = confirm("Are you sure you want to reload?");
            if (cnf1) {
                window.location.reload();
            }
        });
        if (unit === "seconds") {
            set_time *= 1000;
        }
        function getRandomColor() {
            let val1 = parseInt(0 + Math.random() * 256);
            let val2 = parseInt(0 + Math.random() * 256);
            let val3 = parseInt(0 + Math.random() * 256);
            return `rgb(${val1}, ${val2}, ${val3})`;
        }
        function numberColors(num) {
            let colors = `${getRandomColor()}`;
            while (num > 1) {
                colors += `, ${getRandomColor()}`;
                num--;
            }
            return colors;
        }
        if (n == 1) {
            document.body.style.backgroundColor = getRandomColor();
            setInterval(() => {
                document.body.style.backgroundColor = getRandomColor();
            }, set_time);
        } else {
            let gradientType = view === "conic" ? "conic-gradient" : view === "linear" ? "linear-gradient" : "radial-gradient";
            document.body.style.background = `${gradientType}(${numberColors(n - 1)}, ${getRandomColor()})`;
            setInterval(() => {
                document.body.style.background = `${gradientType}(${numberColors(n - 1)}, ${getRandomColor()})`;
            }, set_time);
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
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
});
