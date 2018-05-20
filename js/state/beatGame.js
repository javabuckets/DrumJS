// Rhythm game - Press 'u' every second to gain points and keep the counter up.
class BeatGame {
    constructor() {
        // Sprites
        this._imgDrum = new StaticSprite(images[0], 10, 300, 100, 100);
        this._alienAnim = new AnimatedSprite(images[1], 4, 0.3, DrawState.INDEF, screen.width / 2 - 50, screen.height / 2 - 50, 100, 100);
        this._alienAnimRight = new AnimatedSprite(images[1], 4, 0.3, DrawState.ONCE, screen.width - 150, screen.height / 2 - 50, 100, 100);

        // Drumkit
        this._drumkit = new Drumkit();

        this.beatParser;
        this._initialize();

        this.difference = 0;
        this._lastHitPC = 0;
        this._lastHit = 0;
        this.time = 0;
    }

    _initialize() {
        let hitArray = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
        let beatCollection = new BeatCollection();
        beatCollection.AddMultipleBeats(new Beat(hitArray), 50);
        this.beatParser = new BeatParser(beatCollection);
        this.beatParser.InitializeBeats(9000);
    }

    UpdateGameLogic() {
        this.time = Date.now();
        let closestHit = this.beatParser.GetClosestHit(this.time);
        console.log(this.beatParser.GetCurrentBeat());

        if (Math.abs(this.time - closestHit) < 20 && closestHit != this._lastHitPC) {
            this._lastHitPC = closestHit;
            this._drumkit.hiHat.playLight();
        }
    }


    RenderState(context) {
        context.rect(250, 350, 300, 100);
        context.fillText(this.difference.toFixed(2), 300, 50, 50);

    }

    _hit() {
        let closestHit = this.beatParser.GetClosestHit(this.time);
        this.difference = Math.abs(this.time - closestHit);
    }
    _processDrumKey(e) {
        switch (e.keyCode) {
            case 65: { // a
                this._drumkit.kickDrum.playLight();
                this._hit();
                return;
            }
            case 83: { // s
                this._drumkit.hiHat.playLight();
                return;
            }
            case 68: { // d
                this._drumkit.crash.playLight();
                return;
            }
            case 70: { // f
                return;
            }
            case 85: { // u
                this._drumkit.snare.playLight();
                this._hitDrum(Turn.PLAYER1);
                return;
            }
            case 73: { // i
                this._drumkit.floorTom.playLight();
                return;
            }
            case 79: { // o
                this._drumkit.midTom.playLight();
                return;
            }
            case 80: { // p
                this._drumkit.hiTom.playLight();
                return;
            }
            case 72: { // h
                this._drumkit.snare.playLight();
                return;
            }
            case 77: { // m
                this._drumkit.snare.playLight();
                this._hitDrum(Turn.PLAYER2);
                return;
            }
        }

    }

    ProcessKey(e) {
        switch (e.keyCode) {
            case 74: { // j Button for "play"
                this._alienAnimRight.DrawOnce();
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