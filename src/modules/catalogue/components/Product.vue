<script setup>
import MyButton from '@/components/ui/MyButton.vue';
</script>
<template>
  <article class="bg-white rounded-lg overflow-hidden shadow-md">
    <img
      src="https://picsum.photos/300/200/?random=1"
      alt="Product image"
      class="w-full"
    />
    <div class="p-4">
      <h2 class="font-bold text-lg mb-2">Nom du produit</h2>
      <p class="text-gray-700">€50.00</p>
      <my-button>Ajouter</my-button>
    </div>
  </article>
</template>
<style scoped></style>
