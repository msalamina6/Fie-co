import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

export const useUserStore = defineStore('user', () => {
  const username = ref("");
  const role = ref("");
  
  const getUsername = computed(() => username.value)
  const getRole = computed(() => role.value)

  function setUsername(data) {
    return username.value = data
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
