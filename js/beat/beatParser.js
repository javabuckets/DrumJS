class BeatParser {
    constructor(beatCollection) {
        this._beatCollection = beatCollection;
        this._hitCollection = [];
        this._timePerBeat = 0;
        this._startTime = 0;
    }

    // Gives every hit a time.
    InitializeBeats(timePerBeat) {
        this._startTime = Date.now();
        this._timePerBeat = timePerBeat;

        for (let i = 0; i < this._beatCollection.GetAmountOfBeats(); i++) {
            let beat = this._beatCollection.GetCollection()[i]
            for (let j = 0; j < 16; j++) {
                if (beat.GetBeat()[j] == true) {
                    // Calculate time for hit in ms.
                    this._hitCollection.push(this._startTime + j/16 * this._timePerBeat + i * this._timePerBeat);
                }
            }
        }

        console.log(this._hitCollection);
    }

    // Returns index of current beat in beatCollection.
    GetCurrentBeat() {
        let timeElapsed = Date.now() - this._startTime;
        return Math.floor(timeElapsed / this._timePerBeat);
    }

    // Returns index of next beat in beatCollection.
    GetNextBeat() {
        let timeElapsed = Date.now() - this._startTime;
        return Math.floor(timeElapsed / this._timePerBeat) + 1;
    }

    // Get the hit that is closest to given time.
    // TODO Binary search
    GetClosestHit(hitTime) {
        let shortest = 5000000;
        let closestHit;
        for (let i = 0; i < this._hitCollection.length; i++) {
            let diff = Math.abs(hitTime - this._hitCollection[i])
            if (diff < shortest) {
                shortest = diff;
                closestHit = this._hitCollection[i];
            }
        }
        return closestHit;
    }
}