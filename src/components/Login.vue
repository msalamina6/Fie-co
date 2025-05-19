<template>
  <div class="absolute top-28 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/40 border border-white/20">
    <h2 class="text-3xl font-bold text-green-900 mb-8 text-center tracking-wide">
      Accedi a <span class="text-lime-500">Fie-co</span>
    </h2>

    <div class="mb-6">
      <label for="email" class="block text-sm font-semibold text-gray-800 mb-2">Email</label>
      <input
        v-model="email"
        type="email"
        id="email"
        class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
        placeholder="tuo@email.com"
      >
    </div>

    <div class="mb-8">
      <label for="password" class="block text-sm font-semibold text-gray-800 mb-2">Password</label>
      <input
        v-model="password"
        type="password"
        id="password"
        class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
        placeholder="••••••••"
      >
    </div>

    <button
      @click="loginComp()"
      class="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-300"
    >
      Accedi
    </button>
  </div>
</template>

<script setup>
import { getHashFromTest , login} from "./service/ApiRest.js"
import {ref} from 'vue'
import { useUserStore } from "@/stores/user"

const email = ref('');
const password = ref('');
const store = useUserStore();
const emit = defineEmits(['logged'])

const loginComp = () => {
  getHashFromTest(password.value).then(data => {
    const body = {
      email: email.value,
      password: data
    }

    login(body).then(res => {
      store.setUsername(res.data)
      emit('logged')
    }).catch(res => {
      console.log(res)
      alert(res.response.data)
    })
  })
}
</script>

