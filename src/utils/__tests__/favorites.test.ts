// src/utils/__tests__/favorites.test.ts

import {
  loadFavoritesData,
  saveFavoritesData,
  getFavorites,
  toggleFavorite,
  isFavorite,
  incrementUsage,
  getUsageStats,
  getMostUsedServices,
  getQuickPickServices,
  clearFavoritesData
} from '../favorites';

const STORAGE_KEY = 'detailingFavorites';

beforeEach(() => {
  localStorage.clear();
});

describe('favorites utility', () => {
  it('initial load returns default structure', () => {
    const data = loadFavoritesData();
    expect(data).toEqual({ favorites: [], usageStats: {} });
  });

  it('toggleFavorite adds and removes a key correctly', () => {
    expect(getFavorites()).toEqual([]);
    toggleFavorite('svc1');
    expect(getFavorites()).toEqual(['svc1']);
    expect(isFavorite('svc1')).toBe(true);

    toggleFavorite('svc1');
    expect(getFavorites()).toEqual([]);
    expect(isFavorite('svc1')).toBe(false);
  });

  it('incrementUsage and getUsageStats track counts', () => {
    expect(getUsageStats()).toEqual({});
    incrementUsage(['svcA', 'svcB', 'svcA']);
    const stats = getUsageStats();
    expect(stats['svcA']).toBe(2);
    expect(stats['svcB']).toBe(1);
  });

  it('getMostUsedServices returns keys sorted by usage desc', () => {
    incrementUsage(['a','b','a','c','a','b']);
    const mostUsed = getMostUsedServices();
    expect(mostUsed).toEqual(['a','b','c']);
    // limit parameter
    expect(getMostUsedServices(2)).toEqual(['a','b']);
  });

  it('getQuickPickServices combines favorites with most used', () => {
    // seed usage
    incrementUsage(['x','y','z','x','y']);
    // seed favorites
    toggleFavorite('fav1');
    toggleFavorite('fav2');
    const qp = getQuickPickServices();
    // favorites first
    expect(qp[0]).toBe('fav1');
    expect(qp[1]).toBe('fav2');
    // then most-used without duplicates
    expect(qp.slice(2)).toEqual(expect.arrayContaining(['x','y','z']));
  });

  it('clearFavoritesData resets to defaults', () => {
    toggleFavorite('foo');
    incrementUsage(['foo','bar']);
    expect(getFavorites().length).toBeGreaterThan(0);
    expect(Object.keys(getUsageStats()).length).toBeGreaterThan(0);

    clearFavoritesData();
    expect(getFavorites()).toEqual([]);
    expect(getUsageStats()).toEqual({});
  });

  it('saveFavoritesData persists structure to localStorage', () => {
    const data = { favorites: ['a'], usageStats: { a: 3 } };
    const ok = saveFavoritesData(data);
    expect(ok).toBe(true);

    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).toBe(JSON.stringify(data));
  });
});
