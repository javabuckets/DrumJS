let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

// Screen width/height reference
let screen = {width: canvas.clientWidth, height: canvas.clientHeight};

// Event Handling
canvas.addEventListener("keydown", processInput, false);

// Game Objects
let drum = {x: screen.width/2 - 50, y: screen.height/2 - 50, w: 100, h: 100};

// Function for requesting next frame
let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000/60); };

function init() {
    requestAnimationFrame(update);
}

function update() {
    // Game Logic

    // Render call
    render();

    requestAnimationFrame(update);
}

function render() {
    context.clearRect(0, 0, screen.width, screen.height);
    context.drawImage(imgDrum.img, drum.x, drum.y, drum.w, drum.h);
}

function processInput(e) {
    console.log(e.keyCode);

    switch (e.keyCode) {
        case 80: { // P Button for "play"
            was.play();
            break;
        }
        case 76: { // L for "loop"
            was2.play();
            break;
        }
        case 83: { // S for "stop"
            was.stop();
            was2.stop();
            break;
        }
    }
}

// Starts the game
init();