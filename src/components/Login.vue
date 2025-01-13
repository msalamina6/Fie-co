<template>
<div id="login-section">
      <h2 class="text-2xl font-bold text-green-700 mb-4 text-center">Accedi</h2>
      <form class="space-y-4" method="POST" href="localhost:5000/login">
        <div>
          <label for="email" class="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Inserisci la tua email"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Inserisci la tua password"
          />
        </div>
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Accedi
        </button>
      </form>
      </div>
</template>