const ipcRenderer = require('electron').ipcRenderer
const form = document.querySelector('form')
form.addEventListener('submit', submitForm)
function submitForm(e) {
  e.preventDefault();
  const data = document.querySelector('#input').value
  console.log(data);
  ipcRenderer.send('item:add', data)

}