import { createRouter, createWebHistory } from 'vue-router'
import map from '../views/Map.vue'

const routes = [
  {
    path: '/',
    name: 'Map',
    component: map
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('../views/Info.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }, 
  {
    path: '/regist',
    name: 'Regist',
    component: () => import('../views/Regist.vue')
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
