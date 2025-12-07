<script setup>
import BurgerButton from '@/components/ui/BurgerButton.vue';
</script>
<template>
  <header class="bg-gray-900 text-white py-4">
    <div class="container mx-auto flex justify-between items-center px-4">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-bold text-xl">EAFC Magasin en ligne</span>
      </div>
      <burger-button />
    </div>
  </header>
</template>
<style scoped></style>
