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
                <div>
                <button id="addedItem-btn" class="addedItem-btn d_none">Added</button>
                <button onclick="addToBasket(${index}); openBasket(); addedItem(${index})" class="add-btn">Add to basket</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function getBasketTemplate(item, index) {
    let totalItemPrice = item.price * item.amount;
    let trashIcon = item.amount === 1 
        ? `<button onclick="deleteItem()" class="trash-icon"><img src="./assets/icons/delete.svg" alt="Löschen"></button>` : `-`;
    return `
        <div class="basket-item">
            <div class="basket-item-details">
                <h3>${item.name}</h3>
                <button onclick="deleteItem()" class="trash-icon"><img src="./assets/icons/delete.svg" alt="Löschen"></button> 
            </div>
            <div class="basket-controls">
                <div class="basket-counter">
                    <button class="control-btn" onclick="changeAmount(${index}, -1)">${trashIcon}</button>
                    <span class="amount-display">${item.amount}</span>
                    <button class="control-btn" onclick="changeAmount(${index}, 1)">+</button>
                </div>
                <div>${totalItemPrice.toFixed(2).replace('.', ',')} €</div>
            </div>  
        </div>
    `;
}


