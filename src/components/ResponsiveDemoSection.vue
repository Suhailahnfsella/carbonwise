<template>
  <section id="responsive-demo" class="pt-16 bg-white px-6 md:px-15 lg:px-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="font-bold text-darkblue text-3xl">
          Tampilan <span class="text-semigreen">Responsif</span> di Semua Perangkat
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          CarbonWise dapat diakses dengan optimal baik melalui smartphone, tablet, maupun desktop
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="sm:col-span-1 bg-white p-6 rounded-xl shadow-md">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-700">Mobile</h3>
          </div>
          <div class="relative pt-[205%] rounded-lg overflow-hidden bg-gray-200">
            <video class="absolute top-0 left-0 w-full h-full object-cover" autoplay loop muted playsinline>
              <source src="./videos/mobile.webm" type="video/mp4">
              Browser Anda tidak mendukung tag video.
            </video>
          </div>
        </div>

        <div class="sm:col-span-2 lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-700">Tablet</h3>
          </div>
          <div class="relative pt-[160%] rounded-lg overflow-hidden bg-gray-200">
            <video class="absolute top-0 left-0 w-full h-full object-cover" autoplay loop muted playsinline>
              <source src="./videos/tablet.webm" type="video/mp4">
              Browser Anda tidak mendukung tag video.
            </video>
          </div>
        </div>

        <div class="sm:col-span-3 lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-700">Desktop</h3>
          </div>
          <div class="relative pt-[60.25%] rounded-lg overflow-hidden bg-gray-200">
            <video class="absolute top-0 left-0 w-full h-full object-cover" autoplay loop muted playsinline>
              <source src="./videos/desktop.webm" type="video/mp4">
              Browser Anda tidak mendukung tag video.
            </video>
          </div>
        </div>
      </div>
      <div class="mt-12 text-center">
        <p class="text-gray-500 text-sm">
          *Video demo menunjukkan tampilan aktual di berbagai perangkat
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ResponsiveDemoSection',
}
</script>
