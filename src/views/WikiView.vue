<template>
  <div>
    <!-- Navbar -->
    <nav class="fixed w-full z-50 top-0 left-0 bg-green-600 shadow-lg ring-1 ring-green-500/40">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Logo e Titolo -->
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

    <!-- Contenuto della pagina Wiki -->
    <div v-if="!loginVisible && !regVisible" class="bg-green-50 min-h-screen pt-10">
      <div class="container mx-auto px-4 py-10 max-w-6xl">
        <h1 class="text-4xl font-bold text-center text-green-700 mb-10 drop-shadow">🌿 FIE-CO WIKI</h1>

        <!-- Barra di ricerca -->
        <div
          class="flex items-center border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-400 transition mb-8 bg-white">
          <input type="text" placeholder="Cerca..."
            class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400" />
          <button class="ml-2 text-green-600 hover:text-green-700 transition">🔍</button>
        </div>

        <!-- Articoli Principali -->
        <div v-if="articoliPrincipali.length > 0" class="bg-white p-6 rounded-xl shadow mb-8">
          <h2 class="text-2xl font-semibold mb-4 text-green-800">🌱 Articoli Principali</h2>
          <div v-for="el in articoliPrincipali" :key="el.articolo" class="mb-2">
            <RouterLink :to="'/detail/' + el.articolo" class="text-green-600 hover:underline font-medium">
              {{ el.titolo }}
            </RouterLink>
          </div>
        </div>

        <!-- Articoli -->
        <div v-if="articoli.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div v-for="el in articoli" :key="el.articolo" class="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <RouterLink :to="'/detail/' + el.articolo" class="text-green-600 hover:underline font-semibold text-lg">
              {{ el.titolo }}
            </RouterLink>
          </div>
        </div>

        <!-- Articoli Recenti -->
        <div v-if="articoliRecenti.length > 0" class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-2xl font-semibold mb-4 text-green-800">🆕 Articoli Recenti</h2>
          <div v-for="el in articoliRecenti" :key="el.articolo" class="mb-2">
            <RouterLink :to="'/detail/' + el.articolo" class="text-green-600 hover:underline font-medium">
              {{ el.titolo }}
            </RouterLink>
          </div>
        </div>

        <!-- Nessun articolo -->
        <div v-if="articoli.length === 0 && articoliPrincipali.length === 0 && articoliRecenti.length === 0"
          class="text-center text-gray-500 mt-12">
          <p>Non ci sono articoli disponibili al momento.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '../assets/plant-icon.png';
import Login from '../components/Login.vue';
import Registrazione from '../components/Registrazione.vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import { checkUserSession, getArticoli, getArtRecenti, getArtPrincipali } from '../components/service/ApiRest.js';

const store = useUserStore();
const loginVisible = ref(false);
const regVisible = ref(false);
const isLogged = ref(store.getUsername !== "" && store.getUsername !== undefined);

const articoli = ref([]);
const articoliRecenti = ref([]);
const articoliPrincipali = ref([]);

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

onMounted(() => {
  checkUserSession().then(data => {
    store.setUsername(data.data);
    if (data.data) logged();
  });

  getArticoli().then(data => {
    articoli.value = data.data;
  });

  getArtPrincipali().then(data => {
    articoliPrincipali.value = data.data;
  });

  getArtRecenti().then(data => {
    articoliRecenti.value = data.data;
  });
});
</script>