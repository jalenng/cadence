const { app, BrowserWindow } = require('electron')
const fs = require('fs');

function createWindow() {
	// Create the browser window.
	let win = new BrowserWindow({
		width: 1280,
		height: 800,
		minWidth: 720,
		backgroundColor: '#2e2c29',
		frame: false,
		enableRemoteModule: true,
		webPreferences: {
			nodeIntegration: true
		}
	})

	// and load the index.html of the app.
	win.loadFile('index.html')

	// Open the DevTools.
	win.webContents.openDevTools()
}

app.on('ready', () => {
	
});

app.setUserTasks([
	{
		program: process.execPath,
		arguments: '--new-window',
		iconPath: process.execPath,
		iconIndex: 0,
		title: 'New Window',
		description: 'Create a new window'
	}
])

app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

