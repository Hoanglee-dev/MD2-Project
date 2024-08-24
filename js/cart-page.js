let cart = new Cart();

function updateToalPriceOnDOM() {
  document.getElementById("total-price").innerHTML = cart.getTotalPrice();
}

function updateCartCount() {
  let cartCount = document.getElementById("cart-count")
  cartCount.textContent = cart.getTotalItems()
}

function priceAftDiscount(product) {
  const salePrice = (product.price - ( product.price * ( product.disPercent / 100 )));
  return salePrice;
};

function updateCartInfoAfterChangeQuanlity(product) {
  document.getElementById(`product-${product.id}`).value = product.quanlity 
  const discPrice = priceAftDiscount(product);
  const totalCost = (discPrice * product.quanlity).toLocaleString("vi-VN");
  console.log(totalCost)
  document.getElementById(`product-total-cost-${product.id}`).innerHTML = totalCost
  updateToalPriceOnDOM();
  updateCartCount();
}

function increMoreItem(product) {
  cart.incrementQuantity(product.id);
  updateCartInfoAfterChangeQuanlity(product);
}

function decreMoreItem(product) {
  cart.decrementQuantity(product.id)
  updateCartInfoAfterChangeQuanlity(product);
}

function deleteProduct(id) {
  let isConfirm = confirm("Bạn chắc chứ?")
  if (isConfirm) {
    document.getElementById(`product-item-${id}`).remove()
    cart.removeProduct(id)
    updateToalPriceOnDOM();
    updateCartCount();
  }
};

function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  const totalPrice = document.getElementById("total-price")
  let totalSum = 0;
  let cartItems = cart.getList();
  updateCartCount();
  cartItems.map((product) => {
    const discPrice = priceAftDiscount(product);
    const totalCost = (discPrice * product.quanlity).toLocaleString('vi-VN');
    totalSum += totalCost;
    const productDiv = document.createElement("tr");
    productDiv.setAttribute("id",`product-item-${product.id}`)
    productDiv.innerHTML = `
              <td class="product-info">
                <img src="${product.image}" alt="Tổ yến" class="product-image" />
                <div class="product-details">
                  <p>${product.name}</p>
                  <button class="delete-product", id="delete-product-${product.id}">xoá</button>
                </div>
              </td>
              <td class="product-price">
                <span class="current-price">${discPrice.toLocaleString("vi-VN")}</span>
              </td>
              <td class="product-quantity">
                <button class="quanlity-btn" id="decrement">-</button>
                <input type="" class="quantity-input" id="product-${product.id}" value="${product.quanlity}"/>
                <button class="quanlity-btn" id="increment" >+</button>
              </td>
              <td class="product-total" id="product-total-cost-${product.id}">${totalCost}</td>     
  `;
    const buttonIncre = productDiv.querySelector(`button#increment`);
    buttonIncre.addEventListener('click', () => {
      increMoreItem(product)
    });
  
    const buttonDecre = productDiv.querySelector(`button#decrement`);
    buttonDecre.addEventListener('click', () => {
      if(product.quanlity == 1) {
        deleteProduct(product.id);
      } else {
        decreMoreItem(product)
      }
    });
    const buttonDelete = productDiv.querySelector(`button#delete-product-${product.id}`);
    buttonDelete.addEventListener('click', () => {
      deleteProduct(product.id)
      
    });
  
  cartItemsContainer.appendChild(productDiv);
    totalPrice.innerHTML = `
      ${cart.getTotalPrice()}
    `;
    
})
}

loadCartItems();






