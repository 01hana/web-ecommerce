<script setup lang="ts">
const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true,
  },
});

const carousel = useTemplateRef('carousel');
const activeIndex = ref(0);

function onClickPrev() {
  activeIndex.value--;
}
function onClickNext() {
  activeIndex.value++;
}
function onSelect(index: number) {
  activeIndex.value = index;
}

function select(index: number) {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
}
</script>

<template>
  <div class="flex-1 w-full">
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      arrows
      :items="images"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="w-full max-w-xs mx-auto"
      @select="onSelect"
    >
      <img :src="item" height="" width="" class="rounded-sm" />
    </UCarousel>

    <div class="flex gap-1 pt-4 max-w-xs mx-auto">
      <div
        v-for="(item, index) in images"
        :key="index"
        class="relative flex-shrink-0 w-20 h-24 md:w-24 md:h-24 rounded-sm overflow-hidden transition-all duration-300 cursor-pointer"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="select(index)"
      >
        <img :src="item" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
