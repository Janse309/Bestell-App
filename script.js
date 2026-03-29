let basket = [];

function init() {
    renderDishes();
    renderBasket();
}

// function renderDishes() {
//     let contentRef = document.getElementById(index, containerId);
//     contentRef.innerHTML = "";

//     for (let index = 0; index < dishes.length; index++) {
//         contentRef.innerHTML += getDishTemplate(index);
//     }
// }

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
    renderBasket();
}

function deleteItem(index) {
    basket.splice(index, 1);
    renderBasket();
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
}

function openBasket() {
    document.getElementById('basket-modal').classList.remove('d_none');
}

function closeBasket() {
    if (basket === "") {
        document.getElementById('basket-modal').classList.add('d_none');
    }
}


// closeBasket optimieren
// basket mit button(preis) ergänzen
// responsive
// Bewertung einfügen
// Warenkorb leeren indem man auf bestellen drückt (ein Dialog taucht auf)
// local Storage einfügen
