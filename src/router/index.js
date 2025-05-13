import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TeamView from '@/views/TeamView.vue';
import ContactView from '@/views/ContactView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: () => import('../views/WikiView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/detail/:articolo',
      name: 'detail',
      component: () => import('../views/DetailView.vue'),
    },
    {
      path: '/team',
      name: 'Team',
      component: TeamView, // Aggiunto percorso per "Il nostro team"
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView, // Aggiunto percorso per "Contattaci"
    },
  ],
});

export default router;
