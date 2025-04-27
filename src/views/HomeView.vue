<template>
<header class="py-16 relative">
  <div class="container mx-auto text-center px-4 sm:px-0 flex flex-col items-center hero-overlay">
    <h1 class="text-4xl sm:text-5xl font-bold leading-tight mb-4 animate-fadeIn text-highlight">
      Benvenuti su Fie-co
    </h1>
    <p class="text-lg mb-8 max-w-lg text-subtitle">
      La piattaforma perfetta per supportare gli agricoltori con strumenti avanzati.
    </p>
    <RouterLink to="/loginup">
    <button
      class="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-all"
    >
      Accedi o registrati
    </button>
    </RouterLink>
  </div>
</header>
</template>
<script setup>
import {RouterLink} from 'vue-router'
import {onMounted} from 'vue'
import {useUserStore} from '@/stores/user.js'

const userStore = useUserStore();

onMounted(() => {

})
</script>