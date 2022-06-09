window.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('form')
  let title = document.createElement('h1')
  const el = document.querySelector('#input')
  let item
  setTitle()
  window.api.getItem('async:update', (data)=> {
    console.log(data);
    item = data
    setTitle()
    el.value = item.libelle
  });

  form.prepend(title)
  form.addEventListener('submit', submitForm)
  function submitForm(e) {
    e.preventDefault();
    if (item) {
      updateItem({id: item.id, libelle: el.value})
    } else {
      addItem(el.value)
    }
  }

  function addItem(data) {
    if (data) {
      window.api.send("item:add", data)
    } else {
      console.log('Data obligatoire');
    }
  }

  function updateItem(data) {
    if (data) {
      window.api.send("item:update:persist", data)
    } else {
      console.log('Data obligatoire');
    }
  }

  function setTitle() {
    if (item) {
      title.innerText = 'Mise à jour' 
    } else {
      title.innerText = 'Ajout' 
    }
  }
})