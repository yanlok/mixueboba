function purchaseClicked() {
    alert('Proceed to checkout')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
	window.location.href="A1_checkout.html"
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

var cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
var cartItemsHtml = "";
var total = 0;
for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    cartItemsHtml += `
        <div class="cart-row">
          <div class="cart-item cart-column">
            <span class="cart-item-title">${item.title}</span>
          </div>
          <span class="cart-price cart-column">${item.price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="remove" type="button">REMOVE</button>
          </div>
        </div>
      `;
    total += item.price;
}

document.getElementById("cart-items").innerHTML = cartItemsHtml;
document.getElementById("cart-total-price").innerHTML = "RM " + total;

var removeButtons = document.getElementsByClassName('remove')
for (var i = 0; i < removeButtons.length; i++) {
    var button = removeButtons[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('RM ', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementById('cart-total-price').innerText = 'RM ' + total
}