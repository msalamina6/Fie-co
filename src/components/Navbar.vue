<script setup>
import logo from '../assets/plant-icon.png';
</script>

<template>
    <nav class="bg-gradient-to-r from-green-700 to-green-500 p-4 shadow-md topbar_custom" >
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center space-x-3">
                <img :src="logo" alt="Logo Piantina" class="w-10 h-10" />
                <a href="#" class="text-2xl font-bold text-white tracking-wide">Fie-co</a>
                </div>
                <ul class="flex space-x-6">
                <li><a href="#" class="nav-link">Home</a></li>
                <li><a href="wiki.html" class="nav-link">Wiki</a></li>
                <li><a href="qa.html" class="nav-link">Q&A</a></li>
                <li><a href="iot.html" class="nav-link">Monitoraggio Dati</a></li>
                </ul>
            </div>
        </nav> 
</template>

<style scoped>

</style>
