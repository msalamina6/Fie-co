<template>
<div class="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/30 backdrop-blur-lg ring-1 ring-green-400/30 transition-all duration-500">
<h2 class="text-3xl font-bold text-green-900 mb-8 text-center tracking-wide">Registrati su Fie-co</h2>
 
    <!-- Nome e Cognome -->
<div class="grid grid-cols-2 gap-4 mb-4">
<div>
<label for="name" class="block text-sm text-green-900 font-medium mb-1">Nome</label>
<input v-model="nome" type="text" id="name"

          class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

          placeholder="Mario">
</div>
<div>
<label for="cognome" class="block text-sm text-green-900 font-medium mb-1">Cognome</label>
<input v-model="cognome" type="text" id="cognome"

          class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

          placeholder="Rossi">
</div>
</div>
 
    <!-- Username e Data di nascita -->
<div class="grid grid-cols-2 gap-4 mb-4">
<div>
<label for="username" class="block text-sm text-green-900 font-medium mb-1">Username</label>
<input v-model="username" type="text" id="username"

          class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

          placeholder="es. gianni97">
</div>
<div>
<label for="data" class="block text-sm text-green-900 font-medium mb-1">Data di nascita</label>
<input v-model="dataNascita" type="date" id="data"

          class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition">
</div>
</div>
 
    <!-- Email -->
<div class="mb-4">
<label for="emailReg" class="block text-sm text-green-900 font-medium mb-1">Email</label>
<input v-model="email" type="email" id="emailReg"

        class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

        placeholder="esempio@email.com">
</div>
 
    <!-- Password e Conferma -->
<div class="grid grid-cols-2 gap-4 mb-6">
<div>
<label for="passwordReg" class="block text-sm text-green-900 font-medium mb-1">Password</label>
<input v-model="password" type="password" id="passwordReg"

          class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

          placeholder="Min. 8 caratteri">
</div>
<div>
<label for="confirm" class="block text-sm text-green-900 font-medium mb-1">Conferma password</label>
<input v-model="confPassword" type="password" id="confirm"

          class="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

          placeholder="Ripeti password">
</div>
</div>
 
    <!-- Bottone -->
<button @click="registrazioneComp"

      class="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold py-2 rounded-xl shadow-lg transition duration-300">

      Registrati
</button>
</div>
</template>

 
 