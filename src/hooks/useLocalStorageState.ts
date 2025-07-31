// src/hooks/useLocalStorageState.ts
import { useState, useEffect } from 'react';

/**
 * useLocalStorageState
 * A React hook that keeps a piece of state in sync with localStorage,
 * with JSON (de)serialization, schema validation, and cross-tab synchronization.
 *
 * @param key           localStorage key
 * @param defaultValue  fallback value if none in storage or invalid
 * @param isValid       type-guard function to validate a parsed value
 * @returns [state, setState] tuple
 */
export function useLocalStorageState<T>(
    key: string,
    defaultValue: T,
    isValid: (x: any) => x is T
): [T, (val: T) => void] {
    // Initialize from storage or default
    const [state, setState] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return defaultValue;
            const parsed = JSON.parse(raw);
            return isValid(parsed) ? parsed : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    // Persist to storage on change
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch {
            console.error(`Failed to write "${key}" to localStorage`);
        }
    }, [key, state]);

    // Cross-tab sync
    useEffect(() => {
        const handle = (e: StorageEvent) => {
            if (e.key !== key) return;
            try {
                const newVal = e.newValue ? JSON.parse(e.newValue) : defaultValue;
                if (isValid(newVal)) setState(newVal);
            } catch {
                // ignore invalid JSON
            }
        };
        window.addEventListener('storage', handle);
        return () => window.removeEventListener('storage', handle);
    }, [key]);

    return [state, setState];
}
