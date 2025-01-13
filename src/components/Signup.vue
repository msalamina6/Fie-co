<template>
<div id="register-section">
  <h2 class="text-2xl font-bold text-green-700 mb-4 text-center">Registrati</h2>
  <form class="space-y-4">
    <div>
      <label for="reg-email" class="block text-gray-700 font-semibold">Email</label>
      <input
        type="email"
        id="reg-email"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Inserisci la tua email"
      />
    </div>
    <div>
      <label for="reg-password" class="block text-gray-700 font-semibold">Password</label>
      <input
        type="password"
        id="reg-password"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Crea una password"
      />
    </div>
    <div>
      <label for="phone" class="block text-gray-700 font-semibold">Numero di Telefono</label>
      <input
        type="tel"
        id="phone"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Inserisci il tuo numero di telefono"
      />
    </div>
    <div>
      <label for="address" class="block text-gray-700 font-semibold">Indirizzo</label>
      <input
        type="text"
        id="address"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Inserisci il tuo indirizzo"
      />
    </div>
    <div>
      <label for="user-type" class="block text-gray-700 font-semibold">Che tipo di utente sei?</label>
      <select
        id="user-type"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="beginner">Agricoltore</option>
        <option value="expert">Agronomo</option>
        <option value="other">Altro</option>
      </select>
    </div>
    <button
      type="submit"
      class="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
    >
      Completa Registrazione
    </button>
  </form>
</div>
</template>