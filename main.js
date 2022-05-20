const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const search = document.getElementById('filter');
const itemArray = localStorage.getItem('listKey') == null ? [] : JSON.parse(localStorage.getItem('listKey'));

for (let i = 0; i < itemArray.length; i++) {
  const newRow = document.createElement('li');
  newRow.id = i;
  newRow.className = 'list-group-item';
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('X'));

  newRow.appendChild(document.createTextNode(itemArray[i]));
  newRow.appendChild(deleteBtn);
  itemList.appendChild(newRow);
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const newItem = document.getElementById('item').value;
  document.getElementById('item').value = '';
  const newRow = document.createElement('li');
  newRow.id = itemArray.length;
  newRow.className = 'list-group-item';
  itemArray.push(newItem);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('X'));

  newRow.appendChild(document.createTextNode(newItem));
  newRow.appendChild(deleteBtn);
  itemList.appendChild(newRow);

  localStorage.setItem('listKey', JSON.stringify(itemArray));
});

itemList.addEventListener('click', e => {
  if(e.target.classList.contains('delete')) {
    const deleteRow = e.target.parentElement;

    itemArray.splice(deleteRow.id, 1);

    for (let i = parseInt(deleteRow.id) + 1; i < itemList.children.length; i++) {
      itemList.children[i].id -= 1; 
    }

    itemList.removeChild(deleteRow);

    localStorage.setItem('listKey', JSON.stringify(itemArray));
  }
});

search.addEventListener('keyup', e => {
  const searchText = e.target.value;

  const itemsCollection = itemList.getElementsByTagName('li');

  Array.from(itemsCollection).forEach(function(item) {
    const itemText = item.firstChild.textContent;
    if (itemText.toLowerCase().indexOf(searchText.toLowerCase()) == -1) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
    }
  });
});