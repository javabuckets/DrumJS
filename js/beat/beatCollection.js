class BeatCollection {
    constructor() {
        this._beats = [];
    }

    // Add one beat to the end of the collection.
    AddBeat(beat) {
        this._beats.push(beat);
    }

    // Add multiple of the same beat to the end of the collection.
    AddMultipleBeats(beat, amount) {
        for (let i = 0; i < amount; i++) {
            this._beats.push(beat);
        }
    }

    // Returns the amount of beats in the collection.
    GetAmountOfBeats() {
        return this._beats.length;
    }

    GetCollection() {
        return this._beats;
    }

    // Set the collection to given array of beats.
    SetCollection(beats) {
        this._beats = beats;
    }
}