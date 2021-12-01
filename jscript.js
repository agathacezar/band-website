console.log("hello world");
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  removeItem();
  updateCartItem();
  addQuantity();
  addCart();
  purchase();
}

function purchase() {
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function addQuantity() {
  let inputAddQuantity = document.getElementsByClassName("cart-quantity-input");
  console.log(inputAddQuantity);
  for (let i = 0; i < inputAddQuantity.length; i++) {
    let input = inputAddQuantity[i];
    console.log(input);
    input.addEventListener("change", quantityChanged);
  }
}

function quantityChanged(event) {
  console.log("teste quantidade");
  let inputAlterado = event.target;
  if (isNaN(inputAlterado.value) || inputAlterado.value <= 0) {
    inputAlterado.value = 1;
  }
  updateCartItem();
}

function addCart() {
  let cartButtons = document.getElementsByClassName("shop-item-button");
  console.log(cartButtons);
  for (let i = 0; i < cartButtons.length; i++) {
    let cartbutton = cartButtons[i];
    cartbutton.addEventListener("click", addCartItems);
  }
}

function addCartItems(event) {
  console.log("click addcart");
  let addCartButton = event.target;
  let shopItem = addCartButton.parentElement.parentElement;
  console.log(shopItem);
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  console.log(title);
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  console.log(price);
  let image = shopItem.getElementsByClassName("shop-item-image")[0].src;
  console.log(image);
  addItemToCart(image, price, title);
  updateCartItem();
}

function purchaseClicked() {
  alert("thank you for yours purchase");
  let cartItems = document.getElementsByClassName("cart-row-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartItem();
}

function addItemToCart(image, price, title) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");

  let cartItems = document.getElementsByClassName("cart-row-items")[0];

  //cart-item-title
  let cartItemName = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert(" This item is already addes to the cart");
      return;
    }
  }
  let cartRowContents = `<div class="cart-item cart-colunm">
        <img width="100px" src=${image}>
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-colunm">${price}</span>
    <div class="cart-quantity cart-colunm">
        <input class="cart-quantity-input" value="1" type="number"> 
        <button class=" btn btn-danger cart-quantity-button" >REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", botaoVermelho);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function removeItem() {
  var botaodeRemoverDoCarrinho = document.getElementsByClassName("btn-danger");
  console.log(botaodeRemoverDoCarrinho);

  for (let i = 0; i < botaodeRemoverDoCarrinho.length; i++) {
    let botao = botaodeRemoverDoCarrinho[i];
    console.log(botao);
    botao.addEventListener("click", botaoVermelho);
  }
}

function botaoVermelho(event) {
  console.log("click");
  let botaoClicado = event.target;
  botaoClicado.parentElement.parentElement.remove();
  updateCartItem();
}

function updateCartItem() {
  var cartItemscontainer = document.getElementsByClassName("cart-row-items")[0];
  console.log(cartItemscontainer);
  let cartRows = cartItemscontainer.getElementsByClassName("cart-row");
  console.log(cartRows);
  var total = 0;
  for (let i = 1; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    console.log(cartRow);
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    console.log(priceElement);
    console.log(quantityElement);
    console.log(priceElement.innerText.replace("$", ""));
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    console.log(typeof price, price);
    let quantity = parseFloat(quantityElement.value);
    console.log(quantity);
    total = total + price * quantity;
    console.log(total);
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
