const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const axios = require('axios');
const pgp = require('pg-promise')({schema: "public"})
const db = pgp('postgresql://postgres.izbedfpdwagbszmfxbtt:JLkKS_Nq4HM$s_q@aws-0-eu-central-1.pooler.supabase.com:5432/postgres')
const cookieParser = require('cookie-parser');
const session = require('express-session');

//postgresql://postgres.izbedfpdwagbszmfxbtt:JLkKS_Nq4HM$s_q@aws-0-eu-central-1.pooler.supabase.com:5432/postgres

const app = express();
const port = 5000;

app.use(cookieParser());

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://localhost:5173'
      ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}
));

app.use(session({
    secret: 'AB8NEvSS9qOgkTDgxcnPMNzEB5ujjV3J',
    cookie: {
      maxAge: 6000000,
      secure: false
    },
    saveUninitialized: true,
    resave: false,
    unset: 'destroy'
  }));
  


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/registrazione', async (req, res) => {

    var checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE email = $<email>",{
        email: req.body.email
    })

    if(checkUtenti.length != 0)
    {
        return res.status(403).send("Email già presente a sistema");
    }

    checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE username = $<username>",{
        username: req.body.username
    })

    if(checkUtenti.length != 0)
    {
        return res.status(403).send("Username già presente a sistema");
    }

    var utente = {
        nome:req.body.nome,
        cognome: req.body.cognome,
        username: req.body.username,
        dataNascita: req.body.dataNascita,
        email: req.body.email,
        password: req.body.password,
        tipoUtente: "US"
    }

    db.none("INSERT INTO public.utenti(email, nome, cognome, data_nascita, username, password, tipo_utente)VALUES($<email>, $<nome>, $<cognome>, $<dataNascita>, $<username>, $<password>, $<tipoUtente>);", utente)

    req.session.utente = utente;

    console.log(req.session.utente)
    res.status(200).send(utente.username)
})

app.get('/checkSession', async (req, res) => {
console.log(req.session.utente)

    if(req.session.utente != undefined)
    {
        return res.send(req.session.utente.username)
    }
    else
    {
        return res.send("")
    }
})

app.post('/login', async (req, res) => {

    var checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE email = $<email>",{
        email: req.body.email
    })

    if(checkUtenti.length == 0)
    {
        return res.status(403).send("Utente inesistente");
    }
    else
    {
        if(checkUtenti[0].password != req.body.password)
        {
            return res.status(403).send("Password errata");
        }
        else
        {
            req.session.utente = checkUtenti[0];
            return res.status(200).send(checkUtenti[0].username);
        }
    }
})

app.post('/chatbot/message', async (req, res) => {


    var chatHistory = await db.manyOrNone("SELECT * FROM public.messaggi WHERE email_utente = $<email> ORDER BY timestamp",{
        email: "mock@mock.it"
    })

    db.none("INSERT INTO public.messaggi(tipo_mittente, email_utente, testo, timestamp)VALUES('US', $<email>, $<messaggio>, now());", {
        email: "mock@mock.it",
        messaggio: req.body.messaggio
    })

    oldChat = [];

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
        /*
        req.session.user = "NUOVO UTENTE";
        */
        res.send({response: response.data.candidates[0].content.parts[0].text});
    })
});

app.listen(port, () => console.log(`Fie-co app listening on port ${port}!`));