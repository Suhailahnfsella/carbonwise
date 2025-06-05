<template>
  <section id="fitur-ecobadge" class="pt-12 pb-2 bg-white md:mt-4 px-6 md:px-15 lg:px-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
          Fitur <span class="text-primaryblue">Eco</span><span class="text-choco">Badge</span>
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Penghargaan digital untuk setiap pencapaian dalam mengurangi jejak karbon dan tantangan lingkungan
        </p>
      </div>

      <div class="flex flex-col lg:flex-row items-center gap-8">
        <div class="lg:w-1/2 space-y-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-choco p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Pencapaian Lingkungan</h3>
                <p class="mt-1 text-gray-600">
                  Dapatkan EcoBadge untuk berbagai pencapaian seperti mengurangi 20% emisi atau konsisten selama 30 hari
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-choco p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Sertifikat Digital</h3>
                <p class="mt-1 text-gray-600">
                  Setiap EcoBadge dilengkapi sertifikat digital yang bisa diunduh dan dibagikan ke media sosial
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 bg-choco p-2 rounded-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-800">Bagikan Pencapaian</h3>
                <p class="mt-1 text-gray-600">
                  Sebarkan EcoBadge Anda untuk menginspirasi orang lain ikut berkontribusi menyelamatkan bumi
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecobadge-mockup.png" alt="Mockup EcoBadge Koleksi"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Koleksi EcoBadge</p>
            </div>
            <div class="bg-gray-20 p-4 rounded-xl shadow-sm">
              <img src="./img/ecobadge-mockup2.png" alt="Mockup EcoBadge Sertifikat"
                class="w-full h-auto rounded-lg object-cover" />
              <p class="mt-2 text-sm text-center text-gray-500">Sertifikat Digital</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FiturEcoBadge',
}
</script>
