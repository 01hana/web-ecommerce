<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const { addToCart } = useCart();

// 模擬商品資料
const product = ref({
  id: 1,
  name: 'Modern Wool Coat',
  price: '1090',
  description:
    '這款大衣採用高品質羊毛混紡，剪裁俐落，展現 Doe. 的極簡美學。適合冷天穿搭，提供卓越的保暖性與風格。',
  images: [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576685580253-98ea71eed5ce?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
  ],
  colors: ['Beige', 'Burlywood', 'Black'],
  sizes: ['S', 'M', 'L'],
});

const selectedColor = ref<string>('');
const selectedSize = ref<string>('');
const quantity = ref<number>(1);

const notAllowedToAdd = computed(() => !selectedColor.value || !selectedSize.value);

onMounted(() => {
  gsap.from('.reveal-right', {
    y: 30,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.2,
  });
});

function handleAdd() {
  const { id, name, images, price } = product.value;

  const item = {
    id,
    name,
    image: images[0],
    price,
    quantity: quantity.value,
    color: selectedColor.value,
    size: selectedSize.value,
  };

  addToCart(item);
}
</script>

<template>
  <div class="max-w-[1600px] mx-auto px-6 md:px-12 py-10 lg:py-20">
    <div class="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
      <div class="w-full lg:w-[60%] space-y-4">
        <div
          v-for="(img, idx) in product.images"
          :key="idx"
          class="w-full bg-[#f6f6f6] overflow-hidden"
        >
          <img
            :src="img"
            alt="product view"
            class="w-full h-auto object-cover block transition-opacity duration-700"
            loading="lazy"
          />
        </div>
      </div>

      <div class="w-full lg:w-[40%] sticky top-[120px] self-start">
        <div class="space-y-10">
          <div class="reveal-right">
            <h1 class="text-2xl font-medium tracking-tight text-[#1b1b1b]">
              {{ product.name }}
            </h1>
            <p class="text-xl font-light text-gray-900">NT$ {{ product.price }}</p>
          </div>

          <div class="space-y-8">
            <div class="reveal-right space-y-3">
              <span class="text-[11px] uppercase tracking-widest font-bold"
                >Color: {{ selectedColor }}</span
              >
              <div class="flex gap-3">
                <button
                  v-for="color in product.colors"
                  :key="color"
                  @click="selectedColor = color"
                  :class="[
                    'w-6 h-6 rounded-full border transition-all p-0.5 cursor-pointer',
                    selectedColor === color ? 'border-black' : 'border-transparent',
                  ]"
                >
                  <span
                    :class="[
                      'block w-full h-full rounded-full border border-black/10',
                      color.toLowerCase(),
                    ]"
                    :style="{ backgroundColor: color.toLowerCase() }"
                  ></span>
                </button>
              </div>
            </div>

            <div class="reveal-right space-y-3">
              <span class="text-[11px] uppercase tracking-widest font-bold"
                >Size: {{ selectedSize }}</span
              >
              <div class="flex gap-2">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'px-6 py-2 border text-[12px] transition-all cursor-pointer',
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-transparent border-gray-300 hover:border-black hover:text-black',
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>
          </div>

          <div class="reveal-right space-y-3">
            <div class="flex items-center gap-4">
              <div class="flex border border-gray-300 h-12 items-center">
                <button
                  @click="quantity > 1 && quantity--"
                  class="px-4 hover:bg-gray-50 cursor-pointer"
                >
                  -
                </button>
                <input
                  v-model="quantity"
                  type="text"
                  class="w-10 text-center text-sm outline-none bg-transparent"
                  readonly
                />
                <button @click="quantity++" class="px-4 hover:bg-gray-50 cursor-pointer">+</button>
              </div>

              <UButton
                :disabled="notAllowedToAdd"
                :ui="{
                  base: 'rounded-none flex-1 h-12 border border-gray-300 uppercase text-[12px] tracking-[0.2em] font-bold transition-all justify-center',
                }"
                @click="handleAdd"
              >
                Add to Cart
              </UButton>
            </div>
          </div>

          <div class="reveal-right pt-6">
            <p class="text-[14px] text-gray-800 font-light">
              {{ product.description }}
            </p>
          </div>

          <div class="reveal-right border-t border-gray-100">
            <UAccordion
              :items="[
                { label: 'Fabric & Care', content: '70% Wool, 30% Polyester. Dry clean only.' },
                { label: 'Shipping & Returns', content: 'Free shipping on orders over NT$3,000.' },
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
