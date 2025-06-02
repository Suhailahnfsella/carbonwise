<template>
  <div>
    <Navbar />
    <main>
      <HeroSection />
      <LatarBelakang />
      <TujuanSection />
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import LatarBelakang from '../components/LatarBelakangSection.vue'
import TujuanSection from '../components/TujuanSection.vue'
</script>
