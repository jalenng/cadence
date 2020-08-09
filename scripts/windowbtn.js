const Menu = require('electron').remote.Menu;
const currentWindow = require('electron').remote.getCurrentWindow();
const dialog = require('electron').remote.dialog;

function minimizeWindow() {
	currentWindow.minimize();
}

function maximizeWindow() {
	currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
	updateMaximizeButtonIcon();
}

function updateMaximizeButtonIcon() {
	document.getElementById("maximize-button-icon").innerHTML = 
		currentWindow.isMaximized() ? "fullscreen_exit" : "fullscreen";
}

function closeWindow() {
	currentWindow.close();
}

function menu() {
	Menu.getApplicationMenu().popup({
		window: currentWindow,
	});
}

function openFile() {
	var options = {
		// See place holder 1 in above image
		title : "Open", 
					
		// See place holder 4 in above image
		filters :[
			{name: 'All Audio Files', 
				extensions: ['wav', 'wave', 'mp3', 'mp4', 'm4a', 'm4p', 'm4r', 'm4v', '3gp', 'm4b', 'aac', 'ogg', 'ogv', 'oga', 'ogx', 'ogm', 'spx', 'opus', 'webm', 'flac']},
			{name: 'WAV Files', 
				extensions: ['wav', 'wave']},
			{name: 'MPEG Files', 
				extensions: ['mp3']},
			{name: 'MPEG-4 Files', 
				extensions: ['mp4', 'm4a', 'm4p', 'm4r', 'm4v']},
			{name: 'AAC Files', 
				extensions: ['m4a', 'mp4', '3gp', 'm4b', 'm4p', 'm4r', 'm4v', 'aac']},
			{name: 'Ogg Files', 
				extensions: ['ogg', 'ogv', 'oga', 'ogx', 'ogm', 'spx', 'opus']},
			{name: 'WebM Files', 
				extensions: ['webm']},
			{name: 'FLAC Files', 
				extensions: ['flac']},
			{name: 'All Files', 
				extensions: ['*']}
		],
		properties: ['openFile', 'multiSelections']
	}

	dialog.showOpenDialog(currentWindow, options).then(result => {
		if (!result.canceled) {
			for (var i = 0; i < result.filePaths.length; i++) {
				PlayerModel.load(result.filePaths[i]);
			}
		}
	}).catch(err => {
		console.log(err)
	})
}