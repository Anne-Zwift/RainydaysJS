//fetching text to terms and conditions
const API_link = 'https://cors-anywhere.herokuapp.com/https://developers.google.com/terms/site-terms';
//console.log(termsAndConditions);//providing the link
const termsContent = document.getElementById('terms-content');
console.log(termsContent);

async function fetchData() {
  
  try {
    const response = await fetch(API_link);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
      
    }
    
    const data = await response.json();
    console.log('fetched data:', data);
    displayData(data);//call displayData with fetched data wrapped in array
    

  } catch (error) {
    console.log(error);//any error
    termsContent.innerHTML = '<p>Error fetching data. Please try again later.</p>';
  }
  
}


function displayData(data) {
  textContainer.innerHTML = ""; //clear my existing content
  const termsHtml = `
  <p class="paragraph">User ID: ${data.userId}</p>
  <p class="paragraph">User ID: ${data.title}</p>
  <p class="paragraph">User ID: ${data.id}</p>
  `;
  termsContent.insertAdjacentHTML('beforeend', termsHtml);
}
fetchData();