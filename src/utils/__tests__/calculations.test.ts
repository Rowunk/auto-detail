// src/utils/__tests__/calculations.test.ts
import { formatTime, calculateJob } from '../calculations';
import type { VehicleCondition, VehicleSize } from '../../types';

describe('formatTime', () => {
    it('formats minutes less than 60', () => {
        expect(formatTime(45)).toBe('45 min');
    });
    it('formats whole hours', () => {
        expect(formatTime(120)).toBe('2h');
    });
    it('formats hours and minutes', () => {
        expect(formatTime(125)).toBe('2h 5 min');
    });
});

describe('calculateJob', () => {
    const mockServices = ['exterior-rinse', 'hand-wash'];
    const condition: VehicleCondition = 'dirty';
    const vehicleSize: VehicleSize = 'suv';
    const workers = 1;
    const costRatio = 0.5;

    it('calculates breakdown and totals correctly', () => {
        const result = calculateJob(mockServices, condition, vehicleSize, workers, costRatio);

        // breakdown items should match serviceDatabase entries
        expect(result.breakdown).toHaveLength(2);
        expect(result.breakdown[0]).toEqual(
            expect.objectContaining({ key: 'exterior-rinse', name: expect.any(String), time: expect.any(Number), price: expect.any(Number) })
        );
        // totalTime is sum of individual times
        const summedTime = result.breakdown.reduce((sum, b) => sum + b.time, 0);
        expect(result.totalTime).toBe(summedTime);

        // profit, marginPct, cost should be consistent
        expect(result.cost).toBe(Math.round(result.totalPrice * costRatio));
        expect(result.profit).toBe(result.totalPrice - result.cost);
        expect(result.marginPct).toBe(Math.round((result.profit / result.totalPrice) * 100));
    });
});
