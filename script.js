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
    let burgerContainer = document.getElementById('burger-list');
    let pizzaContainer = document.getElementById('pizza-list');
    let saladContainer = document.getElementById('salat-list');
    burgerContainer.innerHTML = "";
    pizzaContainer.innerHTML = "";
    saladContainer.innerHTML = "";
    for (let index = 0; index < dishes.length; index++) {
        let dish = dishes[index];
        let template = getDishTemplate(index);
        if (dish.category === "Burger & Sandwiches") {
            burgerContainer.innerHTML += template;
        } else if (dish.category === "Pizza") {
            pizzaContainer.innerHTML += template;
        } else if (dish.category === "Salad") {
            saladContainer.innerHTML += template;
        }
    }
}

function renderBasket() {
    let basketRef = document.getElementById('basket')
    const headline = document.getElementById('basket');
    basketRef.innerHTML = "";
    headline.innerHTML = "<h2>Warenkorb</h2>"
    for (let index = 0; index < basket.length; index++) {
        let item = basket[index];
        basketRef.innerHTML += getBasketTemplate(item, index)
    }
     //renderTotals();
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

function changeAmount(index, change) {
    basket[index].amount += change;

    if (basket[index].amount <= 0) {
        basket.splice(index, 1);
    }

    renderBasket();
}

