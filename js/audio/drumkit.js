class Drumkit {
    constructor(img, x, y, width, height) {
        this.hiHat = new HiHat();
        this.kickDrum = new KickDrum();
        this.midTom = new MidTom();
        this.hiTom = new HiTom();
        this.floorTom = new FloorTom();
        this.snare = new Snare();
    }
}
