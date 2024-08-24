class Cart {
  listProduct

  constructor() {
      this.getStorage();
  }

  add(product) {
    const foundItem = this.listProduct.find(item => item.id == product.id);
      if (foundItem) {
        foundItem.quanlity += 1;
      } else {
        this.listProduct.push(product);          
      }
      this.saveStorage();
  }

  getList() {
      return this.listProduct;
  }

  getTotalItems() {
    let sum = 0;
    this.listProduct.forEach(item => {
      sum += item.quanlity
    });
    return sum;
  }

  removeProduct(id) {
    const listItems = this.listProduct.filter(item => item.id !== id)
    this.listProduct = listItems;
    this.saveStorage();
  }

  incrementQuantity(id) {
    const foundItemId = this.listProduct.find(item => item.id == id);
    foundItemId.quanlity += 1 ;
     this.saveStorage();
    
  }

  decrementQuantity(id) {
    const foundItemId = this.listProduct.find(item => item.id == id);
    foundItemId.quanlity -= 1 ;
    this.saveStorage();
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.listProduct.forEach(item => {
      totalPrice = totalPrice + (item.price - ( item.price * ( item.disPercent / 100 ))) * item.quanlity;      
    })

    return totalPrice.toLocaleString("vi-VN");
  }

  saveStorage() {
      localStorage.setItem("cartProducts", JSON.stringify(this.listProduct));
  }

  getStorage() {
      let list = JSON.parse(localStorage.getItem("cartProducts"));
      if (list == null) {
        this.listProduct = [];
      } else {
        this.listProduct = list;
      }
  }
}

// Lấy => Get, Lưu => Set

// dùng để quản lí sản phẩm