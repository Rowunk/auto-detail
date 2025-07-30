// src/utils/__tests__/storage.test.ts

import {
    getStorageItem,
    setStorageItem,
    removeStorageItem,
    isStorageAvailable
} from '../storage';

describe('storage utility', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
    });

    it('getStorageItem returns default when key is missing', () => {
        expect(getStorageItem('foo', 'default')).toBe('default');
    });

    it('setStorageItem stores and getStorageItem parses JSON correctly', () => {
        const obj = { a: 1, b: 'two' };
        expect(setStorageItem('myKey', obj)).toBe(true);
        // @ts-ignore
        expect(localStorage.getItem('myKey')).toBe(JSON.stringify(obj));
        expect(getStorageItem('myKey', {})).toEqual(obj);
    });

    it('getStorageItem returns raw string if JSON.parse fails', () => {
        // simulate non-JSON value
        localStorage.setItem('strKey', 'hello');
        expect(getStorageItem('strKey', 'default')).toBe('hello');
    });

    it('removeStorageItem deletes the key', () => {
        localStorage.setItem('todelete', 'x');
        expect(removeStorageItem('todelete')).toBe(true);
        expect(localStorage.getItem('todelete')).toBeNull();
    });

    it('isStorageAvailable works when storage is functional', () => {
        expect(isStorageAvailable()).toBe(true);
    });

    it('isStorageAvailable returns false if storage.setItem throws', () => {
        jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error(); });
        expect(isStorageAvailable()).toBe(false);
    });
});
