const API_link = "https://v2.api.noroff.dev/rainy-days";
const display = document.querySelector("#display-data");
const input = document.querySelector("#input");//grab the element

//async function
const getData = async() => {
  //response
  const res = await fetch(API_link);//getting the endpoint url
  console.log(res);//response object 200/ok

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
    
  }

  const data = await res.json();//using json method to get the array data objects
  console.log('API Response:', data.data);
  return data;

}
//getData();//call function

//making a function and get the data and insert it to the DOM
const displaySearch = async () => {
  try {
  let query = input.value;//store the search results
  console.log("Query::", query);

  const data = await getData();
  console.log('API Response:', data.data);

let dataFilter = data.data.filter((data) => {
  if (query == "") {
    return data;
  } else if(data.title && data.title.toLowerCase().includes(query.toLowerCase())) {
    return data;
  }
});

  if (dataFilter.length === 0) {
    display.innerHTML = '<p class="message">No products found</p>';//display message
  } else {
    let dataHtml = dataFilter.map((object) => {
      const { title, price, baseColor, sizes, image } = object;

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
          <p class="sizes">${sizes}</p>
        </div>
      </div>
    </div>
    `;
  }).join("");//to fix the , between elements use .join("")
      //insert dat to DOM
      console.log('Filtered HTML:', dataHtml);
      display.innerHTML = dataHtml;    
}
  }catch (error) {
    console.error('Error:', error);
  }
}

input.addEventListener("input", () => {
  displaySearch();
});

displaySearch();//initial call to display all products


//filter items by category, gender or genre







//examples
//Ternary Operators
/*const age = 25;
const isEligibleToVote = age >= 18? "Eligible":"Not Eligible";
console.log(isEligibleToVote);*/

//template literals
/*const firstName = "Thunderbolt";
const lastName = "Rainydays";
const fullName = `${firstName} ${lastName}`;
console.log(fullName);*/

//destructing (objects and arrays)
/*const properties = {
    color: "green",
    price: 300,
    size:32
};
const {color,price,size} = properties;
console.log(color,price,size);

const fruits = ["mangoes", "oranges", "grapes"];
const[mangoes, oranges, grapes] = fruits;
console.log(mangoes, oranges, grapes);*/

//spread operator
/*const winterJackets = ["fury", "filled", "waterproof"];
const summerJackets = ["thin", "long", "short"];
const jackets = [...winterJackets, ...summerJackets];
console.log(jackets);*/

//Functions expression
/*const square = function(num) {
    return num **2;
};

function squareNum(num) {
    console.log(num ** 2);
    return num **2;  
};
console.log(squareNum(3));

//Functions array, => means return
const multiply = (num1, num2) => {
    console.log(num1 * num2);
    
};
multiply(2,3);*/


//modules export and import
//export allows us to use the code in another file by there importing
//export const add = (a,b) => a + b;
//export const subtract = (a,b) => a - b;

//importing
//import { add, subtract } from './moduleX'//put in the path
//console.log(add(5,3));
//console.log(add(10,4));

/*export default function greet(message) {
    console.log(message);
};

//import
greet("good morning");*/

//Array Methods(Map, find, filter...)
/*const nums = [1,2,3,4,5,6,7,8];
const double = nums.map((num, i) => num **2);


const found = nums.find((num) => num === 3);

const numbersGreaterThan3 = nums.filter((num) => num > 3);
console.log(numbersGreaterThan3);*/

//Promises, built in functions then & catch
//then is for when the task is successful
//catch is for messaging you the error, failed
/*fetch('https://fakestoreapi.com/products')
.then((res) => res.json())
.then((data) => console.log(data))
.catch((err) => console.log(err))*/

//More modern method is ASYNC/AWAIT TO FETCH DATA
/*async function fetchData() {
    try {
        const response = fetch('https://fakestoreapi.com/products');
        const data = (await response).json();
        console.log(data);
    } catch (error) {
        console.log(err)
    }
}
fetchData();*/


//Arrays and Objects

//Array slice()
/*let cars = ["Toyota", "Mercedes", "Opel", "BMW", "Renault"];
//slicing the array from start to end
let new_arr = cars.slice(2);
console.log(new_arr);

let new_arr1 = cars.slice(3, 4);
console.log(new_arr1);*/

//Array includes()
//if you wonder if a item is included or not. Returns true/false

/*let cars = ["Toyota", "Mercedes", "Opel", "BMW", "Renault"];
//checking if cars contains "Opel"
let check1 = cars.includes("Opel");
console.log(check1);

let check2 = cars.includes("box");
console.log(check2);

if (cars.includes("Honda")) {
    console.log("The car is here");
    
}else {
    cars.push("Honda")
    console.log(cars);
};*/

//Splice()=> returns the removed items
/*let months = ["January", "February", "Monday", "Tuesday"];
let days = months.splice(2);
console.log(days);

//tell it to remove x numbers of items. I remove only 1 element Wednesday and keep the rest in the array
const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const weekDays = daysOfTheWeek.splice(2,1);
console.log(weekDays, daysOfTheWeek);*/


//Array map()
/*const numbers = [1,2,3,4];
const squaredsNums = numbers.map(num => num ** 2);//creates a function and callback
console.log(squaredsNums);//returns [1,4,9,16]*/

/*const ages = [12,52,27,51,79];
const yearOfBirth = ages.map(function (age) {
    return 2024 - age;
});
console.log(yearOfBirth);*/

//forEach()
/*const prices = [1000, 2000, 3000, 4000, 5000];
const discountedPrices = prices.forEach(function (price, index) {
    console.log(price + 0.1 * price);
       
});

//reduce() method => a single value
const numbers = [1, 2, 3, 4, 5, 6];
const totalNumbers = numbers.reduce(function(acc, value) {
    return acc + value;
});

console.log(totalNumbers);


//filter() method => a selection of chosen elements
const studentsAges = [22, 19, 18, 32, 52];
const agesEligibleToVote = studentsAges.filter(function (age) {
    return age >= 18;
});
console.log(agesEligibleToVote);

const citizens = [
    {
        name: "John",
        age: 23,
        gender: "male",
        employed: true,
        married: false,
    },
    {
        name: "Mary",
        age: 28,
        gender: "female",
        employed: true,
        married: true,
    },
    {
        name: "Mia",
        age: 29,
        gender: "female",
        employed: false,
        married: false,
    }
]
//console.log(citizens);
/*const femaleCitizens = citizens.filter(function (citizen) {
    return citizen.gender === "female";
});
console.log(femaleCitizens);*/

//or the arrow =>
/*const femaleCitizens = citizens.filter(citizen => citizen.gender === "female");

console.log(femaleCitizens);*/


/*const button = document.querySelector('#female-btn');

const items = [
    { name: 'female', gender: 'Female' },
    { name: 'male', gender: 'Male' },
];

function sortByGender() {
    items.sort((a, b) => a.gender.localeCompare(b.gender));
    console.log(a,b);
}

document.getElementsByClassName('female-btn').addEventListener('click', sortByGender);*/


//cta button 
/*const btnEl = document.querySelector('.female-btn');
    const clickHandler = () => {
    console.log(data.data[0].gender);
    }
    btnEl.addEventListener('click', clickHandler);*/




//trying out 
/*const processData = (data) => {
    console.log(processData);
    const genderData = {
        male: 0,
        female: 0,
    };

    data.forEach(item => {
        if (item.gender === 'male') {
            genderData.male++;
        }else if (item.gender === 'female') {
            genderData.female++;
        }

    });

    return genderData;
};*/




//testing what works below
/*const optionsOfJackets = ['title', 'price', 'description'];
optionsOfJackets.forEach(function(jacket) {
    console.log(jacket + '');
})


const jacketsData = ['id', 'title', 'description', 'gender', 'sizes', 'price'];//checking
console.log(jacketsData[4]);

const jacket1 = {
    description: 'Rainy Days Thunderbolt Jacket',
    price: 139.99,
    sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ]
};
console.log(jacket1.description, jacket1.price, jacket1.sizes[0]);*/
//not in use for CA

//function redJackets(jacket1, jacket2) {
    //const price = jacket1 + jacket2;
    //return price;
//}
//const result = redJackets(500, 8000);
//console.log(result);

//arrow function
//const calculatePrice = (jacket1, jacket2) => {
    //return jacket1 + jacket2;
//};
//const result = calculatePrice(500, 8000);
//console.log(result);

//one line
//const calculatePrice = (jacket1, jacket2) => jacket1 + jacket2;

//const result = calculatePrice(500, 8000);
//console.log(result);

//const price = 5000;
//const description = 'Your total cost is:' + " " + price + ",-.";
//console.log(description);

//if else
//const itemPrice = 20;
/*
if (itemPrice > 100) {
    console.log(true);
} else {
    console.log(false);
    
}
*/
//without else just a simple statement
//itemPrice > 1000 ? console.log(true) : console.log(false);


//call back function
//const optionsOfJackets = ['red', 'green', 'blue'];
/*
optionsOfJackets.forEach(function(jacketOption) {
    console.log('- options:' + ' ' + jacketOption);

});
*/
//old way
//for(let i = 0; i < 2; i ++) {
    //console.log('-option:' + optionsOfJackets[i]);
//}



//interacting with HTML and CSS (DOM manipulation)

//changing text color
//const textEl = document.querySelector(".jackets");
//console.log(textEl);

//manipulating the text
//textEl.textContent = 'New jackets arrival';
//use span tags
//textEl.innerHTML = '<span>Welcome!</span>';

//add something to the text
//const textEl = document.querySelector(".jackets");
//textEl.insertAdjacentHTML('beforeend', '<span><br>Let us have a look at new arrivals!</span>');

//eventlistener, addEventListener(''), what will you listen for?
//const textEl = document.querySelector(".jackets");
//textEl.addEventListener('click', function() {
//textEl.insertAdjacentHTML("beforeend", "<span><br>Let us have a look at new arrivals!</span>");
//});

// manipulate the css
//const textEl = document.querySelector(".jackets");
//textEl.style.fontSize = '64px';
// manipulate the css from classList
//const textEl = document.querySelector(".jackets");
//textEl.classList.add('jacket--special');

