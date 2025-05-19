<script setup>
import logo from '../assets/plant-icon.png';
import Login from './Login.vue';
import Registrazione from './Registrazione.vue';
import { ref } from 'vue'
import { useUserStore } from "@/stores/user"
import { onBeforeMount } from 'vue'
import { checkUserSession } from "./service/ApiRest.js"

const store = useUserStore();

let loginVisible = ref(false);
let regVisible = ref(false);
let isLogged = ref(store.getUsername != "" && store.getUsername != undefined)

const triggerLogin = () => {
  if (regVisible.value) regVisible.value = false;
  loginVisible.value = !loginVisible.value;
};

const triggerReg = () => {
  if (loginVisible.value) loginVisible.value = false;
  regVisible.value = !regVisible.value;
};

onBeforeMount(() => {
  checkUserSession().then(data => {
    store.setUsername(data.data)
    if (data.data != "" && data.data != undefined) logged()
  });
});

const checkSession = () => {
  checkUserSession().then(data => {
    store.setUsername(data.data)
    if (data.data != "" && data.data != undefined) {
      logged()
    } else {
      notLogged()
    }
  });
}

const notLogged = () => {
  loginVisible.value = false;
  regVisible.value = false;
  isLogged.value = false;
}

const logged = () => {
  loginVisible.value = false;
  regVisible.value = false;
  isLogged.value = true;
}

defineExpose({
  checkSession
});
</script>

<template>
  <nav class="bg-gradient-to-r from-green-700 to-green-500 px-6 py-4 shadow-md sticky top-0 z-50" :key="$route.fullPath">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <!-- LOGO -->
      <div class="flex items-center space-x-3">
        <img :src="logo" alt="Logo Piantina" class="w-10 h-10 object-contain" />
        <a href="#" class="text-2xl font-bold text-white tracking-wide hover:text-lime-200 transition">
          Fie-co
        </a>
      </div>

      <!-- LINK NAVIGAZIONE -->
      <ul class="flex flex-wrap items-center gap-5 text-white font-medium mt-4 sm:mt-0">
        <li><a href="/" class="hover:text-lime-300 transition">Home</a></li>
        <li><a href="/wiki" class="hover:text-lime-300 transition">Wiki</a></li>
        <li><a href="qa.html" class="hover:text-lime-300 transition">Q&A</a></li>
        <li><a href="iot.html" class="hover:text-lime-300 transition">Monitoraggio Dati</a></li>

        <!-- LOGIN BUTTON -->
        <li v-show="isLogged == false">
          <button
            @click="triggerLogin"
            class="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg shadow transition hover:scale-105"
          >
            Login
          </button>
        </li>

        <!-- REGISTRATI BUTTON -->
        <li v-show="isLogged == false">
          <button
            @click="triggerReg"
            class="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg shadow transition hover:scale-105"
          >
            Registrati
          </button>
        </li>

        <!-- ICONA PROFILO -->
        <li v-show="isLogged == true">
          <a href="/profile" class="hover:text-lime-300 transition">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- COMPONENTI LOGIN / REG -->
  <div class="flex justify-center items-start mt-6">
    <Login v-show="loginVisible" @logged="logged()" />
    <Registrazione v-show="regVisible" @logged="logged()" />
  </div>
</template>

<style scoped>
</style>

