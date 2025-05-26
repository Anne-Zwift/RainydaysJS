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
        alt="Image of jacket"
      />
      <p class="product-name">
      ${cartItem.title}
      </p>
    </div>
    <button data-id=${cartItem.id} class="delete-btn" title="Delete item">Delete</button>
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
  note.style.left = "50px";
  note.style.padding = "20px";
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



