document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    const timerDisplay = document.getElementById('timerDisplay');
    let timerInterval;
    let selectedAudio = null; // Variable to store the selected audio element

    submitButton.addEventListener('click', run);
    resetButton.addEventListener('click', () => {
        window.location.reload();
        clearInterval(timerInterval);
        if (selectedAudio) {
            selectedAudio.pause(); // Pause the audio if reset
            selectedAudio.currentTime = 0; // Reset audio to beginning
        }
    });

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
        // Display a message to the user
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';

        // Wait for a few seconds before reloading the page
        setTimeout(() => {
            window.location.reload();
        }, 3000); // Change this value to adjust the delay
    }

    function run(event) {
        event.preventDefault(); // Prevent default form submission behavior

        let countdownValue = document.getElementById('countdown').value;
        let n = document.getElementById("color").value;
        let set_time = document.getElementById("time").value;
        let unit = document.getElementById("unit").value;
        let view = document.getElementById("view").value;
        let soundEffect = document.getElementById("sound").value;

        // Get selected audio file or URL
        let selectedFile = document.getElementById('music-file').files[0];
        let selectedUrl = document.getElementById('music-url').value;

        // Determine which audio source to use
        if (selectedFile) {
            // User selected a file
            selectedAudio = new Audio(URL.createObjectURL(selectedFile));
        } else if (selectedUrl) {
            // User pasted a URL
            selectedAudio = new Audio(selectedUrl);

            // To handle CORS issues, check if the URL is valid and playable
            selectedAudio.addEventListener('error', (e) => {
                console.error('Error loading audio from URL:', e);
                displayErrorMessage(countdownValue, n, unit, view, selectedAudio);
            });
        }

        if (countdownValue && countdownValue > 0 && Number(n) >= 0 && Number.isInteger(Number(n)) && n !== "" && unit !== "unit" && view !== "select" && selectedAudio) {
            // Clear error message if everything is correct
            document.getElementById("error").innerHTML = "";
            // Hide the main container
            document.querySelector(".container").style.display = "none";

            // Start the simulation and countdown
            startSimulation(n, set_time, unit, view);
            startCountdown(countdownValue);

            // Start the selected audio
            selectedAudio.loop = true; // Loop the audio
            selectedAudio.play();
        } else {
            // Display error message if any input is missing or invalid
            displayErrorMessage(countdownValue, n, unit, view, selectedAudio);
        }
    }

    // Function to display error messages
    function displayErrorMessage(countdownValue, n, unit, view, selectedAudio) {
        document.getElementById("error").style.color = "red";
        if (Number(n) < 0 || !Number.isInteger(Number(n)) || n === "") {
            document.getElementById("error").innerHTML = "<strong>The Number of Colours must be a positive integer.</strong>";
        } else if (unit === "unit") {
            document.getElementById("error").innerHTML = "<strong>The Unit field must be selected.</strong>";
        } else if (view === "select") {
            document.getElementById("error").innerHTML = "<strong>The View field must be selected.</strong>";
        } else if (countdownValue <= 0) {
            document.getElementById("error").innerHTML = "<strong>The CountDown Timer must be a positive value greater than zero.</strong>";
        } else if (!selectedAudio) {
            document.getElementById("error").innerHTML = "<strong>Please select an audio file or paste a valid URL.</strong>";
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
