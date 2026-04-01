let basket = JSON.parse(localStorage.getItem("basket")) || [];
const dialog = document.getElementById('dialog');

function init() {
    getItemFromLocalStorage();
    renderDishes();
    renderBasket();

    if (basket.length > 0) {
        openBasket();
    }
}

function saveItemToLocalStorage() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getItemFromLocalStorage() {
  const saved = localStorage.getItem("basket");
  basket = saved ? JSON.parse(saved) : [];
}

function renderDishes() {
    for (let index = 0; index < dishes.length; index++) {
        let dish = dishes[index];
        let template = getDishTemplate(index);

        if (dish.category === "Burger & Sandwiches") {
            document.getElementById('burger-list').innerHTML += template;
        } else if (dish.category === "Pizza") {
            document.getElementById('pizza-list').innerHTML += template;
        } else if (dish.category === "Salad") {
            document.getElementById('salat-list').innerHTML += template;
        }
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

    let delivery = subtotal > 0 ? 5.00 : 0;
    let total = subtotal + delivery;

    document.getElementById('subtotal').innerHTML = `${subtotal.toFixed(2).replace('.', ',')} €`;
    document.getElementById('total').innerHTML = `${total.toFixed(2).replace('.', ',')} €`;
}

function addToBasket(index) {
    let dish = dishes[index];
    let foundItem = basket.find((item) => item.name === dish.name)
    if (foundItem) {
        foundItem.amount++;
    } else {
        basket.push({
            "name": dish.name,
            "price": Number(dish.price),
            "amount": 1
        });
    }
    saveItemToLocalStorage();
    renderBasket();
}

function deleteItem(index) {
    basket.splice(index, 1);
    saveItemToLocalStorage();
    renderBasket();
    closeBasket();
}

// function priceButton() {
//     document.getElementById('orderPrice').innerHTML = "hallo";
// }

function changeAmount(index, change) {
    basket[index].amount += change;

    if (basket[index].amount <= 0) {
        basket.splice(index, 1);
    }
    renderBasket();
    saveItemToLocalStorage();
}

function openBasket() {
    document.getElementById('basket-modal').classList.remove('d_none');
}

function closeBasket() {
    if (basket.length === 0) {
        document.getElementById('basket-modal').classList.add('d_none');
    } else {
        document.getElementById('basket-modal').classList.remove('d_none');
    }
}

function placeOrder() {
    basket = [];
    localStorage.removeItem("myBasket");
    renderBasket();
    closeBasket();
    openDialog();

    setTimeout(() => {
        closeDialog();
    }, 3000);
}

function openDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close(); // Das schließt das HTML-Dialog-Element
}


// basket mit button(preis) ergänzen
// responsive
// Warenkorb in die Content Begrenzung einfügen
// Problem mit dem Button und dem Minus und Plus beheben    
// Warenkorb mit true und false öffnen und scließen ?
