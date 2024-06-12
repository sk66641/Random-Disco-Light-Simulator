function startSimulation() {
    const numColors = document.getElementById('num-colors').value;
    const gradientStart = document.getElementById('gradient-start').value;
    const gradientEnd = document.getElementById('gradient-end').value;
    const interval = document.getElementById('interval').value;
    const viewType = document.getElementById('view-type').value;
    const shapes = Array.from(document.getElementById('shapes').selectedOptions).map(option => option.value);
    const customPattern = document.getElementById('custom-pattern').files[0];
    const timer = document.getElementById('timer').value;
    const soundEffect = document.getElementById('sound-effect').files[0];

    // Convert custom pattern to base64
    let customPatternSrc = '';
    if (customPattern) {
        const reader = new FileReader();
        reader.onload = function(e) {
            customPatternSrc = e.target.result;
            initParticles(numColors, gradientStart, gradientEnd, interval, viewType, shapes, customPatternSrc);
        };
        reader.readAsDataURL(customPattern);
    } else {
        initParticles(numColors, gradientStart, gradientEnd, interval, viewType, shapes, '');
    }

    // Handle sound effect
    if (soundEffect) {
        const audio = new Audio(URL.createObjectURL(soundEffect));
        audio.play();
    }

    // Set countdown timer
    if (timer) {
        setTimeout(() => {
            // Stop simulation after timer ends
            particlesJS('particles-js', { "particles": { "number": { "value": 0 } } });
        }, timer * 1000);
    }
}

function initParticles(numColors, gradientStart, gradientEnd, interval, viewType, shapes, customPatternSrc) {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": numColors,
                "density": {
                    "enable": true,
                    "value_area": 600
                }
            },
            "color": {
                "value": [gradientStart, gradientEnd]
            },
            "shape": {
                "type": shapes.length > 0 ? shapes : "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "image": {
                    "src": customPatternSrc,
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 1.8,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": interval,
                    "opacity_min": 1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            }
        },
        "retina_detect": true
    });
}
