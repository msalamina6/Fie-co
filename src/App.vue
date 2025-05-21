<script setup>
import { RouterView, useRoute } from 'vue-router'
import { useTemplateRef, watch} from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import from './components/Chat.vue'

const childRef = useTemplateRef('navbar')

const route = useRoute()

watch(() => route.fullPath,() => {
    childRef.value?.checkSession()
  }
)


</script>

<template>
    <div class="grid grid-cols-4">
      
      <div class="col-span-4">
      <Navbar ref="navbar"></Navbar>
        <RouterView/>
        <Footer></Footer>
      </div>
      
      
    </div>
</template>

<style scoped>
</style>
