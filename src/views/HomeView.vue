<template>
  <header class="pt-28 relative w-full h-[90vh] overflow-hidden">
    <!-- Immagine di sfondo -->
    <div class="absolute inset-0 z-0">
      <div class="w-full h-full bg-[url('/img.jpg')] bg-cover bg-center brightness-75"></div>
    </div>

    <!-- Sovrapposizione con testo -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
      <h1 class="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
        Benvenuti su Fie-co
      </h1>
      <p class="text-lg sm:text-xl mb-8 max-w-2xl drop-shadow-md">
        La piattaforma perfetta per supportare gli agricoltori con strumenti avanzati.
      </p>
      <RouterLink to="/loginup">
        <button
          class="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300"
        >
          Accedi o registrati
        </button>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>


