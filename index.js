import { menuArray } from './data.js'

const menuDiv = document.getElementById("menu");


function renderMenu() {
    let menuHtml = ""

    menuArray.forEach( item => {
        menuHtml += `
        <div class="order-container">
            <img src="${item.image}" class="${item.name.toLowerCase()}">
            <div class="food-option">
                <p class="item">${item.name}</p>
                <p class="ingredients">${item.ingredients.join(", ")}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button class="add-btn" data-id="${item.id}">+</button>
        </div>
        `

    })
    menuDiv.innerHTML = menuHtml
}

renderMenu()

let cart = []

document.addEventListener("click", function(e) {
    if(e.target.classList.contains(add-btn)) {
        const itemId = parseInt(e.target.dataset.id);
        const itemToAdd = menuArray.find(item => item.id === itemId)
        cart.push(itemToAdd)
        renderOrder()
    }
})

function renderOrder() {
    const orderSection = document.getElementById("order-section")
    const orderItems = document.getElementById("order-items")
    const totalPriceEL = document.getElementById("total-price")

    if (cart.length > 0) {
        orderSection.classList.remove("hidden")
    }

    orderItems.innerHTML = ""

    cart.forEach(item => {
        orderItems.innerHTML += `
        <div class="order-item">
            <p>${item.name}</p>
            <p>${item.price}</p>
        </div>
        `
    })

    const total = cart.reduce((sum, item) =>)
}