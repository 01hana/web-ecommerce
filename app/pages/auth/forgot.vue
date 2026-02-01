<script setup lang="ts">
import { gsap } from 'gsap';

onMounted(() => {
  const tl = gsap.timeline();

  // 圖片滑入與表單漸顯
  tl.from('.login-image', { x: 50, opacity: 0, duration: 1.2, ease: 'power3.out' }).from(
    '.login-form-content',
    { y: 30, opacity: 0, duration: 1, ease: 'power3.out' },
    '-=0.8',
  );
});

const { defineField, setFieldValue, handleSubmit } = useForm({
  validationSchema: {},
});

const [password] = defineField('password');

const show = ref(false);
</script>

<template>
  <div class="min-h-[calc(100vh-60px)] flex items-center justify-center py-12 px-4">
    <div
      class="max-w-6xl w-full bg-white flex flex-col lg:flex-row overflow-hidden shadow-sm border border-gray-100 rounded-xl lg:rounded-[2rem]"
    >
      <div class="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
        <div class="login-form-content">
          <header class="mb-10">
            <p class="text-[12px] tracking-[0.4em] uppercase text-gray-400 mb-2 font-bold">
              Welcome Back
            </p>
            <h1 class="text-4xl font-serif text-[#1b1b1b]">Forgot Password</h1>
          </header>

          <UForm id="forgot-form" :state="{}" class="space-y-6">
            <div class="space-y-4">
              <FormField name="email" label="Email" />
            </div>

            <UButton
              label="送出"
              class="w-full flex justify-center text-white bg-[#1b1b1b] hover:text-white hover:bg-black py-5 rounded-xl uppercase tracking-[0.3em] font-bold transition-all shadow-lg active:scale-[0.98]"
            />

            <div class="flex items-center justify-center gap-2 text-sm tracking-wide">
              已有帳號？
              <NuxtLink to="/auth/login" class="text-gray-400 hover:text-black transition-colors">
                點此登入
              </NuxtLink>
            </div>
          </UForm>
        </div>
      </div>

      <div class="hidden lg:block lg:w-1/2 bg-[#f4f1ee] relative overflow-hidden login-image">
        <img
          src="https://images.unsplash.com/photo-1589363358751-ab05797e5629?q=80&w=627&auto=format&fit=crop"
          alt="Login Decor"
          class="w-full h-full object-cover mix-blend-multiply opacity-90"
        />
        <div
          class="absolute bottom-12 left-12 right-12 text-white p-8 backdrop-blur-md bg-black/10 rounded-2xl border border-white/20"
        >
          <p class="font-serif text-2xl mb-2">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
          <span class="text-[10px] uppercase tracking-[0.4em] opacity-70">— Doe.</span>
        </div>
      </div>
    </div>
  </div>
</template>
