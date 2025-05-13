<template>
<nav class="fixed w-full z-50 top-0 left-0 bg-green-600 shadow-lg ring-1 ring-green-500/40">
  <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <!-- Logo e Titolo a SINISTRA -->
    <div class="flex items-center space-x-3">
      <img :src="logo" alt="Logo Piantina" class="w-10 h-10 drop-shadow-md" />
      <RouterLink to="/" class="text-2xl font-bold text-white tracking-wider">Fie-co</RouterLink>
    </div>

    <!-- Link Navigazione -->
    <ul class="flex space-x-6 items-center">
      <li><RouterLink to="/" class="nav-link text-white hover:text-green-200">Home</RouterLink></li>
      <li><RouterLink to="/wiki" class="nav-link text-white hover:text-green-200">Wiki</RouterLink></li>
      <li><RouterLink to="/qa" class="nav-link text-white hover:text-green-200">Q&A</RouterLink></li>
      <li><RouterLink to="/iot" class="nav-link text-white hover:text-green-200">Monitoraggio</RouterLink></li>

      <!-- Pulsanti -->
      <li v-if="!isLogged">
        <button @click="triggerLogin"
          class="px-4 py-1 rounded-lg text-white bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 transition font-semibold shadow">
          Login
        </button>
      </li>
      <li v-if="!isLogged">
        <button @click="triggerReg"
          class="px-4 py-1 rounded-lg text-white bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 transition font-semibold shadow">
          Registrati
        </button>
      </li>

      <!-- Profilo utente -->
      <li v-if="isLogged">
        <RouterLink to="/profile"
          class="flex items-center space-x-2 text-white hover:text-green-200 transition font-medium">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Profilo</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</nav>

<!-- Login e Registrazione -->
<div class="pt-32 flex justify-center">
  <Login v-show="loginVisible" @logged="logged" />
  <Registrazione v-show="regVisible" @logged="logged" />
</div>
</template>

<script setup>
import logo from '../assets/plant-icon.png';
import Login from './Login.vue';
import Registrazione from './Registrazione.vue';
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from "@/stores/user";
import { checkUserSession } from "./service/ApiRest.js";

const store = useUserStore();
const loginVisible = ref(false);
const regVisible = ref(false);
const isLogged = ref(store.getUsername !== "" && store.getUsername !== undefined);

const triggerLogin = () => {
  if (regVisible.value) regVisible.value = false;
  loginVisible.value = !loginVisible.value;
};

const triggerReg = () => {
  if (loginVisible.value) loginVisible.value = false;
  regVisible.value = !regVisible.value;
};

const logged = () => {
  loginVisible.value = false;
  regVisible.value = false;
  isLogged.value = true;
};

onBeforeMount(() => {
  checkUserSession().then(data => {
    store.setUsername(data.data);
    if (data.data) logged();
  });
});
</script>

 
 