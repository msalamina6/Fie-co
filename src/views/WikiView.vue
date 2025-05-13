<template>
  <div class="max-w-7xl mx-auto px-6 py-12 bg-green-100">
    <h1 class="text-4xl font-extrabold text-center text-green-900 mb-10 tracking-tight">
      🌿 FIE-CO <span class="text-lime-500">WIKI</span>
    </h1>

    <!-- Barra di ricerca -->
    <div class="flex items-center w-full max-w-xl mx-auto mb-12 border border-lime-300 bg-white/60 backdrop-blur-md rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-lime-400 transition">
      <input 
        type="text" 
        placeholder="Cerca un articolo..." 
        class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
      >
      <button class="ml-3 text-lime-600 hover:text-lime-800 transition text-xl">
        🔍
      </button>
    </div>

    <!-- Sezioni -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Articoli Principali -->
      <div class="bg-white/70 rounded-2xl p-6 shadow-lg border border-lime-100 backdrop-blur">
        <h2 class="text-xl font-bold text-green-800 mb-4 border-b border-lime-300 pb-2">🌟 Articoli Principali</h2>
        <div class="space-y-3">
          <div 
            v-for="el in articoliPrincipali" 
            :key="el.articolo"
          >
            <a 
              :href="'/detail/' + el.articolo" 
              class="block text-lime-700 hover:text-lime-900 font-medium transition duration-200"
            >
              {{ el.titolo }}
            </a>
          </div>
        </div>
      </div>

      <!-- Tutti gli Articoli -->
      <div class="bg-white/70 rounded-2xl p-6 shadow-lg border border-gray-200 backdrop-blur">
        <h2 class="text-xl font-bold text-green-800 mb-4 border-b border-gray-300 pb-2">📄 Tutti gli Articoli</h2>
        <div class="grid grid-cols-1 gap-3">
          <div 
            v-for="el in articoli" 
            :key="el.articolo"
          >
            <a 
              :href="'/detail/' + el.articolo" 
              class="block text-gray-700 hover:text-gray-900 transition font-medium"
            >
              {{ el.titolo }}
            </a>
          </div>
        </div>
      </div>

      <!-- Articoli Recenti -->
      <div class="bg-white/70 rounded-2xl p-6 shadow-lg border border-lime-100 backdrop-blur">
        <h2 class="text-xl font-bold text-green-800 mb-4 border-b border-lime-300 pb-2">🕒 Più Recenti</h2>
        <div class="space-y-3">
          <div 
            v-for="el in articoliRecenti" 
            :key="el.articolo"
          >
            <a 
              :href="'/detail/' + el.articolo" 
              class="block text-lime-700 hover:text-lime-900 transition font-medium"
            >
              {{ el.titolo }}
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getArticoli, getArtRecenti, getArtPrincipali } from '../components/service/ApiRest.js'

let articoli = ref([]);
let articoliRecenti = ref([]);
let articoliPrincipali = ref([]);

onMounted(() => {
  getArticoli().then(data => {
    articoli.value = data.data;
  })

  getArtPrincipali().then(data => {
    articoliPrincipali.value = data.data;
  })

  getArtRecenti().then(data => {
    articoliRecenti.value = data.data;
  })
})
</script>

