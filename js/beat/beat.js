class Beat {
    // An array of 16 booleans, each indicating 1/16th of a beat. If true, there is a hit at that position.
    constructor(beat16) {
        this._beat = beat16;
    }

    GetBeat() {
        return this._beat;
    }
}