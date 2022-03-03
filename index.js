const { app, BrowserWindow } = require('electron')
const path = require('path')
const shellModule = require("shell");

const WindowTitle = "Fortune"
const WindowIcon = "./package/icon.png"
const FortuneMain = "./static/ContentIndex.html"

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.setIcon(WindowIcon);
    win.setTitle(WindowTitle)
    win.loadFile(FortuneMain)

    win.webContents.on('new-window', function(e, url) {
        // make sure local urls stay in electron perimeter
        if ('file://' === url.substr(0, 'file://'.length)) {
            return;
        }

        // and open every other protocols on the browser      
        e.preventDefault();
        shellModule.openExternal(url);
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})