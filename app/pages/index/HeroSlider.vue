<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// 投影片資料
const slides = [
  {
    id: '01',
    title: 'Feb. <br/> Soft Poise',
    subtitle: 'New Collection',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: '02',
    title: 'Buy two, <br/> Get one free',
    subtitle: 'Winter Sale',
    image:
      'https://images.unsplash.com/photo-1605814932543-71821a4e0f3c?q=80&w=1932&auto=format&fit=crop',
  },
];

const swiperInstance = ref<any>(null);
const activeIndex = ref(0);

function onSwiper(swiper: any) {
  swiperInstance.value = swiper;
}

function onSlideChange(swiper: any) {
  activeIndex.value = swiper.activeIndex;
}

function goToSlide(index: number) {
  swiperInstance.value?.slideTo(index);
}
</script>

<template>
  <UContainer>
    <div class="relative h-[calc(100vh-60px)] w-full group">
      <div class="absolute -left-5 top-1/2 -translate-y-1/2 z-120 flex flex-col gap-6">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          @click="goToSlide(index)"
          class="flex items-center gap-4 group/item cursor-pointer"
        >
          <span
            :class="[
              'text-[13px] font-bold transition-all duration-500 tracking-tighter',
              activeIndex === index ? 'text-black scale-125' : 'text-gray-300',
            ]"
          >
            {{ slide.id }}
          </span>

          <div
            :class="[
              'h-[1.5px] bg-black transition-all duration-500 ease-in-out',
              activeIndex === index
                ? 'w-12 opacity-100'
                : 'w-4 opacity-20 group-hover/item:w-8 group-hover/item:opacity-50',
            ]"
          ></div>
        </button>
      </div>

      <Swiper
        :modules="[Autoplay, EffectFade, Mousewheel]"
        effect="fade"
        :loop="false"
        :speed="1000"
        :autoplay="{
          delay: 3000,
        }"
        class="h-full w-full"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <div class="relative h-full w-full flex items-center justify-center">
            <div class="absolute inset-0">
              <img :src="slide.image" class="h-full w-full object-cover" />

              <div class="absolute inset-0 bg-black/20" />
            </div>

            <div class="relative z-10 text-center hero-text">
              <p class="text-[12px] uppercase tracking-[0.4em] mb-4 text-gray-100 font-bold">
                {{ slide.subtitle }}
              </p>
              <h2 class="text-[6vw] font-serif text-neutral-100 mb-8" v-html="slide.title"></h2>
              <NuxtLink
                to="/products"
                class="cursor-pointer border-b border-white text-[13px] tracking-[0.2em] uppercase pb-1 hover:text-white text-neutral-100 transition-all"
              >
                Explore All
              </NuxtLink>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </UContainer>
</template>
