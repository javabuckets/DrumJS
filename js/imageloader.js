// Use images[] array to refer to images, as it ensures the image is loaded.
// Add images here.

var paths = [
    "./images/drum.png",
    "./images/BlueMonster.png"
]

var images = [];
var counter = 0;
paths.forEach(element => {
    let img = new Image();
    img.onload = () => { 
        counter++;
        checkCounter();
    }
    img.src = element;
    images.push(img);
});

function checkCounter() {
    if (counter == images.length) {
        let game = new Game();
        game.init();
    }
}