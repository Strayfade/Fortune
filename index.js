const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const WindowTitle = "Fortune"
const WindowIcon = "./package/icon.png"
const FortuneMain = "./static/ContentIndex.html"

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            zoomFactor: 0.75
        }
    })
    win.setIcon(WindowIcon);
    win.setTitle(WindowTitle)
    win.loadFile(FortuneMain)

    win.webContents.setWindowOpenHandler(({ url }) => {
        return { action: 'deny' };
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.applicationMenu = new Menu();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})