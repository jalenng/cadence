var MediaControls = require('./media-controls.js');
var WindowButton = require('./windowbtn.js');
var openAboutWindow = require('about-window').default;
var join = require('path').join;

const menuTemplate = [
	{
		role: 'fileMenu',
		submenu: [
			{
                label: 'Open',
                click() {openFile()},
            },
			{type: 'separator'},
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
                click() {PlayerModel.playPause()},
            },
			{role: 'separator'},
			{
                label: 'Skip Previous',
                click() {PlayerModel.skipPrevious()},
            },
			{
                label: 'Skip Next',
                click() {PlayerModel.skipNext()},
            },
			{role: 'separator'},
			{
				label: 'Toggle Shuffle',
                click() {PlayerModel.toggleShuffle()},
            },
			{
                label: 'Toggle Repeat',
                click() {PlayerModel.toggleRepeat()},
            },
            {role: 'separator'},
			{
				label: 'Volume Up',
                click() {PlayerModel.setVolumeBy(0.1)},
            },
			{
                label: 'Volume Down',
                click() {PlayerModel.setVolumeBy(-0.1)},
            },
            {
				label: 'Mute',
                click() {PlayerModel.toggleMute()},
            },
		]
	},
	{
		role: 'help',
		submenu: [
			{
				label: "About Cadence",
				click() {openAboutWindow({
					icon_path: join(__dirname, 'ico/AZCad.ico'),
					package_json_dir: __dirname,
					css_path: [
						join(__dirname, 'styles/about-styles.css')
					]
				});}
			},
			{label: 'Check for Updates'}
		]
	}
]

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));