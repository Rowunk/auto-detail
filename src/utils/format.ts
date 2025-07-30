// src/utils/format.ts

/**
 * Turn a number of minutes into a human-readable string.
 * Examples:
 *   0   → "0 min"
 *   5   → "5 min"
 *   60  → "1h"
 *   65  → "1h 5 min"
 *   125 → "2h 5 min"
 *
 * @param m  Total minutes
 * @returns  Formatted string
 */
export function formatMinutes(m: number): string {
    const h = Math.floor(m / 60);
    const s = m % 60;
    if (h) {
        return s ? `${h}h ${s} min` : `${h}h`;
    }
    return `${s} min`;
}
