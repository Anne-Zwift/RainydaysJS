//spinner
const spinner = document.querySelector("#loading");

//display data: set up HTML skeleton for displaying data
const singleProductsContainer = document.querySelector(".single-products-container");

const cartCount = document.querySelector("#cartCount");
//initialize the cart array
const storedCartItems = JSON.parse(localStorage.getItem("cart"));
//this gets the cart items in local storage and keeps it in the cart
let cart = storedCartItems ? storedCartItems: [];
cartCount.textContent = cart.length;

//fetching the API single product link
const API_Single_Product = "https://v2.api.noroff.dev/rainy-days/b8b528fc-6c60-41f6-a5a9-9a8b27a9482a";


async function fetchDataSingleProduct() {

    try {
        
     //spinner - see if it works in 3G
      spinner.style.display = 'inline-block';
    //fetching the data
      const response = await fetch(API_Single_Product);

      const data = await response.json();//convert it back to js and save it in to data


      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      //display data
      displayData(data.data);

      //Add to cart functionality
      //select cart Button
      const addToCartBtn = document.querySelector(".add-to-cart");
      addToCartBtn.addEventListener('click', () => {
        const cartItem = {
          id: data.data.id,
          title: data.data.title,
          price: data.data.price,
          image: data.data.image,
          description: data.data.description,
          sizes: data.data.sizes,
          gender: data.data.gender
        };


          cart.push(cartItem);
          //update the cart count
          cartCount.textContent = cart.length;
          //add items to the local storage
          localStorage.setItem("cart", JSON.stringify(cart));
          console.log('cart saved to local storage:', JSON.parse(localStorage.getItem("cart")));
          //show notification
          showNotification("Product Added to Cart");
      });
      
    } catch (error) {
      console.error('Error fetching single product:', error);
    } finally {
      spinner.style.display = 'none';//hide spinner
    }
}
fetchDataSingleProduct();

//create a function for a single product

function displayData(data) {
  const { image, title, description, price, sizes, gender, id } = data;
  singleProductsContainer.innerHTML = `
  <div class="product">
    <div class="product-image">
    <img src="${image.url}" alt="">
    </div>
    <p class="product-name">${title}</p>
    <div class="detail">
    <div><p class="description">${description}</p></div><br>
    <div><p class="price">${price}</p></div><br>
    <p class="sizes">${sizes.join(" ")}</p>
    <div><p class="gender">${gender}</p></div>
    <button data-id=${id} class="add-to-cart">Add to Cart</button>
    </div>
    </div>
  </div>
   
        `;

}

function showNotification(message) {
  const note = document.querySelector(".note");
  note.textContent = message;
  note.style.left = "10px";
  setTimeout(() => {
      note.style.left = "-300px";
  }, 3000)
}


