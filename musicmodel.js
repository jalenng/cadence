var MediaControls = require('./mediacontrols.js');
var List = require("collections/list");

var audioElement = document.createElement("AUDIO");

audioElement.addEventListener("play", () => {MediaControls.update()});
audioElement.addEventListener("pause", () => {MediaControls.update()});
audioElement.addEventListener("ended", () => {
    if (nowPlayingList[track + 1] != null) {
        MusicModel.skipNext();
        MusicModel.play();
    }
});

var nowPlayingList = new Array();
var seekUpdateInterval;
var playPromise;
var track = 0;

class MusicModel {
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
        audioElement.load();
        if (!pausedBeforeSkip) {
            this.play();
        }
        MediaControls.update();
    }
    static skipNext() {
        var pausedBeforeSkip = audioElement.paused;
        track = track + 1;
        audioElement.src = nowPlayingList.get(track);
        audioElement.load();
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
        console.log("repeat");
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

module.exports = MusicModel;