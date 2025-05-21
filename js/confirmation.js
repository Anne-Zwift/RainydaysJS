const cartCount = document.querySelector("#cartCount");
const storedCartItems = JSON.parse(localStorage.getItem('cart'));

let cart = storedCartItems? storedCartItems: [];


cartCount.textContent = cart.length;

//create a function and display all the items in the cart to the page
function displayCartItems(cartItems) {
  //select the cart item container
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";
  //loop thru
  cartItems.forEach((cartItem) => {
    const itemTemplate = `

         <div class="cart-item">
         <p id="totalPrice"></p>
    <div class="left">
      <img
        src=${cartItem.image.url}
        alt=""
      />
      <p class="product-name">
      ${cartItem.title}
      </p>
    </div>
    <div class="right">
      <p class="price">${cartItem.price}</p>
    </div>
  </div>
    
    `;

    cartItemsContainer.insertAdjacentHTML("beforeend", itemTemplate);
  });
}

displayCartItems(cart);

//select deletebtns
const deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {

    const productId = event.target.dataset.id;
    //find the index (0,1,2...) gives back the index number
    const productIndex = cart.findIndex((cartItem) => cartItem.id == productId);
    //remove the item from the array
    cart.splice(productIndex, 1); //number 1 is amount of items removed
    //update the local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    //update the cart
    displayCartItems(cart);
    cartCount.textContent = cart.length;//makes the cart update at the same time as we push delete button
    showNotification("Product deleted")

  })
});

function showNotification(message) {
  const note = document.querySelector(".note");
  note.textContent = message;
  note.style.left = "10px";
  setTimeout(() => {
      note.style.left = "-300px";
  }, 3000)
}

//getting the totalPrice
let totalPrice = 0;
let roundPrice = Math.round(totalPrice * 100) / 100;
  storedCartItems.forEach(item => {
  
  totalPrice += item.price;
  
});

document.getElementById('totalPrice').textContent = 'Total Price: ' + totalPrice + ',-.';
