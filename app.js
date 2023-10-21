import { foodItemsArray } from "./data.js"

const foodItemsDiv = document.querySelector('.fooditems')
const checkoutBtn = document.querySelector('.see-cart-btn')
const cart = []
const modal = document.querySelector('.modal')
const checkOutBody = document.querySelector('.checkout-body')
const listCartItems = document.querySelector('.list-cart-items')
const finishPurchase = document.querySelector('.finish-purchase')
const totalCalc = document.querySelector('.total-calc')
const purchaseBtn = document.querySelector('.purchase-button')
const modalHeading = document.querySelector('.modal-heading')

renderFoodItems()

purchaseBtn.addEventListener('click', paymentDets )


function renderFoodItems(){
    let HtmlText = ``
    foodItemsArray.forEach((obj) => {
        HtmlText += `
            <h3 class='food-title'>${obj.icon} ${obj.title}</h3>
            <span class='food-cal'>${obj.cal}</span>
            <div class='food-dets'>
                <ul>
                    <li class='food-list-item food-desc'>${obj.desc}</li>
                    <li class='food-list-item food-cost'>$${obj.cost}
                        <span>
                            <button class='incButtons' data-incplus="${obj.uuid}">+</button>
                        </span>
                    </li>
                </ul>
            </div>
        `
    })
    foodItemsDiv.innerHTML = HtmlText
}


document.addEventListener("click", (e)=>{
    if (e.target.dataset.incplus) { 
        foodItemsArray.filter((obj)=>{
            if (obj.uuid === e.target.dataset.incplus) {
                obj.quantity++
            }
        })
        checkoutBtn.disabled = false
        renderCheckout()
    } 
    else if (e.target.dataset.remove) {
        foodItemsArray.filter((obj)=>{
            if (obj.uuid === e.target.dataset.remove) {
                obj.quantity = 0
            }
        })
        renderCheckout()
    }
})

checkoutBtn.addEventListener('click', ()=> {
    modal.classList.toggle('active')
    renderCheckout()
})

function renderCheckout() {
    modalHeading.innerHTML = ''
    finishPurchase.style.display = 'block'
    let writtenCart = ``
    let total = 0
    foodItemsArray.filter( obj => {
        if (obj.quantity > 0) {
            writtenCart += `
                <div class='checkoutItems'>
                    <div class='food-title'>
                        <h4>${obj.title} x ${obj.quantity}</h4>
                        <button class='remove-btn' data-remove='${obj.uuid}'>Remove</button>
                    </div>
                    <h4 class='food-price'>$${obj.cost}</h4>
                </div>
                <hr>
                `
            total += Number(obj.cost) * obj.quantity
        }
    })
    const closeModalBtn = document.createElement('button')
    const modalHeadingObj = document.createElement('h2')
    modalHeadingObj.classList.add('checkout-title')
    modalHeadingObj.textContent = 'Check out'
    closeModalBtn.classList.add('button-close-modal', 'modal-btn-style')
    closeModalBtn.addEventListener('click', function(){
        modal.classList.remove('active')
    })
    closeModalBtn.textContent = 'X'
    modalHeading.append(closeModalBtn)
    modalHeading.append(modalHeadingObj)
    listCartItems.innerHTML = writtenCart 
    totalCalc.innerHTML = `<h3 class='totals'>Total = $${total}</h3>`
}

function paymentDets() {
    let payEl = document.createElement('form')
    let newCheckoutHead = document.createElement('button')
    newCheckoutHead.classList.add('button-back-modal', 'modal-btn-style')
    newCheckoutHead.textContent = '<'
    newCheckoutHead.addEventListener('click', renderCheckout)
    modalHeading.append(newCheckoutHead)

    let payments = `
        <form class='input-form'>
        <input required type="text" name="order-name" class="payment-input" placeholder='Enter Name'>
        <input required type="number" name="order-card" class="payment-input" placeholder='Enter Cardnumber'>
        <input required type="number" name="order-CVV" class="payment-input" placeholder='Enter CVV'>
        <button class='final-purchase-button purchase-button'>Complete Purchase</button>
        </form>
    `
    listCartItems.innerHTML = payments
    finishPurchase.style.display = 'none'
}
