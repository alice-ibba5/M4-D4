const url = "https://striveschool-api.herokuapp.com/books/";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://striveschool-api.herokuapp.com/books/${id}`)
.then(response => response.json())
.then(displayBook)

function displayBook(data) {
let cont = document.querySelector(".album");

      cont.innerHTML += ` 
                   <div class="container d-flex">
                     <img class="bookImg col-12 col-lg-3" src="${data.img}" alt="">
                     <div class="d-flex flex-column ms-5 info">
                       <h1 class="bookTitle">${data.title}</h1>
                       <h4 class="bookAsin">ASIN: ${data.asin}</h4>
                       <h3 class="bookPrice">Price: ${data.price} €</h3>
                       <h4 class="bookCategory">Category: ${data.category}</h4>
                     </div>
                   </div>`;
}