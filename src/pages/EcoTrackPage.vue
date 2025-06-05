<script setup>
import { ref, computed, onMounted } from 'vue'
import { shallowRef } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ActivityCard from '@/components/ActivityCard.vue'
import CarbonResults from '@/components/CarbonResults.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const EMISSION_THRESHOLDS = {
  HIGH: 5000,
  MEDIUM: 3000
}

const TREE_CO2_ABSORPTION_PER_YEAR = 30 * 1000
const avgSpeed = 40

const transportOptions = [
  { type: 'walk', label: 'Jalan Kaki', emission: 0, icon: '🚶', description: 'Aktivitas tanpa emisi' },
  { type: 'bicycle', label: 'Bersepeda', emission: 0, icon: '🚲', description: 'Aktivitas tanpa emisi' },
  { type: 'motorcycle', label: 'Motor', emission: 0.065 * avgSpeed / 60, icon: '🏍️', description: 'Emisi per menit berkendara' },
  { type: 'car', label: 'Mobil', emission: 0.13 * avgSpeed / 60, icon: '🚗', description: 'Emisi per menit berkendara' },
  { type: 'bus', label: 'Bus', emission: 0.08 * 60, icon: '🚌', description: 'Emisi per menit perjalanan' },
  { type: 'train', label: 'Kereta', emission: 0.05 * 60, icon: '🚆', description: 'Emisi per menit perjalanan' },
  { type: 'plane', label: 'Pesawat', emission: 0.1 / 60, icon: '✈️', description: 'Emisi per menit penerbangan' },
  { type: 'ship', label: 'Kapal', emission: 0.3 * 60, icon: '🚢', description: 'Emisi per menit pelayaran' }
]

const energyOptions = [
  { type: 'ac', label: 'AC', emission: 0.01125, icon: '❄️', description: 'Emisi per menit penggunaan' },
  { type: 'fan', label: 'Kipas', emission: 0.05 * 60, icon: '🌀', description: 'Emisi per menit penggunaan' },
  { type: 'fridge', label: 'Kulkas', emission: 0.002, icon: '🧊', description: 'Emisi per menit penggunaan' },
  { type: 'tv', label: 'TV', emission: 0.15 * 60, icon: '📺', description: 'Emisi per menit penggunaan' },
  { type: 'computer', label: 'Komputer', emission: 0.15 * 60, icon: '💻', description: 'Emisi per menit penggunaan' },
  { type: 'rice_cooker', label: 'Rice Cooker', emission: 0.2 * 60, icon: '🍚', description: 'Emisi per menit penggunaan' },
  { type: 'water_pump', label: 'Pompa Air', emission: 0.25 * 60, icon: '💧', description: 'Emisi per menit penggunaan' },
  { type: 'lpg', label: 'Gas LPG', emission: 0.3 * 60, icon: '🔥', description: 'Emisi per menit penggunaan' }
]

const foodOptions = [
  { type: 'red_meat', label: 'Daging Merah', emission: 6.5, icon: '🥩', description: 'Emisi per 100 gram' },
  { type: 'white_meat', label: 'Daging Putih', emission: 1.2, icon: '🍗', description: 'Emisi per 100 gram' },
  { type: 'dairy', label: 'Produk Susu', emission: 1.5, icon: '🧀', description: 'Emisi per 100 gram' },
  { type: 'processed', label: 'Makanan Olahan', emission: 1.2, icon: '🍔', description: 'Emisi per 100 gram' },
  { type: 'vegetables', label: 'Sayuran/Buah', emission: 0.35, icon: '🥦', description: 'Emisi per 100 gram' },
  { type: 'rice', label: 'Nasi', emission: 0.8, icon: '🍚', description: 'Emisi per 100 gram' },
  { type: 'nuts', label: 'Kacang-kacangan', emission: 0.3, icon: '🥜', description: 'Emisi per 100 gram' },
  { type: 'soy', label: 'Kedelai/Tahu/Tempe', emission: 0.4, icon: '🫘', description: 'Emisi per 100 gram' }
]

const lifestyleOptions = [
  { type: 'clothing', label: 'Beli Pakaian', emission: 8000, icon: '👕', question: "Apakah hari ini membeli pakaian baru?", description: "Emisi per item pakaian" },
  { type: 'electronics', label: 'Beli Elektronik', emission: 10000, icon: '📱', question: "Apakah hari ini membeli barang elektronik?", description: "Emisi per item elektronik" },
  { type: 'plastic', label: 'Plastik Sekali Pakai', emission: 15, icon: '🛍️', question: "Apakah menggunakan plastik sekali pakai hari ini?", description: "Emisi per item plastik" },
  { type: 'bottled_water', label: 'Air Kemasan', emission: 200, icon: '💧', question: "Apakah minum air kemasan hari ini?", description: "Emisi per botol" },
  { type: 'household', label: 'Produk Rumah Tangga', emission: 300, icon: '🧴', question: "Apakah menggunakan produk rumah tangga baru?", description: "Emisi per produk" },
  { type: 'online_shopping', label: 'Belanja Online', emission: 500, icon: '📦', question: "Apakah melakukan belanja online hari ini?", description: "Emisi per transaksi" }
]

const digitalOptions = [
  { type: 'spotify', label: 'Spotify/Music', emission: 0.0018 * 60, icon: '🎵', description: 'Emisi per menit streaming' },
  { type: 'streaming', label: 'Streaming Video', emission: 0.002 * 60, icon: '🎬', description: 'Emisi per menit (Netflix/Youtube)' },
  { type: 'social_media', label: 'Media Sosial', emission: 0.02 * 60, icon: '📱', description: 'Emisi per menit (IG/TikTok)' },
  { type: 'cloud', label: 'Penyimpanan Cloud', emission: 0.01 * 60, icon: '☁️', description: 'Emisi per menit aktivitas' },
  { type: 'gaming', label: 'Gaming Online', emission: 0.1 * 60, icon: '🎮', description: 'Emisi per menit bermain' },
  { type: 'video_call', label: 'Video Call', emission: 0.015 * 60, icon: '📹', description: 'Emisi per menit (Zoom/Meet)' }
]

const activities = ref({
  transport: Object.fromEntries(transportOptions.map(item => [item.type, ''])),
  energy: Object.fromEntries(energyOptions.map(item => [item.type, ''])),
  food: Object.fromEntries(foodOptions.map(item => [item.type, ''])),
  lifestyle: Object.fromEntries(lifestyleOptions.map(item => [item.type, false])),
  digital: Object.fromEntries(digitalOptions.map(item => [item.type, '']))
})

const carbonResult = ref(null)
const userLocation = ref(null)
const map = shallowRef(null)
const timeConverter = ref({
  hours: '',
  minutes: '',
  showCalculator: false
})
const showConfirmation = ref(false)
const isDataSubmitted = ref(false)
let userMarker = null

const carbonEquivalents = computed(() => {
  return Math.ceil(carbonResult.value?.total / (TREE_CO2_ABSORPTION_PER_YEAR / 365)) || 0
})

const reductionTips = computed(() => {
  const tips = []
  if (!carbonResult.value) return tips

  const breakdown = carbonResult.value.breakdown

  if (breakdown.transport > 2000) {
    tips.push('🚗 Gunakan transportasi umum atau carpool untuk mengurangi emisi transportasi')
    if (activities.value.transport.car > 30) {
      tips.push('🚲 Pertimbangkan bersepeda untuk perjalanan pendek (<5km)')
    }
  }

  if (breakdown.food > 1500) {
    tips.push('🥩 Kurangi konsumsi daging merah, coba protein nabati beberapa hari dalam seminggu')
    if (activities.value.food.red_meat > 200) {
      tips.push('🍲 Coba "Meatless Monday" - satu hari tanpa daging setiap minggu')
    }
  }

  if (breakdown.energy > 2500) {
    tips.push('💡 Matikan peralatan elektronik saat tidak digunakan')
    if (activities.value.energy.ac > 120) {
      tips.push('❄️ Gunakan AC pada 24-25°C dan tutup ruangan untuk efisiensi')
    }
  }

  if (breakdown.lifestyle > 3000) {
    tips.push('🛍️ Kurangi pembelian barang baru, pertimbangkan barang bekas berkualitas')
    if (activities.value.lifestyle.plastic) {
      tips.push('♻️ Bawa tas belanja dan botol minum sendiri untuk mengurangi plastik')
    }
    if (activities.value.lifestyle.online_shopping) {
      tips.push('📦 Gabungkan pesanan belanja online untuk mengurangi emisi pengiriman')
    }
  }

  if (breakdown.digital > 1000) {
    tips.push('📱 Kurangi waktu layar, gunakan mode gelap untuk menghemat energi')
    if (activities.value.digital.spotify > 60) {
      tips.push('🎵 Download musik saat WiFi untuk mengurangi streaming data')
    }
    if (activities.value.digital.social_media > 120) {
      tips.push('⏱️ Setel batas waktu penggunaan media sosial di pengaturan ponsel')
    }
  }

  return tips.length > 0 ? tips : ['🌱 Jejak karbon Anda rendah, pertahankan!']
})

const updateActivity = (category, type, value) => {
  activities.value[category][type] = value
}

const calculateFootprint = () => {
  const processedActivities = {
    transport: Object.fromEntries(
      Object.entries(activities.value.transport).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
    ),
    energy: Object.fromEntries(
      Object.entries(activities.value.energy).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
    ),
    food: Object.fromEntries(
      Object.entries(activities.value.food).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
    ),
    lifestyle: { ...activities.value.lifestyle },
    digital: Object.fromEntries(
      Object.entries(activities.value.digital).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
    )
  }

  const result = {
    total: 0,
    breakdown: {
      transport: calculateCategoryEmission('transport', transportOptions, processedActivities),
      energy: calculateCategoryEmission('energy', energyOptions, processedActivities),
      food: calculateCategoryEmission('food', foodOptions, processedActivities),
      lifestyle: calculateLifestyleEmission(processedActivities),
      digital: calculateCategoryEmission('digital', digitalOptions, processedActivities)
    }
  }

  result.total = Object.values(result.breakdown).reduce((sum, val) => sum + val, 0)
  carbonResult.value = result
  showConfirmation.value = true
  isDataSubmitted.value = false

  if (userLocation.value) {
    addUserLocationMarker(userLocation.value, result.total)
  }
}

const calculateCategoryEmission = (category, options, processedActivities) => {
  return options.reduce((sum, item) => {
    return sum + (processedActivities[category][item.type] * item.emission)
  }, 0)
}

const calculateLifestyleEmission = (processedActivities) => {
  return lifestyleOptions.reduce((sum, item) => {
    return sum + (processedActivities.lifestyle[item.type] ? item.emission : 0)
  }, 0)
}

const convertHoursToMinutes = () => {
  if (timeConverter.value.hours === '') {
    timeConverter.value.minutes = ''
    return
  }
  timeConverter.value.minutes = parseFloat(timeConverter.value.hours) * 60
}

const convertMinutesToHours = () => {
  if (timeConverter.value.minutes === '') {
    timeConverter.value.hours = ''
    return
  }
  timeConverter.value.hours = (parseFloat(timeConverter.value.minutes) / 60).toFixed(2)
}

const toggleTimeConverter = () => {
  timeConverter.value.showCalculator = !timeConverter.value.showCalculator
}

const applyMinutesToDigital = () => {
  if (timeConverter.value.minutes !== '' && !isNaN(timeConverter.value.minutes)) {
    digitalOptions.forEach(item => {
      if (item.description.includes('per menit')) {
        activities.value.digital[item.type] = timeConverter.value.minutes
      }
    })
  }
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        addUserLocationMarker(userLocation.value, carbonResult.value?.total || 0)
      },
      (error) => {
        console.error("Error getting location:", error)
        alert("Gagal mendapatkan lokasi: " + error.message)
      }
    )
  } else {
    alert("Geolocation tidak didukung oleh browser Anda.")
  }
}

const addUserLocationMarker = () => {
  if (!map.value || !userLocation.value) return

  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: `<div class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div>
           <div class="relative inline-flex rounded-full h-4 w-4 bg-blue-600"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })

  L.marker([userLocation.value.lat, userLocation.value.lng], {
    icon: userIcon,
    zIndexOffset: 1000
  })
    .addTo(map.value)
    .bindPopup('<b>Lokasi Anda Saat Ini</b>')
    .openPopup()

  map.value.flyTo([userLocation.value.lat, userLocation.value.lng], 13, {
    animate: true,
    duration: 1
  })
}

const submitToEcoMap = () => {
  if (!carbonResult.value || !userLocation.value) {
    alert('Silakan hitung jejak karbon dan dapatkan lokasi Anda terlebih dahulu')
    return
  }

  isDataSubmitted.value = true
  showConfirmation.value = false

  setTimeout(() => {
    const carbonIcon = L.divIcon({
      className: 'carbon-marker',
      html: `<div class="flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg">
              ${Math.round(carbonResult.value.total / 100)}g
            </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    })

    L.marker([userLocation.value.lat, userLocation.value.lng], {
      icon: carbonIcon
    }).addTo(map.value)
      .bindPopup(`<b>Jejak Karbon Anda</b><br>Total: ${carbonResult.value.total.toFixed(2)} gram CO2e`)
  }, 1000)
}

onMounted(() => {
  map.value = L.map('map-container').setView([-7.8, 112.8], 8)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value)
})
</script>

<template>
  <DashboardLayout>
    <template #title>
      <span class="text-primaryblue">Eco</span><span class="text-primaryoranye">Track</span>
    </template>

    <template #description>
      <h3 class="text-xl font-semibold text-primaryblue mt-1 mb-1">Lacak Jejak Karbon Harian Anda</h3>
      <p class="text-sm text-gray-700">Pilih kategori dan isi aktivitas Anda hari ini</p>
    </template>

    <div class="p-4 mb-6 bg-white rounded-lg shadow">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-medium text-darkblue">Konversi Waktu</h3>
        <button @click="toggleTimeConverter" class="text-sm text-darkblue hover:text-primaryblue">
          {{ timeConverter.showCalculator ? 'Sembunyikan' : 'Tampilkan' }} Kalkulator
        </button>
      </div>

      <div v-if="timeConverter.showCalculator" class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="p-4 border border-gray-200 rounded-lg">
          <label class="block mb-2 text-sm font-medium text-gray-700">Jam ke Menit</label>
          <div class="flex flex-col sm:flex-row">
            <input v-model="timeConverter.hours" @input="convertHoursToMinutes" type="number" min="0" step="0.1"
              class="w-full px-3 py-2 border border-gray-300 rounded-t-md sm:rounded-tr-none sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan jam">
            <span
              class="w-full px-3 py-2 text-gray-500 bg-gray-100 border-t border-b border-r border-gray-300 rounded-b-md sm:rounded-bl-none sm:rounded-r-md text-center sm:text-left">
              jam = {{ timeConverter.minutes || 0 }} menit
            </span>
          </div>
        </div>

        <div class="p-4 border border-gray-200 rounded-lg">
          <label class="block mb-2 text-sm font-medium text-gray-700">Menit ke Jam</label>
          <div class="flex flex-col sm:flex-row">
            <input v-model="timeConverter.minutes" @input="convertMinutesToHours" type="number" min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-t-md sm:rounded-tr-none sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan menit">
            <span
              class="w-full px-3 py-2 text-gray-500 bg-gray-100 border-t border-b border-r border-gray-300 rounded-b-md sm:rounded-bl-none sm:rounded-r-md text-center sm:text-left">
              menit = {{ timeConverter.hours || 0 }} jam
            </span>
          </div>
        </div>
      </div>
      <p v-if="timeConverter.showCalculator" class="mt-2 text-xs text-gray-500">
        💡 Gunakan kalkulator ini untuk mengkonversi waktu dari jam ke menit atau sebaliknya.
        Hasil konversi bisa membantumu mengisi aktivitas harian.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
      <ActivityCard title="Transportasi" icon="🚗" :items="transportOptions" v-model="activities.transport" unit="menit"
        @update="updateActivity" description="Durasi aktivitas dalam menit"
        class="bg-white p-4 border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow" />

      <ActivityCard title="Energi" icon="💡" :items="energyOptions" v-model="activities.energy" unit="menit"
        @update="updateActivity" description="Durasi penggunaan dalam menit"
        class="bg-white p-4 border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow" />

      <ActivityCard title="Makanan" icon="🍎" :items="foodOptions" v-model="activities.food" unit="gram"
        @update="updateActivity" description="Jumlah konsumsi dalam gram"
        class="bg-white p-4 border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow" />

      <ActivityCard title="Gaya Hidup" icon="🛍️" :items="lifestyleOptions" v-model="activities.lifestyle" unit=""
        @update="updateActivity" :showQuantity="false" description="Centang jika melakukan aktivitas"
        class="bg-white p-4 border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow" />

      <ActivityCard title="Digital" icon="💻" :items="digitalOptions" v-model="activities.digital" unit="menit"
        @update="updateActivity" description="Durasi aktivitas dalam menit"
        class="bg-white p-4 border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow" />
    </div>

    <div class="flex justify-center my-8">
      <button @click="calculateFootprint"
        class="px-8 py-3 text-lg font-medium text-white transition-colors bg-primaryoranye rounded-lg shadow-md hover:bg-primaryoranye">
        Hitung Jejak Karbon Saya
      </button>
    </div>

    <CarbonResults v-if="carbonResult" :result="carbonResult" :equivalents="carbonEquivalents" :tips="reductionTips"
      @get-location="getLocation" class="p-6 bg-white rounded-lg shadow-lg" />

    <div v-if="showConfirmation && carbonResult && userLocation" class="p-6 mt-6 bg-white rounded-lg shadow-lg">
      <h3 class="mb-4 text-xl font-semibold text-darkblue">Konfirmasi Pengiriman Data</h3>
      <p class="mb-4 text-gray-700">
        Apakah Anda ingin mengirim data jejak karbon Anda ke EcoMap untuk rekapitulasi karbon di wilayah Anda?
        <br>
        <span class="font-bold text-primaryblue">Total Jejak Karbon: {{ carbonResult.total.toFixed(2) }} gram
          CO2e</span>
        <br>
        <span class="font-bold text-semigreen">Lokasi: Latitude {{ userLocation.lat.toFixed(4) }}, Longitude {{
          userLocation.lng.toFixed(4) }}</span>
      </p>
      <div class="flex justify-end space-x-3">
        <button @click="showConfirmation = false" class="px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-300">
          Batal
        </button>
        <button @click="submitToEcoMap"
          class="px-4 py-2 text-white bg-primaryoranye rounded-lg hover:bg-secondaryoranye">
          Konfirmasi & Kirim
        </button>
      </div>
    </div>

    <div v-if="isDataSubmitted" class="p-4 mt-6 text-white bg-secondaryblue rounded-lg">
      <p>✅ Data jejak karbon Anda telah berhasil dikirim ke EcoMap!</p>
    </div>

    <div class="p-4 mt-8 bg-white rounded-lg shadow">
      <h2 class="mb-4 text-xl font-semibold text-darkblue">Peta Jejak Karbon</h2>
      <p class="mb-2 text-sm text-gray-600">
        Peta ini menampilkan akumulasi jejak karbon di wilayah Anda.
        Titik merah menunjukkan lokasi dengan jejak karbon tinggi.
      </p>
      <div id="map-container" class="w-full border border-gray-200 rounded-lg h-96 z-0"></div>
    </div>
  </DashboardLayout>
</template>

<style>
.user-location-marker {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carbon-marker {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 0, 0, 0.5);
  border-radius: 50%;
  border: 2px solid white;
}
</style>
