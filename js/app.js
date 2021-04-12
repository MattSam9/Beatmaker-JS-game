
class DrumKit{
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.kickSound = document.querySelector('.kick-sound');
        this.snareSound = document.querySelector('.snare-sound');
        this.hihatSound = document.querySelector('.hihat-sound');
        this.rideSound = document.querySelector('.ride-sound');
        this.playBtn = document.querySelector('.play');
        this.resetBtn = document.querySelector('.reset');
        this.deselectBtn = document.querySelector('.deselect');
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
    }
    repeat() {
        let step = this.index % 16;
        const activeBar = document.querySelectorAll(`.b${step}`);
        activeBar.forEach((bar) => {
          bar.style.animation = `playTrack 0.2s ease-in-out alternate 2`;
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickSound.currentTime = 0;
                    this.kickSound.play();
              }
                if (bar.classList.contains('snare-pad')) {
                    this.snareSound.currentTime = 0;
                    this.snareSound.play();
              }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatSound.currentTime = 0;
                    this.hihatSound.play();
              }
                if (bar.classList.contains('ride-pad')) {
                    this.rideSound.currentTime = 0;
                    this.rideSound.play();
              }
          }
        });
        this.index++;
        console.log(step);
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
            this.playBtn.innerText = "Pause";
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.playBtn.innerText = "Play";
        }
    }
    reset() {
        this.index = 0;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        this.playBtn.innerText = "Play";
    }
    activePad() {
        this.classList.toggle('active');
    }
    deselectPad() {
        this.pads.forEach(pad => {
           pad.classList.remove('active');
        });
    }
}

const drumkit = new DrumKit();

drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

drumkit.playBtn.addEventListener('click', () => {
    drumkit.start();
});

drumkit.resetBtn.addEventListener('click', () => {
    drumkit.reset();
});

drumkit.deselectBtn.addEventListener('click', function () {
    drumkit.deselectPad();
});