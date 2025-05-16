<template>
  <div class="min-h-screen bg-gradient-to-br from-green-100 via-lime-200 to-green-50 py-20 px-4 sm:px-10">
    <transition name="fade-slide" appear>
      <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-10 relative overflow-visible animate-fade-in-up">

        <!-- Avatar utente -->
        <div class="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
          <div class="h-28 w-28 bg-lime-400 text-white rounded-full flex items-center justify-center text-4xl font-extrabold border-4 border-white shadow-lg">
            {{ nome.charAt(0).toUpperCase() || "U" }}
          </div>
        </div>

        <h2 class="text-3xl font-extrabold text-center text-green-800 mt-20 mb-16 drop-shadow-md">
          👤 Gestione Profilo Utente
        </h2>

        <!-- Nome e Cognome -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1" for="nome">Nome</label>
            <input
              type="text"
              id="nome"
              v-model="nome"
              class="w-full px-4 py-2 border border-lime-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:outline-none shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1" for="cognome">Cognome</label>
            <input
              type="text"
              id="cognome"
              v-model="cognome"
              class="w-full px-4 py-2 border border-lime-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <!-- Email e Data di Nascita -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1" for="email">Email</label>
            <input
              type="email"
              id="email"
              readonly
              v-model="email"
              class="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl shadow-sm cursor-not-allowed text-gray-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1" for="data_nascita">Data di Nascita</label>
            <input
              type="date"
              id="data_nascita"
              v-model="dataNascita"
              class="w-full px-4 py-2 border border-lime-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <!-- Username e Password -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1" for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full px-4 py-2 border border-lime-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:outline-none shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1" for="password">Nuova Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 border border-lime-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <!-- Pulsanti -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            class="w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white py-3 rounded-xl shadow-lg font-semibold transition duration-300 ease-in-out"
            @click="modificaProf"
          >
            💾 Salva Profilo
          </button>
          <button
            class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg font-semibold transition duration-300 ease-in-out"
            @click="eliminaProf"
          >
            🗑️ Elimina Profilo
          </button>
        </div>

        <!-- Messaggio di successo -->
        <div v-if="successMessage" class="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-sm">
          {{ successMessage }}
        </div>

      </div>
    </transition>
  </div>
</template>


<script setup>
import { ref, onBeforeMount, getCurrentInstance } from 'vue'
import { getHashFromTest, modifica, getDatiUtente, eliminaUtente } from "../components/service/ApiRest.js"
import { useUserStore } from "@/stores/user"
import { useRouter } from 'vue-router'

const store = useUserStore();
var nome = ref('');
var cognome = ref('');
var username = ref('');
var dataNascita = ref('');
var email = ref('');
var password = ref('');
const successMessage = ref('');
const router = useRouter()

onBeforeMount(() => {
  getDatiUtente(store.getUsername).then(data => {
    console.log(Date.parse(data.data.data_nascita))
    nome.value = data.data.nome
    cognome.value = data.data.cognome
    username.value = data.data.username
    dataNascita.value = data.data.data_nascita.split('T')[0]
    email.value = data.data.email 
    console.log(data)
  });
})

const modificaProf = () => {
  const regExNome = new RegExp("^[A-ZÀ-Ýa-zà-ÿ]+(?:[\\s'\\-][A-ZÀ-Ýa-zà-ÿ]+)*$")
  const regExUser = new RegExp("^[a-zA-Z0-9._-]{3,20}$")
  const regExEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
  const regExPass = new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])(?=.*\\W).{8,}$")

  console.log("MODIFICA")

  var execute = true;

  if (!regExNome.test(nome.value)) {
    alert("Nome non valido");
    execute = false;
  }

  if (!regExNome.test(cognome.value)) {
    alert("Cognome non valido");
    execute = false;
  }

  if (!regExUser.test(username.value)) {
    alert("Username non valido");
    execute = false;
  }

  var dataNascitaDate = new Date(dataNascita.value)

  if (dataNascitaDate.getFullYear() < 1920 || dataNascitaDate.getFullYear() > (new Date().getFullYear() - 10)) {
    alert("Data non valida");
    execute = false;
  }

  if (!regExEmail.test(email.value)) {
    alert("Email non valida");
    execute = false;
  }

  if (password.value != '' && !regExPass.test(password.value)) {
    alert("Password non valida o conferma password diversa");
    execute = false;
  }

  if (execute) {
    if (password.value != '') {
      getHashFromTest(password.value).then(data => {
        var body = {
          nome: nome.value,
          cognome: cognome.value,
          username: username.value,
          dataNascita: dataNascita.value,
          email: email.value,
          password: data
        }

        modifica(body).then(data => {
          store.setUsername(data.data)
        })
          .catch(data => {
            alert(data)
          })
      })
    } else {
      var body = {
        nome: nome.value,
        cognome: cognome.value,
        username: username.value,
        dataNascita: dataNascita.value,
        email: email.value
      }

      modifica(body).then(data => {
        store.setUsername(data.data)
      })
        .catch(data => {
          alert(data)
        })
    }
  }
}

const eliminaProf = () => {
  if (confirm("Sicuro di voler eliminare il tuo profilo? Una volta eliminato, i dati saranno persi in modo permanente!")) {
    eliminaUtente(store.getUsername).then(() => {
      store.eliminazioneUtente().then(() => {
        alert("Profilo eliminato con successo");
        router.push("/")
      })
    }).catch(data => {
      alert(data)
    })
  }
}
</script>


