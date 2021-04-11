
class DrumKit{
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.kickSound = document.querySelector('.kick-sound');
        this.snareSound = document.querySelector('.snare-sound');
        this.hihatSound = document.querySelector('.hihat-sound');
        this.rideSound = document.querySelector('.ride-sound');
        this.playBtn = document.querySelector('.play');
        this.index = 0;
        this.bpm = 60;
        this.playPause;
    }
    repeat() {
        let step = this.index % 16;
        const activeBar = document.querySelectorAll(`.b${step}`);
        this.index++;
        console.log(activeBar);
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        this.playPause = setInterval(() => {
          this.repeat();
        }, interval);
    }
    stop() {
        clearInterval(this.playPause);
        this.index = 0;
    }
    activePad() {
        this.classList.toggle('active');
    }
}

const drumkit = new DrumKit();

drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad);
});

drumkit.playBtn.addEventListener('click',  () => {
    if (drumkit.playBtn.classList.contains("sound-playing")) {
      drumkit.stop();
      drumkit.playBtn.classList.remove("sound-playing");
    } else {
      drumkit.start();
      drumkit.playBtn.classList.add("sound-playing");
    }
});