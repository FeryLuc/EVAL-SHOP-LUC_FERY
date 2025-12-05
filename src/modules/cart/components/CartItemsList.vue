<script setup>
import CartItem from './CartItem.vue';
import { cartStore } from '@/stores/cartLS';
</script>
<template>
  <ul class="divide-y divide-gray-200 space-y-4 p-6">
    <!-- boucler sur la computed jointure avec store Cart-->
    <cart-item
      v-for="item in cartStore.cartItems"
      :key="item.id"
      :cartItem="item"
    />
  </ul>
</template>
<style scoped></style>
