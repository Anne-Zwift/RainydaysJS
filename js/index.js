//fetching API Link: https://v2.api.noroff.dev/rainy-days
const productsContainer = document.querySelector(".all-products");
const spinner = document.querySelector("#loading");

const cartCount = document.querySelector("#cartCount");

//initialize the cart array
const storedCartItems = JSON.parse(localStorage.getItem("cart"));
//this gets the cart items in local storage and keeps it in the cart
let cart = storedCartItems ? storedCartItems: [];
cartCount.textContent = cart.length;


const API_link = "https://v2.api.noroff.dev/rainy-days";

async function fetchData() {

    
    try {

        spinner.style.display = "inline-block";//spins while waiting for data, make internet slower to see(3G)
        //Fetching the data
        const response = await fetch(API_link);//fetching data and save it in a response

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }


        const data = await response.json();//convert it back to js and save it in to data

        displayData(data.data);
    
        //Add to cart functionality
        //select all Cart Buttons
        const addToCartBtns = document.querySelectorAll(".add-to-cart");

        //loop thru the btns
        addToCartBtns.forEach((btn) => {

            btn.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                //tested if it was an Array (console.log(Array.isArray(data) is false, but data.data is true)
                //use find method to find the specific item 
                const product = Object.values(data.data).find((product) => product.id == productId);

                cart.push(product);
                //update the cart count
                cartCount.textContent = cart.length;
                //add items to the local storage
                localStorage.setItem("cart", JSON.stringify(cart));
                //show notification
                showNotification("Product Added to Cart");

            });
        });

    } catch (error) {
        showNotification(`Failed to load products: ${error.message}`);
    } finally {
        spinner.style.display = "none";
    }
}
fetchData();

function displayData(data) {
    if (!data || !Array.isArray(data) || !data.length === 0) {
        showNotification("No products found. Please try again later.");
        return;
    }

    productsContainer.innerHTML = "";//clear previous content
    data.forEach((product) => {
        const productTemplate = `
    
    <div class="all-products">

  <div id="loading"></div>
  <div class="product">
  <div class="product-image" title="Perfect choice for a rainy day">
    <img src="${product.image.url}" alt="Image of jacket">
  </div>
    <p class="product-name">${product.title}</p>
    <div class="detail">
      <p class="price">${product.price}</p>
     <a href="./product/index.html?id=${product.id}">View details</a>
    </div>
    <button data-id=${product.id} class="add-to-cart" title="Add product">Add to Cart</button>
</div>
</div>

        `;

    productsContainer.insertAdjacentHTML('beforeend', productTemplate);
    });

    spinner.style.display = "none";
}

function showNotification(message) {
    const note = document.querySelector(".note");
    note.textContent = message;
    note.style.top = "200px";
    note.style.left = "80px";

    setTimeout(() => {
        note.style.left = "-300px";
    }, 3000)
}

//dark mode
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
   
    const isDarkMode = document.body.classList.contains("dark-mode");

    themeToggle.style.backgroundColor = isDarkMode ? "black" : "white";
    themeToggle.style.color = isDarkMode ? "white" : "black";
    themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    
    
    // Save user preference in localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});
    

// Apply stored theme preference on page load
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.style.backgroundColor = "black";
        themeToggle.style.color = "white";
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.style.backgroundColor = "white";
        themeToggle.style.color = "black";
        themeToggle.textContent = "🌙";
    }
});