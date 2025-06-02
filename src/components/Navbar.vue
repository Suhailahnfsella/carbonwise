<template>
  <nav
    class="bg-white shadow md:px-15 lg:px-24 lg:py-5 md:pt-6 px-6 py-4 flex justify-between items-center fixed -mt-1 top-0 left-0 right-0 z-50">
    <div class="text-xl font-extrabold bg-gradient-to-r from-primaryblue to-greenlight bg-clip-text text-transparent">
      CarbonWise</div>

    <ul class="hidden md:flex space-x-6 items-center">
      <li>
        <router-link to="/" :class="[
          'hover:text-primaryoranye',
          route.path === '/' ? 'text-primaryoranye' : 'text-darkblue'
        ]">Home</router-link>
      </li>
      <li>
        <router-link to="/fitur" :class="[
          'hover:text-primaryoranye',
          route.path === '/fitur' ? 'text-primaryoranye' : 'text-darkblue'
        ]">Fitur</router-link>
      </li>
      <li><button @click="openLogin" class="bg-white text-primaryoranye border border-primaryoranye px-4 py-2 rounded-full
            hover:text-white hover:bg-primaryoranye
            transition duration-300">Login</button></li>
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
        <li>
          <router-link to="/" :class="[
            'hover:text-primaryoranye',
            route.path === '/' ? 'text-primaryoranye' : 'text-darkblue'
          ]" @click="isOpen = false">Home</router-link>
        </li>
        <li>
          <router-link to="/fitur" :class="[
            'hover:text-primaryoranye',
            route.path === '/fitur' ? 'text-primaryoranye' : 'text-darkblue'
          ]" @click="isOpen = false">Fitur</router-link>
        </li>
        <li>
          <button @click="openLogin"
            class="text-primaryoranye hover:text-secondaryoranye bg-transparent border-none p-0">
            Login
          </button>
        </li>
      </ul>
    </transition>

    <LoginModal v-if="showLoginModal" :mode="mode" @update:mode="mode = $event" @close="showLoginModal = false" />
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import LoginModal from './ModalLogin.vue'

const isOpen = ref(false)
const showLoginModal = ref(false)
const route = useRoute()

const mode = ref('login')

const openLogin = () => {
  isOpen.value = false
  showLoginModal.value = true
  mode.value = 'login'
}
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
