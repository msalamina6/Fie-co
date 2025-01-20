import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Wiki from '../views/Wiki.vue'; // Importa il componente Wiki

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/wiki', name: 'Wiki', component: Wiki }, // Configura la rotta Wiki
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
