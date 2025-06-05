<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import EcoBadgeDetail from '@/components/EcoBadgeDetail.vue'

const badges = ref([
  {
    id: "carbon-reducer",
    title: "Carbon Reducer",
    description: "Diberikan untuk mengurangi jejak karbon sebesar 10%",
    earned: true,
    date: "2023-05-15",
    image: "/badges/carbon-reducer.png",
    criteria: "Mengurangi emisi karbon sebesar 10% dalam 7 hari"
  },
  {
    id: "eco-warrior",
    title: "Eco Warrior",
    description: "Diberikan untuk konsisten selama 30 hari",
    earned: false,
    date: null,
    image: "/badges/eco-warrior.png",
    criteria: "Menjaga kebiasaan ramah lingkungan selama 30 hari berturut-turut"
  },
  {
    id: "community-champion",
    title: "Community Champion",
    description: "Diberikan untuk berpartisipasi dalam 3 tantangan komunitas",
    earned: true,
    date: "2023-06-02",
    image: "/badges/community-champion.png",
    criteria: "Menyelesaikan 3 tantangan komunitas yang berbeda"
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

const shareBadge = (badge) => {
  // Implementasi share ke sosial media
  alert(`Membagikan badge ${badge.title} ke media sosial!`)
}
</script>

<template>
  <DashboardLayout>
    <template #title>
      <span class="text-primaryblue">Eco</span><span class="text-greenlight">Badge</span>
    </template>

    <template #description>
      Koleksi penghargaan digital untuk aksi lingkungan Anda.
    </template>

    <div class="eco-badge-page">
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-800">Koleksi EcoBadge</h2>
        <p class="text-gray-600">Penghargaan untuk kontribusi Anda terhadap lingkungan</p>
      </div>

      <div v-if="earnedBadges.length > 0" class="mb-12">
        <h3 class="text-lg font-medium text-gray-700 mb-4 flex items-center">
          <span class="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2">
            {{ earnedBadges.length }}
          </span>
          Telah Diraih
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="badge in earnedBadges"
            :key="badge.id"
            @click="openDetail(badge)"
            class="bg-white p-4 rounded-lg shadow-sm border border-green-100 cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1"
          >
            <div class="flex flex-col items-center">
              <img :src="badge.image" :alt="badge.title" class="w-16 h-16 mb-2">
              <h4 class="font-medium text-center text-sm">{{ badge.title }}</h4>
              <p class="text-xs text-gray-500 text-center mt-1">{{ badge.date }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="unearnedBadges.length > 0">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Belum Diraih</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="badge in unearnedBadges"
            :key="badge.id"
            class="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div class="flex flex-col items-center opacity-70">
              <img :src="badge.image" :alt="badge.title" class="w-16 h-16 mb-2 grayscale">
              <h4 class="font-medium text-center text-sm">{{ badge.title }}</h4>
              <p class="text-xs text-gray-500 text-center mt-1">?</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 bg-green-50 p-6 rounded-lg">
        <h3 class="text-lg font-medium text-gray-800 mb-3">Bagaimana mendapatkan lebih banyak EcoBadge?</h3>
        <p class="text-gray-700 mb-4">Kunjungi halaman EcoChallenge dan selesaikan tantangan untuk membuka kunci lebih banyak EcoBadge!</p>
        <RouterLink
          to="/ecochallenge"
          class="inline-flex items-center px-4 py-2 bg-primaryblue text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Lihat Tantangan
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </RouterLink>
      </div>
    </div>

    <!-- Badge Detail Modal -->
    <EcoBadgeDetail
      v-if="showDetailModal"
      :badge="selectedBadge"
      @close="showDetailModal = false"
      @share="shareBadge(selectedBadge)"
    />
  </DashboardLayout>
</template>

<style scoped>
.eco-badge-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
