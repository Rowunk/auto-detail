// src/utils/__tests__/jobCalculator.test.ts
import type { JobResult } from '../jobCalculator';
import { calculateJob } from '../jobCalculator';
import { serviceDatabase, sizeMultipliers } from '../../services/serviceDatabase';
import type { AppConfig } from '../../contexts/ConfigContext';
import { defaultConfig } from '../../contexts/ConfigContext';
import type { VehicleCondition, VehicleSize } from '../../types';

describe('calculateJob()', () => {
    const cfg: AppConfig = defaultConfig;

    it('calculates a single service correctly', () => {
        const selected = ['hand-wash'];
        const condition: VehicleCondition = 'dirty';
        const result: JobResult = calculateJob(selected, condition, cfg);

        const svc = serviceDatabase['hand-wash'];
        const baseTime = svc.times[condition];
        const basePrice = svc.basePrice[condition];
        const expectedTime = Math.round((baseTime * sizeMultipliers[cfg.vehicleSize]) / cfg.workers);
        const expectedPrice = Math.round(basePrice * sizeMultipliers[cfg.vehicleSize]);

        expect(result.totalTime).toBe(expectedTime);
        expect(result.totalPrice).toBe(expectedPrice);
        expect(result.breakdown).toHaveLength(1);
        expect(result.breakdown[0]).toEqual({
            name: svc.name,
            time: expectedTime,
            price: expectedPrice
        });
    });

    it('aggregates multiple services in correct order', () => {
        const selected = ['exterior-rinse', 'hand-wash'];
        const condition: VehicleCondition = 'excellent';
        const result = calculateJob(selected, condition, cfg);

        // Should sort by the explicit `order` in serviceDatabase
        const orders = result.breakdown.map(b =>
            Object.values(serviceDatabase).find(s => s.name === b.name)!.order
        );
        expect(orders).toEqual([...orders].sort((a, b) => a - b));
        expect(result.breakdown).toHaveLength(2);
    });

    it('computes cost, profit and margin correctly', () => {
        const selected = ['pressure-wash', 'contactless-wash'];
        const condition: VehicleCondition = 'neglected';
        const { totalPrice, cost, profit, marginPct } = calculateJob(selected, condition, cfg);

        // cost = totalPrice * costRatio
        expect(cost).toBe(Math.round(totalPrice * cfg.costRatio));
        expect(profit).toBe(totalPrice - cost);
        expect(marginPct).toBe(Math.round((profit / totalPrice) * 100));
    });

    it('falls back to "excellent" if no condition provided', () => {
        const selected = ['final-rinse'];
        // @ts-expect-error testing fallback
        const result = calculateJob(selected, undefined, cfg);

        const svc = serviceDatabase['final-rinse'];
        const baseTime = svc.times.excellent;
        const basePrice = svc.basePrice.excellent;
        const expectedTime = Math.round((baseTime * sizeMultipliers[cfg.vehicleSize]) / cfg.workers);
        const expectedPrice = Math.round(basePrice * sizeMultipliers[cfg.vehicleSize]);

        expect(result.totalTime).toBe(expectedTime);
        expect(result.totalPrice).toBe(expectedPrice);
    });
});
