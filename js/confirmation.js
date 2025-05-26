const cartCount = document.querySelector("#cartCount");
const storedCartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

let cart = [];
try {
  const storedCartItems = localStorage.getItem('cart');
  cart = storedCartItems ? JSON.parse(storedCartItems) : [];
} catch (error) {
  console.error("Error parsing cart data", error);
  cart = [];
}
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

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const confirmed = confirm("Are you sure you want to delete this item?");
        if (!confirmed) return; // Ensure user can cancel

        const productId = event.target.dataset.id;
        const productIndex = cart.findIndex(cartItem => cartItem.id == productId);

        if (productIndex !== -1) {
            // Remove the item from the array
            cart.splice(productIndex, 1);

            // Update local storage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Update the cart UI
            displayCartItems(cart);
            cartCount.textContent = cart.length;
            showNotification("Product deleted");
        } else {
            showNotification("Error: Product not found in cart");
        }
    }
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
let totalPrice = storedCartItems.reduce((sum, item) => sum + (item.price || 0), 0);

totalPrice = Math.round(totalPrice * 100) / 100;

const totalPriceElement = document.getElementById("totalPrice");
if (totalPriceElement) {
  totalPriceElement.textContent = `Total Price: ${totalPrice},-.`;
} else {
  console.error("Total Price element not found.");
}

function handleCheckoutSuccess() {
  //clear the cart array
  cart = [];
  //update localstorage
  localStorage.removeItem('cart');
  //update the UI
  cartCount.textContent = cart.length;
  displayCartItems(cart);
  showNotification("Checkout successful! Thank you for shopping with Rainydays.");

  //reload
  setTimeout(() => {
    window.location.reload(true);
  }, 2000);//refresh after 2 sec

}