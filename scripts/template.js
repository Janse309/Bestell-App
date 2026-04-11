function getDishTemplate(index) {
    let dish = dishes[index];
    return `
        <div class="dish-cart">
            <img class="dish-image" src="${dish.image}" alt="${dish.name}">
            <div class="dish-information-container">
                <h3 class="dish-headline">${dish.name}</h3>
                <p class="dish-description">${dish.indigredients}</p>
            </div>
            <div class="dish-price">
                <p>${Number(dish.price).toFixed(2).replace('.', ',')}€</p>
                <div class="mobile-add-btn-container">
                    ${getBasketStatus(dish.name)}
                    <button aria-label="Zum Warenkorb hinzufügen" onclick="addToBasket(${index})" class="add-btn">Add to basket</button>
                </div>
            </div>
        </div>
    `;
}

function getBasketTemplate(item, index) {
    let totalItemPrice = item.price * item.amount;
    let trashIcon = item.amount === 1
        ? `<button aria-label="Gericht aus dem Warenkorb löschen" onclick="deleteItem()" class="trash-icon"><img src="./assets/icons/delete.svg" alt="Löschen"></button>` : `-`;
    let trashClass = item.amount > 1 ? "" : "d_none";
    return `
        <div class="basket-item">
            <div class="basket-item-details">
                <h3>${item.name}</h3>
                <button aria-label="Gericht aus dem Warenkorb löschen" onclick="deleteItem(${index})" class="trash-icon ${trashClass}">
                <img src="./assets/icons/delete.svg" alt="Löschen">
                </button> 
            </div>
            <div class="basket-controls">
                <div class="basket-counter">
                    <button aria-label="Gerichtanzahl um eins veringern" class="control-btn" onclick="changeAmount(${index}, -1)">${trashIcon}</button>
                    <span class="amount-display">${item.amount}</span>
                    <button aria-label="Gerichtanzahl um eins erhöhen" class="control-btn" onclick="changeAmount(${index}, 1)">+</button>
                </div>
                <div>${totalItemPrice.toFixed(2).replace('.', ',')} €</div>
                
            </div>  
        </div>
    `;
}


