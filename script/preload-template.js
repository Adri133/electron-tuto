const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  "api", {
    addItem: (channel, data) => {
      ipcRenderer.send(channel, data)
    }
  }
)