window.addEventListener('DOMContentLoaded', async () => {
  const ul = document.querySelector('ul')
  window.item.send('item:read','Item')
  window.item.receive('async:item:read', (data)=> {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const element = array[i];
      
    }

  });

})