const products = [
    {
        name: 'item 1',
        price: 200,
        image: './images/nikeTshirt.jpg'
    },
    {
        name: 'Real Madrid (Home) 23/24 - Player Version',
        price: 850,
        image: './images/real-madrid-Home-24.jpeg'
    },
    {
        name: 'Real Madrid Third Jersey 2024/25 - Player Verison',
        price: 750,
        image: './images/Real-Madrid-Third-2024-25.jpeg'
    },
    {
        name: 'Real Madrid Third Jersey 2023/24 - Fan Verison',
        price: 850,
        image: './images/Real-Madrid-Third-Jersey-2023-24.jpeg'
    },
    {
        name: 'Real Madrid Home Jersey 2024/25 - Player Version',
        price: 750,
        image: './images/Real-Madrid-Home-Jersey-2024-25.jpeg'
    },
    {
        name: 'Real Madrid Away Jersey 2024/25 - Player Verison',
        price: 750,
        image: './images/Real-Madrid-Away-Jersey-2024-25.jpeg'
    },
    {
        name: 'Real Madrid 2017/18 - Mirror Original Version',
        price: 850,
        image: './images/Real-Madrid-2017-18.jpeg'
    },
    {
        name: 'Real Madrid 2016/17 - #7 Ronaldo Final Version',
        price: 850,
        image: './images/Real-Madrid-2016-17.jpeg'
    },

]

let productSection = document.querySelector(".products-section");

function displayProducts(){
    products.forEach((item, index) => {
        productSection.innerHTML += `
            <div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.price} EGP</p>
          <button href="#" class="btn btn-primary" onclick="addToCart(${index})">Add to Cart</button>
        </div>
      </div>
    </div>
        `
    })
}

displayProducts();

const cart = JSON.parse(localStorage.getItem('cart')) || [];



function addToCart(itemIndex){
    let product = products.find((item, index) =>{ //select the index of products and make it equal to this function's index
        return index === itemIndex
    });

    let existingProduct = cart.findIndex((item) => { // if product's name is the same 
        return item.name == product.name
    })
    if(existingProduct > -1){
        cart[existingProduct].qty += 1;
    }
    else{
        cart.push({...product, qty: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    document.querySelector(".cart_num").innerHTML = `${cart.length}`

}

document.querySelector(".cart_num").innerHTML = `${cart.length}`
