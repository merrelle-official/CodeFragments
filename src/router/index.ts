import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FragmentsView from '@/views/FragmentsView.vue'
import AuthorizationView from '@/views/AuthorizationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/fragmnets',
      name: 'fragments',
      component: FragmentsView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthorizationView
    }
    
  ],
})

export default router
