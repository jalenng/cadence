const currentWindow = require('electron').remote.getCurrentWindow();
const Menu = require('electron').Menu;

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
	var menu = Menu.buildFromTemplate([
		{
			label: 'Menu',
			submenu: [
				{ label: 'Adjust Notification Value' },
				{ label: 'CoinMarketCap' },
				{ label: 'Exit' }
			]
		}
	])
	Menu.setApplicationMenu(menu);
	Menu.getApplicationMenu().popup(currentWindow);
}