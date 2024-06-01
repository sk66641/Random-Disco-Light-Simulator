
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    const timerDisplay = document.getElementById('timerDisplay');
    let timerInterval;

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
        // Display a message to the user
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
    
        // Wait for a few seconds before reloading the page
        setTimeout(() => {
            window.location.reload();
        }, 3000); // Change this value to adjust the delay
    }
    
    function run() {
        let countdownValue = document.getElementById('countdown').value;
        let n = document.getElementById("color").value;
        let set_time = document.getElementById("time").value;
        let unit = document.getElementById("unit").value;
        let view = document.getElementById("view").value;
        let soundEffect = document.getElementById("sound").value;

        if (countdownValue && countdownValue > 0 && Number(n) >= 0 && Number.isInteger(Number(n)) && n !== "" && unit !== "unit" && view !== "select") {
            // Clear error message if everything is correct
            document.getElementById("error").innerHTML = "";
            // Hide the main container
        document.querySelector(".container").style.display = "none";
            startSimulation(n, set_time, unit, view);

            // Start the countdown timer
            startCountdown(countdownValue);

            // Start the sound effect
            const audio = document.getElementById(soundEffect);
            audio.loop = true; // Loop the audio
            audio.play();
        } else {
            // Display error message if any input is missing or invalid
            document.getElementById("error").innerHTML = "<strong>Please fill out all required fields correctly!</strong>";
            document.getElementById("error").style.color = "red";
            return;
        }
    }

    function startSimulation(n, set_time, unit, view) {
        // Move simulation code here
        alert("Double click on the screen to reload!");

        document.body.children[0].style.display = 'none';
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
  function darkMode() {
    let element = document.body;
    
    element.className = "dark-mode";
 
}
function lightMode() {
    let element = document.body;
    
    element.className = "light-mode";
    
}