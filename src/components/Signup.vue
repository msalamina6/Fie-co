<template>
<div id="register-section">
  <h2 class="text-2xl font-bold text-green-700 mb-4 text-center">Registrati</h2>
    <div>
      <label for="reg-email" class="block text-gray-700 font-semibold">Email</label>
      <input
        type="email"
        id="reg-email"
        v-model="email"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Inserisci la tua email"
      />
    </div>
    <div>
      <label for="reg-nome" class="block text-gray-700 font-semibold">Nome</label>
      <input
        type="text"
        id="reg-nome"
        v-model="nome"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Inserisci il tuo nome"
      />
    </div>
        <div>
      <label for="reg-cogn" class="block text-gray-700 font-semibold">Cognome</label>
      <input
        type="text"
        id="reg-cogn"
        v-model="cognome"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Inserisci il tuo cognome"
      />
    </div>
        <div>
      <label for="reg-date" class="block text-gray-700 font-semibold">Data nascita</label>
      <input
        type="date"
        id="reg-date"
        v-model="dataNasc"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Inserisci la tua data di nascita"
      />
    </div>
        <div>
      <label for="reg-username" class="block text-gray-700 font-semibold">Username</label>
      <input
        type="text"
        id="reg-username"
        v-model="username"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Inserisci il tuo username"
      />
    </div>
    <div>
      <label for="reg-password" class="block text-gray-700 font-semibold">Password</label>
      <input
        v-model="pass"
        type="password"
        id="reg-password"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Crea una password"
      />
    </div>
    <div>
      <label for="user-type" class="block text-gray-700 font-semibold">Che tipo di utente sei?</label>
      <select
      v-model="ruolo"
        id="user-type"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="AG">Agricoltore</option><!-- AG = agricoltore-->
        <option value="SK">Agronomo</option><!-- skilled -->
        <option value="OT">Altro</option><!-- other -->
        <option value="AD">Admin</option><!-- admin DA TOGLIERE-->
      </select>
    </div>
    <button
      type="button"
      @click="submitSignup()"
      class="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
    >
      Completa Registrazione
    </button>
</div>
</template>
<script setup>
import {useUserStore} from '@/stores/user.js'
import { ref } from 'vue'
import {signUp} from '../service/ApiRest.js'
import $ from 'jquery'
//import ToastPlugin from 'vue-toast-notification';
import { useToast } from 'vue-toast-notification'

const userStore = useUserStore()

const $toast = useToast()

const email = ref('');
const pass = ref('');
const ruolo = ref('');
const cognome = ref('');
const nome = ref('');
const dataNasc = ref('');
const username = ref('');

const submitSignup = () => {

    var body = {
        email: email.value,
        password: pass.value,
        nome: nome.value,
        cognome: cognome.value,
        dataNascita: dataNasc.value,
        username: username.value,
        ruolo: ruolo.value
    }

    signUp(body).then(response => {
        console.log(response)
        userStore.setUser(response.data);
    }).catch(error => {
        console.log(error)
        $toast.error(error.response.data.error)
    })
}
</script>