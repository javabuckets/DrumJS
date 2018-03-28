// Use AnimatedSprite and StaticSprite for all images in the game.
class Sprite {
    constructor(path, x, y, width, height) {
        this.img = new Image();
        this.img.src = path;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class AnimatedSprite extends Sprite {
    constructor(path, nrOfSprites, secondsPerImage, context, x, y, width, height) {
        super(path, x, y, width, height);
        this.srcWidth = this.img.width;
        this.srcHeight = this.img.height;
        this.updatesPerImage = Math.floor(60.0 * secondsPerImage); // 60 fps hardcoded for now.
        this.updateCounter = 0;
        this.nrOfSprites = nrOfSprites;

        // Draw() variables
        this.xInterval = Math.floor(this.srcWidth / this.nrOfSprites);
        this.srcX = 0;
        this.srcY = 0;
        this.spritesDrawn = 1;
    }
    
    Draw () {
        if (this.updateCounter >= this.updatesPerImage) {
            this.updateCounter = 0;
            this.spritesDrawn++;
            this.srcX += this.xInterval;
            if (this.spritesDrawn == this.nrOfSprites + 1) {
                this.srcX = 0;
                this.spritesDrawn = 1;
            }
        }

        this.updateCounter++;
        context.drawImage(this.img, this.srcX, this.srcY, this.xInterval, this.srcHeight, this.x, this.y, this.width, this.height)
    }

}

class StaticSprite extends Sprite {
    constructor(path, context, x, y, width, height) {
        super(path, x, y, width, height);
    }

    Draw () {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}