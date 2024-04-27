import { db } from './connect'

/**
 * Registers a user with the provided email and password in the SurrealDB database.
 *
 * @param {string} email The email of the user to register.
 * @param {string} password The password of the user to register.
 * @returns {Promise<string | null>} A promise that resolves with a token upon successful registration, or null if an error occurs.
 */
export const register = async (email: string, password: string): Promise<string | null> => {
  try {
    // Sign up the user in SurrealDB with provided credentials
    const token = await db.signup({
      namespace: 'oauth2', // Namespace for the authentication process
      database: 'oauth2', // Database name
      scope: 'Auth', // Scope for authentication
      email: email, // User's email
      password: password // User's password
    })

    return token // Return the token upon successful registration
  } catch (e) {
    console.error(e)
    return null // Return null if registration fails
  }
}

/**
 * Logs in a user with the provided email and password in the SurrealDB database.
 *
 * @param {string} email The email of the user to log in.
 * @param {string} password The password of the user to log in.
 * @returns {Promise<string | null>} A promise that resolves with a token upon successful login, or null if an error occurs.
 */
export const login = async (email: string, password: string): Promise<string | null> => {
  try {
    // Sign in the user in SurrealDB with provided credentials
    const token = await db.signin({
      namespace: 'oauth2', // Namespace for the authentication process
      database: 'oauth2', // Database name
      scope: 'Auth', // Scope for authentication
      email: email, // User's email
      password: password // User's password
    })

    return token // Return the token upon successful login
  } catch (e) {
    console.error(e)
    return null // Return null if login fails
  }
}
