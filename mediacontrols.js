const currentWindow = require('electron').remote.getCurrentWindow();
const jsmediatags = require("jsmediatags");
const fs = require('fs');

class MediaControls {
    static update() {
        //update play-pause button
        document.getElementById("play-pause-icon").innerHTML = 
            audioElement.paused  ? "play_arrow" : "pause";

        //set or clear continuous updating of seeker
        if (audioElement.paused) {
            clearInterval(seekUpdateInterval);
        }
        else {
            seekUpdateInterval = setInterval(this.updateSeeker, 10)
        }

        //update volume slider
        document.getElementById("volume-slider").value = audioElement.volume * 100;

        //fetching song metadata
        jsmediatags.read(audioElement.currentSrc.slice(8), { //slice to remove "file:///" header  
            onSuccess: function (tag) {
                MediaControls.updateNowPlayingMetadata(tag);
            },
            onError: function (error) {
                console.log('Error loading metadata: ', error.type, error.info);
            }
        });
    }

    static updateSeeker() {
        //update seek bar
        document.getElementById("seek-slider").value = audioElement.currentTime;
        document.getElementById("seek-slider").max = audioElement.duration;

        //update seek times
        var currentTimeMinutes = Math.floor(audioElement.currentTime / 60);
        var currentTimeSeconds = Math.floor(audioElement.currentTime % 60);
        var durationMinutes = Math.floor(audioElement.duration / 60);
        var durationSeconds = Math.floor(audioElement.duration % 60);

        var paddedcurrentTimeSeconds = ("" + currentTimeSeconds).padStart(2, '0');
        var paddedDurationSeconds = ("" + durationSeconds).padStart(2, '0');

        document.getElementById("seek-current-time").innerHTML = currentTimeMinutes + ":" + paddedcurrentTimeSeconds;
        document.getElementById("seek-duration").innerHTML = durationMinutes + ":" + paddedDurationSeconds;
    }

    static updateNowPlayingMetadata(tag) {
        var tags = tag.tags;

        //update song title and artist name
        document.getElementById("now-playing-song-title").innerHTML = tags.title;
        document.getElementById("now-playing-artist").innerHTML = tags.artist;

        //update window title
        var windowTitle = tags.title + " - " + tags.artist;
        currentWindow.title = windowTitle;

        //deals with album art
        var base64DataUri;
        var base64String = "";
        if (tags.picture) {
            for (var i = 0; i < tags.picture.data.length; i++) {
                base64String += String.fromCharCode(tags.picture.data[i]);
            }
        }

        //update now playing album art
        base64DataUri = "data:" + tags.picture.format + ";base64," + window.btoa(base64String);                
        document.getElementById('now-playing-album-art').setAttribute('src', base64DataUri);

        //update media session
        navigator.mediaSession.metadata = new MediaMetadata({
            title: tags.title,
            artist: tags.artist,
            album: tags.album,
            artwork: [
                { src: this.base64ToDataUri(base64DataUri, 512, 512), sizes: '512x512', type: 'image/png' }
            ]
        });
    }

    static base64ToDataUri(base64DataUri, width, height) {
        var img = new Image;
        img.src = base64DataUri;

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
    
        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;
    
        // draw source image into the off-screen canvas:
        ctx.drawImage(img, 0, 0, width, height);
    
        // encode image to data-uri with base64 version of compressed image
        return canvas.toDataURL();
    }
}

module.exports = MediaControls;