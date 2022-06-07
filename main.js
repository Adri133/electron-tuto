const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const menu = [
  {
    label : 'File',
    submenu : [
      {
        label: 'New item',
        click() {
          createNewWindow()
        }
      },
      {
        label: 'Quit',
        accelerator: 'CommandOrControl+Q',
        click() {
          app.quit()
        }
      }
    ]
  }
]
const createWidow = () => {
  const win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile('index.html')
  return win
}
let w
app.whenReady().then(()=> {
  w = createWidow()
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  const mainMenu  = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
})

const createNewWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    parent: w
  })
  win.loadFile('template.html')
}

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

ipcMain.on('item:add', (e , data) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Item ajouté',
    message: 'Bravo vous avez ajouté un item'
  })
  w.webContents.send('item:add', data)
  BrowserWindow.fromWebContents(e.sender).close();
})

if (process.env.NODE_ENV !== 'production') {
  menu.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform ==='darwin' ? 'Command+I' : 'Ctrl+I',

        click(item, focusedWindow) {
          focusedWindow.webContents.toggleDevTools()
        }
      }, 
      {
        role: 'reload'
      }
    ]
  })
}