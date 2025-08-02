// src/utils/__tests__/validators.test.ts

import {
  isServiceItemArray,
  isVehicleCondition
} from '../validators';

describe('validators', () => {
  describe('isVehicleCondition', () => {
    it.each([
      ['excellent', true],
      ['dirty',     true],
      ['neglected', true],
      ['extreme',   true],
      ['unknown',   false],
      ['',          false],
      [null,        false],
      [undefined,   false]
    ])('"%s" → %s', (input, expected) => {
      // @ts-ignore
      expect(isVehicleCondition(input)).toBe(expected);
    });
  });

  describe('isServiceItemArray', () => {
    const validItem = {
      key: 'foo',
      name: 'Foo',
      category: 'wash',
      order: 1,
      times: { excellent: 1, dirty: 2, neglected: 3, extreme: 4 },
      basePrice: { excellent: 10, dirty: 20, neglected: 30, extreme: 40 }
    };

    it('returns true for a valid array', () => {
      expect(isServiceItemArray([ validItem ])).toBe(true);
    });

    it('rejects if missing key or name', () => {
      // @ts-expect-error
      expect(isServiceItemArray([{ ...validItem, key: null }])).toBe(false);
      // @ts-expect-error
      expect(isServiceItemArray([{ ...validItem, name: 123 }])).toBe(false);
    });

    it('rejects if times or basePrice malformed', () => {
      // wrong shape
      // @ts-expect-error
      expect(isServiceItemArray([{ ...validItem, times: { a: 1 } }])).toBe(false);
      // @ts-expect-error
      expect(isServiceItemArray([{ ...validItem, basePrice: null }])).toBe(false);
    });

    it('rejects non-array inputs', () => {
      // @ts-ignore
      expect(isServiceItemArray(null)).toBe(false);
      // @ts-ignore
      expect(isServiceItemArray({})).toBe(false);
    });
  });
});
