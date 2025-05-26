<template>
  <div class="min-h-screen bg-green-50 py-12">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Titolo -->
      <h1 class="text-4xl font-extrabold text-center text-green-900 mb-8 tracking-tight">
        🌿 FIE-CO <span class="text-lime-500">WIKI</span>
      </h1>

      <!-- Barra di ricerca -->
      <div class="flex items-center w-full max-w-xl mx-auto mb-12 border border-lime-300 bg-white/60 backdrop-blur-md rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-lime-400 transition">
        <input 
          type="text" 
          placeholder="Cerca..." 
          class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
          v-model="param"
          @keyup.enter="ricercaArticolo()"
        >
        <button class="ml-3 text-lime-600 hover:text-lime-800 transition text-xl" @click="ricercaArticolo()">
          🔍
        </button>
      </div>

        <div class="bg-white/70 rounded-2xl p-6 shadow-lg border border-gray-200 backdrop-blur" v-if="risultatiRicerca.length != 0" style="margin-bottom: 1rem">
          <h2 class="text-2xl font-bold text-green-800 mb-4 border-b border-gray-300 pb-2">Risultati della ricerca</h2>
          <div class="space-y-3">
            <div 
              v-for="el in risultatiRicerca" 
              :key="el.articolo"
              class="text-lg font-medium text-gray-700 hover:text-gray-900 transition duration-200"
            >
              <a :href="'/detail/' + el.articolo">{{ el.titolo }}</a>
            </div>
          </div>
        </div>

      <!-- Sezioni -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Articoli Principali -->
        <div class="bg-white/70 rounded-2xl p-6 shadow-lg border border-lime-100 backdrop-blur">
          <h2 class="text-2xl font-bold text-green-800 mb-4 border-b border-lime-300 pb-2">🌟 Articoli Principali</h2>
          <div class="space-y-3">
            <div 
              v-for="el in articoliPrincipali" 
              :key="el.articolo"
              class="text-lg font-medium text-lime-700 hover:text-lime-900 transition duration-200"
            >
              <a :href="'/detail/' + el.articolo">{{ el.titolo }}</a>
            </div>
          </div>
        </div>

        <!-- Tutti gli Articoli -->
        <div class="bg-white/70 rounded-2xl p-6 shadow-lg border border-gray-200 backdrop-blur">
          <h2 class="text-2xl font-bold text-green-800 mb-4 border-b border-gray-300 pb-2">📄 Tutti gli Articoli</h2>
          <div class="space-y-3">
            <div 
              v-for="el in articoli" 
              :key="el.articolo"
              class="text-lg font-medium text-gray-700 hover:text-gray-900 transition duration-200"
            >
              <a :href="'/detail/' + el.articolo">{{ el.titolo }}</a>
            </div>
          </div>
        </div>

        <!-- Articoli Recenti -->
        <div class="bg-white/70 rounded-2xl p-6 shadow-lg border border-lime-100 backdrop-blur">
          <h2 class="text-2xl font-bold text-green-800 mb-4 border-b border-lime-300 pb-2">🕒 Più Recenti</h2>
          <div class="space-y-3">
            <div 
              v-for="el in articoliRecenti" 
              :key="el.articolo"
              class="text-lg font-medium text-lime-700 hover:text-lime-900 transition duration-200"
            >
              <a :href="'/detail/' + el.articolo">{{ el.titolo }}</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup> 
import { onMounted, ref } from 'vue'
import { getArticoli, getArtRecenti, getArtPrincipali, getRicerca } from '../components/service/ApiRest.js'

let articoli = ref([]);
let articoliRecenti = ref([]);
let articoliPrincipali = ref([]);
let risultatiRicerca = ref([]);
let param = ref("");

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

const ricercaArticolo = () => {
  if(param.value == "")
  {
    alert("Parametro ricerca vuoto");
  }
  else
  {
    getRicerca(param.value).then(data => {
      if(data.data.length == 0)
      {
        alert("Nessun elemento trovato")
        risultatiRicerca.value = []
      }
      else
      {
        risultatiRicerca.value = data.data;
      }
    })
  }
}
</script>

<style>
/* Aggiungi qui eventuali stili personalizzati se necessario */
</style>
