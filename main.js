const { app, BrowserWindow, Menu } = require('electron')
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
    parent: w
  })
  win.loadFile('template.html')
}

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})