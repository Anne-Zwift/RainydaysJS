const API_link = "https://v2.api.noroff.dev/rainy-days";
const display = document.querySelector("#display-data");
const input = document.querySelector("#input");//grab the element
const cartCount = document.querySelector("#cartCount");

//initialize the cart array
const storedCartItems = JSON.parse(localStorage.getItem("cart"));
//this gets the cart items in local storage and keeps it in the cart
let cart = storedCartItems ? storedCartItems: [];
cartCount.textContent = cart.length;


let cachedData = null; //stores the fetched data

const getData = async() => {
  if (cachedData) {
    return cachedData; //return cached data if available
  }
  

  try {
  //response
  const res = await fetch(API_link);//getting the endpoint url

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  cachedData = await res.json(); //stores data in cache
  return cachedData;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const clearCache = () => {
  cachedData = null;
};


//making a function and get the data and insert it to the DOM
const displaySearch = async () => {
  try {
  let query = input.value.toLowerCase().trim();//store the search results
    if (query.length < 3) {
      display.innerHTML = '<p class="message">Please enter at least 3 characters to search</p>';
      return;
    }
    const data = await getData();

  let dataFilter = data.data.filter((data) => {
    const queryLower = query.toLowerCase().trim();

    if (!query) {
    return true;
  } else{
   
    const baseColorMatch = data.baseColor && data.baseColor.toLowerCase().includes(query);
    const tagsMatch = data.tags && data.tags.some(tag => tag.toLowerCase().trim() === queryLower);
    const formatTitle = title => title.replace(/^Rainy Days\s+/i, "").toLowerCase();
    const titleMatch = data.title && formatTitle(data.title).includes(query);


    // Strict gender filtering
    const genderMatch = data.gender && (
      (["men", "male"].includes(query.toLowerCase().trim()) && data.gender.toLowerCase().trim() === "male") || 
      (["women", "female"].includes(query.toLowerCase().trim()) && data.gender.toLowerCase().trim() === "female")
);

      console.log("Query:", query);
      console.log("Product Gender from API:", data.gender);
      console.log("Full Product Data:", data);

    return titleMatch || baseColorMatch || tagsMatch || genderMatch;

  }

});

  if (dataFilter.length === 0) {
    display.innerHTML = '<p class="message">No products found</p>';//display message
  } else {
    let dataHtml = dataFilter.map((object) => {
      const { title, price, baseColor, sizes, gender, image, id } = object;
      return `
  <div class="all-products">
    <div class="product">
      <div class="product-image">
        <img src="${image.url}" alt="">
        </div>
        <p class="product-name">${title}</p>
        <div class="detail">
          <p class="price">${price}</p>
          <p class="base-color">${baseColor}</p>
          <p class="sizes">${sizes.join(" ")}</p>
          <p class="gender">${gender}</p>
          <button data-id=${id} class="add-to-cart" title="Great choice!">Add to Cart</button>
        </div>
      </div>
    </div>
    `;
  }).join("");//to fix the , between elements use .join("")
  //insert data to DOM
  display.innerHTML = dataHtml;  
  
  //Add to cart functionality
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const productId = event.target.dataset.id;
      const product = data.data.find((item) => item.id == productId);
      cart.push(product);
      cartCount.textContent = cart.length;
      localStorage.setItem("cart", JSON.stringify(cart));
      showNotification("Product Added to Cart");
    });
  });
  
}
  }catch (error) {
    console.error('Error:', error);
  }
};

input.addEventListener("input", () => {
  displaySearch();
});

displaySearch();//initial call to display all products

function showNotification(message) {
  const note = document.querySelector(".note");
  note.textContent = message;
  note.style.left = "20px";
  setTimeout(() => {
      note.style.left = "-300px";
  }, 3000)
}