var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var search = document.getElementById('filter');
const itemArray = localStorage.getItem('listKey') == null ? [] : JSON.parse(localStorage.getItem('listKey'));

for (var i = 0; i < itemArray.length; i++) {
  var newRow = document.createElement('li');
  newRow.id = i;
  newRow.className = 'list-group-item';
  
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('X'));

  newRow.appendChild(document.createTextNode(itemArray[i]));
  newRow.appendChild(deleteBtn);
  itemList.appendChild(newRow);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  var newItem = document.getElementById('item').value;
  document.getElementById('item').value = '';
  var newRow = document.createElement('li');
  newRow.id = itemArray.length;
  newRow.className = 'list-group-item';
  itemArray.push(newItem);

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('X'));

  newRow.appendChild(document.createTextNode(newItem));
  newRow.appendChild(deleteBtn);
  itemList.appendChild(newRow);

  localStorage.setItem('listKey', JSON.stringify(itemArray));
});

itemList.addEventListener('click', (e) => {
  if(e.target.classList.contains('delete')) {
    var deleteRow = e.target.parentElement;

    itemArray.splice(deleteRow.id, 1);

    for (var i = parseInt(deleteRow.id) + 1; i < itemList.children.length; i++) {
      itemList.children[i].id -= 1; 
    }

    itemList.removeChild(deleteRow);

    localStorage.setItem('listKey', JSON.stringify(itemArray));
  }
});

search.addEventListener('keyup', (e) => {
  var searchText = e.target.value;

  var itemsCollection = itemList.getElementsByTagName('li');

  Array.from(itemsCollection).forEach(function(item) {
    var itemText = item.firstChild.textContent;
    if (itemText.toLowerCase().indexOf(searchText.toLowerCase()) == -1) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
    }
  });
});