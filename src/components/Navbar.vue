<template>
  <nav
    class="bg-white shadow lg:px-12 lg:py-5 md:pt-6 px-6 py-4 flex justify-between items-center fixed -mt-1 top-0 left-0 right-0 z-50">
    <div class="text-xl font-extrabold bg-gradient-to-r from-primaryblue to-greenlight bg-clip-text text-transparent">
      CarbonWise</div>

    <ul class="hidden md:flex space-x-6">
      <li><a href="#hero" class="text-darkblue hover:text-primaryoranye">Home</a></li>
      <li><a href="#features" class="text-darkblue hover:text-primaryoranye">Fitur</a></li>
      <li><a href="#login" class="bg-white text-primaryoranye border border-primaryoranye px-4 py-2 rounded-full
            hover:text-white hover:bg-primaryoranye
            transition duration-300">Login</a></li>
    </ul>

    <button @click="isOpen = !isOpen" class="text-darkblue md:hidden focus:outline-none">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <transition name="fade">
      <ul v-if="isOpen"
        class="absolute -mt-1 top-full left-0 right-0 bg-white shadow-md flex flex-col space-y-2 px-6 py-4 md:hidden z-50">
        <li><a href="#hero" class="text-darkblue hover:text-primaryoranye" @click="isOpen = false">Home</a></li>
        <li><a href="#features" class="text-darkblue hover:text-primaryoranye" @click="isOpen = false">Fitur</a></li>
        <li><a href="#login" class="text-primaryoranye hover:text-secondaryoranye" @click="isOpen = false">Login</a>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
