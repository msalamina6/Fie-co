<template>
  <footer class="bg-green-600 text-white pt-12 pb-6 px-6 md:px-16 mt-20 shadow-inner">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

      <!-- Chi siamo -->
      <div>
        <h3 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Chi siamo</h3>
        <ul class="space-y-3">
          <li><RouterLink to="/about" class="hover:underline hover:text-lime-300 transition">La nostra missione</RouterLink></li>
          <li><RouterLink to="/team" class="hover:underline hover:text-lime-300 transition">Il nostro team</RouterLink></li>
          <li><RouterLink to="/contact" class="hover:underline hover:text-lime-300 transition">Contattaci</RouterLink></li>
        </ul>
      </div>

      <!-- Servizi -->
      <div>
        <h3 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Servizi</h3>
        <ul class="space-y-3">
          <li><RouterLink to="/wiki" class="hover:underline hover:text-lime-300 transition">Wiki</RouterLink></li>
          <li><RouterLink to="/qa" class="hover:underline hover:text-lime-300 transition">Domande e risposte</RouterLink></li>
          <li><RouterLink to="/iot" class="hover:underline hover:text-lime-300 transition">Monitoraggio IoT</RouterLink></li>
        </ul>
      </div>

      <!-- Blog -->
      <div>
        <h3 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Ultimi articoli</h3>
        <ul class="space-y-3">
          <li><RouterLink to="/blog/1" class="hover:underline hover:text-lime-300 transition">Monitorare le colture con IoT</RouterLink></li>
          <li><RouterLink to="/blog/2" class="hover:underline hover:text-lime-300 transition">5 consigli per la resa agricola</RouterLink></li>
          <li><RouterLink to="/blog/3" class="hover:underline hover:text-lime-300 transition">Pratiche di irrigazione</RouterLink></li>
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <div class="my-8 border-t border-white/20"></div>

    <!-- Copyright -->
    <div class="text-center text-sm text-white/80">
      © 2025 Fie-co. Tutti i diritti riservati.
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>