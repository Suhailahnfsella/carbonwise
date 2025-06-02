import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import FiturPage from '@/pages/FiturPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/fitur', component: FiturPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
