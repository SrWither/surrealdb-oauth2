import { db } from './connect'

/**
 * Registers a user with the provided email, sub (subject), and provider information for OAuth2 authentication in the SurrealDB database.
 *
 * @param {string} sub The subject identifier for the user provided by the OAuth2 provider.
 * @param {string} email The email of the user to register.
 * @param {string} provider The OAuth2 provider used for authentication.
 * @returns {Promise<string | null>} A promise that resolves with a token upon successful registration, or null if an error occurs.
 */
export const oAuthRegister = async (
  sub: string,
  email: string,
  provider: string
): Promise<string | null> => {
  try {
    // Sign up the user in SurrealDB with provided OAuth2 credentials
    const token = await db.signup({
      namespace: 'oauth2', // Namespace for the authentication process
      database: 'oauth2', // Database name
      scope: 'OAuth2', // Scope for OAuth2 authentication
      email: email, // User's email
      sub: sub, // Subject identifier provided by the OAuth2 provider
      provider: provider // OAuth2 provider used for authentication
    })

    return token // Return the token upon successful registration
  } catch (e) {
    console.error(e)
    return null // Return null if registration fails
  }
}

/**
 * Logs in a user with the provided email and sub (subject) for OAuth2 authentication in the SurrealDB database.
 *
 * @param {string} email The email of the user to log in.
 * @param {string} sub The subject identifier for the user provided by the OAuth2 provider.
 * @returns {Promise<string | null>} A promise that resolves with a token upon successful login, or null if an error occurs.
 */
export const oAuthLogin = async (email: string, sub: string): Promise<string | null> => {
  try {
    // Sign in the user in SurrealDB with provided OAuth2 credentials
    const token = await db.signin({
      namespace: 'oauth2', // Namespace for the authentication process
      database: 'oauth2', // Database name
      scope: 'OAuth2', // Scope for OAuth2 authentication
      email: email, // User's email
      sub: sub // Subject identifier provided by the OAuth2 provider
    })

    return token // Return the token upon successful login
  } catch (e) {
    console.error(e)
    return null // Return null if login fails
  }
}
