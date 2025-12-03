import { ref, reactive, computed, watch } from 'vue';
import DB from '@/services/DB';
//Tableau nécessaireque pour faire la jointure des 2 tables car pas de join avec mockApi
const cartItems = reactive([]);
const products = reactive([]);
const cartItemsWithProducts = reactive([]);

const init = async (apiUrl) => {
  DB.setApiUrl(apiUrl);
};
const loadProducts = async () => {
  products.splice(products.length, 0, ...(await DB.findAllProducts()));
  console.table(products);
};
//Sert que pour la jointure en JS. Car dans la list de la cart j'affiche les infos du produit lié a un cartItem
const loadCartItems = async () => {
  cartItems.splice(cartItems.length, 0, ...(await DB.findAllCartItems()));
  console.table(cartItems);
};
const loadCartItemsWithProducts = async () => {
  cartItemsWithProducts.splice(
    cartItemsWithProducts.length,
    0,
    ...(await DB.getCartItemsWithProducts(products, cartItems))
  );
  console.table(cartItemsWithProducts);
};
const createCartItem = async (productId) => {
  const res = await DB.createCartItem(productId);
  cartItems.push(res);
};
const deleteCartItem = async (cartItemId) => {
  const res = await DB.deleteCartItemById(cartItemId);
  const index = cartItems.findIndex((cI) => cI.id === cartItemId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
};
export const cartStore = reactive({
  init,
  loadProducts,
  loadCartItems,
  loadCartItemsWithProducts,
  createCartItem,
});
