<template>
  <header class="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
    <!-- Sfondo immagine con più contrasto e meno sfocatura -->
    <div class="absolute inset-0 bg-[url('/img.jpg')] bg-cover bg-center opacity-50 brightness-75"></div>

    <!-- Contenuto centrale -->
    <div class="relative z-10 container mx-auto text-center px-6 sm:px-0 flex flex-col items-center">
      <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg animate-fade-in">
        Benvenuti su <span class="text-lime-300">Fie-co</span>
      </h1>
      <p class="text-lg sm:text-xl mb-8 max-w-xl text-white/90">
        La piattaforma perfetta per supportare gli agricoltori con strumenti avanzati.
      </p>
      <RouterLink to="/loginup">
        <button
          class="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white px-8 py-3 rounded-full shadow-lg font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-300"
        >
          Accedi o registrati
        </button>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore();
</script>

