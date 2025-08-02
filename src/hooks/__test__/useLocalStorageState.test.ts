// src/hooks/__test__/useLocalStorageState.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorageState } from '../useLocalStorageState';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const isString = (x: any): x is string => typeof x === 'string';
const isNumber = (x: any): x is number => typeof x === 'number';

describe('useLocalStorageState', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('initializes with default value when localStorage is empty', () => {
    const { result } = renderHook(() => 
      useLocalStorageState('test-key', 'default', isString)
    );
    
    expect(result.current[0]).toBe('default');
  });

  it('initializes with stored value when localStorage has valid data', () => {
    localStorageMock.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => 
      useLocalStorageState('test-key', 'default', isString)
    );
    
    expect(result.current[0]).toBe('stored-value');
  });

  it('falls back to default when stored data is invalid', () => {
    localStorageMock.setItem('test-key', JSON.stringify(123)); // number instead of string
    
    const { result } = renderHook(() => 
      useLocalStorageState('test-key', 'default', isString)
    );
    
    expect(result.current[0]).toBe('default');
  });

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => 
      useLocalStorageState('test-key', 'default', isString)
    );
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key', 
      JSON.stringify('new-value')
    );
  });

  it('works with complex objects', () => {
    const defaultObj = { count: 0, name: 'test' };
    const isValidObj = (x: any): x is typeof defaultObj => 
      x && typeof x.count === 'number' && typeof x.name === 'string';
    
    const { result } = renderHook(() => 
      useLocalStorageState('obj-key', defaultObj, isValidObj)
    );
    
    act(() => {
      result.current[1]({ count: 5, name: 'updated' });
    });
    
    expect(result.current[0]).toEqual({ count: 5, name: 'updated' });
  });

  it('handles localStorage errors gracefully', () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const { result } = renderHook(() => 
      useLocalStorageState('test-key', 'default', isString)
    );
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to write "test-key" to localStorage')
    );
    
    consoleSpy.mockRestore();
  });

  it('handles malformed JSON gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json{');
    
    const { result } = renderHook(() => 
      useLocalStorageState('test-key', 'default', isString)
    );
    
    expect(result.current[0]).toBe('default');
  });
});
