<script setup lang="ts">
import { db } from './api/connect'
import { AuthStore } from './stores/auth'
import { onBeforeMount } from 'vue'

// Initialize the AuthStore from Pinia
const authStore = AuthStore()

// Execute an asynchronous function before the component is mounted
onBeforeMount(async () => {
  // Check if an authentication token exists in the AuthStore
  if (authStore.token) {
    console.log(authStore.token)
    // Authenticate the user with the token using the database connection
    const auth = await db.authenticate(authStore.token)
    console.log(auth)
  }
})
</script>

<template>
  <header>
    <nav class="flex justify-between bg-blue-500 p-4 shadow-lg text-white items-center">
      <h1 class="font-bold text-xl">OAuth2</h1>
      <ul class="flex space-x-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </ul>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
