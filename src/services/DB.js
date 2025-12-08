export default class DB {
  //----DB: MockApi pour les produits----//
  //Setup de l'url de l'API
  static setApiUrl(url) {
    this.apiUrl = url;
  }
  //Fetch GET de tous les produits
  static async findAllProducts() {
    const response = await fetch(this.apiUrl + 'products');
    return response.json();
  }

  //----"DB": LocalStorage pour les cartItem----//
  //Upload du localStorage.
  // static updateLocalStorage(cartItems) {
  //   localStorage.setItem('items', JSON.stringify(cartItems));
  // }

  //----DB: MockApi pour les cartItem----//
  static async findAllCartItems() {
    const response = await fetch(this.apiUrl + 'cartItems');
    return response.json();
  }

  static getCartItemsWithProducts(products, cartItems) {
    const result = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        productName: product?.name,
        productPrice: product?.price,
      };
    });
    return result;
  }

  static async createCartItem(productId) {
    const response = await fetch(this.apiUrl + 'cartItems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity: 1,
        productId: productId,
      }),
    });
    return response.json();
  }

  static async updateCartItem(id, quantity) {
    const response = await fetch(this.apiUrl + 'cartItems/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });
    return response.json();
  }

  static async deleteCartItemById(id) {
    // console.log(id);
    // console.log(
    //   'DELETE URL = ',
    //   this.apiUrl + 'products/' + id + '/cartItems/' + id
    // );

    const response = await fetch(
      this.apiUrl + 'products/' + id + '/' + 'cartItems/' + id,
      {
        method: 'DELETE',
      }
    );
    return response.json();
  }
}
