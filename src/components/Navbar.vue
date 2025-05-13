<script setup>
import logo from '../assets/plant-icon.png';
import Login from './Login.vue';
import Registrazione from './Registrazione.vue';
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from "@/stores/user";
import { checkUserSession } from "./service/ApiRest.js";

const store = useUserStore();

let loginVisible = ref(false);
let regVisible = ref(false);
let isLogged = ref(store.getUsername != "" && store.getUsername != undefined);

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

const notLogged = () => {
  loginVisible.value = false;
  regVisible.value = false;
  isLogged.value = false;
};

const checkSession = () => {
  checkUserSession().then(data => {
    store.setUsername(data.data);
    if (data.data != "" && data.data != undefined) {
      logged();
    } else {
      notLogged();
    }
  });
};

onBeforeMount(() => {
  checkUserSession().then(data => {
    store.setUsername(data.data);
    if (data.data != "" && data.data != undefined) {
      logged();
    }
  });
});

defineExpose({
  checkSession
});
</script>

<template>
  <nav class="bg-gradient-to-r from-green-700 to-green-500 p-4 shadow-md topbar_custom" :key="$route.fullPath">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo e titolo -->
      <div class="flex items-center space-x-3">
        <img :src="logo" alt="Logo Piantina" class="w-10 h-10 rounded-full shadow-md" />
        <a href="#" class="text-2xl font-bold text-white tracking-wide hover:text-lime-200 transition duration-200">Fie-co</a>
      </div>

      <!-- Menu -->
      <ul class="flex space-x-4 sm:space-x-6 items-center font-medium">
        <li><a href="/" class="text-white hover:text-lime-200 transition duration-200">Home</a></li>
        <li><a href="/wiki" class="text-white hover:text-lime-200 transition duration-200">Wiki</a></li>
        <li><a href="qa.html" class="text-white hover:text-lime-200 transition duration-200">Q&A</a></li>
        <li><a href="iot.html" class="text-white hover:text-lime-200 transition duration-200">Monitoraggio Dati</a></li>

        <!-- Login/Registrati -->
        <li v-show="!isLogged">
          <button
            @click="triggerLogin"
            class="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            Login
          </button>
        </li>
        <li v-show="!isLogged">
          <button
            @click="triggerReg"
             class="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            Registrati
          </button>
        </li>

        <!-- Profilo -->
        <li v-show="isLogged">
          <a href="/profile" class="hover:text-lime-200 transition">
            <svg class="w-7 h-7 text-white hover:text-lime-300 transition" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Login e Registrazione -->
  <div class="bg-center flex items-center justify-center">
    <Login v-show="loginVisible" @logged="logged" />
    <Registrazione v-show="regVisible" @logged="logged" />
  </div>
</template>

<style scoped>
</style>


