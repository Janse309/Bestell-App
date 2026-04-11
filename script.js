const dialog = document.getElementById('dialog');
let basket = JSON.parse(localStorage.getItem("basket")) || [];
let basketModal = document.getElementById('basket-modal');
let burgerList = document.getElementById('burger-list');
let pizzaList = document.getElementById('pizza-list');
let salatList = document.getElementById('salat-list');

function init() {
    getItemFromLocalStorage();
    renderDishes();
    renderBasket();
    updateMobileBasketCount();

    if (basket.length > 0 && window.innerWidth > 900) {
        openBasket();
    }
}

function addToBasket(index) {
    let dish = dishes[index];
    let foundItem = basket.find((item) => item.name === dish.name);
    if (foundItem) {
        foundItem.amount++;
    } else {
        basket.push({
            "name": dish.name, "price": Number(dish.price), "amount": 1
        });
    }
    saveItemToLocalStorage();
    renderBasket();
    renderDishes();
    updateMobileBasketCount();
    if (window.innerWidth > 900) openBasket();
}

function changeAmount(index, change) {
    basket[index].amount += change;

    if (basket[index].amount <= 0) {
        basket.splice(index, 1);
    }
    updateMobileBasketCount();
    saveItemToLocalStorage();
    renderBasket();
    renderDishes();
}

function deleteItem(index) {
    basket.splice(index, 1);
    saveItemToLocalStorage();
    renderBasket();
    renderDishes();
    updateMobileBasketCount();
    closeBasket();
}

function placeOrder() {
    basket = [];
    localStorage.removeItem("basket");

    renderBasket();
    renderDishes();
    closeBasket();
    openDialog();
    updateMobileBasketCount();

    setTimeout(() => {
        closeDialog();
    }, 3000);
}

function renderDishes() {
    const containers = { "Burger & Sandwiches": burgerList, "Pizza": pizzaList, "Salad": salatList };
    Object.values(containers).forEach(list => list.innerHTML = "");

    for (let index = 0; index < dishes.length; index++) {
        const dish = dishes[index];
        const targetList = containers[dish.category];
        if (targetList) targetList.innerHTML += getDishTemplate(index);
    }
}

function renderBasket() {
    let basketRef = document.getElementById('basket-list')
    basketRef.innerHTML = "";
    for (let index = 0; index < basket.length; index++) {
        let item = basket[index];
        basketRef.innerHTML += getBasketTemplate(item, index)
    }
    renderTotals();
}

function renderTotals() {
    let subtotal = 0;
    basket.forEach(item => subtotal += (item.price) * (item.amount))

    let delivery = subtotal > 0 ? 3.00 : 0;
    let total = subtotal + delivery;

    document.getElementById('subtotal').innerHTML = `${subtotal.toFixed(2).replace('.', ',')} €`;
    document.getElementById('total').innerHTML = `${total.toFixed(2).replace('.', ',')} €`;
    document.getElementById('order').innerHTML = `Buy now (${total.toFixed(2).replace('.', ',')} €)`;
}

function updateMobileBasketCount() {
    let countRef = document.getElementById('mobile-basket-count');

    let totalItems = 0;
    basket.forEach(item => {
        totalItems += item.amount;
    });
    countRef.innerHTML = totalItems;
}

function getBasketStatus(dishName) {
    const item = basket.find((index) => index.name === dishName);
    return item && item.amount > 0
        ? `<span class="added-badge">Added ${item.amount}</span>` : "";
}

function openBasket() {
    basketModal.classList.remove('d_none');
}

function closeBasket() {
    if (basket.length === 0) {
        basketModal.classList.add('d_none');
    } else {
        basketModal.classList.remove('d_none');
    }
}

function openMobileBasket() {
    basketModal.classList.toggle('d_none');
    isEmpty();
}

function isEmpty() {
    const isEmpty = basket.length === 0;
    document.getElementById('totals').classList.toggle('d_none', isEmpty);
    document.getElementById('empty-basket').classList.toggle('d_none', !isEmpty);
}

function openDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

function saveItemToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getItemFromLocalStorage() {
    const saved = localStorage.getItem("basket");
    basket = saved ? JSON.parse(saved) : [];
}

document.onkeydown = function (event) {
    if (event.key === "Escape") {
        if (basketModal && !basketModal.classList.contains('d_none')) {
            closeBasket();
        }
    }
}

