window.addEventListener('DOMContentLoaded', async () => {
  const ul = document.querySelector('ul')
  window.item.send('list:read','List')
  window.item.receive('async:list:read', (data)=> {
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement('li')
      const bmore = createButton(data[i].id)
      li.innerText = data[i].libelle
      ul.appendChild(li)
    }
  });
  function createButton(id) {
    const b = document.createElement('button')
    b.innerText = 'voir +'
    b.addEventListener('click', () => {
      window.item.send('item:read', id)
    })
    return b
  }
})