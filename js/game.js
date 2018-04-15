let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

// Screen width/height reference
let screen = {width: canvas.clientWidth, height: canvas.clientHeight};

// Event Handling
canvas.addEventListener("keydown", processInput, false);

// Timer
let interval = 1000/60;
let startTime = Date.now();
let timer = 0.0;

// Function for requesting next frame
let requestAnimationFrame = function(update) { window.setTimeout(update, interval - (Date.now() - startTime)); };

let imgDrum;
let alienAnim;
let drumkit;

function init() {
    imgDrum = new StaticSprite(images[0], 10, 300, 100, 100);
    alienAnim = new AnimatedSprite(images[1], 4, 0.3, DrawState.INDEF, screen.width/2- 50, screen.height/2 - 50, 100, 100);
    alienAnimRight = new AnimatedSprite(images[1], 4, 0.3, DrawState.ONCE, screen.width - 150, screen.height/2 - 50, 100, 100);

    //TEMPORARY
    drumkit = new Drumkit();

    requestAnimationFrame(update);
}

function update() {
    // Timer stuff
    startTime = Date.now();
    timer += 1000/60;

    // Game Logic

    // Render call
    render();

    requestAnimationFrame(update);
}

function render() {
    context.clearRect(0, 0, screen.width, screen.height);
    alienAnim.Draw(context);
    alienAnimRight.Draw(context);
    imgDrum.Draw(context);
    context.font = "30px Arial";
    context.fillText(timer, 10, 50)
}

// a, s, d, f, h, j, k, l
function processDrumKey(e) {
    switch (e.keyCode) {
        case 65: { // a
            drumkit.kickDrum.playLight();
            return;
        }
        case 83: { // s
            drumkit.hiHat.playLight();
            return;
        }
        case 68: { // d
            drumkit.crash.playLight();
            return;
        }
        case 70: { // f
            return;
        }
        case 85: { // u
            drumkit.snare.playLight();
            return;
        }
        case 73: { // i
            drumkit.floorTom.playLight();
            return;
        }
        case 79: { // o
            drumkit.midTom.playLight();
            return;
        }
        case 80: { // p
            drumkit.hiTom.playLight();
            return;
        }
        case 72: { // h
            drumkit.snare.playLight();
            return;
        }
    }
}

function processInput(e) {
    switch (e.keyCode) {
        case 74: { // j Button for "play"
            alienAnimRight.DrawOnce();
            was.play();
            return;
        }
        case 75: { // k for "loop"
            nana.play();
            return;
        }
        case 76: { // l for "stop"
            nana.stop();
            return;
        }
    }

    processDrumKey(e);

    
}

