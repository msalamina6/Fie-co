<template>
  <div class="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-md bg-white/30 p-8 rounded-2xl shadow-xl w-full max-w-md">
    <h2 class="text-2xl font-semibold text-black mb-6 text-center">Login</h2>
      <div class="mb-4">
        <label for="email" class="block text-black mb-1">Email</label>
        <input v-model="email" type="email" id="email" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="tuo@email.com">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-black mb-1">Password</label>
        <input v-model="password" type="password" id="password" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••">
      </div>
      <button @click="loginComp()" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">
        Accedi
      </button>
  </div>
</template>
<script setup>
import { getHashFromTest , login} from "./service/ApiRest.js"
import {ref} from 'vue'
import { useUserStore } from "@/stores/user"

var email = ref('');
var password = ref('');
const store = useUserStore();
const emit = defineEmits(['logged'])

const loginComp = () => {
    getHashFromTest(password.value).then( data => {
        var body = {
            email: email.value,
            password: data
            }

        login(body).then(res => {
            store.setUsername(res.data)
            emit('logged')
        }).catch( res => {
            console.log(res)
            alert(res.response.data)
        })
    })
}

</script>