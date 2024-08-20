let cart = new Cart();

function addToCart(product) {
  cart.add({...product, quanlity:1});
  cart.getList()  
  const cartCountElement = document.getElementById("cart-count")
  cartCountElement.textContent = cart.getTotalItems();
}

function loadNewProducts() {
  const productList = document.getElementById("product-list")
  let newProduct = products.filter(percentage => percentage.disPercent == 0);
  newProduct.map((product) => {
    const vndPrice = product.price.toLocaleString('vi-VN');
    const productDiv = document.createElement('div');
    productDiv.classList.add("col-md-3")
    productDiv.innerHTML = `
                        <div class="box-card-newproduct">
                          <div class="card product-thumbnail">
                            <div class="card-img">
                              <img
                                src="${product.image}"
                                class="img-fluid"
                              />
                            </div>
                            <div class="card-info-newProduct">
                              <h6 class="products-name">
                                <a href="#">${product.name}</a>
                              </h6>
                              <div class="price-sale">
                                <span class="aft-disc" style="margin: auto"
                                  >${vndPrice}đ</span
                                >
                              </div>
                              <button id="product-${product.id}" class="add-cart-button">
                                Thêm vào giỏ hàng
                              </button>
                            </div>
                          </div>
                        </div>
    `; 
    const button = productDiv.querySelector(`button#product-${product.id}`);
    button.addEventListener('click', () => addToCart(product));
    productList.appendChild(productDiv);
  });
}

loadNewProducts();

function loadSaleProducts() {
  let saleProduct = products.filter(percentage => percentage.disPercent > 0);
  const saleList = document.getElementById("sale-list")
  saleProduct.map((saleItem) => {
    const aftDis = (saleItem.price - ( saleItem.price * ( saleItem.disPercent / 100 ))).toLocaleString("vi-VN"); 
    const b4Discount = saleItem.price.toLocaleString("vi-VN");
    const productDiv = document.createElement('div');
    productDiv.classList.add("product-item")
    productDiv.innerHTML = ` 
                        <div class="box-card-sale">
                          <div class="card flash-sale">
                            <div class="card-img">
                              <a
                                ><img
                                  src="${saleItem.image}"
                                  class="img-fluid"
                                />
                                <span>-${saleItem.disPercent}%</span></a
                              >
                            </div>
                            <div class="card-img-overlay">
                              <h6 class="products-name">
                                <a href="">${saleItem.name}</a>
                              </h6>
                              <div class="price-sale">
                                <span class="aft-disc">${aftDis}đ</span>
                                <span class="bef-disc">${b4Discount}đ</span>
                              </div>
                              <button id="sale-product-${saleItem.id}" class="add-cart-button">
                                Thêm vào giỏ hàng
                              </button>
                            </div>
                          </div>
                        </div>
    `;
    const button = productDiv.querySelector(`button#sale-product-${saleItem.id}`);
    button.addEventListener('click', () => addToCart(saleItem));
    saleList.appendChild(productDiv);
  })
}

loadSaleProducts();
