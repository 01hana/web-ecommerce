<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import ProductCard from './ProductCard.vue';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    name: 'Minimalist Chair',
    price: '250.00',
    image: 'https://picsum.photos/600/800?random=1',
  },
  { id: 2, name: 'Ceramic Vase', price: '45.00', image: 'https://picsum.photos/600/800?random=2' },
  { id: 3, name: 'Wood Table', price: '890.00', image: 'https://picsum.photos/600/800?random=3' },
  { id: 4, name: 'Black Lamp', price: '120.00', image: 'https://picsum.photos/600/800?random=4' },
];

onMounted(() => {
  // GSAP: 標題進場動畫
  gsap.from('.hero-text', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.5,
  });

  // GSAP: 滾動到產品時逐個浮現
  gsap.from('.product-card', {
    scrollTrigger: {
      trigger: '.product-grid',
      start: 'top 80%',
    },
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
  });
});
</script>

<template>
  <div>
    <section class="h-[80vh] flex flex-col items-center justify-center text-center">
      <div class="hero-text">
        <h2 class="text-[12px] tracking-[0.4em] uppercase mb-4 text-gray-400 font-bold">
          New Collection
        </h2>
        <h1 class="text-[5vw] font-serif leading-tight mb-8">
          Passepartout <br />
          Interior Design
        </h1>
        <button
          class="border-b border-black text-[13px] tracking-[0.2em] uppercase pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
        >
          Explore More
        </button>
      </div>
    </section>

    <section class="product-grid max-w-[1400px] mx-auto px-4 md:px-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="h-screen flex items-center justify-center">
      <p class="italic text-gray-400">Scroll down to see more...</p>
    </section>
  </div>
</template>
