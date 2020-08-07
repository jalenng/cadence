const {app, path, BrowserWindow, BrowserView} = require('electron');
const fs = require('fs');

try {
	require('electron-reloader')(module);
} catch (_) {}

function createWindow() {
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
	
	// Open the DevTools.
	win.webContents.openDevTools();

}

// Set up Windows taskbar jump list
app.setUserTasks([
	{
		program: process.execPath,
		arguments: '--new-window',
		iconPath: process.execPath,
		iconIndex: 0,
		title: 'New Window',
		description: 'Create a new window'
	}
]);

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
})

