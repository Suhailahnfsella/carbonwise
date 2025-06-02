<template>
  <section id="latar"
    class="flex flex-col items-center justify-center bg-gray-100 px-6 md:px-15 lg:px-24 py-15 gap-10 min-h-1/2 overflow-y-auto">
    <div class="flex flex-col items-center gap-3">
      <h2 class="text-3xl font-bold text-darkblue">Latar Belakang</h2>
      <p class="text-gray-700 text-center max-w-xl">
        Website ini dibuat sebagai upaya mendukung pencapaian Sustainable Development Goals (SDGs)
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
      <div
        class="bg-white p-4 rounded-xl shadow flex flex-col items-center gap-2 text-center group transition-colors duration-300 hover:text-darkblue">
        <img src="./icons/climate.png" alt=""
          class="w-14 bg-primaryblue p-2 rounded-full transition-colors duration-300 group-hover:bg-darkblue" />
        <h6 class="font-semibold text-primaryblue transition-colors duration-300 group-hover:text-darkblue">
          Climate Action
        </h6>
        <p class="text-sm text-gray-500">
          Mengatasi perubahan iklim melalui pengurangan emisi dan adaptasi terhadap dampaknya.
        </p>
      </div>
      <div
        class="bg-white p-4 rounded-xl shadow flex flex-col items-center gap-2 text-center group transition-colors duration-300 hover:text-primaryblue">
        <img src="./icons/building.png" alt=""
          class="w-14 bg-secondaryblue p-2 rounded-full transition-colors duration-300 group-hover:bg-primaryblue" />
        <h6 class="font-semibold text-secondaryblue transition-colors duration-300 group-hover:text-primaryblue">
          Sustainable Cities and Communities
        </h6>
        <p class="text-sm text-gray-500">
          Mendorong pembangunan kota dan komunitas yang inklusif, aman, tahan bencana, dan ramah lingkungan.
        </p>
      </div>
      <div
        class="bg-white p-4 rounded-xl shadow flex flex-col items-center gap-2 text-center group transition-colors duration-300 hover:text-semigreen">
        <img src="./icons/consume.png" alt=""
          class="w-14 bg-greenlight p-2 rounded-full transition-colors duration-300 group-hover:bg-semigreen" />
        <h6 class="font-semibold text-greenlight transition-colors duration-300 group-hover:text-semigreen">
          Responsible Consumption
        </h6>
        <p class="text-sm text-gray-500">
          Mengupayakan pola konsumsi dan produksi efisien yang berkelanjutan untuk pertahanan sumber daya.
        </p>
      </div>
      <div
        class="bg-white p-4 rounded-xl shadow flex flex-col items-center gap-2 text-center group transition-colors duration-300 hover:text-primaryoranye">
        <img src="./icons/inovate.png" alt=""
          class="w-14 bg-secondaryoranye p-2 rounded-full transition-colors duration-300 group-hover:bg-primaryoranye" />
        <h6 class="font-semibold text-secondaryoranye transition-colors duration-300 group-hover:text-primaryoranye">
          Innovation and Infrastructure
        </h6>
        <p class="text-sm text-gray-500">
          Memperkuat infrastruktur dan inovasi untuk mendukung pertumbuhan ekonomi yang berkelanjutan dan inklusif.
        </p>
      </div>
    </div>
  </section>
</template>
