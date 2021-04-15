class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.op1Sound = document.querySelector(".op1-sound");
    this.op2Sound = document.querySelector(".op2-sound");
    this.op3Sound = document.querySelector(".op3-sound");
    this.playBtn = document.querySelector(".play");
    this.resetBtn = document.querySelector(".reset");
    this.deselectBtn = document.querySelector(".deselect");
    this.selectSounds = document.querySelectorAll(".select-container select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.bpmChange = document.querySelector("#slider");
    this.volumeSlider = document.querySelectorAll(".volume-slider");
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
        if (bar.classList.contains("op1-pad")) {
          this.op1Sound.currentTime = 0;
          this.op1Sound.play();
        }
        if (bar.classList.contains("op2-pad")) {
          this.op2Sound.currentTime = 0;
          this.op2Sound.play();
        }
        if (bar.classList.contains("op3-pad")) {
          this.op3Sound.currentTime = 0;
          this.op3Sound.play();
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
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  reset() {
    clearInterval(this.isPlaying);
    this.index = 0;
    this.isPlaying = null;
    this.playBtn.innerText = "Play";
    this.playBtn.classList.remove("active");
  }
  activePad(pad) {
    if (pad.classList.contains("active")) {
      pad.classList.remove("active");
      this.deselectBtn.innerText = "Select All";
    } else {
      pad.classList.add("active");
      this.deselectBtn.innerText = "Deselect All";
    }
  }
  deselectPad() {
    let flag = true;
    let btnNameFlag = false;
    this.pads.forEach((pad) => {
      if (pad.classList.contains("active")) {
        flag = false;
      }
    });
    this.pads.forEach((pad) => {
      if (flag) {
        pad.classList.add("active");
        btnNameFlag = true;
      } else {
        pad.classList.remove("active");
      }
    });

    if (btnNameFlag) {
      this.deselectBtn.innerText = "Deselet All";
    } else {
      this.deselectBtn.innerText = "Selet All";
    }
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
      case "op1-select":
        this.op1Sound.src = event.target.value;
        break;
      case "op2-select":
        this.op2Sound.src = event.target.value;
        break;
      case "op3-select":
        this.op3Sound.src = event.target.value;
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
          this.op1Sound.volume = 0;
          break;
        case "4":
          this.op2Sound.volume = 0;
          break;
        case "5":
          this.op3Sound.volume = 0;
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
          this.op1Sound.volume = 1;
          break;
        case "4":
          this.op2Sound.volume = 1;
          break;
        case "5":
          this.op3Sound.volume = 1;
          break;
      }
    }
  }
  bpmText(event) {
    const sliderText = document.querySelector(".slider-text");
    sliderText.innerText = event.target.value;
  }
  changeTempo(event) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    this.bpm = event.target.value;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
  changeVolume(event) {
    const slideVolume = Math.round(event.target.value / 10)/10;
    switch (event.target.name) {
      case 'kick-volume':
        this.kickSound.volume = slideVolume;
        break;
      case 'snare-volume':
        this.snareSound.volume = slideVolume;
        break;
      case 'hihat-volume':
        this.hihatSound.volume = slideVolume;
        break;
      case 'op1-volume':
        this.op1Sound.volume = slideVolume;
        break;
      case 'op2-volume':
        this.op2Sound.volume = slideVolume;
        break;
      case 'op3-volume':
        this.op3Sound.volume = slideVolume;
        break;
    }
  }
}

const drumkit = new DrumKit();

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", () =>{
    drumkit.activePad(pad);
});
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

drumkit.volumeSlider.forEach(slide => {
  slide.addEventListener('change', (event) => { drumkit.changeVolume(event); });
});