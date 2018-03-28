// Use AnimatedSprite and StaticSprite for all images in the game.
class Sprite {
    constructor(img, x, y, width, height) {
        this._img = img;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class AnimatedSprite extends Sprite {
    /**
     * @param  {Image} img - Image with sprites for the animation.
     * @param  {int} nrOfSprites - Amount of sprites in supplied image file.
     * @param  {float} secondsPerImage - How many seconds before moving to next image.
     * @param  {DrawState} drawState - For how long should the image be drawn.
     * @param  {int} x - Canvas coordinate.
     * @param  {int} y - Canvas coordinate.
     * @param  {int} width - Desired width of sprite.
     * @param  {int} height - Desired height of sprite.
     */
    constructor(img, nrOfSprites, secondsPerImage, drawState, x, y, width, height) {
        super(img, x, y, width, height);
        this.drawState = drawState;

        this._srcWidth = this._img.width;
        this._srcHeight = this._img.height;
        this._updatesPerImage = Math.floor(60.0 * secondsPerImage); // 60 fps hardcoded for now.
        this._updateCounter = 0;
        this._nrOfSprites = nrOfSprites;
        this._drawOnce = false;

        // Draw() variables
        this._xInterval = Math.floor(this._srcWidth / this._nrOfSprites);
        this._srcX = 0;
        this._srcY = 0;
        this._spritesDrawn = 1;
    }

    Draw (context) {
        if (this.drawState == DrawState.INDEF){
            if (this._updateCounter >= this._updatesPerImage) {
                this._updateCounter = 0;
                this._spritesDrawn++;
                this._srcX += this._xInterval;
                if (this._spritesDrawn == this._nrOfSprites + 1) {
                    this._srcX = 0;
                    this._spritesDrawn = 1;
                }
            }

            this._updateCounter++;
            context.drawImage(this._img, this._srcX, this._srcY, this._xInterval, this._srcHeight, this.x, this.y, this.width, this.height);
        }

        else if (this.drawState == DrawState.ONCE && this._drawOnce) {
            if (this._updateCounter >= this._updatesPerImage) {
                this._updateCounter = 0;
                this._spritesDrawn++;
                this._srcX += this._xInterval;
                if (this._spritesDrawn == this._nrOfSprites + 1) {
                    this._srcX = 0;
                    this._spritesDrawn = 1;
                    this._drawOnce = false;
                }
            }

            this._updateCounter++;
            context.drawImage(this._img, this._srcX, this._srcY, this._xInterval, this._srcHeight, this.x, this.y, this.width, this.height);
        }
        
    }

    DrawOnce() {
        this._drawOnce = true;
        this._srcX = 0;
        this._spritesDrawn = 1;
    }

}

class StaticSprite extends Sprite {
    /**
     * @param  {Image} img - Image with sprites for the animation.
     * @param  {int} x - Canvas coordinate.
     * @param  {int} y - Canvas coordinate.
     * @param  {int} width - Desired width of sprite.
     * @param  {int} height - Desired height of sprite.
     */
    constructor(img, x, y, width, height) {
        super(img, x, y, width, height);
    }

    Draw (context) {
        context.drawImage(this._img, this.x, this.y, this.width, this.height);
    }
}