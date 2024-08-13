
const products = [
  { name: 'Yến chưng bách niên 1', price: 225000, image: 'https://bizweb.dktcdn.net/thumb/large/100/488/726/products/ezgif-com-webp-to-jpg-1-7f340f50-a96d-4fc5-b4c2-d13e54acde92.jpg?v=1690258293973' },
  { name: 'Yến chưng ngọc nữ', price: 250000, image: 'https://bizweb.dktcdn.net/thumb/large/100/488/726/products/ezgif-com-webp-to-jpg-2-4dce3ead-779b-4cdb-a721-558683ba6202.jpg?v=1690212908537' },
  { name: 'Yến chưng vương dược', price: 255000, image: 'https://bizweb.dktcdn.net/thumb/large/100/488/726/products/ezgif-com-webp-to-jpg-2-8ff49a98-920a-420c-9968-ee353f097abf.jpg?v=1690212340047' },
  { name: 'Yến chưng long thai', price: 460000, image: 'https://bizweb.dktcdn.net/thumb/large/100/488/726/products/ezgif-com-webp-to-jpg-4-15d549e2-5c06-455e-a6e2-757534c32a4a.jpg?v=1690211819103' },
];

const productList = document.getElementById("product-list")
const cartCountElement = document.getElementById("cart-count")
function addNewProduct(index) {
  const product = products[index];
  let cartLocal = JSON.parse(localStorage.getItem("cartLocal")) || [];
  cartLocal.push(product);
  localStorage.setItem('cartLocal', JSON.stringify(cartLocal));
  cartCountElement.textContent = cartLocal.length;
  alert(`Đã thêm vào giỏ hàng: ${product.name}, Giá: ${product.price} VND`); 
}

products.map((product, index) => {
  const productDiv = document.createElement('div');
  productDiv.innerHTML = `
                    <div class="col-md-3">
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
                                >${product.price}</span
                              >
                            </div>
                            <button class="add-cart-button" id="add-to-cart-${index}">
                              Thêm vào giỏ hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
  `; 
  const addButton = productDiv.querySelector(`#add-to-cart-${index}`);
  addButton.addEventListener('click', () => addNewProduct(index));
  productList.appendChild(productDiv);
});

document.addEventListener('DOMContentLoaded', () => {
  let cartLocal = JSON.parse(localStorage.getItem("cartLocal")) || [];
  cartCountElement.textContent = cartLocal.length;
})
