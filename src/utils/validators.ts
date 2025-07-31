// src/utils/validators.ts
import type { ServiceItem, VehicleCondition } from '../types';

export const isServiceItemArray = (x: any): x is (ServiceItem & { key: string })[] => {
    return Array.isArray(x) && x.every(item =>
        typeof item.key === 'string'
        && typeof item.name === 'string'
        && typeof item.category === 'string'
        && typeof item.order === 'number'
        && item.times && typeof item.times === 'object'
        && item.basePrice && typeof item.basePrice === 'object'
    );
};

export const isVehicleCondition = (x: any): x is VehicleCondition =>
    ['excellent', 'dirty', 'neglected', 'extreme'].includes(x);
