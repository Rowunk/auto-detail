// src/utils/jobCalculator.ts
import { serviceDatabase, sizeMultipliers } from '../services/serviceDatabase';
import type { VehicleCondition, AppConfig } from '../types';

export interface JobCalculation {
    breakdown: { name: string; time: number; price: number }[];
    totalTime: number;
    totalPrice: number;
    cost: number;
    profit: number;
    marginPct: number;
}

/**
 * Calculate total time, price and P&L for a set of services.
 */
export function calculateJob(
    selected: string[],
    condition: VehicleCondition | null,
    config: AppConfig
): JobCalculation {
    const condKey = condition ?? 'excellent';
    const { vehicleSize, workers, costRatio } = config;

    let totalTime = 0;
    let totalPrice = 0;

    const breakdown = selected.map(key => {
        const svc = serviceDatabase[key];
        const baseTime = svc.times[condKey];
        const basePrice = svc.basePrice[condKey];

        const time = Math.round(
            (baseTime * sizeMultipliers[vehicleSize]) / workers
        );
        const price = Math.round(
            basePrice * sizeMultipliers[vehicleSize]
        );

        totalTime += time;
        totalPrice += price;

        return { name: svc.name, time, price };
    });

    const cost = Math.round(totalPrice * costRatio);
    const profit = Math.round(totalPrice - cost);
    const marginPct = totalPrice > 0
        ? Math.round((profit / totalPrice) * 100)
        : 0;

    return { breakdown, totalTime, totalPrice, cost, profit, marginPct };
}
