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

      const role = () => {
        if (localStorage.getItem("role"))
        {
            return ref(localStorage.getItem("role"));
        }
        else{
            return ref("")
        } 
    }
  const getUsername = computed(() => username.value)
  const getRole = computed(() => role.value)

  function setUsername(data) {
     username.value = data
     return data
  }

  function setRole(data) {
    return role.value = data
  }

  function eliminazioneUtente()
  {
    return new Promise(function(resolve, reject) {
      username.value = ""
      role.value = ""
      resolve()
    })
  }

  return { username, getUsername, setUsername, eliminazioneUtente , getRole, setRole}
})
