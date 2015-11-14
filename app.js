
var app = require('app');

var BrowserWindow = require('browser-window');




require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
	
	if (process.platform != 'darwin') {
		app.quit();
	}

});

app.on('ready', function() {
	
	mainWindow = new BrowserWindow({width: 1200, height: 600, icon: __dirname+ "/assets/imagens/app.png"});
	
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	
	
	mainWindow.openDevTools();
	
	mainWindow.on('closed', function() {
		
		mainWindow = null;
	});
});

