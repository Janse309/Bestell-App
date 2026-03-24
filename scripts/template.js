function getDishTemplate(index) {
    let dish = dishes[index]
    return `
    <div class="dish-card">
        <div class="meal-container">
            <div class="dish-image-container">
                <img src="${dish.image}" alt="${dishes.name}">
            </div>
            <div class="dish-information-container">
                <h3 class="dish-headline">${dish.name}</h3>
                <p class="dish-description">${dish.indigredients}</p>
            </div>
            <div class="dish-price">
                <p>${Number(dish.price).toFixed(2).replace('.', ',')}€</p>
                <button onclick="addToBasket(${index})" class="add-btn"><img src="${dish.button}" alt="Hinzufügen"></button> 
            </div>
        </div>
    </div>
`
}

function getBasketTemplate(item, index) {
    let totalItemPrice = item.price * item.amount;
    return `
        <div class="basket-item">
            <div class="basket-item-details">
                <b>${item.name}</b>  
            </div>
            <div class="basket-controls">
                <div class="test">
                <button onclick="changeAmount(${index}, -1)"><img class="control-btn" src=./assets/icons/minus.svg></button>
                <span>${item.amount}</span>
                <button onclick="changeAmount(${index}, 1)"><img class="control-btn" src=./assets/icons/plus.svg></button>
                </div>
                <div>${totalItemPrice.toFixed(2).replace('.', ',')} €</div>
            </div>
        </div>

        <button class="buy-now-btn">Buy now</button>
    `;
}