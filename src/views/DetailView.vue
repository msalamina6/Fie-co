<template>
<div class="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl space-y-6" v-if="isRendered">
  <h1 class="text-4xl font-bold text-gray-800">{{articolo.titolo}}</h1>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Terreno</h2>
    <p class="text-gray-600">{{articolo.terreno}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Nutrienti</h2>
    <p class="text-gray-600">{{articolo.nutrienti}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Tempi di crescita</h2>
    <p class="text-gray-600">{{articolo.tempicrescita}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Tempi di fruttazione</h2>
    <p class="text-gray-600">{{articolo.tempifrutti}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Preparazione della coltura</h2>
    <p class="text-gray-600">{{articolo.preparazione}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Temperature ideali</h2>
    <p class="text-gray-600">{{articolo.temperatura}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Umidità ideale</h2>
    <p class="text-gray-600">{{articolo.umidita}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Irrigazione</h2>
    <p class="text-gray-600">{{articolo.irrigazione}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Patologie possibili</h2>
    <p class="text-gray-600">{{articolo.patologie}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Diffusione</h2>
    <p class="text-gray-600">{{articolo.diffusione}}</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Altro</h2>
    <p class="text-gray-600">{{articolo.altro}}</p>
  </section>
</div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticolo } from '../components/service/ApiRest.js'

const articolo = ref({});
const router = useRoute();
const isRendered = ref(false);

onMounted(() => {
    console.log(articolo.value)
    getArticolo(router.params.articolo).then(data => {
        articolo.value = data.data[0];
        isRendered.value = true
    })
})


</script>