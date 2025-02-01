
const cart = JSON.parse(localStorage.getItem('cart')) || [];

let cartSection = document.querySelector(".cart-section");
let cartTotal = document.querySelector(".cart-total")
function displayCart(){
    cartSection.innerHTML = '' // to prevent the duplecate of cart data
    cart.forEach((item, index) => {
        cartSection.innerHTML += `
            <div class="cart-item d-flex justify-content-between align-items-center rounded-3 shadow-lg p-3 mb-3">
        <img src="${item.image}" alt="" width="100">
        <div class="item-name">
            <p class="m-0" style="width: 250px">${item.name}</p>
        </div>
        <div class="item-qty d-flex gap-3">
            <button class="fw-bold text-danger bg-transparent border-0" onclick="decrease(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0"/></path></svg>
            </button>
            <h5 class="m-0">${item.qty}</h5>
            <button class="fw-bold text-success bg-transparent border-0" onclick="increase(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 12h14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0"/></path><path d="M12 5v14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="16;0"/></path></g></svg>
            </button>
        </div>
        <div class="item-price">
            <h5 class="m-0">${item.price * item.qty} EGP</h5>
        </div>
        <button class="fw-bold text-danger bg-transparent border-0" onclick="removeProduct(${index})">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"/></svg>
        </button>
    </div>

        `
    })
    getTotal();
    document.querySelector(".cart_num").innerHTML = `${cart.length}`

}

document.querySelector(".cart_num").innerHTML = `${cart.length}`



function increase(itemIndex){
    cart[itemIndex].qty += 1;
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart)) //it updates the local storage array (cart) to update  th quantity
    displayCart();
}

function decrease(itemIndex){
    if(cart[itemIndex].qty == 1){
        removeProduct(itemIndex);
    }
    else{
    cart[itemIndex].qty -= 1;
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart)) //it updates the local storage array (cart) to update  th quantity
    displayCart();
    }
}


function removeProduct(itemIndex){
    cart.splice(itemIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart)) //it updates the local storage array (cart) to update  th quantity
    displayCart();
}

function getTotal(){
    let sum = 0;
    cart.forEach((item, index) => {
        sum += item.price * item.qty;
    })
    cartTotal.innerHTML = `
            <div class=" d-flex justify-content-between align-items-center rounded-3 shadow-lg p-3 mb-3">
            <h3>Total Price</h3>
            <p>${sum}</p>
        </div>

    `
}
getTotal();


displayCart();

