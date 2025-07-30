// src/utils/calculations.ts
import { serviceDatabase, sizeMultipliers } from '../services/serviceDatabase';
import type { VehicleCondition, VehicleSize } from '../types';

export interface BreakdownItem {
    key: string;
    name: string;
    time: number;
    price: number;
}

export interface JobTotals {
    breakdown: BreakdownItem[];
    totalTime: number;
    totalPrice: number;
    cost: number;
    profit: number;
    marginPct: number;
}

/** Converts minutes into “Xh Y min” or “Z min” */
export function formatTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h) return m ? `${h}h ${m} min` : `${h}h`;
    return `${m} min`;
}

/**
 * Given selected service‐keys, computes time/price breakdown
 * and financial totals.
 */
export function calculateJob(
    selected: string[],
    condition: VehicleCondition,
    vehicleSize: VehicleSize,
    workers: number,
    costRatio: number
): JobTotals {
    let totalTime = 0;
    let totalPrice = 0;
    const breakdown: BreakdownItem[] = selected.map(key => {
        const svc = serviceDatabase[key];
        const baseTime = svc.times[condition];
        const basePrice = svc.basePrice[condition];
        const time = Math.round((baseTime * sizeMultipliers[vehicleSize]) / workers);
        const price = Math.round(basePrice * sizeMultipliers[vehicleSize]);
        totalTime += time;
        totalPrice += price;
        return { key, name: svc.name, time, price };
    });
    const cost = Math.round(totalPrice * costRatio);
    const profit = totalPrice - cost;
    const marginPct = Math.round((profit / totalPrice) * 100);
    return { breakdown, totalTime, totalPrice, cost, profit, marginPct };
}
