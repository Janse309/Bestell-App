function init() {
    renderDishes();
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


function openDialog() {
    let dialog = document.getElementById('testDialog');
    dialog.showModal(); // Benutze showModal() für einen echten Overlay-Dialog
}
