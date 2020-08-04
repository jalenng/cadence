var MediaControls = require('./mediacontrols.js');

const menuTemplate = [
	{
		role: 'fileMenu',
		submenu: [
			{role: 'quit'},
		]
	},
	{
		role: 'viewMenu',
		submenu: [
			{role: 'resetzoom'},
			{role: 'zoomin'},
			{role: 'zoomout'},
			{type: 'separator'},
			{role: 'togglefullscreen'},
			{role: 'reload'},
		]
	},
	{
	  label: 'Playback',
	  submenu: [
            {
                label: 'Play/Pause',
                click() {MusicModel.playPause()},
            },
			{role: 'separator'},
			{
                label: 'Skip Previous',
                click() {MusicModel.skipPrevious()},
            },
			{
                label: 'Skip Next',
                click() {MusicModel.skipNext()},
            },
			{role: 'separator'},
			{
				label: 'Toggle Shuffle',
                click() {MusicModel.toggleShuffle()},
            },
			{
                label: 'Toggle Repeat',
                click() {MusicModel.toggleRepeat()},
            },
            {role: 'separator'},
			{
				label: 'Volume Up',
                click() {MusicModel.setVolumeBy(0.1)},
            },
			{
                label: 'Volume Down',
                click() {MusicModel.setVolumeBy(-0.1)},
            },
            {
				label: 'Mute',
                click() {MusicModel.toggleMute()},
            },
		]
	},
	{
		role: 'help',
		submenu: [
			{role: 'about'},
			{label: 'Check for Updates'}
		]
	}
]

// run on program startup
audioElement.src = "Sunset.mp3";
audioElement.load();
MediaControls.update();

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));