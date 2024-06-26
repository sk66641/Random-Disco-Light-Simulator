document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    const timerDisplay = document.getElementById('timerDisplay');
    const randomizeButton = document.getElementById('randomize');
    const musicSelect = document.getElementById('musicSelect');
    const addTimeButton = document.getElementById('addTime');
    const muteButton = document.getElementById('muteBtn'); // Get reference to mute button



    // Create and append the pause/start button
    const pauseStartButton = document.getElementById('pauseStartBtn');

    let timerInterval;
    let musicAudio;
    let isPaused = false;
    let countdownValue;
    let lightInterval;
    let isMuted = false;
    // Event Listener for Add Time Button
    addTimeButton.addEventListener('click', () => {
        // used instantly invoked function expression
        (function get_time() {
            const add_time = Number(prompt('Enter a positive number to increase the time & negative to decrease it (in "Seconds")'));
            if (isNaN(add_time)) {
                alert('Please enter a valid number!')
                get_time();
            } else {
                addTime(add_time);
            }
        })()
    });

    // Function to add 15 seconds to the timer
    function addTime(seconds) {
        countdownValue += Math.floor(seconds);
        updateTimerDisplay();
    }

    // Function to update the timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(countdownValue / 60);
        // Math.floor to deal with float values
        const seconds = Math.floor(countdownValue % 60);
        timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    submitButton.addEventListener('click', () => {
        console.log("Submit button clicked");
        run()
    });

    muteButton.addEventListener('click', () => {
        if (isMuted) {
            unmuteAudio();
            document.getElementById('musicDropdown').style.display = 'block';
        } else {
            muteAudio();
            document.getElementById('musicDropdown').style.display = 'none';
        }
    });

    function muteAudio() {
        if (musicAudio) {
            musicAudio.muted = true;
        }
        isMuted = true;
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute'); // FontAwesome icon classes for muted state
    }

    function unmuteAudio() {
        if (musicAudio) {
            musicAudio.muted = false;
        }
        isMuted = false;
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up'); // FontAwesome icon classes for unmuted state
    }

    resetButton.addEventListener('click', () => {
        document.getElementById('color').value = '';
        document.getElementById('color1').value = '';
        document.getElementById('color2').value = '';
        document.getElementById('time').value = '';
        document.getElementById('view').value = 'select';
        document.getElementById('countdown').value = '';
        document.getElementById('unit').value = 'unit';
        document.getElementById('sound').value = 'none';
        document.getElementById('music-file').value = '';
        document.getElementById('error').innerText = '';
    });

    pauseStartButton.addEventListener('click', () => {
        if (isPaused) {
            resumeSimulation();
        } else {
            pauseSimulation();
        }
    });


    function startCountdown(duration) {
        countdownValue = duration;
        document.getElementById('musicDropdown').style.display = 'block';
        pauseStartButton.style.display = 'inline-block'; // Show the pause button
        document.querySelector("#reload").style.display = 'inline-block'; // Show the reload button
        addTimeButton.style.display = 'inline-block'; // Show the add time button
        timerDisplay.style.display = 'block';

        timerInterval = setInterval(() => {
            if (!isPaused) {
                let minutes = Math.floor(countdownValue / 60);
                // Math.floor to deal with float values
                let seconds = Math.floor(countdownValue % 60);

                timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;

                if (--countdownValue < 0) {
                    clearInterval(timerInterval);
                    stopSimulation();
                    timerDisplay.style.display = 'none';
                }
            }
        }, 1000);
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function stopSimulation() {
        const replayModelEl = document.getElementById('replayModel');
        replayModelEl.style.display = 'block';
    }

    document.getElementById('replayModelBtn').addEventListener('click', function () {
        const replayModelEl = document.getElementById('replayModel');
        replayModelEl.style.display = 'none';
        run();
    });

    document.getElementById('exitBtn').addEventListener('click', function () {
        window.location.reload();
        run();
    });

    function run() {
        // after successful submission
        let countdownValue = document.getElementById('countdown').value;
        let n = document.getElementById("color").value;
        let set_time = document.getElementById("time").value;
        let unit = document.getElementById("unit").value;
        let view = document.getElementById("view").value;
        let soundEffect = document.getElementById("sound").value;
        let color1 = document.getElementById('color1').value;
        let color2 = document.getElementById('color2').value;

        // Get selected audio file or URL
        let selectedFile = document.getElementById("music-file").files[0];
        let selectedUrl = document.getElementById("music-url").value;


        if (countdownValue && countdownValue > 0 && Number(n) > 0 && Number.isInteger(Number(n)) && n !== "" && unit !== "unit" && view !== "select" && !(soundEffect !== 'none' && selectedFile) && !(soundEffect !== 'none' && selectedUrl) && !(selectedFile && selectedUrl)) {
            document.getElementById("error").innerHTML = "";
            document.querySelector(".footer").style.display = "none";
            // document.querySelector(".navHeader").style.display = "none";
            document.querySelector(".container").style.display = "none";
            startSimulation(n, set_time, unit, view, color1, color2);
            var backToTopBtn = document.getElementById("backToTopBtn");
            backToTopBtn.style.display = "none";
            startCountdown(countdownValue);

            const modal1 = document.getElementById("infomodal");
            const closeModal1 = document.getElementById("closeModal1");
            const proceedButton1 = document.getElementById("proceed1");

            modal1.style.display = "block";

            closeModal1.onclick = function () {
                modal1.style.display = "none";
            }

            proceedButton1.onclick = function () {
                modal1.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal1) {
                    modal1.style.display = "none";
                }
            }

            muteButton.style.display = 'block'; // Show the mute button after successful submission 

            if (soundEffect !== 'none') {

                const audio = document.getElementById(soundEffect);
                audio.loop = true;
                audio.play();
                musicAudio = audio;
            }
            else {
                let selectedAudio;
                if (selectedFile) {
                    // User selected a file
                    selectedAudio = new Audio(URL.createObjectURL(selectedFile));
                } else if (selectedUrl) {
                    // User pasted a URL
                    selectedAudio = new Audio(selectedUrl);

                    // To handle CORS issues, check if the URL is valid and playable
                    selectedAudio.addEventListener("error", (e) => {
                        console.error("Error loading audio from URL:", e);
                    });
                }
                // Initialize selectedAudio variable
                selectedAudio.loop = true;
                selectedAudio.play();
                musicAudio = selectedAudio;
            }
            document.body.style.cursor = 'pointer';
            document.body.addEventListener('dblclick', () => {
                if (document.querySelector(".navMain").style.display === "none") {
                    document.querySelector(".navMain").style.display = "block"
                    document.querySelector("#muteBtn").style.display = "block"
                    document.querySelector("#timerDisplay").style.display = "block"
                    document.querySelector(".sidebarOne").style.display = "none"
                } else {
                    document.querySelector(".navMain").style.display = "none"
                    document.querySelector("#muteBtn").style.display = "none"
                    document.querySelector("#timerDisplay").style.display = "none"
                }
            });


        } else {
            // after unsuccessful submission
            document.getElementById("error").style.color = "red";
            if (Number(n) <= 0 || !Number.isInteger(Number(n)) || n === "") {
                document.getElementById("error").innerHTML = "<strong>1. The Number of Colours must be a positive integer!</strong>";
            } else if (unit === "unit") {
                document.getElementById("error").innerHTML = "<strong>3. The Unit field must be selected!</strong>";
            } else if (view === "select") {
                document.getElementById("error").innerHTML = "<strong>4. The View field must be selected!</strong>";
            } else if (countdownValue <= 0) {
                document.getElementById("error").innerHTML = "<strong>5. The CountDown Timer must be a positive value greater than zero!</strong>";
            } else if (soundEffect !== 'none' && selectedFile || soundEffect !== 'none' && selectedUrl || selectedUrl && selectedFile) {
                document.getElementById("error").innerHTML = "<strong>6. Either <i>Select Music</i> or <i>Paste link</i> or <i>Choose File!</i></strong>";

            }
            return;
        }
    }


    function startSimulation(n, set_time, unit, view, color1, color2) {
        const rgbColor1 = hexToRgb(color1);
        const rgbColor2 = hexToRgb(color2);

        document.body.querySelector(".slider").style.display = 'none';
        document.body.querySelector(".snowflakes").style.display = 'none';
        document.body.querySelector("#particles-js").style.display = 'none';

        if (unit === "seconds") {
            set_time *= 1000;
        }

        function getRandomColorBetween(color1, color2) {
            if (color1.r === color2.r && color1.g === color2.g && color1.b === color2.b) {
                const randomR = Math.floor(Math.random() * 256);
                const randomG = Math.floor(Math.random() * 256);
                const randomB = Math.floor(Math.random() * 256);
                return `rgb(${randomR}, ${randomG}, ${randomB})`;
            }
            else {
                const randomR = Math.floor(Math.random() * (color2.r - color1.r + 1)) + color1.r;
                const randomG = Math.floor(Math.random() * (color2.g - color1.g + 1)) + color1.g;
                const randomB = Math.floor(Math.random() * (color2.b - color1.b + 1)) + color1.b;
                return `rgb(${randomR}, ${randomG}, ${randomB})`;
            }
        }

        let randomcolor = getRandomColorBetween(color1, color2);
        setInterval(() => {
            randomcolor = getRandomColorBetween(color1, color2);
        }, set_time);

        function numberColorsBetween(color1, color2, num) {
            let colors = `${getRandomColorBetween(color1, color2)}`;
            while (num > 1) {
                colors += `, ${getRandomColorBetween(color1, color2)}`;
                num--;
            }
            return colors;
        }

        function createRandomGradientPattern(n) {
            let gradientPattern = `background-color: ${getRandomColorBetween(rgbColor1, rgbColor2)}; background-image: `;

            for (let i = 0; i < n; i++) {
                const randomPositionX = Math.floor(Math.random() * 100);
                const randomPositionY = Math.floor(Math.random() * 100);
                gradientPattern += `radial-gradient(circle at ${randomPositionX}% ${randomPositionY}%, ${getRandomColorBetween(rgbColor1, rgbColor2)} 0%, transparent 50%), `;
            }

            // Remove the last comma and space
            gradientPattern = gradientPattern.slice(0, -2);
            gradientPattern += '; background-blend-mode: normal;';

            return gradientPattern;
        }

        function applyRandomGradientPattern() {
            document.body.style.cssText = createRandomGradientPattern(n);
        }

        if (view === "custom") {
            applyRandomGradientPattern();
            lightInterval = setInterval(() => {
                if (!isPaused) {
                    applyRandomGradientPattern();
                }
            }, set_time);
        } else if (n == 1) {
            document.body.style.backgroundColor = getRandomColorBetween(rgbColor1, rgbColor2);
            lightInterval = setInterval(() => {
                if (!isPaused) {
                    document.body.style.backgroundColor = getRandomColorBetween(rgbColor1, rgbColor2);
                }
            }, set_time);
        } else {
            let gradientType = view === "conic" ? "conic-gradient" : view === "linear" ? "linear-gradient" : "radial-gradient";
            if (view === "conic") {

                document.body.style.background = `${gradientType}(${randomcolor}, ${numberColorsBetween(rgbColor1, rgbColor2, n - 1)}, ${randomcolor})`;
                lightInterval = setInterval(() => {
                    if (!isPaused) {
                        document.body.style.background = `${gradientType}(${randomcolor}, ${numberColorsBetween(rgbColor1, rgbColor2, n - 1)}, ${randomcolor})`;

                    }
                }, set_time);
            }
            else {
                document.body.style.background = `${gradientType}(${numberColorsBetween(rgbColor1, rgbColor2, n - 1)}, ${getRandomColorBetween(rgbColor1, rgbColor2)})`;
                lightInterval = setInterval(() => {
                    if (!isPaused) {
                        document.body.style.background = `${gradientType}(${numberColorsBetween(rgbColor1, rgbColor2, n - 1)}, ${getRandomColorBetween(rgbColor1, rgbColor2)})`;
                    }
                }, set_time);

            }
        }
    }

    randomizeButton.addEventListener('click', () => {
        const colorInput = document.getElementById('color');
        const randomNumColors = Math.floor(Math.random() * 10) + 1;
        colorInput.value = randomNumColors;

        // comment !important
        // Stopped the random selection for 2nd input for better view:
        // const colorInput1 = document.getElementById('color1');
        // const randomColor1 =  "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        // colorInput1.value = randomColor1;

        // const colorInput2 = document.getElementById('color2');
        // const randomColor2 = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        // colorInput2.value = randomColor2;

        const timeInput = document.getElementById('time');

        const unitSelect = document.getElementById('unit');
        const randomUnitIndex = Math.random() < 0.5 ? 1 : 2;
        if (randomUnitIndex == 1) {
            var randomTimeInterval = Math.floor(Math.random() * 1000) + 1;
            timeInput.value = randomTimeInterval;
        }
        else {
            var randomTimeInterval = Math.floor(Math.random() * 10) + 1;
            timeInput.value = randomTimeInterval;
        }
        unitSelect.selectedIndex = randomUnitIndex;

        const viewSelect = document.getElementById('view');
        const randomViewIndex = Math.floor(Math.random() * (viewSelect.options.length - 1)) + 1;
        viewSelect.selectedIndex = randomViewIndex;

        const soundSelect = document.getElementById('sound');
        const randomSoundIndex = Math.floor(Math.random() * soundSelect.options.length);
        soundSelect.selectedIndex = randomSoundIndex;

        const countdownInput = document.getElementById('countdown');
        const randomCountdown = Math.floor(Math.random() * 300) + 30;
        countdownInput.value = randomCountdown;

        // Update music dropdown
        musicSelect.value = soundSelect.value;
    });
    // let musicMuted = false; // Variable to track whether music is muted

    function pauseSimulation() {
        clearInterval(timerInterval);
        clearInterval(lightInterval);
        /* if (musicAudio) {
            musicMuted = musicAudio.muted; // Remember the mute state
            musicAudio.pause();
        }
        else {
            musicMuted = selectedAudio.muted; // Remember the mute state
            selectedAudio.pause();
        } */
        // document.getElementById("musicDropdown").style.display = 'none';
        pauseStartButton.textContent = 'Resume';
        isPaused = true;
    }

    function resumeSimulation() {
        startCountdown(countdownValue);
        /* if (musicAudio) {
            if (!musicMuted) {
                musicAudio.play();
            }
        }
        else {
            if (!musicMuted) {
                selectedAudio.play();
            }
        } */
        startSimulation(
            document.getElementById("color").value,
            document.getElementById("time").value,
            document.getElementById("unit").value,
            document.getElementById("view").value,
            document.getElementById('color1').value,
            document.getElementById('color2').value
        );
        // document.getElementById("musicDropdown").style.display = 'block';
        pauseStartButton.textContent = 'Pause';
        isPaused = false;
    }


    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
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

window.onload = function () {
    const modal = document.getElementById("warningModal");
    const closeModal = document.getElementById("closeModal");
    const proceedButton = document.getElementById("proceed");

    modal.style.display = "block";

    closeModal.onclick = function () {
        modal.style.display = "none";
    }

    proceedButton.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const words = ["Light Simulator", "Beat Spectrum"];
    let index = 0;
    let direction = "left";
    const interval = 100;

    function animateText() {
        const word = words[index];
        const len = word.length;
        let i = direction === "left" ? 0 : len;
        const timer = setInterval(function () {
            $("#changing").text(word.substring(0, i));
            if (direction === "left") {
                i++;
                if (i > len) {
                    clearInterval(timer);
                    direction = "right";
                    animateText();
                }
            } else {
                i--;
                if (i === 0) {
                    clearInterval(timer);
                    index = (index + 1) % words.length;
                    direction = "left";
                    animateText();
                }
            }
        }, interval);
    }
    animateText();
    // Snowflakes animation logic
    const snowflakesContainer = document.querySelector(".snowflakes");
    const numberOfSnowflakes = 300;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDelay = `${Math.random() * 10}s`; // Randomize animation delay
        snowflake.style.width = `${Math.random() * 6 + 2}px`; // Randomize snowflake size (2px to 8px)
        snowflake.style.height = `${Math.random() * 6 + 2}px`; // Randomize snowflake size (2px to 8px)
        snowflakesContainer.appendChild(snowflake);
    }
};

/* function showAboutPopup() {
    document.getElementById("aboutPopup").style.display = "block";
}

function closeAboutPopup() {
    document.getElementById("aboutPopup").style.display = "none";
}

function showFeaturesPopup() {
    document.getElementById('featuresPopup').style.display = 'block';
}

function closeFeaturesPopup() {
    document.getElementById('featuresPopup').style.display = 'none';
} */

//Toggle function that is affected by the slider box
// Check if there's a theme preference stored in localStorage
// Check if there's a theme preference stored in localStorage
// Check if there's a theme preference stored in localStorage
var savedTheme = localStorage.getItem('theme');
var slider = document.getElementById('themeToggle');

// Set the toggle button state based on the saved theme preference
if (savedTheme === 'dark-mode') {
    slider.checked = true;
} else {
    slider.checked = false;
}

// Apply the theme based on the saved preference or default to light mode
if (savedTheme) {
    document.body.className = savedTheme;
} else {
    slider.checked = true;
    darkMode();
}

// Toggle between light and dark modes when the toggle button is clicked
function toggleTheme() {
    if (slider.checked) {
        darkMode();
    } else {
        lightMode();
    }

    // Store the theme preference in localStorage
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

// Define global variable to store reference to the currently playing audio
let currentAudio;

// Function to toggle mute/unmute for the currently playing audio
function toggleMute() {
    if (currentAudio) {
        currentAudio.muted = !currentAudio.muted;
        // Update mute button icon based on mute state if necessary
    }
}

document.getElementById('submit').addEventListener('click', function () {
    document.getElementById('musicDropdown').addEventListener('change', function () {
        const selectedMusic = this.value;
        const audioElements = document.querySelectorAll('audio');

        audioElements.forEach(audio => audio.pause());

        if (selectedMusic !== 'none') {
            const musicAudio = document.getElementById(selectedMusic);
            musicAudio.loop = true;
            musicAudio.play();
            currentAudio = musicAudio; // Update currently playing audio reference
        }
    });
});

// Event listener for the mute button
document.getElementById('muteBtn').addEventListener('click', function () {
    toggleMute(); // Call toggleMute function to toggle mute/unmute
});

function effect() {
    loader.style.display = "none";
    document.querySelector(".unload").style.display = "block";
    document.querySelector(".snowflakes").style.display = "block";
    var backToTopBtn = document.getElementById("backToTopBtn");
    backToTopBtn.style.display = "block";
}



var loader = document.querySelector(".loader");
window.addEventListener('load', () => {
    var backToTopBtn = document.getElementById("backToTopBtn");
    backToTopBtn.style.display = "none";
    setTimeout(effect, 4000);
})

function changeColor() {
    document.getElementById('name').style.color = "#fff";
    document.getElementById('email').style.color = "#fff";
}

document.addEventListener("DOMContentLoaded", function () {
    var backToTopBtn = document.getElementById("backToTopBtn");
    backToTopBtn.style.display = "block";
    backToTopBtn.addEventListener("click", function () {
        scrollToTop();
        scrollToForm();
    });

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    function scrollToForm() {
        const formElement = document.getElementById("box");
        formElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    document.querySelector("#reload").addEventListener("click", () => {
        window.location.reload();
    });

});
function toggleSidebar() {
    var sidebar = document.querySelector('.sidebarOne');
    document.querySelector(".navMain").style.display = "none";

    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
        sidebar.classList.remove('slide-in');
        sidebar.classList.add('slide-out');

        // Add reverse staggered animation for sidebar elements
        const sidebarItems = document.querySelectorAll('.sidebarOne li');
        sidebarItems.forEach((item, index) => {
            item.style.animationDelay = `${(sidebarItems.length - index - 1) * 0.1}s`;
            item.classList.remove('fade-in');
            item.classList.add('fade-out');
        });
    } else {
        sidebar.style.display = 'block';
        sidebar.classList.remove('slide-out');
        sidebar.classList.add('slide-in');

        // Add staggered animation for sidebar elements
        const sidebarItems = document.querySelectorAll('.sidebarOne li');
        sidebarItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.remove('fade-out');
            item.classList.add('fade-in');
        });
    }
}

document.querySelector('.cross').addEventListener('click', () => {
    document.querySelector('.sidebarOne').style.display = 'none'
    document.querySelector(".navMain").style.display = "block";
})

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector(".navMain").style.visibility = "visible";
    }, 4000);
})

//  new functionality for saving and loading presets
function savePreset() {
    const presetName = prompt("Enter a name for your preset:");
    if (!presetName) {
        alert('Please enter a valid name for your preset.');
        return;
    }

    const presetData = {
        color: document.getElementById('color').value,
        color1: document.getElementById('color1').value,
        color2: document.getElementById('color2').value,
        time: document.getElementById('time').value,
        unit: document.getElementById('unit').value,
        view: document.getElementById('view').value,
        countdown: document.getElementById('countdown').value,
        sound: document.getElementById('sound').value,
        musicUrl: document.getElementById('music-url').value,

    };

    // Save to localStorage
    localStorage.setItem(`preset-${presetName}`, JSON.stringify(presetData));
    alert('Preset saved!');
}


function loadPreset() {
    const presetName = prompt("Enter the name of the preset you'd like to load:");
    if (!presetName) {
        alert('Please enter the name of the preset.');
        return;
    }

    const presetData = JSON.parse(localStorage.getItem(`preset-${presetName}`));
    if (!presetData) {
        alert('Preset not found!');
        return;
    }
    document.getElementById('color').value = presetData.color;
    document.getElementById('color1').value = presetData.color1;
    document.getElementById('color2').value = presetData.color2;
    document.getElementById('time').value = presetData.time;
    document.getElementById('unit').value = presetData.unit;
    document.getElementById('view').value = presetData.view;
    document.getElementById('countdown').value = presetData.countdown;
    document.getElementById('sound').value = presetData.sound;
    document.getElementById('music-url').value = presetData.musicUrl || '';
    // document.getElementById('music-file') cannot be set due to security reasons

    alert('Preset loaded!');
}
document.getElementById('savePresetButton').addEventListener('click', savePreset);
document.getElementById('loadPresetButton').addEventListener('click', loadPreset);

const cursor = document.querySelector(".cursor");
var timeout;
document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.display = "block";

    function mousestopped() {
        cursor.style.display = "none";
    }
    clearTimeout(timeout);
    timeout = setTimeout(mousestopped, 1000);

});
document.addEventListener("mouseout", () => {
    cursor.style.display = "none";
});

document.querySelector('#ll').addEventListener("submit", (event) => {
    if (document.querySelector("#name").value === " " && document.querySelector("#email").value === " ") {
        event.preventDefault();
    }
});

// feedback 
document.getElementById("CommentBtn").addEventListener("click", function () {
    document.getElementById("modalBackground").style.display = "flex";
});

document.getElementById("modalBackground").addEventListener("click", function (event) {
    if (event.target === this) {
        this.style.display = "none";
    }
});

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Show success message
    document.getElementById("successMessage").style.display = "block";

    // Hide success message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        document.getElementById("successMessage").style.display = "none";
    }, 3000);

    setTimeout(() => {
        document.querySelector("form").reset();
        alert("Form Submitted Successfully");
    }, 3000)
    setTimeout(() => {
        location.reload();
    }, 5000)
});

document.addEventListener("ContentLoaded", () => {
    const btnn = document.querySelector(".btnna");
    const loader = document.querySelector(".loader");
    const feedb = document.querySelector("#feed");
    btnn.addEventListener("click", function (event) {
        const nameValue = document.querySelector("#name").value;
        const emailValue = document.querySelector("#email").value;
        const feedb = document.querySelector("#feed").value;

        if (nameValue.length > 0 && emailValue.length > 0 && feedb.length > 0) {
            btnn.style.display = "none";
            document.querySelector(".sidebarOne").style.display = 'none';
            loader.style.display = "block";
        }
        else if (d) {

        }
        else {
            event.preventDefault();
            loader.style.display = "none";
            alert("Please fill out both the name and email fields.");
        }
    });
});

function changeToGif1() {
    document.getElementById('image1').src = '../assets/images/features/Conic_1.gif';
}
function changeToStatic1() {
    document.getElementById('image1').src = '../assets/images/features/Conic_1.jpg';
}

function changeToGif2() {
    document.getElementById('image2').src = '../assets/images/features/Conic_2.gif';
}
function changeToStatic2() {
    document.getElementById('image2').src = '../assets/images/features/Conic_2.jpg';
}

function changeToGif3() {
    document.getElementById('image3').src = '../assets/images/features/Radial_01.gif';
}
function changeToStatic3() {
    document.getElementById('image3').src = '../assets/images/features/Radial_01.jpg';
}

function changeToGif4() {
    document.getElementById('image4').src = '../assets/images/features/Radial_02.gif';
}
function changeToStatic4() {
    document.getElementById('image4').src = '../assets/images/features/Radial_02.jpg';
}

function changeToGif5() {
    document.getElementById('image5').src = '../assets/images/features/Linear_01.gif';
}
function changeToStatic5() {
    document.getElementById('image5').src = '../assets/images/features/Linear_01.jpg';
}

function changeToGif6() {
    document.getElementById('image6').src = '../assets/images/features/Linear_02.gif';
}
function changeToStatic6() {
    document.getElementById('image6').src = '../assets/images/features/Linear_02.jpg';
}



let isPlaying = false;
let CurrentAudio = null;

document.getElementById('PreviewButton').addEventListener('click', function () {
    console.log("hre");
    const selectedSound = document.getElementById('sound').value;

    // Audio files path prefix
    const audioPath = 'assets/audios/';

    const previewButton = document.getElementById('PreviewButton');

    // Pause and reset current playing audio if any
    if (CurrentAudio) {
        CurrentAudio.pause();
        CurrentAudio.currentTime = 0;
    }

    if (isPlaying) {
        isPlaying = false;
        previewButton.textContent = 'Preview';
        return;
    }

    if (selectedSound !== 'none') {
        const selectedMusic = audioPath + selectedSound + '.mp3'; // Construct full path
        CurrentAudio = new Audio(selectedMusic);
        CurrentAudio.play();
        isPlaying = true;
        previewButton.textContent = 'Stop';

        // Reset button text when audio ends
        CurrentAudio.addEventListener('ended', function() {
            isPlaying = false;
            previewButton.textContent = 'Preview';
        });
    }
});