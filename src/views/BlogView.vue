<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Articolo del blog</h1>
    <p>Stai leggendo l'articolo con ID: {{ blogId }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const blogId = route.params.id; // Ottieni l'ID dell'articolo dal percorso
</script>