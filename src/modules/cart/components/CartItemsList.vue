<script setup>
import CartItem from './CartItem.vue';
import { cartStore } from '@/stores/cart';
</script>
<template>
  <ul class="divide-y divide-gray-200 space-y-4 p-6">
    <cart-item
      v-for="item in cartStore.cartItemsWithProducts"
      :key="item.id"
      :cartItem="item"
    />
  </ul>
</template>
<style scoped></style>
