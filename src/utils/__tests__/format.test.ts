// src/utils/__tests__/format.test.ts
import { formatMinutes } from '../format';

describe('formatMinutes', () => {
    it('formats minutes less than 60', () => {
        expect(formatMinutes(0)).toBe('0 min');
        expect(formatMinutes(5)).toBe('5 min');
        expect(formatMinutes(59)).toBe('59 min');
    });

    it('formats exact hours', () => {
        expect(formatMinutes(60)).toBe('1h');
        expect(formatMinutes(120)).toBe('2h');
        expect(formatMinutes(180)).toBe('3h');
    });

    it('formats hours and remaining minutes', () => {
        expect(formatMinutes(61)).toBe('1h 1 min');
        expect(formatMinutes(65)).toBe('1h 5 min');
        expect(formatMinutes(125)).toBe('2h 5 min');
    });
});
