<template>
  <div class="absolute top-28 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/40 border border-white/20">
    <h2 class="text-3xl font-bold text-green-900 mb-8 text-center tracking-wide">
      Registrati su <span class="text-lime-500">Fie-co</span>
    </h2>

    <!-- Campi in 2 colonne -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label for="name" class="block text-sm font-semibold text-gray-800 mb-2">Nome</label>
        <input v-model="nome" type="text" id="name"
          class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
          placeholder="Nome">
      </div>
      <div>
        <label for="cognome" class="block text-sm font-semibold text-gray-800 mb-2">Cognome</label>
        <input v-model="cognome" type="text" id="cognome"
          class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
          placeholder="Cognome">
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label for="username" class="block text-sm font-semibold text-gray-800 mb-2">Username</label>
        <input v-model="username" type="text" id="username"
          class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
          placeholder="Username">
      </div>
      <div>
        <label for="data" class="block text-sm font-semibold text-gray-800 mb-2">Data di nascita</label>
        <input v-model="dataNascita" type="date" id="data"
          class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition">
      </div>
    </div>

    <div class="mb-6">
      <label for="emailReg" class="block text-sm font-semibold text-gray-800 mb-2">Email</label>
      <input v-model="email" type="email" id="emailReg"
        class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
        placeholder="Email">
    </div>

    <div class="grid grid-cols-2 gap-4 mb-8">
      <div>
        <label for="passwordReg" class="block text-sm font-semibold text-gray-800 mb-2">Password</label>
        <input v-model="password" type="password" id="passwordReg"
          class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
          placeholder="Password">
      </div>
      <div>
        <label for="confirm" class="block text-sm font-semibold text-gray-800 mb-2">Conferma Password</label>
        <input v-model="confPassword" type="password" id="confirm"
          class="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
          placeholder="Conferma password">
      </div>
    </div>

    <button
      @click="registrazioneComp()"
      class="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-300">
      Registrati
    </button>
  </div>
</template>

<script setup>
import { getHashFromTest, registrazione } from "./service/ApiRest.js"
import {ref} from 'vue'
import { useUserStore } from "@/stores/user"

const nome = ref('');
const cognome = ref('');
const username = ref('');
const dataNascita = ref('');
const email = ref('');
const password = ref('');
const confPassword = ref('');
const store = useUserStore();
const emit = defineEmits(['logged'])

const registrazioneComp = () => {
    const regExNome = new RegExp("^[A-ZÀ-Ýa-zà-ÿ]+(?:[\s'\-][A-ZÀ-Ýa-zà-ÿ]+)*$")
    const regExUser = new RegExp("^[a-zA-Z0-9._-]{3,20}$")
    const regExEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    const regExPass = new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])(?=.*\\W).{8,}$")

    let execute = true;

    if(!regExNome.test(nome.value))
    {
        alert("Nome non valido");
        execute = false;
    }
    
    if(!regExNome.test(cognome.value))
    {
        alert("Cognome non valido");
        execute = false;
    }

    if(!regExUser.test(username.value))
    {
        alert("Username non valido");
        execute = false;
    }

    const dataNascitaDate = new Date(dataNascita.value)

    if(dataNascitaDate.getFullYear() < 1920 || dataNascitaDate.getFullYear() > (new Date().getFullYear()-10))
    {
        alert("Data non valida");
        execute = false;
    }

    if(!regExEmail.test(email.value))
    {
        alert("Email non valida");
        execute = false;
    }

    if(!regExPass.test(password.value) || password.value != confPassword.value)
    {
        alert("Password non valida o conferma password diversa");
        execute = false;
    }

    if(execute)
    {
        getHashFromTest(password.value).then(data => {
            const body = {
            nome: nome.value,
            cognome: cognome.value,
            username: username.value,
            dataNascita: dataNascita.value,
            email: email.value,
            password: data
            }

            console.log(data)

            registrazione(body).then(data => {
                console.log(data)
                store.setUsername(data.data)
                emit('logged')
            })
            .catch( data => {
              console.log(data)
                alert(data.message)
            })
        })
    }

}
</script>
