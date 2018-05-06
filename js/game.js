let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

// Screen width/height reference
let screen = {width: canvas.clientWidth, height: canvas.clientHeight};

// Event Handling
canvas.addEventListener("keydown", processInput, false);

// timer.js
let interval = 1000/60;
let startTime = Date.now();
let gameTimer = 0;

// StateMachine
let stateMachine;

// Function for requesting next frame
let requestAnimationFrame = function(update) { window.setTimeout(update, interval - (Date.now() - startTime)); };

function init() {
    stateMachine = new StateMachine();
    requestAnimationFrame(update);
}

function update() {
    // Timer update
    startTime = Date.now();
    gameTimer += 1; // Gametime since start of game in miliseconds

    // Game Logic
    stateMachine.ActiveState.UpdateGameLogic();

    // Render call
    context.clearRect(0, 0, screen.width, screen.height);
    stateMachine.ActiveState.RenderState(context);
    context.stroke();

    requestAnimationFrame(update);
}

function processInput(e) {
    stateMachine.ActiveState.ProcessKey(e);
}

