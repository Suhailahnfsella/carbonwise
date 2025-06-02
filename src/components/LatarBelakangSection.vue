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
      <div v-for="(item, index) in latarList" :key="index"
        class="bg-white p-4 rounded-xl shadow flex flex-col items-center gap-2 text-center group transition-colors duration-300 hover:text-[var(--hover-text)]"
        :style="{ '--hover-text': item.hoverTextColor }">
        <img :src="item.icon" alt="" class="w-14 p-2 rounded-full transition-colors duration-300"
          :class="[item.bgColor, 'group-hover:' + item.hoverBgColor]" />
        <h6 class="font-semibold transition-colors duration-300"
          :class="[item.textColor, 'group-hover:' + item.hoverTextColor]">
          {{ item.title }}
        </h6>
        <p class="text-sm text-gray-500">
          {{ item.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import climateIcon from '@/components/icons/climate.png'
import buildingIcon from '@/components/icons/building.png'
import consumeIcon from '@/components/icons/consume.png'
import innovateIcon from '@/components/icons/inovate.png'

const latarList = [
  {
    title: 'Climate Action',
    description: 'Mengatasi perubahan iklim melalui pengurangan emisi dan adaptasi terhadap dampaknya.',
    icon: climateIcon,
    bgColor: 'bg-primaryblue',
    hoverBgColor: 'bg-darkblue',
    textColor: 'text-primaryblue',
    hoverTextColor: 'text-darkblue',
  },
  {
    title: 'Sustainable Cities and Communities',
    description: 'Mendorong pembangunan kota dan komunitas yang inklusif, aman, tahan bencana, dan ramah lingkungan.',
    icon: buildingIcon,
    bgColor: 'bg-secondaryblue',
    hoverBgColor: 'bg-primaryblue',
    textColor: 'text-secondaryblue',
    hoverTextColor: 'text-primaryblue',
  },
  {
    title: 'Responsible Consumption',
    description: 'Mengupayakan pola konsumsi dan produksi efisien yang berkelanjutan untuk pertahanan sumber daya.',
    icon: consumeIcon,
    bgColor: 'bg-greenlight',
    hoverBgColor: 'bg-semigreen',
    textColor: 'text-greenlight',
    hoverTextColor: 'text-semigreen',
  },
  {
    title: 'Innovation and Infrastructure',
    description: 'Memperkuat infrastruktur dan inovasi untuk mendukung pertumbuhan ekonomi yang berkelanjutan dan inklusif.',
    icon: innovateIcon,
    bgColor: 'bg-secondaryoranye',
    hoverBgColor: 'bg-primaryoranye',
    textColor: 'text-secondaryoranye',
    hoverTextColor: 'text-primaryoranye',
  },
]
</script>
