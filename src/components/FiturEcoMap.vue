<template>
  <section id="fitur-ecomap" class="pt-12 pb-2 bg-white mt-8 md:mt-16 px-6 md:px-15 lg:px-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
          Fitur <span class="text-primaryblue">Eco</span><span class="text-darkgreen">Map</span>
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Peta interaktif yang menampilkan rata-rata jejak karbon di Provinsi Jawa Timur
        </p>
      </div>

      <div class="flex flex-col lg:flex-row items-center gap-8">
        <div class="lg:w-1/2 space-y-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-darkgreen/90 p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Implementasi Data Spasial</h3>
                <p class="mt-1 text-gray-600">
                  Implementasi metode coropleth untuk merepresentasikan tingkat keparahan karbon di setiap Kabupaten
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-darkgreen/90 p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Ranking daerah ramah lingkungan</h3>
                <p class="mt-1 text-gray-600">
                  Dapat melakukan filterisasi daerah sesuai data jejak karbonnya
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-darkgreen/90 p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Tracking status</h3>
                <p class="mt-1 text-gray-600">
                  Setiap lokasi dapat dilihat peningkatan maupun penurunan status hari ini dibanding kemarin
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecomap-mockup.png" alt="Mockup EcoMap Tampilan Peta"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Peta interaktif</p>
            </div>
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecomap-mockup2.png" alt="Mockup EcoMap Detail Lokasi"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Ranking daerah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FiturEcoMap',
}
</script>
