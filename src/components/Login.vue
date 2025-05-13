<template>
  <div class="absolute top-28 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
    <h2 class="text-3xl font-bold text-green-800 mb-6 text-center tracking-wide drop-shadow-sm">
      Accedi a <span class="text-lime-500">Fie-co</span>
    </h2>

    <!-- Campo email -->
    <div class="mb-5">
      <label for="email" class="block text-sm font-semibold text-gray-800 mb-2">Email</label>
      <input
        v-model="email"
        type="email"
        id="email"
        class="w-full px-4 py-2.5 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
        placeholder="tuo@email.com"
      >
    </div>

    <!-- Campo password -->
    <div class="mb-8">
      <label for="password" class="block text-sm font-semibold text-gray-800 mb-2">Password</label>
      <input
        v-model="password"
        type="password"
        id="password"
        class="w-full px-4 py-2.5 rounded-xl bg-white/60 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition"
        placeholder="••••••••"
      >
    </div>

    <!-- Bottone login -->
    <button
      @click="loginComp()"
      class="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-300"
    >
      Accedi
    </button>
  </div>
</template>
