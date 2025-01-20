<script setup>
import logo from '../assets/plant-icon.png';
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="bg-gradient-to-r from-green-700 to-green-500 p-4 shadow-md topbar_custom">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <img :src="logo" alt="Logo Piantina" class="w-10 h-10" />
        <RouterLink to="/" class="text-2xl font-bold text-white tracking-wide">Fie-co</RouterLink>
      </div>

      <!-- Search Bar -->
      <div class="items-center flex">
        <input
          type="text"
          placeholder="Cerca articoli..."
          class="px-4 py-2 rounded-l-lg border-t border-b border-l border-gray-300 text-gray-800"
        />
        <button class="px-4 py-2 bg-green-800 text-white rounded-r-lg hover:bg-green-700">Cerca</button>
      </div>

      <!-- Navigation Links -->
      <ul class="flex space-x-6">
        <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
        <li><RouterLink to="/wiki" class="nav-link">Wiki</RouterLink></li>
        <li><RouterLink to="/qa" class="nav-link">Q&A</RouterLink></li>
        <li><RouterLink to="/iot" class="nav-link">Monitoraggio Dati</RouterLink></li>
        <li><button @click="$emit('toggleChat')" class="nav-link">Chatbot</button></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>
