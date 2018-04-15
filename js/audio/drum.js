class Drum {
    constructor(lightSound) {
      this._soundAmount = 10;
      this._lightSound = lightSound;
      this._counter = 0;
      this._sounds = [];
      this.prepareSounds();
    }

    prepareSounds() {
        for (let i = 0; i < this._soundAmount; i++) {
            this._sounds.push(new GameSound(this._lightSound).withVolumeLevel(1));
        }
    }

    playLight() {
        this._sounds[this._counter].play();
        (this._counter < this._soundAmount - 1) ? this._counter++ : this._counter = 0;
    }
}

class HiHat extends Drum {
    constructor() {
        super(DS_OpenHiHat);
    }
}

class KickDrum extends Drum {
    constructor() {
        super(DS_KickDrum);
    }
}

class FloorTom extends Drum {
    constructor() {
        super(DS_FloorTom);
    }
}

class MidTom extends Drum {
    constructor() {
        super(DS_MidTom);
    }
}

class HiTom extends Drum {
    constructor() {
        super(DS_HiTom);
    }
}

class Snare extends Drum {
    constructor() {
        super(DS_Snare);
    }
}

