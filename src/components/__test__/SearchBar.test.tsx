// src/components/__tests__/SearchBar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

jest.useFakeTimers();

describe('SearchBar', () => {
  it('debounces input and calls onChange after 250ms', () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('🔍 Hledat služby...');
    
    // type "abc" quickly
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.change(input, { target: { value: 'abc' } });
    
    // still no call before delay
    jest.advanceTimersByTime(200);
    expect(handleChange).not.toHaveBeenCalled();
    
    // after 250ms total, callback fires once with latest value
    jest.advanceTimersByTime(50);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('abc');
  });

  it('cancels pending debounce on unmount', () => {
    const handleChange = jest.fn();
    const { unmount } = render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('🔍 Hledat služby...');
    fireEvent.change(input, { target: { value: 'test' } });
    
    unmount();
    jest.runAllTimers();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
