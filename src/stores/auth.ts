import { defineStore } from 'pinia'
import { getItemFromLocalStorage } from '@/utils/localStorage'

/**
 * Interface representing the authentication state.
 */
type Auth = {
  token: string | null // Authentication token
}

/**
 * Pinia store for managing authentication state.
 */
export const AuthStore = defineStore('auth', {
  state: (): Auth => ({
    token: getItemFromLocalStorage<string>('auth') // Initialize token from local storage
  }),
  actions: {
    /**
     * Sets the authentication token.
     *
     * @param {string} token The authentication token to set.
     * @returns {void}
     */
    setToken(token: string): void {
      this.token = token // Set the token in the state
      localStorage.setItem('auth', JSON.stringify(token)) // Save the token to local storage
    },
    /**
     * Clears the authentication token.
     *
     * @returns {void}
     */
    clearToken(): void {
      this.token = null // Clear the token in the state
      localStorage.removeItem('auth') // Remove the token from local storage
    }
  }
})
