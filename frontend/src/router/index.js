import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Welcome to Taskyrou' }, 
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { title: 'Dashboard - Taskyrou' }, 
      component: () => import('@/views/Dashboard.vue'), 
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Taskyrou'
  next();
})

export default router
