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
    if (e.target.classList.contains("add-btn")) {
        const itemId = parseInt(e.target.dataset.id);
        const itemToAdd = menuArray.find(item => item.id === itemId)
        cart.push(itemToAdd)
        renderOrder()
    }

    if (e.target.classList.contains("remove-item")) {
        const itemId = parseInt(e.target.dataset.id)
        const indexToRemove = cart.findIndex(item => item.id === itemId)
        if (indexToRemove > -1) {
            cart.splice(indexToRemove, 1)
            renderOrder()
        }
    }
})

function renderOrder() {
    const orderSection = document.getElementById("order-section")
    const orderItems = document.getElementById("order-items")
    const totalPriceEL = document.getElementById("total-price")
    const completeOrderBtn = document.getElementById("complete-order-btn")

    if (cart.length > 0) {
        orderSection.classList.remove("hidden")
        completeOrderBtn.classList.remove("hidden")
    } else {
        completeOrderBtn.classList.add("hidden")
    }

    orderItems.innerHTML = ""

    cart.forEach(item => {
        orderItems.innerHTML += `
        <div class="order-item">
            <div class="item-info">
                <p class="item">${item.name}</p>
                <p class="remove-item" data-id="${item.id}">remove</p>
            </div>  
            <p class="price">$${item.price}</p>  
        </div>
        `
    })

    const total = cart.reduce((sum, item) => sum + item.price, 0)
    totalPriceEL.textContent = `$${total}`
}

document.getElementById("complete-order-btn").addEventListener("click", function(){
    if (cart.length > 0) {
        document.getElementById("payment-modal").classList.remove("hidden")
    }
})

document.getElementById("payment-form").addEventListener("submit", function(e) {
    e.preventDefault()

    const name = e.target.fullName.value;

    document.getElementById("payment-modal").classList.add("hidden")
    e.target.reset()

    cart = []
    renderOrder();

    const orderSection = document.getElementById("order-section")
    orderSection.innerHTML = `
    <div class="confirmation-msg">
        <p>Thanks ${name}! Your order is on its way!</p>
    </div>
    `

    orderSection.classList.remove("hidden")
})


document.addEventListener('click', function(e) {
    const modal = document.getElementById('payment-modal')
    const form = document.getElementById('payment-form')

    if(!modal.classList.contains('hidden') &&
       !form.contains(e.target) && 
        e.target.id !== 'complete-order-btn') {
            modal.classList.add('hidden')
        }
})
