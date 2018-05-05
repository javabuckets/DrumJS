// Rythm game - Press 'u' every second to gain points and keep the counter up.
class TestState {
    constructor() {
        // Sprites
        this.imgDrum = new StaticSprite(images[0], 10, 300, 100, 100);
        this.alienAnim = new AnimatedSprite(images[1], 4, 0.3, DrawState.INDEF, screen.width / 2 - 50, screen.height / 2 - 50, 100, 100);
        this.alienAnimRight = new AnimatedSprite(images[1], 4, 0.3, DrawState.ONCE, screen.width - 150, screen.height / 2 - 50, 100, 100);

        // Drumkit
        this.drumkit = new Drumkit();

        this.timer = 0;
        this.timeHit = 0;
        this.points = 10;
    }

    UpdateGameLogic() {
        if (gameTimer % 60 == 0) {
            this.points -= 0.95;
            this.drumkit.kickDrum.playLight();
        }
    }


    RenderState(context) {
        this.alienAnim.Draw(context);
        this.alienAnimRight.Draw(context);
        this.imgDrum.Draw(context);
        context.font = "30px Arial";
        context.fillText(this.points.toFixed(2), 50, 50, 50)
    }

    _processDrumKey(e) {
        switch (e.keyCode) {
            case 65: { // a
                this.drumkit.kickDrum.playLight();
                return;
            }
            case 83: { // s
                this.drumkit.hiHat.playLight();
                return;
            }
            case 68: { // d
                this.drumkit.crash.playLight();
                return;
            }
            case 70: { // f
                return;
            }
            case 85: { // u
                this.drumkit.snare.playLight();
                this.points += 1 - (Math.abs(Math.round(gameTimer / 60) - gameTimer / 60));
                return;
            }
            case 73: { // i
                this.drumkit.floorTom.playLight();
                return;
            }
            case 79: { // o
                this.drumkit.midTom.playLight();
                return;
            }
            case 80: { // p
                this.drumkit.hiTom.playLight();
                return;
            }
            case 72: { // h
                this.drumkit.snare.playLight();
                return;
            }
        }

    }


    ProcessKey(e) {
        switch (e.keyCode) {
            case 74: { // j Button for "play"
                this.alienAnimRight.DrawOnce();
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
        this._processDrumKey(e)
    }
}