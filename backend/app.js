const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const axios = require('axios');
const pgp = require('pg-promise')({schema: "public"})
const db = pgp('postgresql://postgres.izbedfpdwagbszmfxbtt:JLkKS_Nq4HM$s_q@aws-0-eu-central-1.pooler.supabase.com:5432/postgres')
var session = require('express-session')

const app = express();
const port = 5000;


let books = [];

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'hbfdhijsokwkdmnbeujevjbsismdowkdwok', cookie: { maxAge: 60000 }}))

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

app.post('/login', async (req, res) => {
    var user = await db.oneOrNone("SELECT * FROM utenti WHERE email = $<email>",{
        email: req.body.email
    })

    //console.log(...user);
    console.log(req.body)

    if(user != null && user.password == req.body.password)
    {
        req.session.user=user
        user.password=null;
        res.send(user);
    }
    else
    {
        res.status(403).send({error:"email o password errati"})
    }
});

app.post('/signup', async (req, res) => {
    var user = await db.oneOrNone("SELECT * FROM utenti WHERE email = $<email>",{
        email: req.body.email
    })

    console.log(req.body)

    if(user != null)
    {
        res.status(403).send({error:"Email già utilizzata"})
    }
    else
    {
        await db.none("INSERT INTO public.utenti(email, nome, cognome, data_nascita, username, password, tipo_utente)"+
                "VALUES($<email>, $<nome>, $<cognome>, $<dataNascita>, $<username>, $<password>, $<ruolo>);", req.body)
        req.body.password = null;
        res.send(req.body);
    }
});

app.listen(port, () => console.log(`Fie-co app listening on port ${port}!`));