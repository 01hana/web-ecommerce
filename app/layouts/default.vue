<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <div class="min-h-screen bg-[#f8f8f8] font-sans text-[#1b1b1b]">
    <div class="fixed inset-0 pointer-events-none z-[100]">
      <div class="absolute top-0 left-0 w-full h-[30px] bg-white" />
      <div class="absolute bottom-0 left-0 w-full h-[30px] bg-white" />
      <div class="absolute top-0 left-0 h-full w-[30px] bg-white" />
      <div class="absolute top-0 right-0 h-full w-[30px] bg-white" />
    </div>

    <Header />

    <main class="pt-[120px] px-[30px] pb-[30px]">
      <slot />
    </main>
  </div>
</template>
