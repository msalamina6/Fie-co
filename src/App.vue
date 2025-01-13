<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Chat from './components/Chat.vue'
</script>

<template>
    <div class="grid grid-cols-4">
      <div class="col-span-3">
      <Navbar></Navbar>
        <RouterView />
        <Footer></Footer>
      </div>
      
      <Chat class="col-span-1"></Chat>   
    </div>
</template>

<style scoped>

</style>
