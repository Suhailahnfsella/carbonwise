<template>
  <div>
    <Navbar />
    <main>
      <div ref="heroSection" class="opacity-0 translate-y-10 transition-all duration-700 ease-out">
        <HeroSection @scrollToLatarBelakang="scrollToLatarBelakang" />
      </div>

      <div ref="latarBelakangRef" class="opacity-0 scale-95 transition-all duration-500 ease-out" v-animate-scale>
        <LatarBelakang />
      </div>

      <div class="opacity-0 -translate-x-10 transition-all duration-500 ease-out" v-animate-slide-left>
        <FaqSection />
      </div>

      <div class="opacity-0 translate-x-10 transition-all duration-500 ease-out" v-animate-slide-right>
        <ResponsiveDemoSection />
      </div>

      <FooterSection />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import LatarBelakang from '../components/LatarBelakangSection.vue'
import FaqSection from '../components/FaqSection.vue'
import ResponsiveDemoSection from '../components/ResponsiveDemoSection.vue'
import FooterSection from '../components/FooterSection.vue'

const latarBelakangRef = ref(null)
const heroSection = ref(null)

const scrollToLatarBelakang = () => {
  latarBelakangRef.value?.scrollIntoView({ behavior: 'smooth' })
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
  setTimeout(() => {
    if (heroSection.value) {
      heroSection.value.classList.remove('opacity-0', 'translate-y-10')
      heroSection.value.classList.add('opacity-100', 'translate-y-0')
    }
  }, 100)

  const checkInitialVisibility = () => {
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

  setTimeout(checkInitialVisibility, 150)
})
</script>
