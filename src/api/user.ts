import { db } from './connect'

/**
 * Interface representing a user.
 */
export type User = {
  id: string // ID of the user
  email: string // Email of the user
  sub?: string // Subject identifier for OAuth2 authentication
  provider?: string // OAuth2 provider used for authentication
  role: string // Role of the user
  password?: string // Password of the user (if applicable)
}

/**
 * Retrieves information about the authenticated user.
 *
 * @param {string} token The authentication token of the user.
 * @returns {Promise<User | null>} A promise that resolves with the user's information upon success, or null if an error occurs.
 */
export const getMyUser = async (token: string): Promise<User | null> => {
  try {
    // Authenticate the user with the provided token
    const isAuthenticated = await db.authenticate(token)
    if (!isAuthenticated) {
      return null // Return null if user is not authenticated
    }

    // Retrieve information about the authenticated user
    const user = await db.info<User>()
    if (!user) {
      return null // Return null if user information cannot be retrieved
    }

    return user // Return the user's information
  } catch {
    return null // Return null if an error occurs
  }
}
