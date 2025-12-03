<script setup>
import Product from './components/Product.vue';
</script>
<template>
  <section class="w-full md:w-2/3 px-4 mb-8">
    <h1 class="text-3xl font-bold mb-4">Nouveaux produits</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <product />
    </div>
  </section>
</template>
<style scoped></style>
