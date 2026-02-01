<script setup lang="ts">
const { cartItems, totalAmount } = storeToRefs(useCart());
const { removeCartItem } = useCart();
</script>

<template>
  <div
    class="absolute top-full right-0 w-[320px] bg-white shadow-xl border border-gray-100 z-[6000] p-6 mt-2"
  >
    <div v-if="cartItems.length > 0">
      <ul class="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6">
        <li v-for="item in cartItems" :key="item.id" class="flex gap-4 items-center">
          <img :src="item.image" class="w-16 h-20 object-cover bg-gray-50" />
          <div class="flex-1">
            <h4 class="text-base font-bold tracking-tight">{{ item.name }}</h4>
            <h6>Size: {{ item.size }}</h6>
            <h6>Color: {{ item.color }}</h6>
            <p class="text-sm text-gray-400 mt-1">{{ item.quantity }} × NT${{ item.price }}</p>
          </div>

          <UButton
            class="text-gray-300 hover:text-black text-xs"
            icon="ic:round-close"
            @click="removeCartItem(item.uid ?? '')"
          />
        </li>
      </ul>

      <hr class="border-gray-100 mb-4" />

      <div class="flex justify-between items-center mb-6">
        <span class="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Total</span>
        <span class="text-[14px] font-bold">NT${{ totalAmount }}</span>
      </div>

      <div class="grid grid-cols-1 gap-2">
        <NuxtLink
          to="/cart"
          class="text-center py-3 border border-black text-[10px] uppercase tracking-widest font-bold hover:bg-gray-50 transition-all"
        >
          View Cart
        </NuxtLink>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-400 text-sm italic">Your cart is empty.</p>
    </div>
  </div>
</template>
