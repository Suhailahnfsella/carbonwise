<template>
  <section id="fitur-ecochallenge" class="pt-12 pb-2 bg-white md:mt-4 px-6 md:px-15 lg:px-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
          Fitur <span class="text-primaryblue">Eco</span><span class="text-greenlight">Challenge</span>
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Platform gamifikasi lingkungan dengan tantangan personal untuk mengurangi jejak karbon
        </p>
      </div>

      <div class="flex flex-col lg:flex-row-reverse items-center gap-8">
        <div class="lg:w-1/2 space-y-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-greenlight p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Tantangan Otomatis</h3>
                <p class="mt-1 text-gray-600">
                  Sistem membuat tantangan seperti "Kurangi jejak karbon 10% dalam seminggu" berdasarkan aktivitas
                  harian Anda
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-greenlight p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Progress Real-time</h3>
                <p class="mt-1 text-gray-600">
                  Setiap aktivitas harian akan memberikan progress dengan tantangan yang sesuai
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-greenlight p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">EcoBadge & Hadiah</h3>
                <p class="mt-1 text-gray-600">
                  Dapatkan penghargaan EcoBadge ketika berhasil menyelesaikan tantangan tertentu
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecochallenge-mockup.png" alt="Mockup EcoChallenge Daftar Tantangan"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Contoh tantangan selesai</p>
            </div>
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecochallenge-mockup2.png" alt="Mockup EcoChallenge Progress"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Tantangan dalam progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FiturEcoChallenge',
}
</script>
