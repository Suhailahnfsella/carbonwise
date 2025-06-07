<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Hasil Jejak Karbon Anda</h2>
      <button @click="$emit('get-location')"
        class="flex items-center text-sm text-primaryblue hover:text-darkblue cursor-pointer">
        <MapPinIcon class="h-4 w-4 md:mr-1" /> Ambil Lokasi
      </button>
    </div>

    <div class="space-y-6">
      <div class="bg-gray-100 p-4 rounded-lg border border-blue-100">
        <h3 class="font-bold text-gray-700 mb-2 flex items-center">
          <span class="text-xl mr-2">📊</span> Total Emisi Hari Ini
        </h3>
        <p class="text-3xl font-bold" :class="getEmissionColor(result.total)">
          {{ (result.total / 1000).toFixed(2) }} kgCO₂
        </p>
        <p class="text-sm mt-2">
          Setara dengan <span class="font-medium">{{ equivalents }}</span> pohon untuk menyerapnya dalam sehari
        </p>
      </div>

      <div class="text-gray-700">
        <h3 class="font-medium mb-3 flex items-center">
          <span class="text-xl mr-2">🔍</span> Rincian Emisi
        </h3>
        <div class="space-y-3">
          <div v-for="(value, category) in result.breakdown" :key="category" class="flex items-center">
            <div class="w-28 font-medium capitalize">
              {{ getCategoryName(category) }}
            </div>
            <div class="flex-1 bg-gray-200 rounded-full h-3">
              <div :style="{ width: `${(value / result.total) * 100}%` }" class="bg-primaryblue h-3 rounded-full">
              </div>
            </div>
            <div class="w-20 text-right text-sm">
              {{ (value / 1000).toFixed(2) }} kg
            </div>
          </div>
        </div>
      </div>

      <div class="bg-yellow-50 text-gray-900 p-4 rounded-lg border border-yellow-100">
        <h3 class="font-medium mb-3 flex items-center">
          <span class="text-xl mr-2">💡</span> Saran Pengurangan
        </h3>
        <ul class="space-y-2">
          <li v-for="(tip, index) in tips" :key="index" class="flex items-start">
            <span class="text-yellow-500 mr-2">•</span>
            <span class="text-sm">{{ tip }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  result: Object,
  equivalents: Number,
  tips: Array
})

const emit = defineEmits(['get-location'])

const getEmissionColor = (value) => {
  if (value > 5000) return 'text-red-600'
  if (value > 3000) return 'text-primaryoranye'
  return 'text-greenlight'
}

const getCategoryName = (category) => {
  const names = {
    transport: 'Transportasi',
    energy: 'Energi',
    food: 'Makanan',
    lifestyle: 'Gaya Hidup',
    digital: 'Digital'
  }
  return names[category] || category
}
</script>
