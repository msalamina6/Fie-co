<script setup>
import logo from '../assets/plant-icon.png';
import Login from './Login.vue';
import Registrazione from './Registrazione.vue';
import { ref, getCurrentInstance } from 'vue'
import { useUserStore } from "@/stores/user"
import { onBeforeMount } from 'vue'
import { checkUserSession } from "./service/ApiRest.js"

const store = useUserStore();

let loginVisible = ref(false);
let regVisible = ref(false);
let isLogged = ref(store.getUsername != "" && store.getUsername != undefined)

const triggerLogin = () => 
{
    console.log("hello")
    if(regVisible.value == true)
    {
        regVisible.value = false;
    }
    loginVisible.value=!loginVisible.value;
}

onBeforeMount(() => {
  checkUserSession().then(data => {
    store.setUsername(data.data)  
    console.log(data)
    console.log(store.getUsername)
    if(data.data != "" && data.data != undefined)
    {
        logged()
    }
  });
})

const triggerReg = () => 
{
    console.log("hello")
    if(loginVisible.value == true)
    {
        loginVisible.value = false;
    }
    regVisible.value=!regVisible.value;
}

const logged = () => 
{
    loginVisible.value = false;
    regVisible.value = false;
    isLogged.value = true;
}
</script>

<template>
    <nav class="bg-gradient-to-r from-green-700 to-green-500 p-4 shadow-md topbar_custom" >
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center space-x-3">
                <img :src="logo" alt="Logo Piantina" class="w-10 h-10" />
                <a href="#" class="text-2xl font-bold text-white tracking-wide">Fie-co</a>
                </div>
                <ul class="flex space-x-6">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/wiki" class="nav-link">Wiki</a></li>
                <li><a href="qa.html" class="nav-link">Q&A</a></li>
                <li><a href="iot.html" class="nav-link">Monitoraggio Dati</a></li>
                <li><button v-show="isLogged == false" class="nav-link" @click="triggerLogin()">Login</button></li>
                <li><button v-show="isLogged == false" class="nav-link" @click="triggerReg()">Registrati</button></li>
                <li>
                    <a href="/profile" class="nav-link" v-show="isLogged == true">
                        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </a>
                </li>
                </ul>
            </div>
        </nav> 
        <div class="bg-center flex items-center justify-center">
        <Login v-show="loginVisible == true" @logged="logged()"></Login>
        <Registrazione v-show="regVisible == true" @logged="logged()"></Registrazione>
        </div>
</template>

<style scoped>
</style>
