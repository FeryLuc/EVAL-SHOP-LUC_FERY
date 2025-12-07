import { ref, reactive, computed } from 'vue';
import { productStore } from '@/stores/products';
import DB from '@/services/DB';
//---------STORE POUR VERSION FULL MOCKAPI TABLES RELATIONNELLES------------
//Attention lors des exécutions des méthodes "CRUD" je dois changer ce que je leur passe. par exemple le create ici a besoin de l'id du product pour faire une liaison.
//Tableau nécessaire que pour faire la jointure des 2 tables car pas de join avec mockApi
const cartItems = reactive([]);
const products = reactive([]);
const deliveryCost = ref(5);

const cartItemsWithProducts = computed(() =>
  DB.getCartItemsWithProducts(productStore.products, cartItems)
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
    (cartItems.length == 0 ? 0 : Number(deliveryCost.value))
  ).toFixed(2)
);

const init = async () => {
  await loadCartItems();
};
//Sert que pour la jointure en JS. Car dans la list de la cart j'affiche les infos du produit lié a un cartItem
const loadCartItems = async () => {
  cartItems.splice(0, cartItems.length, ...(await DB.findAllCartItems()));
  console.table(cartItems);
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
const updateQuantity = async (id, newQuantity) => {
  const item = cartItems.find((item) => item.id === id);
  const quantity = parseInt(newQuantity);
  if (item) {
    item.quantity = quantity;
    await DB.updateCartItem(item.id, quantity);
    console.table(cartItems);
  }
};
const deleteCartItem = async (cartItemId, selfDelete = true) => {
  await DB.deleteCartItemById(cartItemId);
  if (selfDelete) {
    const index = cartItems.findIndex((item) => item.id === cartItemId);
    if (index !== -1) {
      cartItems.splice(index, 1);
    }
  }
};
const order = async () => {
  console.table(cartItems);

  if (cartItems.length == 0) {
    alert("Tu n'as rien à acheter !");
    return;
  }
  //fonctionne pas car on modifie pendant l'itération du coup ma méthode delete à 2 chemins.
  // cartItems.map(async (cI) => {
  //   await deleteCartItem(cI.id);
  // });
  await Promise.all(cartItems.map((cI) => DB.deleteCartItemById(cI.id, false)));
  cartItems.length = 0;
  alert('Achat effectué ! ');
};

export const cartStore = reactive({
  init,
  products,
  //   cartItems,
  cartItemsWithProducts,
  subTotal,
  tva,
  total,
  deliveryCost,
  createCartItem,
  deleteCartItem,
  updateQuantity,
  order,
});
