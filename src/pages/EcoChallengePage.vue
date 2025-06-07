<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ChallengeCard from '@/components/ChallengeCard.vue'

const challenges = ref([
  {
    id: 1,
    title: "Kurangi jejak karbon 10%",
    description: "Kurangi jejak karbon Anda sebesar 10% dalam seminggu",
    duration: "7 hari",
    participants: 142,
    badge: "carbon-reducer",
    progress: 100,
    completed: false,
    badgeColor: "#4CAF50",
    badgeStroke: "#2E7D32"
  },
  {
    id: 2,
    title: "30 hari konsisten",
    description: "Pertahankan kebiasaan ramah lingkungan selama 30 hari berturut-turut",
    duration: "30 hari",
    participants: 89,
    badge: "eco-warrior",
    progress: 100,
    completed: false,
    badgeColor: "#8BC34A",
    badgeStroke: "#689F38"
  },
  {
    id: 3,
    title: "Diet plastik 14 hari",
    description: "Hindari penggunaan plastik sekali pakai selama 2 minggu",
    duration: "14 hari",
    participants: 178,
    badge: "plastic-free",
    progress: 60,
    completed: false,
    badgeColor: "#009688",
    badgeStroke: "#00796B"
  },
  {
    id: 6,
    title: "Bawa tas belanja sendiri",
    description: "Gunakan tas belanja reusable saat berbelanja",
    duration: "3 hari",
    participants: 312,
    badge: "beginner-eco",
    progress: 25,
    completed: false,
    badgeColor: "#FFC107",
    badgeStroke: "#FFA000"
  },
  {
    id: 7,
    title: "Matikan lampu tidak terpakai",
    description: "Biasakan mematikan lampu ketika meninggalkan ruangan",
    duration: "5 hari",
    participants: 278,
    badge: "energy-conscious",
    progress: 0,
    completed: false,
    badgeColor: "#FF9800",
    badgeStroke: "#F57C00"
  },
  {
    id: 8,
    title: "Isi ulang botol minum",
    description: "Gunakan botol minum reusable dan hindari air kemasan",
    duration: "7 hari",
    participants: 421,
    badge: "hydrate-eco",
    progress: 0,
    completed: false,
    badgeColor: "#2196F3",
    badgeStroke: "#1976D2"
  }
])

const showBadgeNotification = ref(false)
const newlyEarnedBadge = ref(null)

const completeChallenge = (challengeId) => {
  const challenge = challenges.value.find(c => c.id === challengeId)
  if (challenge && !challenge.completed && challenge.progress >= 100) {
    challenge.completed = true
    newlyEarnedBadge.value = {
      id: challenge.badge,
      title: challenge.title,
      color: challenge.badgeColor,
      stroke: challenge.badgeStroke
    }
    showBadgeNotification.value = true

    setTimeout(() => {
      showBadgeNotification.value = false
    }, 5000)
  }
}

const getBadgeSVG = (badge, color, stroke) => {
  switch (badge) {
    case 'carbon-reducer':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16V8" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 8L8 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'eco-warrior':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 8V12L15 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16V16.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'plastic-free':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M8 12L16 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8L12 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'beginner-eco':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 8V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'energy-conscious':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 9V12L14.5 14.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'hydrate-eco':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 16V12L9 9" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8V8.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    default:
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#9E9E9E" stroke="#616161" stroke-width="2"/>
          <path d="M12 8V12V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
  }
}
</script>

<template>
  <DashboardLayout>
    <template #title>
      <span class="text-primaryblue">Eco</span><span class="text-greenlight">Challenge</span>
    </template>

    <template #description>
      <h3 class="text-xl font-semibold text-primaryblue mt-1 mb-1">Tantangan Selamatkan Bumi</h3>
      <p class="text-sm">
        <b>Selesaikan tantangan harian/mingguan</b> dan kumpulkan poin untuk mendapatkan EcoBadge.
      </p>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <ChallengeCard v-for="challenge in challenges" :key="challenge.id" :challenge="challenge"
        @complete="completeChallenge" />
    </div>

    <Transition enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in" leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0">
      <div v-if="showBadgeNotification"
        class="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-green-200 max-w-xs z-50">
        <div class="flex items-start">
          <div v-html="getBadgeSVG(newlyEarnedBadge.id, newlyEarnedBadge.color, newlyEarnedBadge.stroke)"></div>
          <div>
            <h4 class="font-medium text-semigreen">EcoBadge Baru!</h4>
            <p class="text-sm text-gray-600 mb-2">Anda mendapatkan {{ newlyEarnedBadge.title }}</p>
            <div class="flex space-x-2">
              <a href="/ecobadge"
                class="text-xs bg-darkblue text-white px-3 py-1 rounded hover:bg-primaryblue transition-colors">
                Lihat di EcoBadge
              </a>
              <button @click="showBadgeNotification = false"
                class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </DashboardLayout>
</template>
