<script setup>
import MyButton from '@/components/ui/MyButton.vue';
const props = defineProps({ product: { type: Object } });
const imgSrc = `https://picsum.photos/300/200/?random=${props.product.id}`;
</script>
<template>
  <article class="bg-white rounded-lg overflow-hidden shadow-md">
    <img :src="imgSrc" alt="Product image" class="w-full" />
    <div class="p-4">
      <h2 class="font-bold text-lg mb-2">{{ props.product.name }}</h2>
      <p class="text-gray-700">
        €<span>{{ props.product.price }}</span>
      </p>
      <my-button>Ajouter</my-button>
    </div>
  </article>
</template>
<style scoped></style>
