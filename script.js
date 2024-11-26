

const form = document.getElementById('grocery-form');
const itemNameInput = document.getElementById('item-name');
const expirationDateInput = document.getElementById('expiration-date');
const list = document.getElementById('list');
const suggestedList = document.getElementById('suggested-list');

let groceries = JSON.parse(localStorage.getItem('groceries')) || [];

function renderList() {
    list.innerHTML = '';
    groceries.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (Expires: ${item.expiration})</span>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        list.appendChild(li);
    });

    renderSuggestions();
}

function renderSuggestions() {
    suggestedList.innerHTML = '';
    const uniqueItems = [...new Set(groceries.map(item => item.name))];
    uniqueItems.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        suggestedList.appendChild(li);
    });
}

function addItem(event) {
    event.preventDefault();
    const name = itemNameInput.value.trim();
    const expiration = expirationDateInput.value;

    if (!name || !expiration) return;

    groceries.push({ name, expiration });
    localStorage.setItem('groceries', JSON.stringify(groceries));
    renderList();

    itemNameInput.value = '';
    expirationDateInput.value = '';
}

function removeItem(index) {
    groceries.splice(index, 1);
    localStorage.setItem('groceries', JSON.stringify(groceries));
    renderList();
}


form.addEventListener('submit', addItem);


renderList();
function addItem(event) {
    event.preventDefault();
    const name = itemNameInput.value.trim();
    const expiration = expirationDateInput.value;

    if (!name || !expiration) return;

    
    const itemExists = groceries.some(item => item.name.toLowerCase() === name.toLowerCase());

    if (itemExists) {
        alert(`${name} is already in your list! Check your stock before buying more.`);
        return;
    }

   
    groceries.push({ name, expiration });
    localStorage.setItem('groceries', JSON.stringify(groceries));
    renderList();

    itemNameInput.value = '';
    expirationDateInput.value = '';
}
function renderSuggestions() {
    suggestedList.innerHTML = '';
    const uniqueItems = [...new Set(groceries.map(item => item.name))];

    uniqueItems.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;

       
        const itemExists = groceries.some(item => item.name === name);
        if (itemExists) {
            li.style.color = 'red'; 
            li.title = 'Already in your list!';
        }

        suggestedList.appendChild(li);
    });
}

