<script setup>
import { cartStore } from '@/stores/cart';
const props = defineProps({
  cartItem: { type: Object },
});
const imgSrc = `https://picsum.photos/300/200/?random=${props.cartItem.productId}`;
</script>
<template>
  <li class="flex justify-between items-center py-3">
    <div class="flex items-center">
      <img :src="imgSrc" alt="Product" class="h-12 w-12 rounded-full mr-4" />
      <div>
        <span class="font-semibold">{{ props.cartItem.productName }}</span>
        <span class="block text-sm text-gray-500"
          >€<span>{{ props.cartItem.productPrice }}</span></span
        >
      </div>
    </div>
    <div class="flex items-center">
      <input
        type="number"
        class="form-input mt-1 block w-16 text-center rounded text-gray-700 border-gray-300 border"
        :value="props.cartItem.quantity"
        min="1"
        @input="
          cartStore.updateQuantity(props.cartItem.id, $event.target.value)
        "
      />
      <button class="ml-2 text-red-500 hover:text-red-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </li>
</template>
<style scoped></style>
