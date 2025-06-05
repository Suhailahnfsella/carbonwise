<script setup>
defineProps({
  badge: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'share'])

const downloadCertificate = () => {
  alert(`Mengunduh sertifikat untuk ${badge.title}`)
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
      <div class="bg-greenlight p-4 text-white">
        <h3 class="text-xl font-semibold">Detail EcoBadge</h3>
      </div>

      <div class="p-6">
        <div class="flex flex-col items-center mb-6">
          <img :src="badge.image" :alt="badge.title" class="w-32 h-32 mb-4">
          <h4 class="text-2xl font-medium text-center">{{ badge.title }}</h4>
          <p class="text-gray-600 text-center mt-2">{{ badge.description }}</p>
        </div>

        <div class="border-t border-gray-200 pt-4 mb-6">
          <h5 class="font-medium text-gray-800 mb-2">Kriteria:</h5>
          <p class="text-gray-700">{{ badge.criteria }}</p>

          <h5 class="font-medium text-gray-800 mt-4 mb-2">Diraih pada:</h5>
          <p class="text-gray-700">{{ badge.date }}</p>
        </div>

        <div class="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            @click="downloadCertificate"
            class="px-4 py-2 bg-primaryblue text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Unduh Sertifikat
          </button>
          <button
            @click="emit('share')"
            class="px-4 py-2 bg-greenlight text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Bagikan
          </button>
        </div>
      </div>

      <div class="border-t border-gray-200 px-6 py-3 bg-gray-50 flex justify-end">
        <button
          @click="emit('close')"
          class="text-gray-600 hover:text-gray-800"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>
