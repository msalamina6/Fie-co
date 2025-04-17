import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user';

import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue'
import router from './router'
import './assets/index.css'

const app = createApp(App)
app.use(createPinia())

axios.defaults.withCredentials = true;

const user = useUserStore()

watch(user.username, username => {console.log(state);localStorage.setItem("username", username());}, {deep: true})

app.use(router)

app.mount('#app')
