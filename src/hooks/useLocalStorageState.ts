// src/hooks/useLocalStorageState.ts
import { useState, useEffect } from 'react';

/**
 * Hook to manage a value in localStorage with JSON (de)serialization,
 * schema validation, and cross-tab sync.
 *
 * @param key localStorage key
 * @param defaultValue fallback if missing or invalid
 * @param isValid  type guard to validate parsed JSON
 */
export function useLocalStorageState<T>(
    key: string,
    defaultValue: T,
    isValid: (x: any) => x is T
): [T, (val: T) => void] {
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

    // Persist on state change
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch {
            // handle quota errors etc.
            console.error(`Failed to set ${key} in localStorage`);
        }
    }, [key, state]);

    // Sync across tabs
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === key) {
                try {
                    const newVal = e.newValue ? JSON.parse(e.newValue) : defaultValue;
                    if (isValid(newVal)) setState(newVal);
                } catch {
                    // ignore parse errors
                }
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [key]);

    return [state, setState];
}
