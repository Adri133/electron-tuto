window.addEventListener('DOMContentLoaded', async () => {
  const ul = document.querySelector('ul')
  window.item.send('item:read','Item')
  window.item.receive('async:item:read', (data)=> {
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement('li')
      li.innerText = data[i].libelle
      ul.appendChild(li)
    }
  });

})