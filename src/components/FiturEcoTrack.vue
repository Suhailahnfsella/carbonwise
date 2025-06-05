<template>
  <section id="fitur-ecotrack" class="pt-12 pb-2 bg-white md:mt-4 px-6 md:px-15 lg:px-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
          Fitur <span class="text-primaryblue">Eco</span><span class="text-primaryoranye">Track</span>
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Dashboard interaktif untuk melacak jejak karbon harian Anda dan mendapatkan saran pengurangan
        </p>
      </div>

      <div class="flex flex-col lg:flex-row-reverse items-center gap-8">
        <div class="lg:w-1/2 space-y-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-primaryoranye/90 p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Input Aktivitas Harian</h3>
                <p class="mt-1 text-gray-600">
                  Catat transportasi, konsumsi makanan, dan penggunaan listrik untuk menghitung jejak karbon Anda
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-primaryoranye/90 p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Analisis Jejak Karbon</h3>
                <p class="mt-1 text-gray-600">
                  Lihat berapa karbon yang Anda hasilkan beserta grafik perkembangan dari waktu ke waktu
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-primaryoranye/90 p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Saran Penurunan Karbon</h3>
                <p class="mt-1 text-gray-600">
                  Dapatkan rekomendasi personal untuk mengurangi jejak karbon berdasarkan aktivitas Anda
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-primaryoranye/90 p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Riwayat Lokasi</h3>
                <p class="mt-1 text-gray-600">
                  Tandai di peta lokasi dimana Anda menghasilkan karbon dan lihat riwayatnya
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecotrack-mockup.png" alt="Mockup EcoTrack Input Data"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Input aktivitas harian</p>
            </div>
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecotrack-mockup2.png" alt="Mockup EcoTrack Dashboard"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Dashboard analisis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FiturEcoTrack',
}
</script>
