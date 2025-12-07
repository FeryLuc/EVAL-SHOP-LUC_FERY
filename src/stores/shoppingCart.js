import { ref, reactive, computed, watch } from 'vue';
import DB from '@/services/DB';

const cartItems = reactive([]);
const deliveryCost = ref(5);

const subTotal = computed(() =>
  cartItems
    .reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
    .toFixed(2)
);
const tva = computed(() => (subTotal.value * 0.2).toFixed(2));
const total = computed(() =>
  (
    Number(subTotal.value) +
    Number(tva.value) +
    (cartItems.length == 0 ? 0 : Number(deliveryCost.value))
  ).toFixed(2)
);

const init = async () => {
  cartItems.splice(
    0,
    cartItems.length,
    ...(JSON.parse(localStorage.getItem('items')) || [])
  );
  console.table(cartItems);
};
const createCartItem = async (product) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    const index = cartItems.findIndex((item) => item.id == existingItem.id);
    cartItems[index].quantity += 1;
  } else {
    const newItem = { ...product, quantity: 1 };
    cartItems.push(newItem);
  }
};
const updateQuantity = async (id, newQuantity) => {
  const item = cartItems.find((item) => item.id === id);
  const quantity = parseInt(newQuantity);
  if (item) {
    item.quantity = quantity;
  } else {
    console.log("Problème à l'update !");
  }
};
const deleteCartItem = async (cartItemId) => {
  const index = cartItems.findIndex((item) => item.id === cartItemId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  } else {
    console.log('Problème au delete !');
  }
};
const order = () => {
  if (cartItems.length == 0) {
    alert("Tu n'as rien à acheter !");
  } else {
    cartItems.length = 0;
    alert('Achat effectué ! ');
  }
};

watch(
  cartItems,
  () => {
    DB.updateLocalStorage(cartItems);
  },
  { deep: true }
);

export const cartStore = reactive({
  init,
  cartItems,
  subTotal,
  tva,
  total,
  deliveryCost,
  createCartItem,
  deleteCartItem,
  updateQuantity,
  order,
});
