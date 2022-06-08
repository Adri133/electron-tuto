const { app, BrowserWindow, Menu, ipcMain, dialog, Notification, getCurrentWindow } = require('electron')
const path = require('path')
const database = require('./model/Database')
const Item = require('./model/item')
const db = new database('list.db')
const items = new Item(db)
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
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'script/preload-list.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  })
  win.loadFile('template/index.html')
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
      preload:path.join(app.getAppPath(), 'script/preload-template.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    parent: w
  })
  win.loadFile('template/template.html')
}

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

ipcMain.on('item:read', (e, data) => {
  items.getItems().then(
    data => {
      w.webContents.send('async:item:read', data)
    }
  )
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
  items.addItems(data)
  .then(
    () => {
      w.webContents.send('item:add', data)
      w.reload()
    },
    error => console.log(error)
  )

  // BrowserWindow.fromWebContents(e.sender).close();
  notif.show()
})

ipcMain.on('item:delete', (e, data) => {
  items.deleteItem(data).then(
    () => {
      w.reload()
    },
    error => console.log(error)
  )
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

