var MediaControls = require('./mediacontrols.js');

// run on program startup
audioElement.src = "Sunset.mp3";
audioElement.load();
MediaControls.update();