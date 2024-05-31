

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
        window.location.reload();
        clearInterval(timerInterval);
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
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';

        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
    
    function run() {
        let countdownValue = document.getElementById('countdown').value;
        let n = document.getElementById("color").value;
        let set_time = document.getElementById("time").value;
        let unit = document.getElementById("unit").value;
        let view = document.getElementById("view").value;
        let soundEffect = document.getElementById("musicDropdown").value;

        if (countdownValue && countdownValue > 0 && Number(n) >= 0 && Number.isInteger(Number(n)) && n !== "" && unit !== "unit" && view !== "select") {
            document.getElementById("error").innerHTML = "";

            formContainer.style.display = 'none'; // Hide the form container

            startSimulation(n, set_time, unit, view);
            startCountdown(countdownValue);

            currentAudio = document.getElementById(soundEffect);
            if (currentAudio) {
                currentAudio.loop = true;
                currentAudio.play();
            }

            musicDropdown.style.display = 'block';
            musicDropdown.addEventListener('change', changeMusic);
        } else {
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
        alert("Double click on the screen to reload!");

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


 window.onload = function() {
    // Warning modal logic
    var modal = document.getElementById("warningModal");
    var closeModal = document.getElementById("closeModal");
    var proceedButton = document.getElementById("proceed");
  

    modal.style.display = "block";
  
    closeModal.onclick = function() {
      modal.style.display = "none";
    }
  
    proceedButton.onclick = function() {
      modal.style.display = "none";
    }
  
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    // Text animation logic
    var words = ["Light Simulator", "Beat Spectrum"];
    var index = 0;
    var direction = "left";
    var interval = 100;
  
    function animateText() {
      var word = words[index]; 
      var len = word.length;
      var i = direction === "left" ? 0 : len;
     var timer = setInterval(function () {
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


function showAboutPopup() {
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
  }
  
document.addEventListener('DOMContentLoaded', () => {
    const randomizeButton = document.getElementById('randomize');

    randomizeButton.addEventListener('click', () => {
        // Randomize number of colors
        const colorInput = document.getElementById('color');
        const randomNumColors = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
        colorInput.value = randomNumColors;

        // Randomize time interval
        const timeInput = document.getElementById('time');
        const randomTimeInterval = Math.floor(Math.random() * 5000) + 1000; // Generates a random number between 1000 and 6000 (milliseconds)
        timeInput.value = randomTimeInterval;

        // Randomize unit
        const unitSelect = document.getElementById('unit');
        const randomUnitIndex = Math.random() < 0.5 ? 1 : 2; // Randomly selects milliseconds or seconds
        unitSelect.selectedIndex = randomUnitIndex;

        // Randomize view
        const viewSelect = document.getElementById('view');
        const randomViewIndex = Math.floor(Math.random() * (viewSelect.options.length - 1)) + 1; // Excludes the first "Select" option
        viewSelect.selectedIndex = randomViewIndex;

        // Randomize sound effect
        const soundSelect = document.getElementById('sound');
        const randomSoundIndex = Math.floor(Math.random() * soundSelect.options.length);
        soundSelect.selectedIndex = randomSoundIndex;

        // Randomize countdown timer
        const countdownInput = document.getElementById('countdown');
        const randomCountdown = Math.floor(Math.random() * 300) + 30; // Generates a random number between 30 and 330 (seconds)
        countdownInput.value = randomCountdown;
    });
});

