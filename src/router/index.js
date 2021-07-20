import { createRouter, createWebHistory } from 'vue-router'
import map from '../views/Map.vue'
import store from "@/store"

function onlyAdmin (to, from, next) {
  function verifyAdmin(level) {
    if (level == 0) {
      alert("ADMIN ACCESS")
      next()
    } else {
      alert("CLIENT ACCESS DENIED")
    }
  }
  
  if (!store.getters.getUser) {
    alert("출입 통제 // 관계자 외 출입 금지")
    store.watch(()=> store.getters.getUser, (userInfo) => {
      verifyAdmin(userInfo.level)
    })
  } else {
    verifyAdmin(store.getters.getUser.level)
  }
}





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
    path: '/mypage',
    name: 'Mypage',
    component: () => import('../views/Mypage.vue')
  },
  {
    path: '/regist',
    name: 'Regist',
    beforeEnter: onlyAdmin,
    component: () => import('../views/Regist.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
