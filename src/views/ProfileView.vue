<template>
<div >
  <h2 class="text-2xl font-bold mb-6 text-gray-800">Gestione Profilo Utente</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700" for="nome">Nome</label>
        <input type="text" id="nome" name="nome" v-model="nome" class="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700" for="cognome">Cognome</label>
        <input type="text" id="cognome" name="cognome" v-model="cognome" class="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
        <input type="email" id="email" name="email" readonly v-model="email" class="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700" for="data_nascita">Data di Nascita</label>
        <input type="date" id="data_nascita" name="data_nascita" v-model="dataNascita" class="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700" for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username" class="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700" for="password">Nuova Password</label>
        <input type="password" id="password" name="password" v-model="password" class="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </div>

    <div class="pt-4">
      <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition" @click="modificaProf()">
        Salva Profilo
      </button>
      <button class="w-full bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition" @click="eliminaProf()">
        Elimina profilo
      </button>
    </div>
</div>
</template>
<script setup>
import {ref, onBeforeMount, getCurrentInstance} from 'vue'
import { getHashFromTest, modifica, getDatiUtente, eliminaUtente} from "../components/service/ApiRest.js"
import { useUserStore } from "@/stores/user"
import { useRouter } from 'vue-router'

const store = useUserStore();
var nome = ref('');
var cognome = ref('');
var username = ref('');
var dataNascita = ref('');
var email = ref('');
var password = ref('');
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
    const regExNome = new RegExp("^[A-ZÀ-Ýa-zà-ÿ]+(?:[\s'\-][A-ZÀ-Ýa-zà-ÿ]+)*$")
    const regExUser = new RegExp("^[a-zA-Z0-9._-]{3,20}$")
    const regExEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    const regExPass = new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])(?=.*\\W).{8,}$")

    console.log("MODIFICA")

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

    if(password.value != '' && !regExPass.test(password.value))
    {
        alert("Password non valida o conferma password diversa");
        execute = false;
    }

    if(execute)
    {
        if(password.value != '')
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

            modifica(body).then(data => {
                console.log(data)
                store.setUsername(data.data)
                //emit('logged')
            })
            .catch( data => {
              console.log(data)
                alert(data)
            })
        })
        }
        else
        {
            var body = {
            nome: nome.value,
            cognome: cognome.value,
            username: username.value,
            dataNascita: dataNascita.value,
            email: email.value
            }

            console.log(data)

            modifica(body).then(data => {
                console.log(data)
                store.setUsername(data.data)
                //emit('logged')
            })
            .catch( data => {
              console.log(data)
                alert(data)
            })
        }
        
    }

}

const eliminaProf = () => {
    if(confirm("Sicuro di voler elimninare il tuo profilo? una volta eliminato i dati sono persi in modo permanente!"))
    {
        eliminaUtente(store.getUsername).then(() => {
            store.setUsername(undefined)
            alert("Profilo eliminato con successo");
            router.push("/")
    }).catch(data => {
        alert(data)
    })
    }
}

</script>