const MediaControls = require('./mediacontrols.js');

const audioElement = document.createElement("AUDIO");

audioElement.addEventListener("play", () => {MediaControls.update()});
audioElement.addEventListener("pause", () => {MediaControls.update()});
audioElement.addEventListener("ended", () => {MusicModel.skipNext()});

var seekUpdateInterval;

class MusicModel {
    static playPause() {
        if (audioElement.paused) {
            audioElement.setAttribute("src", "Sunset.mp3");
            audioElement.load();
            audioElement.play();
        } else {
            audioElement.pause();
        }
        //audioElement's play/pause action listeners will update the icon
    }
    static skipPrevious() {
        console.log("skip previous");
    }
    static skipNext() {
        console.log("skip next");
    }
    static setVolume() {
        audioElement.volume = document.getElementById("volume-slider").value / 100;
        MediaControls.update();
    }

    static seek() {
        audioElement.currentTime  = document.getElementById("seek-slider").value;
        MediaControls.update()
    }
}