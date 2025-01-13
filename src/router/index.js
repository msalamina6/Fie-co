import { createRouter, createWebHistory } from 'vue-router'
import LoginSignUp from '../views/LoginSignUp.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/loginup',
      name: 'login/signup',
      component: LoginSignUp,
    },    
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
  ],
})

export default router
