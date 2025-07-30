// src/utils/storage.ts
/**
 * Safe localStorage utility functions with error handling
 */

/**
 * Safely get item from localStorage with proper error handling
 * 
 * @template T The expected type of the stored value
 * @param {string} key - The localStorage key
 * @param {T} defaultValue - Default value if item doesn't exist or error occurs
 * @returns {T} The parsed value or defaultValue
 * 
 * @example
 * // Get an array of history entries with empty array as default
 * const history = getStorageItem<HistoryEntry[]>('detailingHistoryGranular', []);
 * 
 * // Get a string value with null as default
 * const theme = getStorageItem<string | null>('theme', null);
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    // Handle case where item exists but is not JSON (like a simple string)
    if (item === null) return defaultValue;
    try {
      return JSON.parse(item) as T;
    } catch {
      // If it's not valid JSON but exists, return as is
      return item as unknown as T;
    }
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely set item in localStorage with proper error handling
 * 
 * @param {string} key - The localStorage key
 * @param {unknown} value - Value to store (will be JSON stringified)
 * @returns {boolean} Success status
 * 
 * @example
 * // Save config object
 * const success = setStorageItem('detailingSettingsGranular', config);
 * if (success) {
 *   // Storage succeeded
 * }
 */
export function setStorageItem(key: string, value: unknown): boolean {
  try {
    // Handle non-string primitives that don't need JSON stringification
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
}

/**
 * Safely remove item from localStorage
 * 
 * @param {string} key - The localStorage key to remove
 * @returns {boolean} Success status
 * 
 * @example
 * // Clear history
 * const removed = removeStorageItem('detailingHistoryGranular');
 */
export function removeStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * 
 * @returns {boolean} Whether localStorage is available
 * 
 * @example
 * if (isStorageAvailable()) {
 *   // Safe to use localStorage
 * } else {
 *   // Show warning to user
 * }
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}