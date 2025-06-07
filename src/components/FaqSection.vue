<template>
  <section id="faq" class="px-6 pt-12 pb-8 md:px-15 lg:px-24">
    <h2 class="text-3xl font-bold mb-4 text-darkblue">FAQs</h2>
    <div class="space-y-4">
      <div v-for="(item, index) in faqList" :key="index" class="border-b border-gray-200 pb-2">
        <button @click="toggleFAQ(index)"
          class="w-full flex justify-between items-center text-left font-semibold py-2 focus:outline-none cursor-pointer"
          :class="activeFAQ === index ? 'text-darkblue' : 'text-gray-400'">
          <span>{{ item.title }}</span>
          <span class="flex items-center">
            <svg v-if="activeFAQ === index" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 15l-7-7-7 7" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        <div v-show="activeFAQ === index" class="text-gray-700 transition-all duration-300 mt-1 space-y-1">
          <div v-if="Array.isArray(item.content)">
            <ul class="list-disc list-inside space-y-1">
              <li v-for="(point, idx) in item.content" :key="idx">{{ point }}</li>
            </ul>
          </div>
          <p v-else>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const faqList = [
  {
    title: 'Apa itu CarbonWise?',
    content: 'CarbonWise adalah platform berbasis web yang memungkinkan masyarakat Indonesia khususnya Jawa Timur untuk melacak jejak karbon pribadi secara harian, melihat dampak aktivitasnya secara lokal, dan ikut serta dalam aksi iklim berbasis komunitas serta teknologi.'
  },
  {
    title: 'Bagaimana cara platform ini menghitung jejak karbon saya?',
    content: 'Pengguna mengisi aktivitas harian seperti moda transportasi, konsumsi listrik, dan makanan. Sistem menggunakan referensi IPCC dan data lokal KLHK untuk menghitung emisi CO₂ secara akurat.'
  },
  {
    title: 'Apa manfaat pribadi dari menggunakan CarbonWise?',
    content: [
      'Mendapat EcoBadge sebagai bukti berkontribusi untuk aksi hijau.',
      'Menambah nilai pada portofolio pendidikan atau pekerjaan.',
    ]
  },
  {
    title: 'Siapa saja yang bisa menggunakan CarbonWise?',
    content: [
      'Individu dengan usia minimal 15 tahun yang memiliki kesibukan seperti pelajar, pekerja, atau lainnya, khususnya di Jawa Timur.',
      'Komunitas dan masyarakat urban maupun suburban.',
      'Pemerintah daerah dan NGO yang membutuhkan data untuk intervensi lokal.'
    ]
  },
  {
    title: 'Apakah CarbonWise bisa digunakan secara gratis?',
    content: 'Ya, platform ini gratis untuk semua individu dan komunitas yang ingin berkontribusi dalam aksi iklim secara sadar dan terukur.'
  },
  {
    title: 'Bagaimana CarbonWise menjaga keamanan data saya?',
    content: 'Data aktivitas hanya digunakan untuk perhitungan dan visualisasi edukatif, tanpa mengaitkan langsung ke identitas personal secara publik, menjaga privasi pengguna dengan ketat.'
  }
]

const activeFAQ = ref(null)
function toggleFAQ(index) {
  activeFAQ.value = activeFAQ.value === index ? null : index
}
</script>
