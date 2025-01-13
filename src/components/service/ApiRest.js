 import axios from 'axios'
 
 export function getResponse(message) {
    console.log(message)
    var body = {
        messaggio: message
     }
    return axios.post("http://localhost:5000/chatbot/message", body)
    
}