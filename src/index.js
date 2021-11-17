const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const path = require('path');
const { execFile } = require('child_process');
const { Request } = require('zeromq');

const mode = process.env.NODE_ENV || 'production';

let proc;
let sock;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

if (mode === 'development') {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
		awaitWriteFinish: true,
	});
}

const spawnBackend = () => {
	const fname = process.platform === 'win32' ? 'aatriserver2.exe' : 'aatriserver2';
	proc = execFile(path.join(__dirname, '../public', fname));
	connectBackend();
};

const killBackend = () => {
	proc.kill();
	proc = null;
};

const connectBackend = () => {
	sock = new Request;
	sock.connect('tcp://127.0.0.1:4747');

	ipcMain.on('decode', async (event, method, data) => {
		await sock.send([method, data]);
		const [msg] = await sock.receive();
		event.returnValue = msg.toString();
	});
};

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1600,
		height: 900,
		webPreferences: { 
			nodeIntegration: true,
			preload: path.join(__dirname, '../src/preload.js'),
		},
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
	// Open the DevTools.
	if (mode === 'development') {
		mainWindow.webContents.openDevTools();
	}
};

app.on('ready', spawnBackend);

app.on('will-quit', killBackend);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
