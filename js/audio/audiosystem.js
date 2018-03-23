class Sound {
    constructor(path) {
        this.sound = new Audio(path);
        this.loop;
    }

    play () {
        if (this.loop) {
            this.sound.addEventListener("ended", function() {
                this.currentTime = 0;
                this.play();
            }, false);
            this.sound.play();
        } 
        else {
            this.sound.play();
        }
    }

    stop() {
        this.sound.pause();
        this.sound.currentTime = 0;
    }

    pause() {
        this.sound.pause();
    }

    withLoop() {
        this.loop = true;
        return this;
    }

    withVolumeLevel(level) {
        this.sound.volume = level;
        return this;
    }
}

class GameSound extends Sound {
    constructor(path) {
        super(path);
    }
}

class Music extends Sound {
    constructor(path) {
        super(path);
        this.withVolumeLevel(.7);
    }
}