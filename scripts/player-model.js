var MediaControls = require('./scripts/media-controls.js');
var List = require("collections/list");

var audioElement = document.createElement("AUDIO");

audioElement.addEventListener("play", () => {MediaControls.update()});
audioElement.addEventListener("pause", () => {MediaControls.update()});
audioElement.addEventListener("ended", () => {
    if (repeatMode == 0 && nowPlayingList[track + 1] != null) {
        PlayerModel.skipNext();
        PlayerModel.play();
    }
    else if (repeatMode == 1) {
        track = 0;
        audioElement.src = nowPlayingList.get(0);
        PlayerModel.play();
    }
    else if (repeatMode == 2) {
        PlayerModel.play();
    }
});

var nowPlayingList = new Array();
var seekUpdateInterval;
var playPromise;
var loadPromise;
var track = 0;
var repeatMode = 0; //0: no repeat, 1: repeat queue, 2: repeat song

class PlayerModel {
    static playPause() {
        if (audioElement.paused)
            this.play();
        else 
            this.pause();
        //audioElement's play/pause action listeners will update the icon
    }
    static play() {
        playPromise = audioElement.play();
    }
    static pause() {
        if (playPromise !== undefined) 
            playPromise.then(() => audioElement.pause())
    }
    static skipPrevious() {
        var pausedBeforeSkip = audioElement.paused;
        track = track - 1;
        audioElement.src = nowPlayingList.get(track);
        if (!pausedBeforeSkip) {
            this.play();
        }
        MediaControls.update();
    }
    static skipNext() {
        var pausedBeforeSkip = audioElement.paused;
        track = track + 1;
        audioElement.src = nowPlayingList.get(track);
        if (!pausedBeforeSkip) {
            this.play();
        }
        MediaControls.update();
    }
    static toggleMute() {
        audioElement.muted = !audioElement.muted;
        MediaControls.update();
    }
    static setVolume() {
        audioElement.volume = document.getElementById("volume-slider").value / 100;
        MediaControls.update();
    }
    static setVolumeBy(num) {
        audioElement.volume += num;
        MediaControls.update();
    }
    static seek() {
        audioElement.currentTime  = document.getElementById("seek-slider").value;
        MediaControls.update()
    }
    static toggleShuffle() {
        console.log("shuffle");
    }
    static toggleRepeat() {
        repeatMode = (repeatMode + 1) % 3;
        MediaControls.update();
    }
    static load(src) {
        nowPlayingList.push(src);
        console.log(nowPlayingList);
        if (audioElement.src == "") {
            audioElement.src = nowPlayingList.get(track);
        }
        MediaControls.update();
    }
}

module.exports = PlayerModel;