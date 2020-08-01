const remote = require('electron').remote;
const Menu = require('electron').Menu;

function minimizeWindow() {
	var win = remote.getCurrentWindow();
	win.minimize();
}

function maximizeWindow() {
	var win = remote.getCurrentWindow();
	win.isMaximized() ? win.unmaximize() : win.maximize();
	updateMaximizeButtonIcon();
}

function updateMaximizeButtonIcon() {
	var win = remote.getCurrentWindow();
	document.getElementById("maximize-button-icon").innerHTML = 
		win.isMaximized() ? "fullscreen_exit" : "fullscreen";
}

function closeWindow() {
	var win = remote.getCurrentWindow();
	win.close();
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
	var win = remote.getCurrentWindow();
	Menu.getApplicationMenu().popup(win);
}