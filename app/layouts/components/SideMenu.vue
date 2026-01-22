<script setup>
import { gsap } from 'gsap';

const props = defineProps(['isOpen']);
const emit = defineEmits(['close']);

const { menu } = useNavigation();

const menuPanel = useTemplateRef('menuPanel');
const menuItems = ref([]);
const overlay = ref(null);

// 監控開啟狀態執行動畫
watch(
  () => props.isOpen,
  newVal => {
    const tl = gsap.timeline();

    if (newVal) {
      // 開啟動畫
      tl.to(overlay.value, { opacity: 1, duration: 0.3, display: 'block' })
        .to(menuPanel.value, { x: 0, duration: 0.8, ease: 'expo.out' }, '-=0.2')
        .fromTo(
          menuItems.value,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
          '-=0.4',
        );
    } else {
      // 關閉動畫
      tl.to(menuPanel.value, { x: '100%', duration: 0.6, ease: 'expo.in' }).to(
        overlay.value,
        { opacity: 0, duration: 0.3, display: 'none' },
        '-=0.3',
      );
    }
  },
);
</script>

<template>
  <div>
    <div
      ref="overlay"
      class="fixed inset-0 bg-black/40 z-[10000] hidden opacity-0 h-screen"
      @click="emit('close')"
    />

    <div
      ref="menuPanel"
      class="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[10001] translate-x-full shadow-2xl p-12 flex flex-col justify-center h-screen"
    >
      <UButton
        @click="emit('close')"
        icon="fluent:dismiss-circle-32-regular"
        class="absolute top-10 right-10 group"
        variant="text"
      />

      <nav class="space-y-6">
        <div
          v-for="(item, index) in menu"
          :key="index"
          ref="menuItems"
          class="overflow-hidden"
        >
          <NuxtLink
            to="/"
            class="text-[32px] font-serif hover:italic transition-all duration-300 block"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>

      <div class="mt-20 border-t pt-10">
        <p class="text-[12px] tracking-widest text-gray-400 uppercase mb-4">Follow Us</p>
        <div class="flex gap-6 text-[13px]">
          <a href="#" class="hover:text-gray-400">Instagram</a>
          <a href="#" class="hover:text-gray-400">Pinterest</a>
        </div>
      </div>
    </div>
  </div>
</template>
