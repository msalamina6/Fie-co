const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')({ schema: "public" });
const db = pgp('postgresql://postgres:...'); // Connessione al database

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint: Restituisce gli articoli
app.get('/api/articles', async (req, res) => {
    try {
        const articles = await db.manyOrNone(
            "SELECT articolo AS id, titolo, terreno, nutrienti FROM public.articolo"
        );
        res.send({ articles });
    } catch (error) {
        console.error('Errore nel recupero degli articoli:', error);
        res.status(500).send({ error: 'Errore nel recupero degli articoli' });
    }
});

// Altri endpoint definiti qui...

// Avvia il server
app.listen(port, () => console.log(`Fie-co app listening on port ${port}!`));
