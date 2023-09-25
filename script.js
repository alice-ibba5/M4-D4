const url = "https://striveschool-api.herokuapp.com/books"

window.onload = () => {
  fetchBooks()
}
const fetchBooks = () => {
  fetch(url)
    .then((raw) => raw.json())
    .then((res) => {
      let cont = document.querySelector(".album .row")

      cont.innerHTML = res
        .map((book) => {
          return ` <div class="col-12 col-lg-2"> 
                     <div class="card mb-4 shadow-sm" id="book_${book.asin}">
                       <img src='${book.img}'/>

                       <div class="card-body">
                          <p class="font-weight-bold text-truncate book-title"> ${book.title} </p>
                          <p class="font-weight-bold book-price"> ${book.price} €</p>
                          <div class="d-flex justify-content-evenly align-items-center">                    
                            <button class="btn btn-danger" onclick="addToCart('${book.title}', '${book.price}', '${book.asin}')"><i class="bi bi-cart"></i></button>
                            <button class="btn btn-secondary" onclick="hideCard(event)"><i class="bi bi-x-circle-fill"></i></button>
                           </div>
                        </div>
                      </div> 
                    </div>`;
        })
        .join("")
    })
    .catch((err) => console.error(err))
}


const searchBook = (ev) => {
    let query = ev.target.value
    let allTitles = document.querySelectorAll(".book-title")
    console.log(
      query,
      allTitles[0].innerText.toLowerCase().includes(query.toLowerCase())
    )
    allTitles.forEach((title) => {
      const currCard = title.parentElement.parentElement.parentElement
      if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
        currCard.style.display = "none"
      } else {
        currCard.style.display = "block"
      }
    })
  }

  const addToCart = (title, price, asin) => {
    const book = document.querySelector("#book_" + asin)
    book.style.opacity = "0.5"
    const cart = document.querySelector(".list-group")
    cart.innerHTML += `
    <li class="list-group-item">${title}, € ${price} 
    <button class='btn btn-outline-secondary' onclick='removeFromCart(event, "${asin}", "${price}")'> X </button>
    </li> `

    /*const totale = document.querySelector("h1 span")
    totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2)*/
  }

 /* let cart = [];
  cart.push()
  const cartTotal = document.querySelector("h1 span")
    
  const total = cart.reduce((total, amount) => total + amount);
  cartTotal.innerText = total.toFixed(2);*/

  /*function sumPrices(products) {
    const totalPrice = products.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.price;
    }, 0);
    const formattedTotalPrice = totalPrice.toFixed(2);
    const totalPriceWithEuroSymbol = `€ ${formattedTotalPrice}`;
  
    return totalPriceWithEuroSymbol; 
  }


  const updateCartTotal = () => {
    const cartTotal = document.querySelector("h1 span")
    const cart = document.querySelector(".list-group ${price}")
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  
  cartTotal.innerText = total.toFixed(2);
  }
   
  let cart = {};
  function addToCart2(productName) {
    if (cart[productName]) {
      cart[productName]++;
    } else {
      cart[productName] = 1;
    }
  }
    
  function calculateTotalPrice() {
    let totalPrice = 0;
  
    for (let productName in cart) {
      let productQuantity = cart[productName];
      let productPrice = function getProductPrice(productName) {
      totalPrice += productQuantity * productPrice;
    }}
  
    return totalPrice;
  }

  let totalCartElement = document.getElementById("h1 span");
totalCartElement.textContent = calculateTotalPrice();*/

 

  const removeFromCart = (event, asin, price) => {
    event.target.closest("li").remove()
    const totale = document.querySelector("h1 span")
    totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2)
    const book = document.querySelector("#book_" + asin)
    book.style.opacity = "1"
  }

  const emptyCart = () => {
    document.querySelector(".list-group").innerHTML = ""
    document.querySelectorAll(".card").forEach(card => card.style.opacity = "1")
    const totale = document.querySelector("h1 span")
    totale.innerText = "0"
}

  const hideCard = (event) => event.target.closest(".col-12").remove();    
