<template>
<div id="login-section">
      <h2 class="text-2xl font-bold text-green-700 mb-4 text-center">Accedi</h2>
        <div>
          <label for="email" class="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Inserisci la tua email"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            v-model="pass"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Inserisci la tua password"
          />
        </div>
        <button
          type="button"
          @click="submitLogin()"
          class="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Accedi
        </button>
      </div>
</template>
<script setup>
import {useUserStore} from '@/stores/user.js'
import { ref } from 'vue'
import {login} from '../service/ApiRest.js'
import $ from 'jquery'
//import ToastPlugin from 'vue-toast-notification';
import { useToast } from 'vue-toast-notification'

const userStore = useUserStore()

const $toast = useToast()

const email = ref('');
const pass = ref('');

const submitLogin = () => {

    var body = {
        email: email.value,
        password: pass.value
    }

    login(body).then(response => {
        console.log(response)
        userStore.setUser(response.data);
    }).catch(error => {
        console.log(error)
        $toast.error(error.response.data.error)
    })
}
</script>