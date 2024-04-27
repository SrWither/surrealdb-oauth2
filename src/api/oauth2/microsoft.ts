import { PublicClientApplication } from '@azure/msal-browser'

// Initialize MSAL instance with configuration options
const mslaInstance = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_MSID,
    authority: import.meta.env.VITE_MSAUD,
    redirectUri: import.meta.env.VITE_REDIRECTURI
  },
  cache: {
    cacheLocation: 'localStorage'
  }
})

/**
 * Retrieves all Microsoft accounts currently signed in and logs them to the console.
 *
 * @returns {void}
 */
export const getMsAccounts = (): void => {
  // Retrieve all accounts from MSAL instance
  const accounts = mslaInstance.getAllAccounts()
  console.log(accounts)
}

/**
 * Initiates a Microsoft sign-in process using a pop-up window and returns the ID token claims of the signed-in user.
 *
 * @returns {Promise<any>} A promise that resolves with the ID token claims of the signed-in user.
 * @throws {Error} If an error occurs during the authentication process.
 */
export const microsoftSignIn = async (): Promise<any> => {
  try {
    // Initiate sign-in process using pop-up window
    await mslaInstance.loginPopup()
    // Retrieve all accounts from MSAL instance
    const myAccounts = mslaInstance.getAllAccounts()
    // Return the ID token claims of the signed-in user
    return myAccounts[0].idTokenClaims
  } catch (error) {
    console.error(`error during authentication: ${error}`)
    throw error
  }
}

/**
 * Initiates a Microsoft sign-out process using a pop-up window.
 *
 * @returns {void}
 * @throws {Error} If an error occurs during the sign-out process.
 */
export const microsoftSignOut = async (): Promise<void> => {
  try {
    // Initiate sign-out process using pop-up window
    await mslaInstance.logoutPopup()
  } catch (error) {
    console.error(`error during authentication: ${error}`)
    throw error
  }
}
