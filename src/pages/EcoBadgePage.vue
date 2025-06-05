<script setup>
import { ref, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import EcoBadgeDetail from '@/components/EcoBadgeDetail.vue'

const getBadgeSVG = (badge, color, stroke) => {
  switch (badge) {
    case 'carbon-reducer':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16V8" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 8L8 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'eco-warrior':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 8V12L15 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16V16.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'plastic-free':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M8 12L16 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8L12 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'beginner-eco':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 8V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'energy-conscious':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 9V12L14.5 14.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'hydrate-eco':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 16V12L9 9" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8V8.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'community-champion':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#9C27B0" stroke="#7B1FA2" stroke-width="2"/>
          <path d="M12 16V12L8 8" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 12L16 8" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 12V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    default:
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#9E9E9E" stroke="#616161" stroke-width="2"/>
          <path d="M12 8V12V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
  }
}

const badges = ref([
  {
    id: "carbon-reducer",
    title: "Carbon Reducer",
    description: "Diberikan untuk mengurangi jejak karbon sebesar 10% dalam seminggu",
    earned: true,
    date: "2023-05-15",
    criteria: "Mengurangi emisi karbon sebesar 10% dalam 7 hari",
    color: "#4CAF50",
    stroke: "#2E7D32"
  },
  {
    id: "eco-warrior",
    title: "Eco Warrior",
    description: "Diberikan untuk konsisten menjaga kebiasaan ramah lingkungan selama 30 hari",
    earned: true,
    date: "2023-06-10",
    criteria: "Menjaga kebiasaan ramah lingkungan selama 30 hari berturut-turut",
    color: "#8BC34A",
    stroke: "#689F38"
  },
  {
    id: "plastic-free",
    title: "Plastic Free",
    description: "Diberikan untuk menghindari plastik sekali pakai selama 2 minggu",
    earned: false,
    date: null,
    criteria: "Hindari penggunaan plastik sekali pakai selama 14 hari",
    color: "#009688",
    stroke: "#00796B"
  },
  {
    id: "beginner-eco",
    title: "Beginner Eco",
    description: "Diberikan untuk menggunakan tas belanja reusable selama 3 hari",
    earned: false,
    date: null,
    criteria: "Gunakan tas belanja reusable saat berbelanja selama 3 hari",
    color: "#FFC107",
    stroke: "#FFA000"
  },
  {
    id: "energy-conscious",
    title: "Energy Conscious",
    description: "Diberikan untuk mematikan lampu tidak terpakai selama 5 hari",
    earned: false,
    date: null,
    criteria: "Biasakan mematikan lampu ketika meninggalkan ruangan selama 5 hari",
    color: "#FF9800",
    stroke: "#F57C00"
  },
  {
    id: "hydrate-eco",
    title: "Hydrate Eco",
    description: "Diberikan untuk menggunakan botol minum reusable selama seminggu",
    earned: false,
    date: null,
    criteria: "Gunakan botol minum reusable dan hindari air kemasan selama 7 hari",
    color: "#2196F3",
    stroke: "#1976D2"
  }
])

const selectedBadge = ref(null)
const showDetailModal = ref(false)

const earnedBadges = computed(() => badges.value.filter(badge => badge.earned))
const unearnedBadges = computed(() => badges.value.filter(badge => !badge.earned))

const openDetail = (badge) => {
  selectedBadge.value = badge
  showDetailModal.value = true
}

const notification = ref({ show: false, message: '', type: 'success' })

const showNotification = (msg, type = 'success') => {
  notification.value = { show: true, message: msg, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const shareBadge = (badge) => {
  showNotification(`Diibaratkan ini pop up untuk membagikan badge ${badge.title} ke media sosial!`)
}
</script>

<template>
  <DashboardLayout>
    <template #title>
      <span class="text-primaryblue">Eco</span><span class="text-choco">Badge</span>
    </template>

    <template #description>
      <h3 class="text-xl font-semibold text-primaryblue mt-1 mb-1">Penghargaan Untukmu</h3>
      <p class="text-sm">
        <b>Koleksi penghargaan digital</b> sebagai bukti aksi selamatkan bumi yang telah Anda selesaikan.
      </p>
    </template>

    <div class="max-w-7xl mx-auto">
      <div v-if="earnedBadges.length > 0" class="mb-12">
        <h3 class="text-lg font-medium text-gray-700 mb-4 flex items-center">
          <span class="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">
            {{ earnedBadges.length }}
          </span>
          Telah Diraih
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="badge in earnedBadges" :key="badge.id" @click="openDetail(badge)"
            class="bg-white p-4 rounded-lg shadow-sm border border-green-100 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center">
            <div class="w-16 h-16 mb-2" v-html="getBadgeSVG(badge.id, badge.color, badge.stroke)"></div>
            <h4 class="font-medium text-sm text-center">{{ badge.title }}</h4>
            <p class="text-xs text-gray-500 text-center mt-1">{{ badge.date }}</p>
          </div>
        </div>
      </div>

      <div v-if="unearnedBadges.length > 0" class="mb-12">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Belum Diraih</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="badge in unearnedBadges" :key="badge.id"
            class="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center opacity-70">
            <div class="w-16 h-16 mb-2 grayscale" v-html="getBadgeSVG(badge.id, badge.color, badge.stroke)"></div>
            <h4 class="font-medium text-sm text-center">{{ badge.title }}</h4>
            <p class="text-xs text-gray-500 text-center mt-1">?</p>
          </div>
        </div>
      </div>

      <div class="mt-12 bg-greenlight/10 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Bagaimana mendapatkan lebih banyak EcoBadge?</h3>
        <p class="text-gray-700 mb-4">Kunjungi halaman EcoChallenge dan selesaikan tantangan untuk membuka kunci lebih
          banyak EcoBadge!</p>
        <RouterLink to="/ecochallenge"
          class="inline-flex items-center px-4 py-2 bg-darkblue text-white rounded-md hover:bg-primaryblue transition-colors">
          Lihat Tantangan
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </RouterLink>
      </div>
    </div>

    <div v-if="notification.show" :class="[
      'fixed top-4 right-4 px-4 py-3 rounded text-white z-80 shadow-lg max-w-xs',
      notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
    ]">
      {{ notification.message }}
    </div>

    <EcoBadgeDetail v-if="showDetailModal" :badge="selectedBadge" @close="showDetailModal = false"
      @share="shareBadge(selectedBadge)" />
  </DashboardLayout>
</template>
