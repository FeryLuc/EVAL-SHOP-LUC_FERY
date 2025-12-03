import { ref, reactive, computed } from 'vue';
import DB from '@/services/DB';
//Tableau nécessaireque pour faire la jointure des 2 tables car pas de join avec mockApi
const cartItems = reactive([]);
const products = reactive([]);
const deliveryCost = ref(5);

const cartItemsWithProducts = computed(() =>
  DB.getCartItemsWithProducts(products, cartItems)
);
const subTotal = computed(() => {
  return cartItemsWithProducts.value
    .reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.productPrice),
      0
    )
    .toFixed(2);
});
const tva = computed(() => (subTotal.value * 0.2).toFixed(2));
const total = computed(() =>
  (
    Number(subTotal.value) +
    Number(tva.value) +
    Number(deliveryCost.value)
  ).toFixed(2)
);

const init = async (apiUrl) => {
  DB.setApiUrl(apiUrl);
  await loadProducts();
  await loadCartItems();
};
const loadProducts = async () => {
  products.splice(products.length, 0, ...(await DB.findAllProducts()));
};
//Sert que pour la jointure en JS. Car dans la list de la cart j'affiche les infos du produit lié a un cartItem
const loadCartItems = async () => {
  cartItems.splice(cartItems.length, 0, ...(await DB.findAllCartItems()));
  console.table(cartItems);
};

const updateQuantity = async (id, newQuantity) => {
  const item = cartItems.find((item) => item.id === id);
  const quantity = parseInt(newQuantity);
  if (item) {
    item.quantity = quantity;
    await DB.updateCartItem(item.id, quantity);
    console.table(cartItems);
  }
};

const createCartItem = async (productid) => {
  const existingItem = cartItems.find((item) => item.productId === productid);

  if (existingItem) {
    const updatedItem = await DB.updateCartItem(
      existingItem.id,
      existingItem.quantity + 1
    );

    const index = cartItems.findIndex((item) => item.id == existingItem.id);
    cartItems[index] = updatedItem;
    console.log(cartItemsWithProducts.value, 'IFFFFFFFFF');
  } else {
    const newItem = await DB.createCartItem(productid);
    cartItems.push(newItem);
    console.log(cartItemsWithProducts, 'ELSEEEEEEEE');
  }
};
const deleteCartItem = async (cartItemId) => {
  const res = await DB.deleteCartItemById(cartItemId);
  const index = cartItems.findIndex((item) => item.id === cartItemId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
};

export const cartStore = reactive({
  init,
  products,
  //   cartItems,
  cartItemsWithProducts,
  quantity: 0,
  subTotal,
  tva,
  total,
  deliveryCost,
  //   loadProducts,
  //   loadCartItems,
  createCartItem,
  deleteCartItem,
  updateQuantity,
});
