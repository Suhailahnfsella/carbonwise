<template>
  <div>
    <div class="fixed top-4 left-4 z-50 lg:hidden flex flex-col items-start space-y-2">
      <button
        @click="toggleSidebar"
        class="p-2 bg-white rounded shadow"
        aria-label="Toggle sidebar"
      >
        <svg
          v-if="!sidebarOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-darkblue"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-darkblue"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-white shadow-xl px-6 md:px-8 py-18 md:py-20 lg:py-8 space-y-6 min-h-screen transition-transform duration-300 ease-in-out z-40',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:w-60'
      ]"
    >
      <div class="flex items-center space-x-1">
        <img src="/carbonwise.png" alt="CarbonWise Logo" class="h-10 w-10 object-contain" />
        <span
          class="font-semibold text-xl bg-gradient-to-r from-primaryblue to-greenlight bg-clip-text text-transparent"
        >
          CarbonWise
        </span>
      </div>
      <nav class="space-y-2 mt-6">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="block py-2 px-4 rounded text-darkblue hover:bg-gray-100"
          :class="{ 'bg-greenlight/20 font-semibold': isActive(item.path) }"
          @click="sidebarOpen = false"
        >
          {{ item.name }}
        </RouterLink>
      </nav>
    </aside>

    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/30 z-30 lg:hidden"
    ></div>

    <main class="lg:ml-64 p-4 pt-10">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const route = useRoute()

const navItems = [
  { name: 'EcoMap', path: '/ecomap' },
  { name: 'EcoTrack', path: '/ecotrack' },
  { name: 'EcoRisk', path: '/ecorisk' },
  { name: 'EcoChallenge', path: '/ecochallenge' },
  { name: 'EcoBadge', path: '/ecobadge' },
  { name: 'Profil', path: '/profil' },
]

const isActive = (path) => route.path === path
</script>
