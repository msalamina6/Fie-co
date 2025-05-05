<template>
<div class="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-md bg-white/30 p-8 rounded-2xl shadow-xl w-full max-w-md">
  <h2 class="text-2xl font-semibold text-black mb-6 text-center">Registrati</h2>

  <!-- Campi in 2 colonne -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label for="name" class="block text-black mb-1">Nome</label>
      <input v-model="nome" type="text" id="name" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nome">
    </div>
    <div>
      <label for="cognome" class="block text-black mb-1">Cognome</label>
      <input v-model="cognome" type="text" id="cognome" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Cognome">
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label for="username" class="block text-black mb-1">Username</label>
      <input v-model="username" type="text" id="username" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Username">
    </div>
    <div>
      <label for="data" class="block text-black mb-1">Data di nascita</label>
      <input v-model="dataNascita" type="date" id="data" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Data di nascita">
    </div>
  </div>

  <!-- Campi singoli a tutta larghezza -->
  <div class="mb-4">
    <label for="emailReg" class="block text-black mb-1">Email</label>
    <input v-model="email" type="email" id="emailReg" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email">
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label for="passwordReg" class="block text-black mb-1">Password</label>
      <input v-model="password" type="password" id="passwordReg" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Password">
    </div>
    <div>
      <label for="confirm" class="block text-black mb-1">Conferma password</label>
      <input v-model="confPassword" type="password" id="confirm" class="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Conferma password">
    </div>
  </div>

  <button @click="registrazioneComp()" class="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition duration-300">
    Registrati
  </button>
</div>
</template>
<script setup>
import { getHashFromTest, registrazione } from "./service/ApiRest.js"
import {ref} from 'vue'
import { useUserStore } from "@/stores/user"

var nome = ref('');
var cognome = ref('');
var username = ref('');
var dataNascita = ref('');
var email = ref('');
var password = ref('');
var confPassword = ref('');
const store = useUserStore();
const emit = defineEmits(['logged'])

const registrazioneComp = () => {
    const regExNome = new RegExp("^[A-ZÀ-Ýa-zà-ÿ]+(?:[\s'\-][A-ZÀ-Ýa-zà-ÿ]+)*$")
    const regExUser = new RegExp("^[a-zA-Z0-9._-]{3,20}$")
    const regExEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    const regExPass = new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])(?=.*\\W).{8,}$")

    var execute = true;

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

    var dataNascitaDate = new Date(dataNascita.value)

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
            var body = {
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
                alert(data)
            })
        })
    }

}

</script>