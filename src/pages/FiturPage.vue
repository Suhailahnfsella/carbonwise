<template>
  <div>
    <Navbar />
    <main>
      <FiturEcoMap />
      <FiturEcoTrack />
      <FiturEcoRisk />
      <FiturEcoChallenge />
      <FiturEcoBadge />
      <FooterSection />
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import FiturEcoMap from '../components/FiturEcoMap.vue'
import FiturEcoTrack from '../components/FiturEcoTrack.vue'
import FiturEcoRisk from '../components/FiturEcoRisk.vue'
import FiturEcoChallenge from '../components/FiturEcoChallenge.vue'
import FiturEcoBadge from '../components/FiturEcoBadge.vue'
import FooterSection from '../components/FooterSection.vue'
</script>
