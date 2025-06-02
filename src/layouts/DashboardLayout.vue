<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <Sidebar />
    <main class="flex-1 px-8 lg:px-2 py-2 lg:py-10">
      <header class="mb-6 text-center lg:text-start space-y-2">
        <h1 class="text-3xl font-bold">
          <slot name="title">
            <span class="text-darkblue"></span>
          </slot>
        </h1>
        <p class="text-gray-600">
          <slot name="description" />
        </p>
      </header>

      <section>
        <slot />
      </section>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>
