<script setup>
import { gsap } from 'gsap';

// 1. 分類與商品資料
const categories = ['All', 'Accessories', 'Tops', 'Bottoms', 'Decoration'];
const activeTab = ref('All');

const allProducts = ref([
  {
    id: 1,
    name: 'Minimal Vase',
    price: '45.00',
    category: 'Decoration',
    image: 'https://picsum.photos/600/800?random=11',
  },
  {
    id: 2,
    name: 'Table Lamp',
    price: '120.00',
    category: 'Bottoms',
    image: 'https://picsum.photos/600/800?random=12',
  },
  {
    id: 3,
    name: 'Handbag',
    price: '95.00',
    category: 'Accessories',
    image: 'https://picsum.photos/600/800?random=13',
  },
  {
    id: 4,
    name: 'Wooden Chair',
    price: '250.00',
    category: 'Tops',
    image: 'https://picsum.photos/600/800?random=14',
  },
]);

const filteredProducts = computed(() => {
  if (activeTab.value === 'All') return allProducts.value;

  return allProducts.value.filter(p => p.category === activeTab.value);
});

function changeTab(category) {
  // 先將現有商品淡出
  gsap.to('.product-item', {
    opacity: 0,
    y: 10,
    duration: 0.3,
    stagger: 0.05,
    onComplete: () => {
      activeTab.value = category; // 切換資料
      // 資料切換後自動觸發 nextTick 執行進入動畫
      nextTick(() => {
        gsap.fromTo(
          '.product-item',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        );
      });
    },
  });
}
</script>

<template>
  <div class="py-20 px-10">
    <div class="flex flex-wrap items-center justify-center gap-8 mb-16">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="[
          'text-[13px] tracking-[0.3em] uppercase font-bold transition-all pb-1 border-b-2',
          activeTab === cat
            ? 'border-black text-black'
            : 'border-transparent text-gray-400 hover:text-black',
        ]"
        @click="changeTab(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-item group cursor-pointer"
      >
        <div class="relative overflow-hidden aspect-[3/4] mb-4">
          <img
            :src="product.image"
            class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <button
              class="bg-black text-white text-[10px] tracking-widest px-6 py-3 uppercase font-bold"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-[14px] tracking-tight">{{ product.name }}</h3>
          <p class="text-[13px] text-gray-400 mt-1">${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>