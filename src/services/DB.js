export default class DB {
  static setApiUrl(url) {
    this.apiUrl = url;
  }

  static async findAllProducts() {
    const response = await fetch(this.apiUrl + 'products');
    return response.json();
  }
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

  static async deleteCartItemById(id) {
    const response = await fetch(this.apiUrl + 'cartItems/' + id, {
      method: 'DELETE',
    });
    return response.json();
  }
}
