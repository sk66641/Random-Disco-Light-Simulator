let musicAudio;
let isPaused = false;
let isMuted = false;
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    const timerDisplay = document.getElementById('timerDisplay');
    const randomizeButton = document.getElementById('randomize');
    const musicSelect = document.getElementById('musicSelect');
    const musicDropdown = document.getElementById('musicDropdown');
    const addTimeButton = document.getElementById('addTime');
    const muteButton = document.getElementById('muteBtn'); // Get reference to mute button
    const editBtn = document.getElementById('editBtn');
    const editDrop = document.getElementById('editdropdown');//contains both add time and change music btn

    // const addTimeOption = document.getElementById('addTimeOption');
    // const changeSongOption = document.getElementById('changeSongOption');

    // Create and append the pause/start button
    const pauseStartButton = document.getElementById('pauseStartBtn');

    let timerInterval;
    let countdownValue;
    let lightInterval;
    let isEditdropOpen = false;

    // toggle function: during runtime when edit is clicked, navbar should expand to show "add time" and "change music"
    //used same logic as sidebar toggle in this.
    function toggleEditDropdown() {
        if (editDrop.style.display === 'block') {
            editDrop.style.display = 'none';
            editDrop.classList.remove('slide-in');
            editDrop.classList.add('slide-out');
            isEditdropOpen = false;

            const dropdownItems = document.querySelectorAll('.editdropdown li');
            dropdownItems.forEach((item, index) => {
                item.style.animationDelay = `${(sidebarItems.length - index - 1) * 0.1}s`;
                item.classList.remove('fade-in');
                item.classList.add('fade-out');
            });
        } else {
            editDrop.style.display = 'block';
            editDrop.classList.remove('slide-out');
            editDrop.classList.add('slide-in');
            isEditdropOpen = true;

            const dropdownItems = document.querySelectorAll('.editdropdown li');
            dropdownItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.remove('fade-out');
                item.classList.add('fade-in');
            });
        }
    }

    editBtn.addEventListener('click', function (event) {
        // console.log("clikef")  trial
        toggleEditDropdown();
    })

    const crossAddtimeModal = document.getElementById('closeAddtimeModal');
    const addtimePrompt = document.getElementById('addtimeModel');
    const addtime_input = document.getElementById('addtimeSeconds');
    const timesubmitBtn = document.getElementById('timesubmitBtn');
    let rememberState = true;//Ensuring that if simulation was paused when addtime was clicked, the state is remembered after confirm is clicked 

    addTimeButton.addEventListener('click', () => {
        // var time=0;
        rememberState = isPaused//find what state is when we click add time 
        addtimePrompt.style.display = 'block';
        pauseSimulation(); //so that timer stops for the time being. even if its already paused, no harm. 
    });
    crossAddtimeModal.onclick = function () {
        addtimePrompt.style.display = 'none';
        if (rememberState == false) {//if it was paused before we let it be 
            resumeSimulation();
        }
    }
    
    // Add the event listener for timesubmitBtn outside
    timesubmitBtn.addEventListener('click', () => {
        const time = addtime_input.value; // Ensure you get the input value correctly
        if (time == 0) {
            showFailed("Please enter a valid number"); //modal remains open for another entry 
        }
        else {
            addTime(time);
            addtimePrompt.style.display = 'none';
            showSuccess("Added Successfully!");
            if (rememberState == false) {//if it was paused before we let it be 
                resumeSimulation();
            }

        }
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
        editBtn.style.display = 'inline-block';
        run()
    });

    muteButton.addEventListener('click', () => {
        if (isMuted) {
            unmuteAudio();
            // document.getElementById('changeMusic').style.display = 'block';
        } else {
            muteAudio();
            // document.getElementById('changeMusic').style.display = 'none';
        }
    });

    function muteAudio() {
        if (musicAudio) {
            musicAudio.muted = true;
        }
        else if (player) {
            player.mute();

        }
        isMuted = true;
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute'); // FontAwesome icon classes for muted state
    }

    function unmuteAudio() {
        if (musicAudio) {
            musicAudio.muted = false;
        }
        else if (player) {
            player.unMute();
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
        // document.getElementById('musicDropdown').style.display = 'block';
        pauseStartButton.style.display = 'inline-block'; // Show the pause button
        document.querySelector("#reload").style.display = 'inline-block'; // Show the reload button 
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
    let player;
    function onYouTubeIframeAPIReady() {
        console.log("YouTube API is ready");
    }

    function run() {
        let toggler = document.getElementById("sun-moon-mode-toggler")
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
        let youtubeUrl = document.getElementById("youtubeUrlInput").value.trim();


        if (countdownValue && countdownValue > 0 && Number(n) > 0 && Number.isInteger(Number(n)) && n !== "" && unit !== "unit" && view !== "select" && !(soundEffect !== 'none' && selectedFile) && !(soundEffect !== 'none' && selectedUrl) && !(selectedFile && selectedUrl) &&
            !(selectedFile && youtubeUrl) &&
            !(selectedUrl && youtubeUrl) &&
            !(soundEffect !== 'none' && youtubeUrl)) {
            // after successful submission
            document.getElementById("error").innerHTML = "";
            document.querySelector(".footer").style.display = "none";
            // document.querySelector(".navHeader").style.display = "none";
            document.querySelector(".container").style.display = "none";
            toggler.style.display = "none"

            // remove chatbot after successful submission
            // document.getElementById("tidio-chat").style.display = "none";
            
            startSimulation(n, set_time, unit, view, color1, color2);
            var backToTopBtn = document.getElementById("backToTopBtn");
            backToTopBtn.style.display = "none";
            startCountdown(countdownValue);

            //Function to load Youtube Audio Player
            function loadYouTubeAudio(videoId) {
                console.log("Entering loadYouTubeAudio function with videoId:", videoId);
                if (player) {
                    console.log("Existing player found, loading new video");
                    player.loadVideoById(videoId);
                    player.playVideo();
                } else {
                    console.log("Creating new YouTube player");
                    player = new YT.Player('youtube-audio-player', {
                        height: '1',
                        width: '1',
                        videoId: videoId,
                        playerVars: {
                            'autoplay': 1,
                            'controls': 0,
                            'disablekb': 1,
                            'fs': 0,
                            'showinfo': 0,
                            'iv_load_policy': 3,
                            'loop': 1
                        },
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange,
                            'onError': onPlayerError
                        }
                    });
                }
                console.log("Exiting loadYouTubeAudio function");
            }

            //Start play
            function onPlayerReady(event) {
                console.log("YouTube player is ready");
                event.target.playVideo();
            }

            //Check state of play and loop if needed
            function onPlayerStateChange(event) {
                console.log("Player state changed to:", event.data);
                if (event.data == YT.PlayerState.PLAYING) {
                    console.log("YouTube audio is playing");
                }
                if (event.data == YT.PlayerState.ENDED) {
                    player.playVideo();
                }
            }

            //Error catch
            function onPlayerError(event) {
                console.error("YouTube player error:", event.data);
            }

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
            /*Music url youtube*/
            function extractVideoId(url) {
                if (typeof url !== 'string' || url.trim() === '') {
                    console.error('Invalid URL provided to extractVideoId');
                    return null;
                }
                var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                var match = url.match(regExp);
                return (match && match[7].length == 11) ? match[7] : null;
            }

            muteButton.style.display = 'block'; // Show the mute button after successful submission 

            if (soundEffect !== 'none') {

                const audio = document.getElementById(soundEffect);
                audio.loop = true;
                audio.play();
                musicAudio = audio;
            } else if (selectedFile) {
                // User selected a file
                let selectedAudio = new Audio(URL.createObjectURL(selectedFile));
                selectedAudio.loop = true;
                selectedAudio.play();
                musicAudio = selectedAudio;
            } else if (selectedUrl) {
                // User pasted a URL
                let selectedAudio = new Audio(selectedUrl);
                selectedAudio.addEventListener("error", (e) => {
                    console.error("Error loading audio from URL:", e);
                });
                selectedAudio.loop = true;
                selectedAudio.play();
                musicAudio = selectedAudio;
            } else if (youtubeUrl) {
                const you = document.createElement("div");
                you.id = "youtube-audio-player";
                document.body.appendChild(you);
                if (typeof youtubeUrl !== 'string' || youtubeUrl.trim() === '') {
                    console.error("Invalid YouTube URL provided");
                    alert('Please enter a valid YouTube URL');
                    return;
                }
                console.log("YouTube URL:", youtubeUrl);
                let videoId = extractVideoId(youtubeUrl);
                console.log("Extracted Video ID:", videoId);
                if (videoId) {
                    console.log("Loading YouTube audio");
                    loadYouTubeAudio(videoId);
                    setTimeout(() => {
                        if (player) {
                            console.log("YouTube player created successfully");
                        } else {
                            console.error("Failed to create YouTube player");
                        }
                    }, 1000);
                } else {
                    console.error("Could not extract video ID from URL");
                    alert('Invalid YouTube URL. Please check the URL and try again.');
                }
            } else {
                console.log("No music selected");
            }
            if (selectedUrl || selectedFile) {
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
                const modal = document.getElementById("colorWarningModal");
                
                modal.style.display = "block";

                window.onclick = function (event) 
                {
                if (event.target == modal) {
                modal.style.display = "none";
                 }
                }
            } else if (unit === "unit") {
                const modal = document.getElementById("timeIntervalWarningModal");
                
                modal.style.display = "block";

                window.onclick = function (event) 
                {
                if (event.target == modal) {
                modal.style.display = "none";
                 }
                }
            } else if (view === "select") {
                const modal = document.getElementById("viewWarningModal");
            
                modal.style.display = "block";

                window.onclick = function (event) 
                {
                if (event.target == modal) {
                modal.style.display = "none";
                 }
                }
            } else if (countdownValue <= 0) {
                const modal = document.getElementById("countdownWarningModal");
                
                modal.style.display = "block";

                window.onclick = function (event) 
                {
                if (event.target == modal) {
                modal.style.display = "none";
                 }
                }
            } else if (soundEffect !== 'none' && selectedFile || soundEffect !== 'none' && youtubeUrl || youtubeUrl && selectedFile) {
                const modal = document.getElementById("noMusicFileWarningModal");
            
                modal.style.display = "block";

                window.onclick = function (event) 
                {
                if (event.target == modal) {
                modal.style.display = "none";
                 }
                }
            } else if (document.getElementById('PreviewButton').textContent === "Stop") {
                const modal = document.getElementById("stopPreviewWarningModal");
            
                modal.style.display = "block";

                window.onclick = function (event) 
                {
                if (event.target == modal) {
                modal.style.display = "none";
                 }
                }
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

    // let currentMusic;
    function pauseSimulation() {
        clearInterval(timerInterval);
        clearInterval(lightInterval);
        // document.getElementById('musicDropdown').style.display="none";
        if (musicAudio) {
            musicMuted = musicAudio.muted; // Remember the mute state
            musicAudio.pause();
        }
        else {
            musicMuted = selectedAudio.muted; // Remember the mute state
            selectedAudio.pause();
        }
        /*  document.getElementById('changeMusic').style.display = 'none';//to disable changing of music when simulation is paused. 
        pauseStartButton.textContent = 'Resume';
        isPaused = true;*/
        // console.log(musicAudio); testing

        pauseStartButton.innerHTML='<i class="fa-solid fa-play"></i>Resume';
        isPaused = true;

    }

    function resumeSimulation() {
        startCountdown(countdownValue);
        // if (!musicAudio) {
        musicAudio.play();

        document.getElementById('musicDropdown').style.display = "block";
        document.getElementById("changeMusic").style.display = 'block';

        startSimulation(
            document.getElementById("color").value,
            document.getElementById("time").value,
            document.getElementById("unit").value,
            document.getElementById("view").value,
            document.getElementById('color1').value,
            document.getElementById('color2').value
        );
        // console.log(musicAudio); testing
        /*let text = document.getElementById("pauseStartBtn").innerHTML;
        pauseStartButton.textContent = 'Pause';
        //pauseStartButton.textContent = document.getElementById("pauseStartBtn").innerHTML;
        isPaused = false;*/
        pauseStartButton.innerHTML = '<i class="fa-solid fa-pause"></i>Pause';
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
    snowflakes();
};
function snowflakes(){
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
}


    //the success and failure wale pop ups 
    const failNotif = document.getElementById('failnotification');
    const successNotif = document.getElementById('successnotification');
    const closeSuccess = document.getElementById('closeSuccessNotification');
    const closeFail = document.getElementById('closeFailNotification');

    const successMessage = document.getElementById('successmsg');
    const failMessage = document.getElementById('failmsg');   

    closeFail.addEventListener('click', () => {
        failNotif.style.display = 'none';
    })
    closeSuccess.addEventListener('click', () => {
        successNotif.style.display = 'none';
    })
    
    //in order to add these popups somewhere else please just use these call these two functions
    function showSuccess(message = 'Added Successfully!') {
        console.log('here')
        successNotif.style.display = 'flex';
        successMessage.textContent = message;
        setTimeout(() => {
            successNotif.style.display = 'none';
        }, 2000); // current timer is 2 secs. If you want to change, please also change the CSS animation 'timerline' duration accordingly
    }
  
    function showFailed(message = 'Failed!') {
        failNotif.style.display = 'flex';
        failMessage.textContent = message;
        setTimeout(() => {
            failNotif.style.display = 'none';
        }, 2000);
    }

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

            const musicAud = document.getElementById(selectedMusic);
            // musicAudio.loop = true;
            musicAud.play();
            musicAudio = musicAud; // Update currently playing audio reference
        }

        if (isPaused) {
            musicAudio.pause()
        }
        if (isMuted) {
            muteAudio();

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
    if(!sessionStorage.getItem('load')){
        setTimeout(effect, 4000);
    }
    else{
        effect();
        const modal = document.getElementById("warningModal");
        modal.style.display='none';
        document.querySelector(".navMain").style.visibility = "visible";
    }
    sessionStorage.setItem('load', true);
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
            if (!item.classList.contains('exclude')) {
                //elements under edit dropdown are a part of sidebar, so we put them under exclude to not have to account for their animation delay
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.remove('fade-out');
                item.classList.add('fade-in');
            }
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

// Preset saving and loading : 

document.getElementById('savePresetButton').addEventListener('click', namePreset);
document.getElementById('loadPresetButton').addEventListener('click', findPreset);

//saving
const savePresetModal= document.getElementById('addPresetModal'); 
const closeAddPresetModal= document.getElementById('closeAddPresetModal');
const presetName_input= document.getElementById('presetNameInput');
let presetName;

closeAddPresetModal.onclick = function () {
    savePresetModal.style.display = 'none';
}

//load modal on click
function namePreset(){
    savePresetModal.style.display='block';
    document.getElementById('namePresetButton').addEventListener('click', ()=>{
        presetName= presetName_input.value.trim();
        if (!presetName) {
            showFailed('Invalid name entered');
            }
        else{
            //go to save preset when valid name is entered
            savePreset();
        }
        savePresetModal.style.display='none';
    });
}


function savePreset() {

    //get all field values in input during preset saving
    let countdownValue = document.getElementById('countdown').value;
    let n = document.getElementById("color").value;
    let unit = document.getElementById("unit").value;
    let view = document.getElementById("view").value;
    let soundEffect = document.getElementById("sound").value;
    
    // Get selected audio file or URL
    let selectedFile = document.getElementById("music-file").files[0];
    let selectedUrl = document.getElementById("music-url").value;
    let youtubeUrl = document.getElementById("youtubeUrlInput").value.trim();
    
    
    if (countdownValue && countdownValue > 0 && Number(n) > 0 && Number.isInteger(Number(n)) && n !== "" && unit !== "unit" && view !== "select" && !(soundEffect !== 'none' && selectedFile) && !(soundEffect !== 'none' && selectedUrl) && !(selectedFile && selectedUrl) &&
            !(selectedFile && youtubeUrl) &&
            !(selectedUrl && youtubeUrl) && 
            !(soundEffect !== 'none' && youtubeUrl)){
                //conditions for valid execution of simulation

                const presetData = {
                    color: document.getElementById('color').value,
                    color1: document.getElementById('color1').value,
                    color2: document.getElementById('color2').value,
                    time: document.getElementById('time').value,
                    unit: document.getElementById('unit').value,
                    view: document.getElementById('view').value,
                    countdown: document.getElementById('countdown').value,
                    sound: document.getElementById('sound').value,
                    youtubeUrlInput: document.getElementById('youtubeUrlInput').value,
            
                };
            
                // Save data to localStorage
                localStorage.setItem(`preset-${presetName}`, JSON.stringify(presetData));

                showSuccess('Saved successfully')
            }
    else {
        // after unsuccessful saving of preset 
        showFailed("Please fill all required fields");
        return;
    }
}

//loading
const loadPresetModal= document.getElementById('loadPresetModal'); 
const closeLoadPresetModal= document.getElementById('closeLoadPresetModal');
const load_input= document.getElementById('presetNameLoadInput');
let loadName;

closeLoadPresetModal.onclick = function () {
    loadPresetModal.style.display = 'none';
}
//show modal for loading
function findPreset(){
    loadPresetModal.style.display='block';
    document.getElementById('loadButton').addEventListener('click', ()=>{
        loadName= load_input.value.trim();
        if (!loadName) {
            showFailed('Invalid name entered');
            }
        else{
            //go to load preset when entry is valid
            loadPreset();
        }
        loadPresetModal.style.display='none';
    });
}

function loadPreset() {
    const presetData = JSON.parse(localStorage.getItem(`preset-${loadName}`));
    if (!presetData) {
        //not in memory or not created 
        showFailed('Preset not found');
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

    showSuccess('Preset loaded!');
}

// const cursor = document.querySelector(".cursor");
// var timeout;
// document.addEventListener("mousemove", (e) => {
//     let x = e.pageX;
//     let y = e.pageY;

//     cursor.style.top = `${e.clientY}px`;
//     cursor.style.left = `${e.clientX}px`;
//     cursor.style.display = "block";

//     function mousestopped() {
//         cursor.style.display = "none";
//     }
//     clearTimeout(timeout);
//     timeout = setTimeout(mousestopped, 1000);

// });
// document.addEventListener("mouseout", () => {
//     cursor.style.display = "none";
// });

// document.querySelector('#ll').addEventListener("submit", (event) => {
//     if (document.querySelector("#name").value === " " && document.querySelector("#email").value === " ") {
//         event.preventDefault();
//     }
// });

// feedback 
// document.getElementById("CommentBtn").addEventListener("click", function () {
//     document.getElementById("modalBackground").style.display = "flex";
// });

// document.getElementById("modalBackground").addEventListener("click", function (event) {
//     if (event.target === this) {
//         this.style.display = "none";
//     }
// });

// document.querySelector("form").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form submission

//     // Show success message
//     document.getElementById("successMessage").style.display = "block";

//     // Hide success message after 3 seconds (3000 milliseconds)
//     setTimeout(function () {
//         document.getElementById("successMessage").style.display = "none";
//     }, 3000);

//     setTimeout(() => {
//         document.querySelector("form").reset();
//         alert("Form Submitted Successfully");
//     }, 3000)
//     setTimeout(() => {
//         location.reload();
//     }, 5000)
// });

document.addEventListener("ContentLoaded", () => {
    const btnn = document.querySelector(".btnna");
    const load = document.querySelector(".load");
    btnn.addEventListener("click", function (event) {
        const nameValue = document.querySelector("#name").value;
        const emailValue = document.querySelector("#email").value;
        const feedb = document.querySelector("#feed").value;

        if (nameValue.length > 0 && emailValue.length > 0 && feedb.length > 0) {
            btnn.style.display = "none";
            document.querySelector(".sidebarOne").style.display = 'none';
            load.style.display = "block";
        }
        else if (d) {

        }
        else {
            event.preventDefault();
            load.style.display = "none";
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
        CurrentAudio.addEventListener('ended', function () {
            isPlaying = false;
            previewButton.textContent = 'Preview';
        });
    }
});

// document.getElementById("submit").addEventListener("click", function() {
//     const pattern = document.getElementById("pattern").value;

//     // Clear any existing intervals to avoid overlapping patterns
//     const highestIntervalId = setInterval(() => {}, 1000);
//     for (let i = 0; i < highestIntervalId; i++) {
//         clearInterval(i);
//     }

//     // Reset the effects when "None" is selected
//     resetEffects();

//     switch(pattern) {
//         case "flashing":
//             flashingEffect();
//             break;
//         case "fading":
//             fadingEffect();
//             break;
//         case "cycling":
//             cyclingEffect();
//             break;
//         case "none":
//         default:
//             // Do nothing, as the resetEffects() will clear everything
//             break;
//     }
// });

function resetEffects() {
    document.body.style.opacity = 1; // Reset opacity
    document.body.style.backgroundColor = ""; // Clear background color
    document.body.classList.remove('light-on'); // Remove any toggled class
}

function flashingEffect() {
    const interval = 500; // Time in milliseconds
    setInterval(() => {
        document.body.classList.toggle('light-on'); // Toggle the class to flash the lights
    }, interval);
}

function fadingEffect() {
    let opacity = 0;
    let fadingIn = true;
    setInterval(() => {
        if (fadingIn) {
            opacity += 0.05;
            if (opacity >= 1) {
                fadingIn = false;
            }
        } else {
            opacity -= 0.05;
            if (opacity <= 0) {
                fadingIn = true;
            }
        }
        document.body.style.opacity = opacity;
    }, 50); // Adjust the interval for smoother or faster fading
}

function cyclingEffect() {
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]; // Add more colors if needed
    let index = 0;
    setInterval(() => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Cycle through the colors
    }, 1000); // Adjust the interval for faster or slower cycling
}
