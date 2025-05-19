<template>
  <header class="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
    <!-- Sfondo immagine nitido -->
    <div class="absolute inset-0 bg-[url('/img.jpg')] bg-cover bg-center brightness-75 contrast-110 opacity-60"></div>

    <!-- Contenuto centrale -->
    <div class="relative z-10 container mx-auto text-center px-6 sm:px-8 md:px-16 flex flex-col items-center">
      <h1 class="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-2xl tracking-wide">
        Benvenuti su <span class="text-lime-400">Fie-co</span>
      </h1>
      <p class="text-lg sm:text-xl mb-10 max-w-2xl text-white/90 drop-shadow-md">
        La piattaforma perfetta per supportare gli agricoltori con strumenti avanzati.
      </p>
      <!-- Pulsante rimosso -->
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore();
</script>




