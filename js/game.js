let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

// Screen width/height reference
let screen = {width: canvas.clientWidth, height: canvas.clientHeight};

// Event Handling
canvas.addEventListener("keydown", processInput, false);

// Function for requesting next frame
let requestAnimationFrame = function(update) { window.setTimeout(update, 1000/60); };

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
}

function processInput(e) {
    switch (e.keyCode) {
        case 80: { // P Button for "play"
            alienAnimRight.DrawOnce();
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
        case 68: { // d
            drumkit.kickDrum.playLight();
            break;
        }
    }
}