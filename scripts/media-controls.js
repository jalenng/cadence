const currentWindow = require('electron').remote.getCurrentWindow();
const jsmediatags = require("jsmediatags");
const url = require('url');

var srcOnLastUpdate;

class MediaControls {
    static update() {
        //update play-pause button
        document.getElementById("play-pause-button").setAttribute("class", 
            audioElement.src == "" ? "btn-floating disabled grayed" :
            audioElement.paused ? "btn-floating pulse" : "btn-floating"
        );
        document.getElementById("play-pause-icon").innerHTML = 
            audioElement.paused  ? "play_arrow" : "pause";

        //update skip previous button
        document.getElementById("skip-previous-button").setAttribute("class", 
            PlayerModel.hasPrevious() ? "" : "disabled grayed"
        );

        //update skip next button
        document.getElementById("skip-next-button").setAttribute("class", 
            PlayerModel.hasNext() ? "" : "disabled grayed"
        );
        
        //update seeker once
        this.updateSeeker();
        
        //set or clear continuous updating of seeker
        if (audioElement.paused) 
            clearInterval(seekUpdateInterval);
        else 
            seekUpdateInterval = setInterval(this.updateSeeker, 10)

        //update repeat button
        document.getElementById("repeat-button").setAttribute("class", 
            repeatMode == 0 ? "grayed" : "");
        document.getElementById("repeat-button-icon").innerHTML = 
            repeatMode == 2 ? "repeat_one" : "repeat";

        //update volume button
        document.getElementById("volume-button-icon").innerHTML = 
            audioElement.muted ? "volume_off" :
            audioElement.volume == 0 ? "volume_mute" :
            audioElement.volume < 0.5 ? "volume_down" : "volume_up";

        //update volume slider
        document.getElementById("volume-slider").value = audioElement.volume * 100;

        //fetching song metadata
        if (audioElement.src != "") {
            var path = url.fileURLToPath(audioElement.src.toString().replace(/\//g, "/"));
            if (srcOnLastUpdate != audioElement.src) {
                jsmediatags.read(path, {
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

        // Configure Windows taskbar thumbnail toolbar
        var skipPreviousThumbarButton = {
            tooltip: 'Previous',
            icon: "media/thumbbar/skip_previous.png",
            click () { PlayerModel.skipPrevious() }
        };
        var playPauseThumbarButton = {
            tooltip: 'Play',
            icon: audioElement.paused ? "media/thumbbar/play_arrow.png" : "media/thumbbar/pause.png", 
            click () { PlayerModel.playPause() }
        };
        var skipNextThumbarButton =  {
            tooltip: 'Next',
            icon: "media/thumbbar/skip_next.png",
            click () { PlayerModel.skipNext() }
        };
        var thumbarButtons = [
            skipPreviousThumbarButton, 
            playPauseThumbarButton, 
            skipNextThumbarButton
        ];

        if (!PlayerModel.hasPrevious()) 
            skipPreviousThumbarButton.flags = ['disabled'];
        if (!PlayerModel.hasNext()) 
            skipNextThumbarButton.flags = ['disabled'];

        currentWindow.setThumbarButtons(thumbarButtons);
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
        //display file path if title does not exist
        var nowPlayingText = path;
        var windowTitle = path;
        if (tags.title) { //add title if it exists
            nowPlayingText = "<b>" + tags.title;
            windowTitle = tags.title; 

            //add artist
            if (tags.artist) {
                nowPlayingText += "</b> • " + tags.artist;
                windowTitle += " • " + tags.artist;
            }
        }        
        document.getElementById("now-playing-text").innerHTML = nowPlayingText;
        currentWindow.title = windowTitle;

        //deals with album art
        let base64DataUri = "./media/AlbumDefault.png";
        let base64String = "";
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

        let previousTrackActionHandlerFunction = 
            PlayerModel.hasPrevious() ? () => {PlayerModel.skipPrevious()} : null;
        navigator.mediaSession.setActionHandler('previoustrack', previousTrackActionHandlerFunction);
        
        let nextTrackActionHandlerFunction = 
            PlayerModel.hasNext() ? () => {PlayerModel.skipNext()} : null;
        navigator.mediaSession.setActionHandler('nexttrack', nextTrackActionHandlerFunction);
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