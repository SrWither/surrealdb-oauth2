<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { type User, getMyUser } from '@/api/user'
import { type Profile, getMyProfile } from '@/api/profile'
import { AuthStore } from '@/stores/auth'
import { microsoftSignOut } from '@/api/oauth2/microsoft'

// Define reactive references for user and profile data
const user = ref<User | null>(null)
const profile = ref<Profile | null>(null)

// Initialize the AuthStore from Pinia
const authStore = AuthStore()

// Execute an asynchronous function before the component is mounted
onBeforeMount(async () => {
  // Check if an authentication token exists in the AuthStore
  if (authStore.token) {
    // Fetch user data using the authentication token
    const userData = await getMyUser(authStore.token)
    // Fetch profile data using the authentication token
    const profileData = await getMyProfile(authStore.token)

    // Update the user and profile reactive references with the fetched data
    user.value = userData
    profile.value = profileData
  }
})

const handleMsLogout = async () => {
  await microsoftSignOut()
  handleLogout()
}

// Function to handle the logout process
const handleLogout = () => {
  // Clear the authentication token from the AuthStore
  authStore.clearToken()
  // Reload the page to reset the application state
  location.reload()
}
</script>

<template>
  <div>Home page!</div>
  {{ authStore.token }}
  <div v-if="user">
    <h1>{{ user.email }}</h1>
    <h1>{{ user.password }}</h1>
    <button @click="handleLogout">Logout</button>
    <button @click="handleMsLogout" v-if="user.provider && user.provider === 'microsoft'">
      MS Logout
    </button>
  </div>
  <div v-if="profile">
    <h1>{{ profile.username }}</h1>
    <img :src="profile.avatar" alt="" />
  </div>
</template>
