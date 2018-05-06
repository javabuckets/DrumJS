// Rhythm game - Press 'u' every second to gain points and keep the counter up.
class TestState {
    constructor() {
        // Sprites
        this.imgDrum = new StaticSprite(images[0], 10, 300, 100, 100);
        this.alienAnim = new AnimatedSprite(images[1], 4, 0.3, DrawState.INDEF, screen.width / 2 - 50, screen.height / 2 - 50, 100, 100);
        this.alienAnimRight = new AnimatedSprite(images[1], 4, 0.3, DrawState.ONCE, screen.width - 150, screen.height / 2 - 50, 100, 100);

        // Drumkit
        this.drumkit = new Drumkit();

        this.meter = 0;
        this.turn = Turn.COMPUTER;
        this.hitCounter = 0;

        // Hit Logic
        this.LastHitNode;
    }

    UpdateGameLogic() {

        if (this.turn == Turn.COMPUTER) {
            if (gameTimer % 60 == 0 && this.hitCounter < 4) {
                this.drumkit.kickDrum.playLight();
                this.hitCounter++;
            }

            else if (this.hitCounter == 4 && ((gameTimer / 60) - Math.round(gameTimer / 60)) < 0) {
                this.hitCounter = 0;
                this.turn = Turn.PLAYER1;
                console.log("Hello");
            }
        }

        else if (this.turn == Turn.PLAYER1) {
            if (gameTimer % 60 == 0 && this.hitCounter < 4) {
                this.drumkit.kickDrum.playLight();
                this.hitCounter++;
            }

            else if (this.hitCounter == 4 && ((gameTimer / 60) - Math.round(gameTimer / 60)) < 0) {
                this.hitCounter = 0;
                this.turn = Turn.PLAYER2;
            }
        }

        else if (this.turn == Turn.PLAYER2) {
            if (gameTimer % 60 == 0 && this.hitCounter < 4) {
                this.drumkit.kickDrum.playLight();
                this.hitCounter++;
            }

            else if (this.hitCounter == 4 && ((gameTimer / 60) - Math.round(gameTimer / 60)) < 0) {
                this.hitCounter = 0;
                this.turn = Turn.COMPUTER;
            }
        }

    }

    HitDrum(player) {
        if (this.turn == Turn.PLAYER1 && player == Turn.PLAYER1) {
            if (Math.round(gameTimer / 60) == this.LastHitNode) {
                this.meter -= 1;
            }
            else {
                this.LastHitNode = Math.round(gameTimer / 60);
                this.meter += 1 - (Math.abs(this.LastHitNode - gameTimer / 60));
            }
        }
        else if (this.turn == Turn.PLAYER2 && player == Turn.PLAYER2) {
            if (Math.round(gameTimer / 60) == this.LastHitNode) {
                this.meter -= 0.2;
            }
            else {
                this.LastHitNode = Math.round(gameTimer / 60);
                this.meter -= 1 - (Math.abs(this.LastHitNode - gameTimer / 60));
            }
        }
    }

    RenderState(context) {
        this.alienAnim.Draw(context);
        this.alienAnimRight.Draw(context);
        this.imgDrum.Draw(context);
        context.font = "30px Arial";
        context.fillText(this.meter.toFixed(2), 50, 50, 50);
        context.fillText((gameTimer/60).toFixed(2), 300, 50, 50);
        context.fillText(this.turn, 600, 50, 50);
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
                this.HitDrum(Turn.PLAYER1);
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
            case 77: { // m
                this.drumkit.snare.playLight();
                this.HitDrum(Turn.PLAYER2);
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