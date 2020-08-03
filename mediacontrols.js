var currentWindow = require('electron').remote.getCurrentWindow();
var jsmediatags = require("jsmediatags");
var url = require('url');
var fs = require('fs');

var srcOnLastUpdate;

class MediaControls {
    static update() {
        //update play-pause button
        document.getElementById("play-pause-icon").innerHTML = 
            audioElement.paused  ? "play_arrow" : "pause";

        //update seeker once
        this.updateSeeker();
        
        //set or clear continuous updating of seeker
        if (audioElement.paused) {
            clearInterval(seekUpdateInterval);
        }
        else {
            seekUpdateInterval = setInterval(this.updateSeeker, 10)
        }

        //update volume button
        document.getElementById("volume-button-icon").innerHTML = 
            audioElement.muted ? "volume_off" :
            audioElement.volume == 0 ? "volume_mute" :
            audioElement.volume < 0.5 ? "volume_down" : "volume_up";

        //update volume slider
        document.getElementById("volume-slider").value = audioElement.volume * 100;

        //fetching song metadata
        var path = url.fileURLToPath(audioElement.src.toString().replace(/\//g, "/"));
        if (srcOnLastUpdate != audioElement.src) {
            jsmediatags.read(path, { //slice to remove "file:///" header  
                onSuccess: function (tag) {
                    MediaControls.updateNowPlayingMetadata(tag, path);
                },
                onError: function (error) {
                    console.log('Error loading metadata: ' + path);
                }
            });
            srcOnLastUpdate = audioElement.currentSrc;
        }
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

    static updateNowPlayingMetadata(tag, path) {
        var tags = tag.tags;

        //update song title, artist name, and window title
        var nowPlayingText = path;
        var windowTitle = path;
        if (tags.title) {
            nowPlayingText = "<b>" + tags.title + "</b> • " + tags.artist;
            windowTitle = tags.title + " • " + tags.artist;
        }        
        document.getElementById("now-playing-text").innerHTML = nowPlayingText;
        currentWindow.title = windowTitle;

        //deals with album art
        var base64DataUri = "./media/AlbumDefault.png";
        var base64String = "";
        if (tags.picture) {
            for (var i = 0; i < tags.picture.data.length; i++) {
                base64String += String.fromCharCode(tags.picture.data[i]);
            }
            base64DataUri = "data:" + tags.picture.format + ";base64," + window.btoa(base64String);
        }

        //update now playing album art
        document.getElementById('now-playing-album-art').setAttribute('src', base64DataUri);

        //update media session
        navigator.mediaSession.metadata = new MediaMetadata({
            title: tags.title ? tags.title : path,
            artist: tags.title ? tags.artist : "",
            album: tags.album,
            artwork: [
                { src: this.base64ToDataUri(base64DataUri, 256, 256), sizes: '256x256', type: 'image/png' }
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