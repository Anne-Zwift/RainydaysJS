document.addEventListener("DOMContentLoaded", () => {
    const cartCountElement = document.getElementById("cartCount");
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || []; // Always returns an array

    if (cartCountElement) {
        cartCountElement.textContent = storedCartItems.length; //ensures correct count
    }
});

const cartCount = document.querySelector("#cartCount");

const storedCartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
let cart = storedCartItems;

cartCount.textContent = cart.length;


//create a function and display all the items in the cart to the page
function displayCartItems(cartItems) {
  //select the cart item container
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";

    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
      totalPriceElement.textContent = "Total Price: 0,-.";
    } else {
      console.error("Total Price element not found");
    }
  
    return;
  }


  //loop thru
  cartItems.forEach((cartItem) => {

    const itemTemplate = `

      <div class="cart-item">
        <div class="left">
          <img src=${cartItem.image?.url || 'fallback-image.jpg'} alt="jacket image"/>
          <p class="product-name"> ${cartItem.title}</p>
        </div>
        <div class="right">
          <p class="price">${cartItem.price}</p>
        </div>
      </div>
    
    `;

    cartItemsContainer.insertAdjacentHTML("beforeend", itemTemplate);
  });
 // Calculate and display total price **only once**
  let totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  totalPrice = Math.round(totalPrice * 100) / 100;

  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    totalPriceElement.textContent = `Total Price: ${totalPrice},-.`;
  } else {
    console.error("Total Price element not found.");
  }


}

displayCartItems(cart);

//select deletebtns
const deleteBtns = document.querySelectorAll(".delete-btn");

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const confirmed = confirm("Are you sure you want to delete this item?");
        if (!confirmed) return;

        const productId = event.target.dataset.id;
        const productIndex = cart.findIndex(cartItem => cartItem.id == productId);

        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

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
  console.log("Notification element:", document.querySelector(".note"));

  if (!note) {
    console.error("Notification element not found.");
    return;
  }

  console.log("Showing notification:", message);

  note.textContent = message;
  note.style.opacity = "1";
  note.style.right = "20px";
  setTimeout(() => {
    note.style.opacity = "0";
    note.style.right = "-300px";
  }, 10000);
}

//showNotification();


function handleCheckoutSuccess() {
  // Clear the cart array and remove all stored data
  console.log("Checkout function triggered!"); // This should appear if the function runs
  cart = [];
  console.log("Cart content before checkout:", localStorage.getItem("cart"));
  localStorage.removeItem("cart"); 
  console.log("Cart content after checkout:", localStorage.getItem("cart")); // Should be `null`
  
  
  const cartPage = document.querySelector(".cart-page");
  if (cartPage) {
    cartPage.style.opacity = "0";
    cartPage.style.visibility = "hidden";
  }




    // Ensure cart count updates correctly
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
        cartCountElement.textContent = "0";
    } else {
        console.error("Cart count element not found.");
    }

    // Refresh UI
    displayCartItems(cart);
    showNotification("Checkout successful! Thank you for shopping with Rainydays.");

    // Redirect to prevent stale data issues
    setTimeout(() => {
        window.location.href = "../../index.html"; // Redirects to home page instead of confirmation page
    }, 2000);
}

handleCheckoutSuccess();


