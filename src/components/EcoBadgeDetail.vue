<script setup>
const props = defineProps({
  badge: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'share'])

const downloadCertificate = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f8f8f8'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#333'
  ctx.font = '30px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Sertifikat Penghargaan', canvas.width / 2, 60)

  ctx.font = '24px Arial'
  ctx.fillText(props.badge.title, canvas.width / 2, 120)
  const badgeSize = 100
  const badgeX = canvas.width / 2 - badgeSize / 2
  const badgeY = 150
  const badgeImg = new Image()
  badgeImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(getBadgeSVG(props.badge)) // Gunakan props.badge
  badgeImg.onload = () => {
    ctx.drawImage(badgeImg, badgeX, badgeY, badgeSize, badgeSize)

    const link = document.createElement('a')
    link.download = `sertifikat-${props.badge.title.toLowerCase().replace(/\s+/g, '-')}.png` // Gunakan props.badge
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}

const getBadgeSVG = (badge) => {
  switch (badge.id) {
    case 'carbon-reducer':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${badge.color}" stroke="${badge.stroke}" stroke-width="2"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16V8" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 8L8 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'eco-warrior':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${badge.color}" stroke="${badge.stroke}" stroke-width="2"/>
          <path d="M12 8V12L15 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16V16.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'plastic-free':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${badge.color}" stroke="${badge.stroke}" stroke-width="2"/>
          <path d="M8 12L16 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8L12 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'beginner-eco':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${badge.color}" stroke="${badge.stroke}" stroke-width="2"/>
          <path d="M12 8V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'energy-conscious':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${badge.color}" stroke="${badge.stroke}" stroke-width="2"/>
          <path d="M12 9V12L14.5 14.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'hydrate-eco':
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${badge.color}" stroke="${badge.stroke}" stroke-width="2"/>
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
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div class="w-full max-h-[calc(100vh-2rem)] flex items-center justify-center">
      <div
        class="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden mx-auto my-auto max-h-[90vh] flex flex-col">
        <div class="bg-primaryblue p-4 text-white flex-shrink-0">
          <h3 class="text-xl font-semibold">Detail EcoBadge</h3>
        </div>

        <div class="p-4 sm:p-6 overflow-y-auto flex-grow">
          <div class="flex flex-col items-center mb-4 sm:mb-6">
            <div class="w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4" v-html="getBadgeSVG(badge)"></div>
            <h4 class="text-xl sm:text-2xl font-medium text-center">{{ badge.title }}</h4>
            <p class="text-sm sm:text-base text-gray-600 text-center mt-1 sm:mt-2">{{ badge.description }}</p>
          </div>

          <div class="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
            <h5 class="text-sm sm:text-base font-medium text-gray-800 mb-1 sm:mb-2">Kriteria:</h5>
            <p class="text-xs sm:text-sm text-gray-700">{{ badge.criteria }}</p>

            <h5 class="text-sm sm:text-base font-medium text-gray-800 mt-3 sm:mt-4 mb-1 sm:mb-2">Diraih pada:</h5>
            <p class="text-xs sm:text-sm text-gray-700">{{ badge.date || 'Belum diraih' }}</p>
          </div>

          <div class="flex gap-3">
            <button @click="downloadCertificate"
              class="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-primaryoranye text-white rounded-md hover:bg-secondaryoranye transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Unduh Sertifikat
            </button>

            <button @click="emit('share')" v-if="badge.earned"
              class="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-primaryblue text-white rounded-md hover:bg-primaryblue/80 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Bagikan
            </button>
          </div>
        </div>

        <!-- Footer dengan tombol (tetap di bawah) -->
        <div
          class="border-t border-gray-200 px-4 sm:px-6 py-2 sm:py-3 bg-gray-50 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center flex-shrink-0">
          <button @click="emit('close')"
            class="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800 rounded-md border border-gray-300 transition-colors flex items-center justify-center">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
