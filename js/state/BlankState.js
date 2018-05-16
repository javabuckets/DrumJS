// A state with minimal functionality
class BlankState {
    constructor() {
        // Sprites
        this._imgDrum = new StaticSprite(images[0], 10, 300, 100, 100);
        this._alienAnim = new AnimatedSprite(images[1], 4, 0.3, DrawState.INDEF, screen.width / 2 - 50, screen.height / 2 - 50, 100, 100);
        this._alienAnimRight = new AnimatedSprite(images[1], 4, 0.3, DrawState.ONCE, screen.width - 150, screen.height / 2 - 50, 100, 100);
    }

    UpdateGameLogic() {
    }

    RenderState(context) {
        context.rect(250, 350, 300, 100);

        context.fillRect(390, 350, 20, 100);
    }

    ProcessKey(e) {
    }
}