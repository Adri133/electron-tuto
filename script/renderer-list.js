window.addEventListener('DOMContentLoaded', async () => {
  const ul = document.querySelector('ul')
  window.item.send('item:read','Item')
  window.item.receive('async:item:read', (data)=> {
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement('li')
      const bDelete = createButton(data[i], 'delete')
      const bUpdate = createButton(data[i], 'update')
      li.innerText = data[i].libelle
      li.appendChild(bUpdate)
      li.appendChild(bDelete)
      ul.appendChild(li)
    }
  });

  function createButton(item, label) {
    const b = document.createElement('button')
    b.innerText = label
    b.addEventListener('click', () => {
      window.item.send('item:'+ label, item)
    })
    return b
  }
})