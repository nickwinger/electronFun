if (require('electron-squirrel-startup')) return;

const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const autoUpdater = electron.autoUpdater;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path');
const url = require('url');
var fs = require('fs');

global.mainWindow = undefined;
global.currentStage = undefined;

function createWindow () {
	// , webPreferences: { nodeIntegration: false }
  // Create the browser window.
  mainWindow = new BrowserWindow({transparent : true, frame: false, fullscreen: true, alwaysOnTop: true,
	skipTaskbar: true, kiosk: true, width: 1024, height: 768, title: 'Electron fun',
	movable: false, resizable: false});

	mainWindow.loadURL(`file://${__dirname}/index.html`);
		
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;

        // We only have one mainwindow so quit
        app.quit();
    });

	mainWindow.on('ready-to-show', function () {
		console.log('ready-to-show');
	});
		
	mainWindow.webContents.on('dom-ready', function() {
		
	});
	
	mainWindow.webContents.on('did-finish-load', function() {
		console.log('did-finish-load');
	});
	
    mainWindow.on('page-title-updated', function (event, title) {

    });


mainWindow.webContents.session.clearCache(function(){
//some callback.
});    
}

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

if (shouldQuit) {
    app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow();
  /*
  globalShortcut.register('Alt+Q', () => {
	app.quit();
  });*/
  
  globalShortcut.register('Alt+D', () => {
  return;
  
	mainWindow.toggleDevTools();
	mainWindow.setAlwaysOnTop(false);
  });
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
