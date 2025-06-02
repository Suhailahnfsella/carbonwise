import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import FiturPage from '@/pages/FiturPage.vue'
import EcoMapPage from '@/pages/EcoMapPage.vue'
import EcoTrackPage from '@/pages/EcoTrackPage.vue'
import EcoRiskPage from '@/pages/EcoRiskPage.vue'
import EcoChallengePage from '@/pages/EcoChallengePage.vue'
import EcoBadgePage from '@/pages/EcoBadgePage.vue'
import ProfilPage from '@/pages/ProfilPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/fitur', component: FiturPage },
  { path: '/ecomap', component: EcoMapPage },
  { path: '/ecotrack', component: EcoTrackPage },
  { path: '/ecorisk', component: EcoRiskPage },
  { path: '/ecochallenge', component: EcoChallengePage },
  { path: '/ecobadge', component: EcoBadgePage },
  { path: '/profil', component: ProfilPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
