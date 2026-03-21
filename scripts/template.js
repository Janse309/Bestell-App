function getDishTemplate(index) {
    let dish = dishes[index]
    return `
    <div class="dish-card">
        <div class="dish-image-container">
            <img src="${dish.image}" alt="${dishes.name}">
        </div>
        <div class="dish-item-container">
            <div class="dish-information-container">
                <h3 class="dish-headline">${dish.name}</h3>
                <p class="dish-description">${dish.indigredients}</p>
            </div>
            <div class="dish-price">
                <p>${dish.price}</p>
                <button><img src="${dish.button}" alt="Hinzufügen"></button>
            </div>
        </div>
    </div>
`
}
