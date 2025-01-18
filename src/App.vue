<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Chat from './components/Chat.vue'
import $ from 'jquery'

const toggleSidebar = () => {
  document.getElementById('sidebar').toggleAttribute('hidden')
  document.getElementById('mainpage').classList.toggle('col-span-3');
  document.getElementById('mainpage').classList.toggle('col-span-4');
}
</script>

<template>
    <div class="grid grid-cols-4">
      <div class="col-span-3 page" id="mainpage">
      <Navbar @toggleChat="toggleSidebar()"></Navbar>
        <RouterView />
        <Footer></Footer>
      </div>
      
      <Chat id="sidebar" class="col-span-1 right-sidebar"></Chat>   
    </div>
</template>

<style scoped>
</style>
