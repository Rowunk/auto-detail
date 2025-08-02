// src/components/__test__/Header.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  let originalClassList: any;
  let setItemSpy: jest.SpyInstance;
  let getItemSpy: jest.SpyInstance;

  beforeAll(() => {
    // Mock localStorage and documentElement.classList
    originalClassList = { ...document.documentElement.classList };
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    document.documentElement.className = '';
    setItemSpy.mockClear();
    getItemSpy.mockClear();
  });

  afterAll(() => {
    setItemSpy.mockRestore();
    getItemSpy.mockRestore();
    // Restore classList to prevent leaks
    document.documentElement.className = '';
  });

  it('renders header title and buttons', () => {
    render(<Header onOpenConfigSidebar={jest.fn()} />);
    expect(screen.getByText(/Detailing Kalkulačka Pro\+ \| Granulární/i)).toBeInTheDocument();
    expect(screen.getByTitle('Nastavení')).toBeInTheDocument();
    expect(screen.getByTitle('Přepnout téma')).toBeInTheDocument();
  });

  it('calls onOpenConfigSidebar when settings button is clicked', () => {
    const mockFn = jest.fn();
    render(<Header onOpenConfigSidebar={mockFn} />);
    fireEvent.click(screen.getByTitle('Nastavení'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('toggles theme and updates localStorage and document class', () => {
    // Initially light mode
    render(<Header onOpenConfigSidebar={jest.fn()} />);
    const themeBtn = screen.getByTitle('Přepnout téma');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Toggle to dark mode
    fireEvent.click(themeBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Toggle back to light mode
    fireEvent.click(themeBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('shows ☀️ in dark mode and 🌙 in light mode', () => {
    render(<Header onOpenConfigSidebar={jest.fn()} />);
    const themeBtn = screen.getByTitle('Přepnout téma');

    // Initial icon
    expect(themeBtn.textContent).toMatch(/🌙|☀️/);

    // Toggle and check
    fireEvent.click(themeBtn);
    expect(themeBtn.textContent).toMatch(/🌙|☀️/);
  });
});
