import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

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
    return username.value = data
  }

  function eliminazioneUtente()
  {
    return new Promise(function(resolve, reject) {
      username.value = ""
      resolve()
    })
  }

  return { username, getUsername, setUsername, eliminazioneUtente }
})
