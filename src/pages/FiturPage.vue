<template>
  <div>
    <Navbar />
    <main>
      <FiturEcoMap class="opacity-0 scale-95 transition-all duration-500 ease-out" v-animate-scale />
      <FiturEcoTrack class="opacity-0 -translate-x-10 transition-all duration-500 ease-out" v-animate-slide-left />
      <FiturEcoRisk class="opacity-0 translate-x-10 transition-all duration-500 ease-out" v-animate-slide-right />
      <FiturEcoChallenge class="opacity-0 -translate-x-10 transition-all duration-500 ease-out" v-animate-slide-left />
      <FiturEcoBadge class="opacity-0 translate-x-10 transition-all duration-500 ease-out" v-animate-slide-right />
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
import { onMounted } from 'vue'

const setupAnimationStyles = () => {
  document.querySelectorAll('[v-animate-slide-right], [v-animate-slide-left]').forEach(el => {
    el.style.willChange = 'transform, opacity'
    el.style.transformStyle = 'preserve-3d'
    el.style.backfaceVisibility = 'hidden'
  })
}

const vAnimateScale = {
  mounted: (el) => {
    el.style.willChange = 'transform, opacity'
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'scale-100')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    })
    observer.observe(el)
  }
}

const vAnimateSlideLeft = {
  mounted: (el) => {
    el.style.willChange = 'transform, opacity'
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-x-0')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    })
    observer.observe(el)
  }
}

const vAnimateSlideRight = {
  mounted: (el) => {
    el.style.willChange = 'transform, opacity'
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', '!translate-x-0')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    })
    observer.observe(el)
  }
}

onMounted(() => {
  setupAnimationStyles()

  const animateVisibleElements = () => {
    const animate = (selector, classes) => {
      document.querySelectorAll(selector).forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add(...classes.split(' '))
        }
      })
    }

    animate('[v-animate-scale]', 'opacity-100 scale-100')
    animate('[v-animate-slide-left]', 'opacity-100 translate-x-0')
    animate('[v-animate-slide-right]', 'opacity-100 !translate-x-0')
  }

  setTimeout(animateVisibleElements, 50)
})
</script>
