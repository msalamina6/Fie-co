const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const axios = require('axios');
const pgp = require('pg-promise')({schema: "public"})
const db = pgp('postgresql://postgres.izbedfpdwagbszmfxbtt:JLkKS_Nq4HM$s_q@aws-0-eu-central-1.pooler.supabase.com:5432/postgres')

const app = express();
const port = 5000;


let books = [];

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/chatbot/message', async (req, res) => {
    console.log(req.body)

    var chatHistory = await db.manyOrNone("SELECT * FROM public.messaggi WHERE email_utente = $<email> ORDER BY timestamp",{
        email: "mock@mock.it"
    })

    db.none("INSERT INTO public.messaggi(tipo_mittente, email_utente, testo, timestamp)VALUES('US', $<email>, $<messaggio>, now());", {
        email: "mock@mock.it",
        messaggio: req.body.messaggio
    })

    oldChat = [];

    console.log(chatHistory)

    chatHistory.forEach(element => {
        oldChat.push({
            role: element.tipo_mittente == 'US' ? "user" : "model",
            parts:[{
                text: element.testo
            }]
        })
    });

    var body = {contents:[]};

    body.contents.push(...oldChat, {
        role:"user",
        parts:[{
            text: req.body.messaggio+" rispondi con un messaggio di massimo 280 caratteri e senza formattazione"
        }]
    })

    axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCUfqhUXwgUzkw_t67wF3D4gsRCBgYm-50", body).then(response => {
        db.none("INSERT INTO public.messaggi(tipo_mittente, email_utente, testo, timestamp)VALUES('AI', $<email>, $<messaggio>, now());", {
            email: "mock@mock.it",
            messaggio: response.data.candidates[0].content.parts[0].text
        })
        res.send({response: response.data.candidates[0].content.parts[0].text});
    })
});

app.get('/chatbot/getHistory', async (req, res) => {
    var chatHistory = await db.manyOrNone("SELECT * FROM public.messaggi WHERE email_utente = $<email> ORDER BY timestamp",{
        email: "mock@mock.it"
    })

    var result = [];

    chatHistory.forEach(element => {
        result.push({
            sender: element.tipo_mittente,
            message:element.testo
            })
        });
    
        res.send({response: result})
})

app.listen(port, () => console.log(`Fie-co app listening on port ${port}!`));