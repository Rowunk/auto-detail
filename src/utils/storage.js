// src/utils/storage.js
/**
 * Safe localStorage utility functions with error handling
 */

/**
 * Safely get item from localStorage with proper error handling
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - Default value if item doesn't exist or error occurs
 * @returns {any} The parsed value or defaultValue
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    // Handle case where item exists but is not JSON (like a simple string)
    if (item === null) return defaultValue;
    try {
      return JSON.parse(item);
    } catch {
      // If it's not valid JSON but exists, return as is
      return item;
    }
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely set item in localStorage with proper error handling
 * @param {string} key - The localStorage key
 * @param {any} value - Value to store (will be JSON stringified)
 * @returns {boolean} Success status
 */
export function setStorageItem(key, value) {
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
 * @param {string} key - The localStorage key to remove
 * @returns {boolean} Success status
 */
export function removeStorageItem(key) {
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
 * @returns {boolean} Whether localStorage is available
 */
export function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}