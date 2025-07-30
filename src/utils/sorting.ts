// src/utils/sorting.ts
import { serviceDatabase } from '../services/serviceDatabase';
import type { ServiceCategory } from '../types';

/**
 * The ideal order of categories in the workflow.
 */
const CATEGORY_PRECEDENCE: ServiceCategory[] = [
    'wash', 'wheels', 'exterior',
    'interior', 'protection',
    'restoration', 'specialty'
];

/**
 * Sort an array of service-keys by:
 *   1. Their category's index in CATEGORY_PRECEDENCE
 *   2. Alphabetical order of service name
 *
 * @param keys - Array of serviceDatabase keys
 * @returns A new sorted array
 */
export function sortServiceKeys(keys: string[]): string[] {
    return [...keys].sort((a, b) => {
        const ca = serviceDatabase[a].category;
        const cb = serviceDatabase[b].category;
        const pa = CATEGORY_PRECEDENCE.indexOf(ca);
        const pb = CATEGORY_PRECEDENCE.indexOf(cb);
        if (pa !== pb) return pa - pb;

        // same category → alphabetical by display name
        const na = serviceDatabase[a].name;
        const nb = serviceDatabase[b].name;
        return na.localeCompare(nb, 'cs-CZ');
    });
}
