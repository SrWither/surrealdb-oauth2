import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initDB } from './api/connect'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(createPinia())
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_CLIENTID
})
app.use(router)
;(async () => {
  await initDB()
})()

app.mount('#app')
