<script setup>
import CartItemsList from './components/CartItemsList.vue';
import CartSummary from './components/CartSummary.vue';
</script>
<template>
  <aside class="w-full md:w-1/3 px-4">
    <h2 class="text-xl font-bold mb-4">Votre Panier</h2>
    <div class="cart bg-white rounded-lg shadow animate__animated">
      <cart-items-list />
      <cart-summary />
    </div>
  </aside>
</template>
<style scoped></style>
