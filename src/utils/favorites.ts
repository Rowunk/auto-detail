// src/utils/favorites.ts

import { getStorageItem, setStorageItem } from './storage';
import type { FavoritesData, ServiceUsageStats } from '../types';

const FAVORITES_STORAGE_KEY = 'detailingFavorites';

/**
 * Default favorites data structure.
 * Note: we keep this immutable—every load returns a fresh copy.
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
 * Load favorites data from localStorage with validation.
 * If missing or invalid, returns a fresh copy of defaultFavoritesData.
 */
export function loadFavoritesData(): FavoritesData {
  const raw = getStorageItem<FavoritesData | null>(FAVORITES_STORAGE_KEY, null);
  if (raw && isFavoritesData(raw)) {
    // return a shallow clone so mutations don't affect stored object
    return {
      favorites: [...raw.favorites],
      usageStats: { ...raw.usageStats }
    };
  }
  // fresh default
  return { favorites: [], usageStats: {} };
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
  const idx = data.favorites.indexOf(serviceKey);
  if (idx >= 0) {
    data.favorites.splice(idx, 1);
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
 * Get most used services sorted by usage count (desc).
 * Optional limit to top N.
 */
export function getMostUsedServices(limit?: number): string[] {
  const stats = getUsageStats();
  const sorted = Object.entries(stats)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key);
  return limit != null ? sorted.slice(0, limit) : sorted;
}

/**
 * Get services that are either favorited OR heavily used.
 * Favorites first, then most-used that aren't already favorited.
 */
export function getQuickPickServices(): string[] {
  const favorites = getFavorites();
  const mostUsed = getMostUsedServices(10);
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
  return saveFavoritesData({ favorites: [], usageStats: {} });
}
