// src/utils/favorites.ts
import { getStorageItem, setStorageItem } from './storage';
import type { FavoritesData, ServiceUsageStats } from '../types';

const FAVORITES_STORAGE_KEY = 'detailingFavorites';

/**
 * Default favorites data structure
 */
const defaultFavoritesData: FavoritesData = {
  favorites: [],
  usageStats: {}
};

/**
 * Type guard for FavoritesData
 */
function isFavoritesData(x: any): x is FavoritesData {
  return (
    x &&
    typeof x === 'object' &&
    Array.isArray(x.favorites) &&
    x.favorites.every((f: any) => typeof f === 'string') &&
    typeof x.usageStats === 'object' &&
    Object.values(x.usageStats).every((v: any) => typeof v === 'number')
  );
}

/**
 * Load favorites data from localStorage with validation
 */
export function loadFavoritesData(): FavoritesData {
  const data = getStorageItem<FavoritesData>(FAVORITES_STORAGE_KEY, defaultFavoritesData);
  return isFavoritesData(data) ? data : defaultFavoritesData;
}

/**
 * Save favorites data to localStorage
 */
export function saveFavoritesData(data: FavoritesData): boolean {
  return setStorageItem(FAVORITES_STORAGE_KEY, data);
}

/**
 * Get current favorites list
 */
export function getFavorites(): string[] {
  return loadFavoritesData().favorites;
}

/**
 * Get current usage statistics
 */
export function getUsageStats(): ServiceUsageStats {
  return loadFavoritesData().usageStats;
}

/**
 * Toggle favorite status of a service
 */
export function toggleFavorite(serviceKey: string): boolean {
  const data = loadFavoritesData();
  const isFavorited = data.favorites.includes(serviceKey);
  
  if (isFavorited) {
    data.favorites = data.favorites.filter(key => key !== serviceKey);
  } else {
    data.favorites.push(serviceKey);
  }
  
  return saveFavoritesData(data);
}

/**
 * Check if a service is favorited
 */
export function isFavorite(serviceKey: string): boolean {
  return getFavorites().includes(serviceKey);
}

/**
 * Increment usage count for services
 */
export function incrementUsage(serviceKeys: string[]): boolean {
  const data = loadFavoritesData();
  
  serviceKeys.forEach(key => {
    data.usageStats[key] = (data.usageStats[key] || 0) + 1;
  });
  
  return saveFavoritesData(data);
}

/**
 * Get most used services sorted by usage count
 */
export function getMostUsedServices(limit?: number): string[] {
  const stats = getUsageStats();
  const sorted = Object.entries(stats)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key);
  
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get services that are either favorited OR heavily used
 * This provides a smart "quick-pick" list combining explicit favorites
 * with frequently used services
 */
export function getQuickPickServices(): string[] {
  const favorites = getFavorites();
  const mostUsed = getMostUsedServices(10); // Top 10 most used
  
  // Combine favorites with most used, removing duplicates
  // Favorites appear first, then most used that aren't already favorited
  const quickPick = [...favorites];
  
  mostUsed.forEach(key => {
    if (!quickPick.includes(key)) {
      quickPick.push(key);
    }
  });
  
  return quickPick;
}

/**
 * Clear all favorites and usage data
 */
export function clearFavoritesData(): boolean {
  return saveFavoritesData(defaultFavoritesData);
}