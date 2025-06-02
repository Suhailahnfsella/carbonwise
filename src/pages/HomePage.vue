<template>
  <div>
    <Navbar />
    <main>
      <HeroSection @scrollToLatarBelakang="scrollToLatarBelakang" />
      <div ref="latarBelakangRef">
        <LatarBelakang />
      </div>
      <TujuanSection />
      <FooterSection />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import LatarBelakang from '../components/LatarBelakangSection.vue'
import TujuanSection from '../components/FaqSection.vue'
import FooterSection from '../components/FooterSection.vue'

const latarBelakangRef = ref(null)

const scrollToLatarBelakang = () => {
  latarBelakangRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
