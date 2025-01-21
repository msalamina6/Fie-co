<template>
  <div class="wiki-page">
    <h2 class="page-title">Wiki di Fie-co</h2>
    <p class="page-subtitle">Un elenco di articoli utili per gli agricoltori</p>

    <!-- Stato di caricamento o errore -->
    <div v-if="loading" class="loading-message">Caricamento degli articoli...</div>
    <div v-else-if="error" class="error-message">Errore: {{ error }}</div>

    <!-- Tabella degli articoli -->
    <table v-else class="articles-table">
      <thead>
        <tr>
          <th>Titolo</th>
          <th>Terreno</th>
          <th>Nutrienti</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <!-- Ciclo sugli articoli -->
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.titolo }}</td>
          <td>{{ article.terreno }}</td>
          <td>{{ article.nutrienti }}</td>
          <td>
            <button @click="viewArticle(article.id)">Visualizza</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [], // Array degli articoli
      loading: true, // Stato di caricamento
      error: null, // Stato di errore
    };
  },
  methods: {
    // Metodo per chiamare il backend e ottenere gli articoli
    async fetchArticles() {
      try {
        const response = await fetch('http://localhost:5000/api/articles'); // Chiamata all'API del backend
        const data = await response.json();
        this.articles = data.articles; // Popola l'array degli articoli
      } catch (err) {
        this.error = 'Errore durante il caricamento degli articoli';
        console.error(err);
      } finally {
        this.loading = false; // Rimuove lo stato di caricamento
      }
    },
    // Metodo per visualizzare i dettagli di un articolo
    viewArticle(id) {
      console.log('Visualizza articolo con ID:', id);
      // Implementa la navigazione o il modale per i dettagli
    },
  },
  mounted() {
    this.fetchArticles(); // Carica gli articoli al montaggio del componente
  },
};
</script>

<style scoped>
.wiki-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 16px;
  margin-bottom: 20px;
}

.loading-message,
.error-message {
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
}

.articles-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.articles-table th,
.articles-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.articles-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.articles-table tr:hover {
  background-color: #f9f9f9;
}

button {
  padding: 5px 10px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #43a047;
}
</style>
