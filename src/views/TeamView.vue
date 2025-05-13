<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
    <div>
      <h3 class="text-lg font-semibold mb-3">Chi siamo</h3>
      <ul class="space-y-2">
        <li><RouterLink to="/about" class="hover:underline">La nostra missione</RouterLink></li>
        <li><RouterLink to="/team" class="hover:underline">Il nostro team</RouterLink></li>
        <li><RouterLink to="/contact" class="hover:underline">Contattaci</RouterLink></li>
      </ul>
    </div>
    <div>
      <h3 class="text-lg font-semibold mb-3">Servizi</h3>
      <ul class="space-y-2">
        <li><RouterLink to="/wiki" class="hover:underline">Wiki</RouterLink></li>
        <li><RouterLink to="/qa" class="hover:underline">Domande e risposte</RouterLink></li>
        <li><RouterLink to="/iot" class="hover:underline">Monitoraggio IoT</RouterLink></li>
      </ul>
    </div>
    <div>
      <h3 class="text-lg font-semibold mb-3">Ultimi articoli</h3>
      <ul class="space-y-2">
        <li><RouterLink to="/blog/1" class="hover:underline">Come monitorare le tue colture con IoT</RouterLink></li>
        <li><RouterLink to="/blog/2" class="hover:underline">5 consigli per migliorare la resa agricola</RouterLink></li>
        <li><RouterLink to="/blog/3" class="hover:underline">Le migliori pratiche per l'irrigazione</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>