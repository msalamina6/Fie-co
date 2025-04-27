<template>
<h1 class="text-3xl font-bold text-center text-gray-800">FIE-CO WIKI</h1>
<div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
  <input 
    type="text" 
    placeholder="Cerca..." 
    class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
  >
  <button 
    class="ml-2 text-blue-500 hover:text-blue-600 transition"
  >
    🔍
  </button>
</div>
<div class="text-center p-4">
</div>
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-gray-200 p-4">
    <h2>Articoli Principali</h2>
    <div v-for="el in articoliPrincipali">
      <a :href="'/detail/'+el.articolo">{{el.titolo}}</a>
    </div>
  </div>
  <div class="grid text-center grid-cols-3 gap-4">
    <div v-for="el in articoli"><a :href="'/detail/'+el.articolo">{{el.titolo}}</a></div>
  </div>
  <div class="bg-gray-200 p-4">
  <h2>Articoli più recenti</h2>
    <div v-for="el in articoliRecenti">
      <a :href="'/detail/'+el.articolo">{{el.titolo}}</a>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useUserStore } from "@/stores/user"
import { onMounted } from 'vue'
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
  //articoli.value = 
})


</script>
<style>
</style>