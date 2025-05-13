<template>
<div class="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/30 backdrop-blur-lg ring-1 ring-green-400/30 transition-all duration-500">
<h2 class="text-3xl font-bold text-green-900 mb-8 text-center tracking-wide">Accedi a Fie-co</h2>
 
    <!-- Email -->
<div class="mb-5">
<label for="email" class="block text-sm text-green-900 font-medium mb-1">Email</label>
<input v-model="email" type="email" id="email"

        class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

        placeholder="tuo@email.com">
</div>
 
    <!-- Password -->
<div class="mb-6">
<label for="password" class="block text-sm text-green-900 font-medium mb-1">Password</label>
<input v-model="password" type="password" id="password"

        class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

        placeholder="••••••••">
</div>
 
    <!-- Pulsante Login -->
<button @click="loginComp"

      class="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold py-2 rounded-xl shadow-lg transition duration-300">

      Accedi
</button>
</div>
</template>
 
<script setup>

import { getHashFromTest, login } from "./service/ApiRest.js"

import { ref } from 'vue'

import { useUserStore } from "@/stores/user"
 
const email = ref('')

const password = ref('')

const store = useUserStore()

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

 