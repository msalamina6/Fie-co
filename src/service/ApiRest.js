 import axios from 'axios'


const $toast = useToast();

 export function getResponse(message) {
    console.log(message)
    const body = {
        messaggio: message
     }
    return axios.post("http://localhost:5000/chatbot/message", body)
    
}

export function getHistory() {
    return axios.get("http://localhost:5000/chatbot/getHistory")
    
}

export function login(body)
{
    console.log(body)
    return axios.post("http://localhost:5000/login", body)
}

export function signUp(body)
{
    console.log(body)
    return axios.post("http://localhost:5000/signup", body)
}