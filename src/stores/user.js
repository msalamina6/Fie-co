import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = () => {
        if (localStorage.getItem("username"))
        {
            return ref(localStorage.getItem("username"));
        }
        else{
            return ref("")
        } 
    }
  const getUsername = computed(() => username.value)
  function setUsername(data) {
    username.value = data
  }

  return { username, getUsername, setUsername }
})
