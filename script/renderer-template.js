const form = document.querySelector('form')
form.addEventListener('submit', submitForm)
function submitForm(e) {
  e.preventDefault();
  const data = document.querySelector('#input').value
  // ipcRenderer.send('item:add', data)
  if (data) {
    window.api.addItem("item:add", data)
  } else {
    console.log('Data obligatoire');
  }

}