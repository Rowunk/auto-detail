// src/utils/validators.ts
import type { ServiceItem, VehicleCondition } from '../types';

/**
 * Type-guard: an array of ServiceItem objects extended with a `key` string.
 */
export function isServiceItemArray(x: any): x is (ServiceItem & { key: string })[] {
    return Array.isArray(x) && x.every(item =>
        item &&
        typeof item.key === 'string' &&
        typeof item.name === 'string' &&
        typeof item.category === 'string' &&
        typeof item.order === 'number' &&
        typeof item.times === 'object' &&
        ['excellent', 'dirty', 'neglected', 'extreme'].every(cond =>
            typeof (item.times as any)[cond] === 'number'
        ) &&
        typeof item.basePrice === 'object' &&
        ['excellent', 'dirty', 'neglected', 'extreme'].every(cond =>
            typeof (item.basePrice as any)[cond] === 'number'
        )
    );
}

/**
 * Type-guard: VehicleCondition string literal
 */
export function isVehicleCondition(x: any): x is VehicleCondition {
    return ['excellent', 'dirty', 'neglected', 'extreme'].includes(x);
}
