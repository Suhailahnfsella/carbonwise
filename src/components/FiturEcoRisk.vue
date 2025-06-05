<template>
  <section id="fitur-ecorisk" class="pt-12 pb-2 bg-white md:mt-4 px-6 md:px-15 lg:px-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
          Fitur <span class="text-primaryblue">Eco</span><span class="text-secondaryblue">Risk</span>
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Prediksi berbasis AI menggunakan data lokasi pengguna untuk analisis risiko iklim
        </p>
      </div>

      <div class="flex flex-col lg:flex-row items-center gap-8">
        <div class="lg:w-1/2 space-y-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-secondaryblue p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Prediksi Berbasis AI</h3>
                <p class="mt-1 text-gray-600">
                  Menggunakan data lokasi pengguna (via GPS/IP) dikombinasikan dengan tren suhu, kelembaban, curah
                  hujan, dan polusi udara
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-secondaryblue p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Analisis Risiko Iklim</h3>
                <p class="mt-1 text-gray-600">
                  Memprediksi kemungkinan risiko seperti gelombang panas, kualitas udara buruk, dan potensi banjir
                  ringan berdasarkan jejak karbon daerah
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-secondaryblue p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Rekomendasi Personal</h3>
                <p class="mt-1 text-gray-600">
                  Memberikan saran persiapan menghadapi kondisi iklim berdasarkan prediksi di daerah pengguna
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecorisk-mockup.png" alt="Mockup EcoRisk Tampilan Prediksi"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Tampilan jejak karbon</p>
            </div>
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecorisk-mockup2.png" alt="Mockup EcoRisk Rekomendasi"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Tampilan prediksi iklim</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FiturEcoRisk',
}
</script>
