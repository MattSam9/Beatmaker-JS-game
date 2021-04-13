class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.rideSound = document.querySelector(".ride-sound");
    this.otherSound = document.querySelector(".other-sound");
    this.extendSound = document.querySelector(".extend-sound");
    this.playBtn = document.querySelector(".play");
    this.resetBtn = document.querySelector(".reset");
    this.deselectBtn = document.querySelector(".deselect");
    this.selectSounds = document.querySelectorAll(".select-container select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.bpmChange = document.querySelector('#slider');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }
  repeat() {
    let step = this.index % 16;
    const activeBar = document.querySelectorAll(`.b${step}`);
    activeBar.forEach((bar) => {
      bar.style.animation = `playTrack 0.2s ease-in-out alternate 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
        if (bar.classList.contains("ride-pad")) {
          this.rideSound.currentTime = 0;
          this.rideSound.play();
        }
        if (bar.classList.contains("other-pad")) {
          this.otherSound.currentTime = 0;
          this.otherSound.play();
        }
        if (bar.classList.contains("extend-pad")) {
          this.extendSound.currentTime = 0;
          this.extendSound.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      this.playBtn.innerText = "Pause";
      this.playBtn.classList.add('active');
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove('active');
    }
  }
  reset() {
    this.index = 0;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    this.playBtn.innerText = "Play";
    this.playBtn.classList.remove("active");
  }
  activePad() {
    this.classList.toggle("active");
  }
  deselectPad() {
    this.pads.forEach((pad) => {
      pad.classList.remove("active");
    });
  }
  changeSound(event) {
    switch (event.target.name) {
      case "kick-select":
        this.kickSound.src = event.target.value;
        break;
      case "snare-select":
        this.snareSound.src = event.target.value;
        break;
      case "hihat-select":
        this.hihatSound.src = event.target.value;
        break;
      case "ride-select":
        this.rideSound.src = event.target.value;
        break;
      case "other-select":
        this.otherSound.src = event.target.value;
        break;
      case "extend-select":
        this.extendSound.src = event.target.value;
        break;
    }
  }
  mute(event) {
    event.target.classList.toggle("active");
    const muteIndex = event.target.getAttribute("data-track");
    if (event.target.innerHTML === `<i class="volume"></i>`) {
      event.target.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    } else {
      event.target.innerHTML = `<i class="volume"></i>`;
    }
    if (event.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 0;
          break;
        case "1":
          this.snareSound.volume = 0;
          break;
        case "2":
          this.hihatSound.volume = 0;
          break;
        case "3":
          this.rideSound.volume = 0;
          break;
        case "4":
          this.otherSound.volume = 0;
          break;
        case "5":
          this.extendSound.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 1;
          break;
        case "1":
          this.snareSound.volume = 1;
          break;
        case "2":
          this.hihatSound.volume = 1;
          break;
        case "3":
          this.rideSound.volume = 1;
          break;
        case "4":
          this.otherSound.volume = 1;
          break;
        case "5":
          this.extendSound.volume = 1;
          break;
      }
    }
  }
  bpmText(event) {
    const sliderText = document.querySelector('.slider-text');
    sliderText.innerText = event.target.value;
  }
  changeTempo(event) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    this.bpm = event.target.value;
    const playBtn = document.querySelector('.play');
    if (playBtn.classList.contains('active')) {
      this.start();
    }
  }
}

const drumkit = new DrumKit();

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumkit.playBtn.addEventListener("click", () => {
  drumkit.start();
});

drumkit.resetBtn.addEventListener("click", () => {
  drumkit.reset();
});

drumkit.deselectBtn.addEventListener("click", function () {
  drumkit.deselectPad();
});

drumkit.selectSounds.forEach((select) => {
  select.addEventListener("change", function (event) {
    drumkit.changeSound(event);
  });
});

drumkit.muteBtn.forEach((item) => {
  item.addEventListener("click", (event) => {
    drumkit.mute(event);
  });
});

drumkit.bpmChange.addEventListener('input', function (event) {
  drumkit.bpmText(event);
});

drumkit.bpmChange.addEventListener('change', function (event) {
  drumkit.changeTempo(event);
});
