import './assets/main.css'


import { createPinia } from 'pinia'
import { useUserStore } from './stores/user';

import axios from 'axios';


import App from './App.vue'
import router from './router'
import './assets/index.css'

const app = createApp(App)
const pinia = createPinia();
app.use(pinia)

axios.defaults.withCredentials = true;

const user = useUserStore()

app.use(router)

app.mount('#app')
