import axios from 'axios';

export function getResponse(message) {
    console.log(message)
    var body = {
        messaggio: message
     }
    return axios.post("http://localhost:5000/chatbot/message", body)
    
}

export function registrazione(dati)
{
    return axios.post("http://localhost:5000/registrazione", dati)
}

export function getDatiUtente(username)
{ 
    return axios.get("http://localhost:5000/getDatiUtente", {params:{username: username}})
}

export function eliminaUtente(username)
{ 
    return axios.post("http://localhost:5000/eliminaUtente", {username: username})
}


export function modifica(dati)
{
    return axios.post("http://localhost:5000/modifica", dati)
}

export function checkUserSession()
{
    return axios.get("http://localhost:5000/checkSession")
}

export function login(dati)
{
    return axios.post("http://localhost:5000/login", dati)
}

export function getArticoli()
{
    return axios.get("http://localhost:5000/getArt")
}

export function getArtRecenti()
{
    return axios.get("http://localhost:5000/getArtRecenti")
}

export function getArtPrincipali()
{
    return axios.get("http://localhost:5000/getArtPrincipali")
}

export function getArticolo(articolo)
{
    return axios.get("http://localhost:5000/getArticolo", {params:{articolo: articolo}})
}

export async function getHashFromTest(message)
{
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return window.crypto.subtle.digest("SHA-256",data).then( data =>{
      const hashArray = Array.from(new Uint8Array(data)); // convert buffer to byte array
      const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
      return hashHex;
    })
}