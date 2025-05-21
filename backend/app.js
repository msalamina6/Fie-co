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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Errore server')
})

app.post('/registrazione', async (req, res) => {

    console.log(req);

    let checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE email = $<email> AND tipo_utente != 'DU'",{
        email: req.body.email
    })

    if(checkUtenti.length != 0)
    {
        return res.status(403).send("Email già presente a sistema");
    }

    checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE username = $<username> AND tipo_utente != 'DU'",{
        username: req.body.username
    })

    if(checkUtenti.length != 0)
    {
        return res.status(403).send("Username già presente a sistema");
    }

    const utente = {
        nome:req.body.nome,
        cognome: req.body.cognome,
        username: req.body.username,
        dataNascita: req.body.dataNascita,
        email: req.body.email,
        password: req.body.password,
        tipo_utente: "US"
    }

    await db.none("INSERT INTO public.utenti(email, nome, cognome, data_nascita, username, password, tipo_utente)VALUES($<email>, $<nome>, $<cognome>, $<dataNascita>, $<username>, $<password>, $<tipo_utente>);", utente)

    req.session.utente = utente;

    console.log(req.session.utente)
    res.status(200).send({username: utente.username, role: utente.tipo_utente})
})

app.post('/modifica', async (req, res) => {

    console.log(req);

    let checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE username = $<username> AND email != $<email> AND tipo_utente != 'DU'",{
        username: req.body.username,
        email: req.body.email
    })

    if(checkUtenti.length != 0)
    {
        return res.status(403).send("Username già presente a sistema");
    }

    const utente = {
        nome:req.body.nome,
        cognome: req.body.cognome,
        username: req.body.username,
        dataNascita: req.body.dataNascita,
        email: req.body.email,
    }

    await db.none("UPDATE public.utenti SET nome = $<nome>, cognome = $<cognome>, data_nascita = $<dataNascita>, username = $<username> WHERE email = $<email>", utente)
    
    if(req.body.password != null)
    {
        await db.none("UPDATE public.utenti SET password = $<password >WHERE email = $<email>", {email: req.body.email, password:req.body.password})
    }

    req.session.utente = utente;

    console.log(req.session.utente)
    res.status(200).send({username: utente.username, role: utente.tipo_utente})
})

app.post('/eliminaUtente', async (req, res) => {

    console.log(req);

    let checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE username = $<username> AND tipo_utente != 'DU'",{
        username: req.body.username,
    })

    if(checkUtenti.length == 0)
    {
        return res.status(403).send("Username non presente a sistema");
    }

    //DU = deleted user, eliminazione logica dell'utente
    await db.none("UPDATE public.utenti SET tipo_utente='DU' WHERE email = $<email>", {email:checkUtenti[0].email}).then(() => {
        req.session.utente = undefined;
        res.status(200).send("utente cancellato");
    }).catch(() => {
        res.status(500).send("Errore eliminazione")
    })
})

app.post('/eliminaArticolo', async (req, res) => {

    console.log(req);

    let checkArticolo = await db.manyOrNone("SELECT * FROM public.articolo WHERE articolo = $<articolo>",{
        articolo: req.body.articolo,
    })

    if(checkArticolo.length == 0)
    {
        return res.status(403).send("Articolo non presente a sistema");
    }

    await db.none("DELETE FROM public.articolo WHERE articolo = $<articolo>", {articolo:checkArticolo[0].articolo}).then(() => {
        res.status(200).send("Articolo cancellato");
    }).catch(() => {
        res.status(500).send("Errore eliminazione")
    })
})

app.get('/getDatiUtente', async (req, res) => {

    let checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE username = $<username> AND tipo_utente != 'DU'",{
        username: req.query.username
    })

    if(checkUtenti.length == 0)
    {
        return res.status(403).send("Utente inesistente");
    }
    else
    {
        req.session.utente = checkUtenti[0];
        return res.status(200).send(checkUtenti[0]);
    }
})

app.get('/checkSession', async (req, res) => {
    console.log(req.session.utente)

    if(req.session.utente != undefined)
    {
        return res.send({username: req.session.utente.username, role: req.session.utente.tipo_utente})
    }
    else
    {
        return res.send("")
    }
})

app.get('/getArt', async (req, res) => {
        console.log(req.session.utente)
    
        const articoli = await db.manyOrNone("SELECT titolo, articolo FROM public.articolo");

        res.send(articoli)
    })

app.get('/getArticolo', async (req, res) => {
        console.log(req.query.articolo)
    
        const articolo = await db.manyOrNone("SELECT * FROM public.articolo where articolo = $<articolo>", {
            articolo: req.query.articolo
        });

        res.send(articolo)
    })

app.get('/getArtRecenti', async (req, res) => {
        console.log(req.session.utente)
    
        const articoli = await db.manyOrNone("SELECT titolo, articolo FROM public.articolo order by timestamp desc");

        res.send(articoli)
    })

app.get('/getArtPrincipali', async (req, res) => {
        console.log(req.session.utente)
    
        const articoli = await db.manyOrNone("SELECT titolo, articolo FROM public.articolo where evidenza = true");

        res.send(articoli)
    })

app.post('/login', async (req, res) => {

    let checkUtenti = await db.manyOrNone("SELECT * FROM public.utenti WHERE email = $<email>",{
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
            return res.status(200).send({username: checkUtenti[0].username, role: checkUtenti[0].tipo_utente});
        }
    }
})

//Implementazione API chatbot non più utilizzato ma ancora presenta e funzionante (nascosto)
app.post('/chatbot/message', async (req, res) => {


    let chatHistory = await db.manyOrNone("SELECT * FROM public.messaggi WHERE email_utente = $<email> ORDER BY timestamp",{
        email: "mock@mock.it"
    })

    db.none("INSERT INTO public.messaggi(tipo_mittente, email_utente, testo, timestamp)VALUES('US', $<email>, $<messaggio>, now());", {
        email: "mock@mock.it",
        messaggio: req.body.messaggio
    })

    let oldChat = [];

    chatHistory.forEach(element => {
        oldChat.push({
            role: element.tipo_mittente == 'US' ? "user" : "model",
            parts:[{
                text: element.testo
            }]
        })
    });

    const body = {contents:[]};

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