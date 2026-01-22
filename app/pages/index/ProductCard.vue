<script setup>
defineProps(['product']);
</script>

<template>
  <div class="product-card group cursor-pointer relative mb-10">
    <div class="relative overflow-hidden aspect-[3/4] bg-white">
      <img
        :src="product.image"
        class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
      >
        <button
          class="bg-white text-black text-[11px] tracking-[0.2em] px-8 py-4 uppercase font-bold hover:bg-black hover:text-white transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <div class="mt-5 text-center">
      <h3 class="text-[15px] tracking-tight mb-1">{{ product.name }}</h3>
      <p class="text-[14px] text-gray-400">${{ product.price }}</p>
    </div>
  </div>
</template>
