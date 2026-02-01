<script setup lang="ts">
import SideMenu from './SideMenu.vue';
import DropdownMenu from '~/pages/cart/DropdownMenu.vue';

const [isMenuOpen, setMenuOpen] = useAppState(false);
const { menu } = useNavigation();
const { cartItems, isCartMenuOpen } = storeToRefs(useCart());
const { setCartMenuOpen, getAll } = useCart();

const isScrolled = ref(false);
const activeDropdown = ref<number | null>(null);

if (import.meta.client) {
  useEventListener(window, 'scroll', () => {
    isScrolled.value = window.scrollY > 50;
  });
}

onMounted(() => getAll());

const toggleCart = () => {
  setCartMenuOpen(!isCartMenuOpen.value);
};
</script>

<template>
  <header
    :class="[
      'fixed top-[30px] left-[30px] right-[30px] z-[5000] transition-all duration-500 p-8 flex justify-between items-center',
      isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent',
    ]"
  >
    <div class="flex-1 flex items-baseline gap-12">
      <NuxtLink to="/" class="text-[24px] font-bold tracking-[0.2em] uppercase">
        Doe<span class="text-gray-400">.</span>
      </NuxtLink>

      <nav class="items-center gap-8 hidden md:flex">
        <div
          v-for="(item, index) in menu"
          :key="index"
          class="relative group py-2"
          @mouseenter="activeDropdown = index"
          @mouseleave="activeDropdown = null"
        >
          <NuxtLink
            :to="item.to"
            class="text-[13px] font-bold uppercase tracking-[0.2em] hover:text-gray-400 transition-colors"
          >
            {{ item.label }}
          </NuxtLink>

          <!-- <Transition name="dropdown">
            <div
              v-if="item.children && activeDropdown === index"
              class="absolute top-full min-w-[220px] bg-[#1b1b1b] p-8 z-[6000] shadow-xl"
            >
              <ul class="flex flex-col gap-4">
                <li v-for="(sub, subIdx) in item.children" :key="subIdx">
                  <NuxtLink
                    to="/"
                    class="text-[#999] text-[13px] hover:text-white transition-colors whitespace-nowrap block"
                  >
                    {{ sub.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </Transition> -->
        </div>
      </nav>
    </div>

    <div class="flex items-center">
      <UButton to="/member" icon="solar:user-circle-outline" />

      <div class="relative" @click.stop="toggleCart">
        <UButton icon="solar:cart-large-2-linear" variant="ghost" class="hover:bg-transparent">
          <span class="ml-1 text-[10px] bg-black text-white rounded-full px-1.5 py-0.5">
            {{ cartItems?.length || 0 }}
          </span>
        </UButton>

        <Transition name="cart-pop">
          <DropdownMenu v-if="isCartMenuOpen" />
        </Transition>
      </div>

      <UButton @click="setMenuOpen(true)" class="flex md:hidden flex-col gap-1.5 group ml-4">
        <span class="w-6 h-[1.5px] bg-black transition-all group-hover:w-4" />
        <span class="w-6 h-[1.5px] bg-black"></span>
        <span class="w-4 h-[1.5px] bg-black transition-all group-hover:w-6"></span>
      </UButton>
    </div>

    <SideMenu :isOpen="isMenuOpen" @close="setMenuOpen(false)" />
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translate(-50%, 15px);
}

.cart-pop-enter-active,
.cart-pop-leave-active {
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.cart-pop-enter-from,
.cart-pop-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
