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
RISULTATI DELLA RICERCA DA CICLARE
<div class="grid grid-cols-3 gap-4">
<p>result 1</p>
<p>result 2</p>
<p>result 3</p>
</div>
</div>
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-gray-200 p-4">
    <h2>Articoli Principali</h2>
  </div>
  <div class="bg-gray-200 p-4">
  <h2>Articoli più recenti</h2>
  </div>
</div>
</template>
<script>

</script>
<style>
</style>