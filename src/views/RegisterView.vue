<script setup lang="ts">
import OBtn from '@/components/OBtn.vue'
import OInput from '@/components/OInput.vue'
import OSimpleCard from '@/components/OSimpleCard.vue'
import OInputLabel from '@/components/OInputLabel.vue'

import { ref } from 'vue'
import { register } from '@/api/auth'
import { oAuthRegister } from '@/api/oauth'
import { createProfile } from '@/api/profile'
import { useRouter } from 'vue-router'
import { AuthStore } from '@/stores/auth'

import { googleAuth } from '@/api/oauth2/google'
import { microsoftSignIn } from '@/api/oauth2/microsoft'
import { getCode, exchangeCodeForToken, getUserData } from '@/api/oauth2/discord'

// Reactive references for user input
const email = ref<string>('')
const password = ref<string>('')

// Initialize Pinia store and Vue Router
const authStore = AuthStore()
const router = useRouter()

// Handler for user registration
const handleRegister = async () => {
  const token = await register(email.value, password.value)
  if (token) {
    authStore.setToken(token)
    router.push('/')
  } else {
    email.value = ''
    password.value = ''
  }
}

// Handler for OAuth registration data
const handleOAuthData = async (userData: any, provider: string) => {
  console.log(userData.sub, userData.email, userData.name, userData.picture)
  console.log('Handle the userData', userData)
  const token = await oAuthRegister(userData.sub, userData.email, provider)
  if (token) {
    // Create user profile after OAuth registration
    const profile = await createProfile(token, userData.name, userData.picture)
    if (profile) {
      authStore.setToken(token)
      router.push('/')
    }
  }
}

// Handler for Google OAuth registration
const handleGoogle = () => {
  googleAuth(handleOAuthData, 'google')
}

// Handler for Microsoft OAuth registration
const handleMicrosoft = async () => {
  const data = await microsoftSignIn()
  await handleOAuthData(
    {
      sub: data.sub,
      email: data.preferred_username,
      name: data.name,
      picture: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${data.name}`
    },
    'microsoft'
  )
}

// Handler for Discord OAuth registration
const handleDiscord = async () => {
  const code = await getCode()
  console.log(code)
  const access_token = await exchangeCodeForToken(code)
  console.log(access_token)
  const userData = await getUserData(access_token)
  console.log(userData)

  const avatar = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
  await handleOAuthData(
    {
      sub: userData.id,
      email: userData.email,
      name: userData.global_name,
      picture: avatar
    },
    'discord'
  )
}
</script>

<template>
  <div class="overflow-hidden">
    <!-- Main container with background and theme toggle button -->
    <div
      class="flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors"
      style="height: calc(100vh - 60px)"
    >
      <!-- Login form -->
      <OSimpleCard class="lg:w-full lg:max-w-md w-96">
        <!--Title-->
        <div class="flex justify-center mb-4">
          <h1 class="text-gray-800 dark:text-white text-3xl font-bold">Register</h1>
        </div>

        <div class="flex justify-center my-4">
          <span class="text-gray-500 dark:text-gray-400"
            >Sign up with your social media account</span
          >
        </div>

        <div class="grid grid-cols-2 gap-3 mb-6">
          <button
            @click="handleGoogle"
            class="w-full bg-red-600 text-white hover:bg-red-700 rounded-full py-2 px-4 flex items-center justify-center"
          >
            <span class="mr-2">Google</span>
            <i class="pi pi-google"></i>
          </button>
          <button
            @click="handleMicrosoft"
            class="w-full bg-sky-600 text-white hover:bg-sky-700 rounded-full py-2 px-4 flex items-center justify-center"
          >
            <span class="mr-2">Microsoft</span>
            <i class="pi pi-microsoft"></i>
          </button>
          <button
            class="w-full bg-gray-800 text-white hover:bg-gray-900 rounded-full py-2 px-4 flex items-center justify-center"
          >
            <span class="mr-2">GitHub</span>
            <i class="pi pi-github"></i>
          </button>
          <button
            @click="handleDiscord"
            class="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-2 px-4 flex items-center justify-center"
          >
            <span class="mr-2">Discord</span>
            <i class="pi pi-discord"></i>
          </button>
        </div>

        <div class="flex justify-center my-4">
          <span class="text-gray-500 dark:text-gray-400">or with your email address</span>
        </div>

        <form @submit.prevent="handleRegister">
          <!-- Email input -->
          <div class="mb-4">
            <OInputLabel text="Email" />
            <OInput type="email" name="email" v-model="email" placeholder="Enter your email" />
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <OInputLabel text="Password" />
            <OInput
              type="password"
              name="password"
              v-model="password"
              placeholder="Enter your password"
            />
          </div>

          <!-- Sign up link -->
          <div class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            <p>
              You have an account?
              <RouterLink to="/login" class="text-main-500 dark:text-main-400">Sign In</RouterLink>
            </p>
          </div>

          <!-- Sign in button -->
          <div class="flex justify-center">
            <OBtn label="Sign up" class="w-full" />
          </div>
        </form>
      </OSimpleCard>
    </div>
  </div>
</template>
@/api/oauth2/google
