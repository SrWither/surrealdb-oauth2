/**
 * Retrieves an item from local storage by the specified key.
 *
 * @param {string} key The key of the item to retrieve.
 * @returns {T | null} The retrieved item, or null if the item does not exist.
 */
export const getItemFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key) // Get the item from local storage
  return item ? JSON.parse(item) : null // Parse the item if it exists, otherwise return null
}
