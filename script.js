const url = "https://striveschool-api.herokuapp.com/books";

window.onload = () => {
  fetchBooks();
};
const fetchBooks = () => {
  fetch(url)
    .then((raw) => raw.json())
    .then((res) => {
      let cont = document.querySelector(".album .row");

      cont.innerHTML = res
        .map((book) => {
          return ` <div class="col-12 col-lg-2 col-md-3 col-sm-6"> 
                     <div class="card mb-4 shadow-sm" id="book_${book.asin}">
                       <img src='${book.img}'/>
                       <div class="card-body">
                          <p class="fw-bold text-truncate book-title"> ${book.title} </p>
                          <p class="fw-bold book-price"> ${book.price} €</p>
                          <div class="d-flex justify-content-evenly align-items-center">                    
                            <button class="btn btn-danger" onclick="addToCart('${book.title}', '${book.price}', '${book.asin}', '${book.img}')"><i class="bi bi-cart"></i></button>
                            <button class="btn btn-primary">Details</button>
                            <button class="btn btn-secondary" onclick="hideCard(event)"><i class="bi bi-x-circle-fill"></i></button>
                           </div>
                        </div>
                      </div> 
                    </div>`;
        })
        .join("");
    })
    .catch((err) => console.error(err));
};

const addToCart = (title, price, asin, img) => {
  const book = document.querySelector("#book_" + asin);
  book.style.opacity = "0.5";
  const cart = document.querySelector(".list-group");
  cart.innerHTML += `
  <li class="list-group-item"> 
    <div class="d-flex flex-nowrap">
      <img src="${img}"/> ${title}, ${price} €
      <button class="btn btn-outline-secondary align-self-center" onclick='removeFromCart(event, "${asin}", "${price}")'> X </button>
    </div>    
  </li>
  `;
  const totale = document.querySelector("h1 span");
  totale.innerText = (Number(totale.innerHTML) + Number(price)).toFixed(2);

  /*const counter = document.querySelector(".counter");
  counter.innerText = (.list-group-item).length*/
};

const searchBook = (ev) => {
  let query = ev.target.value;
  let allTitles = document.querySelectorAll(".book-title");
  console.log(
    query,
    allTitles[0].innerText.toLowerCase().includes(query.toLowerCase())
  );
  allTitles.forEach((title) => {
    const currCard = title.parentElement.parentElement.parentElement;
    if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
      currCard.style.display = "none";
    } else {
      currCard.style.display = "block";
    }
  });
};

const removeFromCart = (event, asin, price) => {
  event.target.closest("li").remove();
  const totale = document.querySelector("h1 span");
  totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2);
  const book = document.querySelector("#book_" + asin);
  book.style.opacity = "1";
};

const emptyCart = () => {
  document.querySelector(".list-group").innerHTML = "";
  document
    .querySelectorAll(".card")
    .forEach((card) => (card.style.opacity = "1"));
  const totale = document.querySelector("h1 span");
  totale.innerText = "0";
};

const hideCard = (event) => event.target.closest(".col-12").remove();



const contatore = () => {
  
  const cart = document.querySelector(".list-group-item");
  
}