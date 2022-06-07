// const ipcRenderer = require('electron').ipcRenderer;
    const ul = document.querySelector('ul')
    // ipcRenderer.on('item:add', (e, data) => (
    //   ul.innerHTML = data
    // ))
    window.item.receive('item:add', (data) => {
      ul.innerHTML = data
    })