<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Contattaci</h1>
    <p class="mb-4">Hai domande o bisogno di supporto? Compila il modulo qui sotto o contattaci direttamente.</p>
    <form class="bg-white shadow-lg rounded-lg p-6">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          id="name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Inserisci il tuo nome"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Inserisci la tua email"
        />
      </div>
      <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700">Messaggio</label>
        <textarea
          id="message"
          rows="4"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Scrivi il tuo messaggio"
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Invia
      </button>
    </form>
  </div>
</template>

<script setup>
</script>