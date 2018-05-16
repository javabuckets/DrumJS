class Game {
    constructor() {
        this.instance = this;
        this.canvas = document.querySelector("#canvas");
        this.context = canvas.getContext("2d");

        // Screen width/height reference
        this.screen = {width: this.canvas.clientWidth, height: this.canvas.clientHeight};

        // timer.js
        this.interval = 1000 / 60;
        this.startTime = Date.now();

        // StateMachine
        this.stateMachine = new StateMachine();
    }

    init() {
        // Event Handling
        this.canvas.addEventListener("keydown", (e) => this.processInput(e), false);

        // I am a fucking genius for fixing this,
        // used https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
        this.requestAnimationFrame(() => this.update());
    }

    requestAnimationFrame(updateFunction) {
        window.setTimeout(updateFunction, this.interval - (Date.now() - this.startTime));
    }

    update() {
        // Timer update
        this.startTime = Date.now();
        s_GameTime += 1; // Gametime since start of game in milliseconds

        // Game Logic
        this.stateMachine.ActiveState.UpdateGameLogic();

        // Render call
        this.context.clearRect(0, 0, screen.width, screen.height);
        this.stateMachine.ActiveState.RenderState(this.context);
        this.context.stroke();

        requestAnimationFrame(() => this.update());
    }


    processInput(e) {
        this.stateMachine.ActiveState.ProcessKey(e);
    }
}

