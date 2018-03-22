let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

// Screen width/height reference
let screen = {width: canvas.clientWidth, height: canvas.clientHeight};

canvas.addEventListener("keydown", processInput, false);

// Objects
let drum = {x: screen.width/2 - 50, y: screen.height/2 - 50, w: 100, h: 100};

// Sounds
let was = new Audio("./sounds/was.mp3");

let imgDrum = new Image();
imgDrum.src = "./images/drum.png";
imgDrum.addEventListener("load", init, false);

// Function for requesting next frame
let requestAnimationFrame = window.requestAnimationFrame || 
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            function (callback) {
                                window.setTimeout(callback, 1000/60);
                            };

function init() {
    requestAnimationFrame(update);
}

function update() {

    // Render call
    render();

    requestAnimationFrame(update);
}

function render() {
    context.clearRect(0, 0, screen.width, screen.height);
    context.drawImage(imgDrum, drum.x, drum.y, drum.w, drum.h);
}

function processInput(e) {
    console.log(e.keyCode);
    was.play();

    // switch (e.keyCode) {
        
    // }
}