window.addEventListener('DOMContentLoaded', async () => {
  const ul = document.querySelector('ul')
  window.item.send('item:read','Item')
  window.item.receive('async:item:read', (data)=> {
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement('li')
      const button = createButton(data[i].id)
      li.innerText = data[i].libelle
      li.appendChild(button)
      ul.appendChild(li)
    }
  });

  function createButton(id) {
    const b = document.createElement('button')
    b.innerText = 'Supprimer'
    b.addEventListener('click', () => {
      window.item.send('item:delete', id)
    })
    return b
  }
})