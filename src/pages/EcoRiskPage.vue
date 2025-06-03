<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { ref, onMounted } from 'vue'

const savedLocation = localStorage.getItem('userLocation')
const userLocation = ref(savedLocation ? JSON.parse(savedLocation) : { lat: -7.8, lng: 112.8 }) // Default Surabaya

const regionCarbonData = ref({
  value: 0,
  trend: 'down',
  level: 'Rendah',
  status: 'Aman',
  population: 0,
  comparison: 'Rata-rata nasional',
  totalEmission: 0
})

const climateRisk = ref({
  temperature: '0',
  heatRisk: 0,
  airQuality: 0,
  floodRisk: 0,
  forecast: []
})

const isLoading = ref(true)

const getRegionCarbonData = (location) => {
  const carbonPerCapita = (Math.random() * 5 + 1).toFixed(1)
  const carbonTrend = Math.random() > 0.5 ? 'up' : 'down'
  const population = Math.floor(Math.random() * 5000000) + 1000000
  const totalEmission = (carbonPerCapita * population / 1000000).toFixed(1)

  let level, status;
  if (carbonPerCapita > 4.5) {
    level = 'Tinggi';
    status = 'Kritis';
  } else if (carbonPerCapita > 2.5) {
    level = 'Sedang';
    status = 'Waspada';
  } else {
    level = 'Rendah';
    status = 'Aman';
  }

  return {
    value: carbonPerCapita,
    trend: carbonTrend,
    level: level,
    status: status,
    population: population.toLocaleString('id-ID'),
    totalEmission: totalEmission,
    comparison: carbonPerCapita > 3.5 ? 'Di atas rata-rata nasional' :
      carbonPerCapita < 2.0 ? 'Di bawah rata-rata nasional' : 'Rata-rata nasional'
  }
}

const getClimateRisk = (location) => {
  return {
    temperature: (Math.random() * 10 + 25).toFixed(1),
    heatRisk: Math.floor(Math.random() * 70) + 30,
    airQuality: Math.floor(Math.random() * 100) + 30,
    floodRisk: Math.floor(Math.random() * 60),
    forecast: [
      { day: 'Hari Ini', temp: (Math.random() * 5 + 28).toFixed(1), risk: 'Sedang' },
      { day: 'Besok', temp: (Math.random() * 5 + 28).toFixed(1), risk: 'Rendah' },
      { day: 'Lusa', temp: (Math.random() * 5 + 30).toFixed(1), risk: 'Tinggi' }
    ]
  }
}

const getRecommendations = (carbon, climate) => {
  const recommendations = []

  const carbonValue = parseFloat(carbon?.value) || 0
  const carbonStatus = carbon?.status || 'Aman'
  const climateData = climate || {
    heatRisk: 0,
    airQuality: 0,
    floodRisk: 0
  }

  if (carbonStatus === 'Kritis') {
    recommendations.push({
      icon: '⚠️',
      text: 'Wilayah Anda menghasilkan ' + carbonValue + ' ton/kapita CO₂ (KRITIS) - Kurangi konsumsi energi'
    })
    recommendations.push({
      icon: '🏭',
      text: 'Industri di wilayah ini menyumbang ' + carbon.totalEmission + ' juta ton emisi pertahun'
    })
  } else if (carbonStatus === 'Waspada') {
    recommendations.push({
      icon: '🔍',
      text: 'Emisi wilayah: ' + carbonValue + ' ton/kapita - Lebih hemat energi dan transportasi'
    })
  } else {
    recommendations.push({
      icon: '🌱',
      text: 'Emisi wilayah: ' + carbonValue + ' ton/kapita - Pertahankan pola konsumsi rendah karbon'
    })
  }

  if (climateData.heatRisk > 60) {
    recommendations.push({
      icon: '🌞',
      text: 'Hindari aktivitas luar ruangan antara jam 10:00-15:00'
    })
  }

  if (climateData.airQuality > 80) {
    recommendations.push({
      icon: '😷',
      text: 'Gunakan masker saat berada di luar ruangan'
    })
  }

  if (climateData.floodRisk > 40) {
    recommendations.push({
      icon: '🌧️',
      text: 'Waspada genangan air di sekitar wilayah Anda'
    })
  }

  return recommendations
}

onMounted(() => {
  setTimeout(() => {
    regionCarbonData.value = getRegionCarbonData(userLocation.value)
    climateRisk.value = getClimateRisk(userLocation.value)
    isLoading.value = false
  }, 800)
})
</script>

<template>
  <DashboardLayout>
    <template #title>
      <span class="text-primaryblue">Eco</span><span class="text-secondaryblue">Risk</span>
    </template>

    <template #description>
      <h3 class="text-xl font-semibold text-primaryblue mt-1 mb-1">Risiko Iklim Wilayah</h3>
      <p class="text-sm">
        <b>Analisis jejak karbon per kapita dan total emisi wilayah Anda</b> berdasarkan lokasi yang terdeteksi.
      </p>
    </template>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryblue"></div>
      <span class="ml-3">Memuat data emisi wilayah...</span>
    </div>

    <div v-else class="grid grid-cols-1 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-darkblue mb-4">Jejak Karbon Wilayah</h3>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div class="text-4xl font-bold" :class="{
              'text-semigreen': regionCarbonData.level === 'Rendah',
              'text-secondaryoranye': regionCarbonData.level === 'Sedang',
              'text-red-500': regionCarbonData.level === 'Tinggi'
            }">
              {{ regionCarbonData.value }} <span class="text-lg">ton/kapita</span>
            </div>
            <div class="text-gray-700 mt-1">Emisi karbon hari ini</div>
          </div>

          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm text-gray-700">Total Emisi Wilayah</div>
            <div class="text-xl font-bold text-darkblue">{{ regionCarbonData.totalEmission }} juta ton</div>
            <div class="text-xs text-gray-500 mt-1">Untuk {{ regionCarbonData.population }} penduduk</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-blue-100/30 p-3 rounded-lg">
            <div class="text-sm text-gray-700">Status Karbon</div>
            <div class="text-xl font-bold" :class="{
              'text-semigreen': regionCarbonData.status === 'Aman',
              'text-secondaryoranye': regionCarbonData.status === 'Waspada',
              'text-red-600': regionCarbonData.status === 'Kritis'
            }">
              {{ regionCarbonData.status }}
            </div>
          </div>

          <div class="bg-blue-100/30 p-3 rounded-lg">
            <div class="text-sm text-gray-600">Perbandingan Nasional</div>
            <div class="font-semibold text-darkblue">{{ regionCarbonData.comparison }}</div>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-end" :class="{
          'text-red-500': regionCarbonData.trend === 'up',
          'text-green-500': regionCarbonData.trend === 'down'
        }">
          <span v-if="regionCarbonData.trend === 'up'" class="text-lg">↑</span>
          <span v-if="regionCarbonData.trend === 'down'" class="text-lg">↓</span>
          <span class="ml-1">
            {{ regionCarbonData.trend === 'up' ? 'Meningkat' : 'Menurun' }}
          </span>
          <span class="text-gray-600 ml-2">dari kemarin</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-darkblue mb-4">Prediksi Risiko Iklim Wilayah</h3>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-blue-50 p-3 rounded-lg">
            <div class="text-sm text-gray-600">Suhu Saat Ini</div>
            <div class="text-lg text-darkblue font-bold">{{ climateRisk.temperature }}°C</div>
          </div>

          <div class="bg-red-50 p-3 rounded-lg">
            <div class="text-sm text-gray-600">Risiko Panas</div>
            <div class="text-lg text-red-400 font-bold">{{ climateRisk.heatRisk }}%</div>
          </div>
        </div>

        <div class="bg-yellow-50 p-3 rounded-lg mb-6">
          <div class="text-sm text-gray-600">Kualitas Udara</div>
          <div class="text-xl font-bold" :class="{
            'text-green-600': climateRisk.airQuality <= 50,
            'text-yellow-600': climateRisk.airQuality > 50 && climateRisk.airQuality <= 100,
            'text-orange-600': climateRisk.airQuality > 100 && climateRisk.airQuality <= 200,
            'text-red-600': climateRisk.airQuality > 200
          }">
            {{ climateRisk.airQuality }}
            <span class="text-sm ml-1" :class="{
              'text-green-600': climateRisk.airQuality <= 50,
              'text-yellow-600': climateRisk.airQuality > 50 && climateRisk.airQuality <= 100,
              'text-orange-600': climateRisk.airQuality > 100 && climateRisk.airQuality <= 200,
              'text-red-600': climateRisk.airQuality > 200
            }">
              ({{
                climateRisk.airQuality <= 50 ? 'Baik' : climateRisk.airQuality <= 100 ? 'Sedang' : climateRisk.airQuality
                  <= 200 ? 'Tidak Sehat' : 'Sangat Tidak Sehat' }}) </span>
          </div>
          <div class="text-xs text-gray-500 mt-1">
            Berdasarkan Indeks Standar Pencemar Udara (ISPU)
          </div>
        </div>

        <h4 class="font-medium text-darkblue mb-2">Prediksi 3 Hari:</h4>
        <div class="space-y-3">
          <div v-for="day in climateRisk.forecast" :key="day.day"
            class="flex justify-between items-center p-2 border-b">
            <span class="font-medium">{{ day.day }}</span>
            <span>{{ day.temp }}°C</span>
            <span :class="{
              'bg-green-100 text-green-800': day.risk === 'Rendah',
              'bg-yellow-100 text-yellow-800': day.risk === 'Sedang',
              'bg-red-100 text-red-800': day.risk === 'Tinggi'
            }" class="px-2 py-1 rounded-full text-xs">
              {{ day.risk }}
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-darkblue mb-4">Rekomendasi Untuk Wilayah Anda</h3>

        <div class="space-y-4">
          <div v-for="(rec, index) in getRecommendations(regionCarbonData, climateRisk)" :key="index"
            class="flex items-start p-3 bg-gray-50 rounded-lg">
            <span class="text-2xl mr-3">{{ rec.icon }}</span>
            <span class="flex-1">{{ rec.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
