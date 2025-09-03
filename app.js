const itemList = document.getElementById('item-list');
const totalEl = document.getElementById('total');
let total = 0;
let items = [];

let toastBox = document.getElementById('toastBox');

window.onload = () => {
  const stored = JSON.parse(localStorage.getItem('expenseItems')) || [];
  items = stored;
  items.forEach(({ name, amount }) => {
    addItemToDOM(name, amount);
    total += amount;
  });
  totalEl.textContent = "₹" + total.toFixed(2);
};

function showToast(msg, type) {
  let toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.innerHTML = msg;
  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

function addItem() {
  const name = document.getElementById('item-name').value.trim();
  const amount = parseFloat(document.getElementById('item-amount').value);

  if (!name || isNaN(amount)) {
    showToast('<i class="fa-solid fa-circle-xmark"></i> Please enter valid name and amount', 'error');
    return;
  }

  items.push({ name, amount });
  addItemToDOM(name, amount);
  total += amount;
  totalEl.textContent = "₹" + total.toFixed(2);
  updateLocalStorage();

  document.getElementById('item-name').value = '';
  document.getElementById('item-amount').value = '';
}

function addItemToDOM(name, amount) {
  const item = document.createElement('div');
 

  itemList.appendChild(item);
}

function deleteItem(name) {
  items = items.filter((item) => item.name !== name);
  total = items.reduce((sum, item) => sum + item.amount, 0);
  updateLocalStorage();
  renderItems();
  showToast('<i class="fa-solid fa-trash"></i> Item deleted', 'success');
}

function renameItem(oldName) {
  const newName = prompt('Enter new name:', oldName);
  if (newName) {
    items = items.map((item) => (item.name === oldName ? { ...item, name: newName } : item));
    updateLocalStorage();
    renderItems();
    showToast('<i class="fa-solid fa-pen"></i> Item renamed', 'success');
  }
}

function renderItems() {
  itemList.innerHTML = '';
  items.forEach(({ name, amount }) => {
    addItemToDOM(name, amount);
  });
  totalEl.textContent = "₹" + items.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
}

function clearAll() {
  items = [];
  itemList.innerHTML = '';
  total = 0;
  totalEl.textContent = "₹0.00";
  localStorage.removeItem('expenseItems');
  showToast('<i class="fa-solid fa-check-circle"></i> All items cleared!', 'success');
}

function updateLocalStorage() {
  localStorage.setItem('expenseItems', JSON.stringify(items));
}
