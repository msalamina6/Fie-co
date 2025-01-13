<script setup>
import Login from "../components/Login.vue"
import Signup from "../components/Signup.vue"
import { ref, getCurrentInstance } from 'vue'
import $ from 'jquery'

var showModal = ref(false);

const triggerModal = () => {
    console.log("TRIGGER")
    $('#loginModal').attr('hidden',false);
}
</script>

<template>
<div class="grid grid-cols-2" style="background: rgba(0, 100, 0, 0.2)">
<div class="col-span-1">
    <Login style="margin: 2.5rem;padding: 2.5rem;border-radius: 3rem;background: white;"/>
</div>
<div class="col-span-1">
    <Signup style="margin: 2.5rem;padding: 2.5rem;border-radius: 3rem;background: white;"/>
</div>
</div>
  


</template>
