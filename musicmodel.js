var audioElement = document.createElement("AUDIO");
audioElement.addEventListener("play", () => {MusicModel.updatePlayPauseButtonIcon()});
audioElement.addEventListener("pause", () => {MusicModel.updatePlayPauseButtonIcon()});

class MusicModel {
    static playPause() {
        if (audioElement.paused) {
            audioElement.setAttribute("src", "Sunset.mp3");
            audioElement.load();
            audioElement.play();
        } else {
            audioElement.pause();
        }
        this.updatePlayPauseButtonIcon();
    }

    static updatePlayPauseButtonIcon() {
        document.getElementById("play-pause-icon").innerHTML = 
            audioElement.paused ? "play_arrow" : "pause";

        var seekUpdateInterval;
        if (audioElement.paused) {
            clearInterval(seekUpdateInterval);
        }
        else {
            seekUpdateInterval = setInterval(this.updateSeekSlider, 10)
        }
    }

    static skipPrevious() {
        console.log("skip previous");
    }

    static skipNext() {
        console.log("skip next");
    }

    static setVolume() {
        audioElement.volume = document.getElementById("volume-slider").value / 100;
        this.updateVolumeSliderValue();
    }

    static updateVolumeSliderValue() {
        document.getElementById("volume-slider").value = audioElement.volume * 100;
    }

    static seek() {
        audioElement.currentTime  = document.getElementById("seek-slider").value;
    }

    static updateSeekSlider() {
        document.getElementById("seek-slider").max = audioElement.duration;
        document.getElementById("seek-slider").value = audioElement.currentTime;
    }
}
