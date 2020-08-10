const WindowButton = require('./scripts/windowbtn.js');
const openAboutWindow = require('about-window').default;
const join = require('path').join;

// about dialog
function createAboutDialog() {
	let win = new BrowserWindow({
		width: 1280,
		height: 800,
		minWidth: 720,
		minHeight: 800,
		backgroundColor: '#2e2c29',
		frame: false,
		enableRemoteModule: true,
		icon: "ico/AZCad.ico",
		webPreferences: {
			nodeIntegration: true
		}
	})

	win.loadFile('index.html');
	
	// Open the DevTools
	win.webContents.openDevTools();
}

const menuTemplate = [
	{
		role: 'fileMenu',
		submenu: [
			{
				label: 'Open',
				accelerator: 'CmdOrCtrl+O',
                click() {openFile()},
            },
			{type: 'separator'},
			{
				role: 'quit',
				accelerator: 'CmdOrCtrl+Shift+Q',
			},
		]
	},
	{
		role: 'viewMenu',
		submenu: [
			{
				role: 'zoomin',
				accelerator: 'CmdOrCtrl+numadd'
			},
			{
				role: 'zoomout',
				accelerator: 'CmdOrCtrl+numsub'
			},
			{
				role: 'resetzoom',
				accelerator: 'CmdOrCtrl+0'
			},
			{type: 'separator'},
			{
				role: 'togglefullscreen',
				accelerator: 'Alt+Enter'
			},
			{role: 'reload'},
		]
	},
	{
	  label: 'Playback',
	  submenu: [
            {
				label: 'Play/Pause',
				accelerator: 'Space',
                click() {PlayerModel.playPause()},
            },
			{role: 'separator'},
			{
				label: 'Skip Previous',
				accelerator: 'CmdOrCtrl+Left',
                click() {PlayerModel.skipPrevious()},
            },
			{
				label: 'Skip Next',
				accelerator: 'CmdOrCtrl+Right',
                click() {PlayerModel.skipNext()},
            },
			{role: 'separator'},
			{
				label: 'Toggle Shuffle',
				accelerator: 'CmdOrCtrl+S',
                click() {PlayerModel.toggleShuffle()},
            },
			{
				label: 'Toggle Repeat',
				accelerator: 'CmdOrCtrl+R',
                click() {PlayerModel.toggleRepeat()},
            },
            {role: 'separator'},
			{
				label: 'Volume Up',
				accelerator: 'CmdOrCtrl+Up',
                click() {PlayerModel.setVolumeBy(0.1)},
            },
			{
				label: 'Volume Down',
				accelerator: 'CmdOrCtrl+Down',
                click() {PlayerModel.setVolumeBy(-0.1)},
            },
            {
				label: 'Toggle Mute',
				accelerator: 'CmdOrCtrl+M',
                click() {PlayerModel.toggleMute()},
            },
		]
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'About Cadence',
				accelerator: 'F1',
				click() {openAboutWindow({
					win_options: {
						parent: currentWindow,
						width: 640,
						height: 360,
						resizable: false,
						fullscreenable: false,
						modal: true,
						frame: false
					},
					icon_path: join(__dirname, 'ico/AZCad.ico'),
					package_json_dir: __dirname,
					about_page_dir: __dirname,
					show_close_button: 'Close'
				});}
			},
			{label: 'Check for Updates'}
		]
	}
]
MediaControls.update();
Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));