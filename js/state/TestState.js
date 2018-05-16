// Rhythm game - Press 'u' every second to gain points and keep the counter up.
class TestState {
    constructor() {
        // Sprites
        this._imgDrum = new StaticSprite(images[0], 10, 300, 100, 100);
        this._alienAnim = new AnimatedSprite(images[1], 4, 0.3, DrawState.INDEF, screen.width / 2 - 50, screen.height / 2 - 50, 100, 100);
        this._alienAnimRight = new AnimatedSprite(images[1], 4, 0.3, DrawState.ONCE, screen.width - 150, screen.height / 2 - 50, 100, 100);

        // Drumkit
        this._drumkit = new Drumkit();

        this._meter = 0;
        this._turn = Turn.COMPUTER;
        this._skipTurn = false;

        this._hitCounter = 0;

        // Hit Logic
        this._lastHitNode;

        // Winner logic
        this._winner = null;
        this._winningPoint = 4;
    }

    UpdateGameLogic() {
        if (this._winner == null) {
            // Turns
            if (this._turn == Turn.COMPUTER) {
                if (this._skipTurn == false) {
                    this._takeTurn(Turn.PLAYER1);
                }
                else {
                    this._takeTurn(Turn.PLAYER2);
                }

            }
            else if (this._turn == Turn.PLAYER1) {
                this._takeTurn(Turn.COMPUTER);
                this._skipTurn = true;
            }
            else if (this._turn == Turn.PLAYER2) {
                this._takeTurn(Turn.COMPUTER);
                this._skipTurn = false;
            }

            // Meter checking
            this._checkMeter(this._winningPoint)
        }
    }

    _checkMeter(winningPoint) {
        if (this._meter > winningPoint) {
            this._winner = "Player 1";
        }
        else if (this._meter < -winningPoint) {
            this._winner = "Player 2";
        }
    }


    _takeTurn(nextTurn) {
        if (s_GameTime % 60 == 0 && this._hitCounter < 4) {
            if (this._turn == Turn.COMPUTER) {
                this._drumkit.kickDrum.playLight();
            }
            this._hitCounter++;
        }

        else if (this._hitCounter == 4 && ((s_GameTime / 60) - Math.round(s_GameTime / 60)) < 0) {
            this._hitCounter = 0;
            this._turn = nextTurn;
        }
    }

    _hitAccuracy() {
        if (Math.round(s_GameTime / 60) == this._lastHitNode) {
            return 0;
        }
        else {
            this._lastHitNode = Math.round(s_GameTime / 60);
            return 1 - (Math.abs(this._lastHitNode - s_GameTime / 60));
        }
    }

    _hitDrum(player) {
        if (this._turn == Turn.PLAYER1 && player == Turn.PLAYER1) {
            let accuracy = this._hitAccuracy();
            this._meter += accuracy == 0 ? -1 : accuracy;
        }

        else if (this._turn == Turn.PLAYER2 && player == Turn.PLAYER2) {
            let accuracy = this._hitAccuracy();
            this._meter -= accuracy == 0 ? -1 : accuracy;
        }
    }

    RenderState(context) {
        context.rect(250, 350, 300, 100);

        context.fillRect(390 - (this._meter / this._winningPoint) * 140, 350, 20, 100);


        context.font = "30px Arial";
        context.fillText(this._meter.toFixed(2), 50, 50, 50);
        context.fillText((s_GameTime/60).toFixed(2), 300, 50, 50);
        context.fillText(this._turn, 550, 50, 50);

        if (this._winner != null) {
            context.fillText(this._winner + " is the winner!", 350, 200, 200);
        }

    }

    _processDrumKey(e) {
        switch (e.keyCode) {
            case 65: { // a
                this._drumkit.kickDrum.playLight();
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