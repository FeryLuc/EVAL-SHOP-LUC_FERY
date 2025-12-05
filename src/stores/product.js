import { reactive } from 'vue';
import DB from '../services/DB';

const products = reactive([]);

const init = async (apiUrl) => {
  DB.setApiUrl(apiUrl);
  await loadProducts();
};
const loadProducts = async () => {
  products.splice(products.length, 0, ...(await DB.findAllProducts()));
};

export const productStore = reactive({
  products,
  init,
});
