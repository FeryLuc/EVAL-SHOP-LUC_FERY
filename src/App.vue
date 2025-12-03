<script setup>
import AppHeader from './layout/AppHeader.vue';
import Catalogue from './modules/catalogue/Catalogue.vue';
import ShoppingCart from './modules/cart/ShoppingCart.vue';
import AppFooter from './layout/AppFooter.vue';
</script>

<template>
  <app-header />
  <main class="container mx-auto py-8 px-4 flex flex-wrap">
    <catalogue />
    <shopping-cart />
  </main>
  <app-footer />
</template>

<style scoped></style>
