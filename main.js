const { app, BrowserWindow, Menu, ipcMain, dialog, Notification } = require('electron')
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
      preload: path.join(app.getAppPath(), 'view/preload-list.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
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
      preload:path.join(app.getAppPath(), 'view/preload-template.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    parent: w
  })
  win.loadFile('view/template.html')
}

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})


ipcMain.on('item:add', (e , data) => {
  // dialog.showMessageBox({
  //   type: 'info',
  //   title: 'Item ajouté',
  //   message: 'Bravo vous avez ajouté un item'
  // })
  const notif = new Notification({
    title: 'Item ajouté',
    body: 'Bravo vous avez ajouté un item',
    icon: 'assets/check_one_icon.png'
  })
  w.webContents.send('item:add', data)
  // BrowserWindow.fromWebContents(e.sender).close();
  notif.show()
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