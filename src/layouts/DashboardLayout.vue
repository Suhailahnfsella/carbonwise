<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <Sidebar />
    <main class="flex-1 px-6 md:px-10 lg:px-8 pyt-2 pb-10 lg:pt-10 lg:pb-20">
      <header class="mb-6 space-y-4">
        <h1 class="text-center lg:text-start text-2xl lg:text-3xl font-bold text-gray-800">
          <slot name="title">
            <span class="text-darkblue"></span>
          </slot>
        </h1>

        <div v-if="$slots.description"
          class="bg-white p-4 lg:pr-20 rounded-xl shadow-sm border border-gray-200 flex items-start max-w-4xl">
          <div class="bg-blue-50 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primaryblue" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text-gray-600 text-sm lg:text-base">
            <slot name="description"></slot>
          </div>
        </div>
      </header>

      <section class="space-y-6">
        <slot />
      </section>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<style>
.card-info-enter-active,
.card-info-leave-active {
  transition: all 0.2s ease;
}

.card-info-enter-from,
.card-info-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
