<script setup>
import { gsap } from 'gsap';
import ImgCarousel from './ImgCarousel.vue';

// 模擬單一商品資料
const product = {
  name: 'Rose Holdback',
  price: '25.00',
  sku: '003',
  category: 'Decoration',
  tags: ['Interior', 'Modern', 'Rose'],
  description:
    'Carefully crafted from high-quality materials, this holdback adds a touch of vintage elegance to any curtain arrangement.',
  images: [
    'https://picsum.photos/1200/1600?random=21',
    'https://picsum.photos/1200/1600?random=22',
    'https://picsum.photos/1200/1600?random=23',
  ],
};

const quantity = ref(1);

onMounted(() => {
  // 文字進場動畫
  gsap.from('.product-detail-fade', {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: 'power3.out',
  });
});
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-10 py-20">
    <div class="flex flex-col lg:flex-row gap-16">
      <div class="w-full lg:w-[60%] space-y-8">
        <ImgCarousel :images="product.images" />
      </div>

      <div class="w-full lg:w-[40%]">
        <div class="sticky top-[120px] space-y-8 product-detail-fade">
          <section>
            <h1 class="text-4xl font-serif mb-4">{{ product.name }}</h1>
            <p class="text-2xl text-gray-500 font-light">${{ product.price }}</p>
          </section>

          <p class="text-gray-500 leading-relaxed text-[15px]">
            {{ product.description }}
          </p>

          <div class="flex items-center gap-6 pt-4">
            <div class="flex border border-gray-200 px-4 py-3 items-center gap-6">
              <button
                @click="quantity > 1 && quantity--"
                class="hover:text-gray-400 cursor-pointer"
              >
                -
              </button>
              <span class="text-sm w-4 text-center">{{ quantity }}</span>
              <button @click="quantity++" class="hover:text-gray-400 cursor-pointer">+</button>
            </div>

            <button
              class="flex-1 bg-black text-white py-4 uppercase text-[12px] tracking-[0.3em] font-bold hover:bg-gray-800 transition-all"
            >
              Add to Cart
            </button>
          </div>

          <div
            class="pt-10 border-t border-gray-100 space-y-2 text-[12px] uppercase tracking-widest text-gray-400"
          >
            <p><span class="text-black font-bold">SKU:</span> {{ product.sku }}</p>
            <p><span class="text-black font-bold">Category:</span> {{ product.category }}</p>
            <p><span class="text-black font-bold">Tags:</span> {{ product.tags.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
