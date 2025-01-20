<template>
  <div class="wiki-page">
    <!-- Hero Section -->
    <section class="hero">
      <h2 class="hero-title">Wiki di Fie-co</h2>
      <p class="hero-subtitle">Condividi conoscenze, scopri soluzioni: la guida completa per gli agricoltori</p>
      <div class="search-bar">
        <input
          type="text"
          placeholder="Cerca articoli..."
          v-model="searchQuery"
        />
        <button @click="searchArticles">Cerca</button>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="featured-articles">
      <h3 class="featured-title">Articoli in Evidenza</h3>
      <div v-if="filteredArticles.length" class="articles">
        <div
          class="article-card"
          v-for="article in filteredArticles"
          :key="article.id"
        >
          <div class="image-container">
            <img :src="article.image" :alt="article.title" />
          </div>
          <h4>{{ article.title }}</h4>
          <p>{{ article.description }}</p>
          <button @click="viewArticle(article.id)">Leggi di più</button>
        </div>
      </div>
      <p v-else class="no-articles">Nessun articolo trovato. Prova a cercare di nuovo.</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      articles: [
        {
          id: 1,
          title: 'Tecniche Essenziali per Aumentare la Produzione Agricola',
          description: 'Ottimizza i raccolti con tecnologie moderne.',
          image: new URL('@/assets/articolo1.jpg', import.meta.url).href,
        },
        {
          id: 2,
          title: 'Analizzare e Migliorare la Fertilità',
          description: 'Comprendi e migliora il terreno.',
          image: new URL('@/assets/articolo2.jpg', import.meta.url).href,
        },
        {
          id: 3,
          title: 'Sensori IoT per l’Agricoltura',
          description: 'Impara come i sensori intelligenti possono ottimizzare le tue coltivazioni.',
          image: new URL('@/assets/articolo3.jpg', import.meta.url).href,
        },
      ],
    };
  },
  computed: {
    filteredArticles() {
      return this.articles.filter((article) =>
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    searchArticles() {
      console.log('Ricerca articoli:', this.searchQuery);
    },
    viewArticle(id) {
      this.$router.push(`/article/${id}`);
    },
  },
};
</script>

<style scoped>
.wiki-page {
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
}
.hero {
  text-align: center;
  background-color: #388e3c;
  color: white;
  padding: 40px 20px;
}
.hero-title {
  font-size: 36px;
  margin-bottom: 10px;
}
.hero-subtitle {
  font-size: 18px;
  margin-bottom: 20px;
}
.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.search-bar input {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
}
.search-bar button {
  padding: 10px;
  font-size: 16px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
}
.featured-articles {
  margin-top: 20px;
}
.featured-title {
  font-size: 32px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
.articles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.article-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-bottom: 15px;
}
.article-card img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}
.article-card h4 {
  font-size: 20px;
  font-weight: bold;
  color: #2e7d32;
  margin-bottom: 10px;
}
.article-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}
.article-card button {
  padding: 10px 20px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.article-card button:hover {
  background-color: #43a047;
}
.no-articles {
  color: #888;
  text-align: center;
  margin-top: 20px;
}
</style>
