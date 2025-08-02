// src/components/__test__/BottomNav.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BottomNav from '../BottomNav';
import type { BottomNavProps } from '../../types/props';

// Map logical keys to user-facing tab labels
const tabMap = [
  { key: 'calc', label: 'Kalkulačka' },
  { key: 'history', label: 'Historie' },
  { key: 'tips', label: 'Tipy' },
  { key: 'services', label: 'Služby' }
];

describe('BottomNav', () => {
  let onChange: jest.Mock;
  let props: BottomNavProps;

  beforeEach(() => {
    onChange = jest.fn();
    props = { active: 'calc', onChange };
  });

  it('renders all navigation tabs with correct emojis and aria-labels', () => {
    render(<BottomNav {...props} />);
    tabMap.forEach(tab => {
      const btn = screen.getByRole('tab', { name: tab.label });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveAttribute('aria-label', tab.label);
    });
  });

  it('shows the active tab with selected style and aria-selected', () => {
    props.active = 'tips';
    render(<BottomNav {...props} />);
    const activeBtn = screen.getByRole('tab', { name: 'Tipy' });
    expect(activeBtn).toHaveAttribute('aria-selected', 'true');
    expect(activeBtn.className).toMatch(/text-blue-600|text-blue-400/);
  });

  it('shows all other tabs as inactive', () => {
    props.active = 'history';
    render(<BottomNav {...props} />);
    tabMap
      .filter(t => t.key !== 'history')
      .forEach(tab => {
        const btn = screen.getByRole('tab', { name: tab.label });
        expect(btn).toHaveAttribute('aria-selected', 'false');
        expect(btn.className).toMatch(/text-gray-500|text-gray-300/);
      });
  });

  it('calls onChange with correct key when a tab is clicked', () => {
    render(<BottomNav {...props} />);
    tabMap.forEach(tab => {
      const btn = screen.getByRole('tab', { name: tab.label });
      fireEvent.click(btn);
      expect(onChange).toHaveBeenCalledWith(tab.key);
    });
    expect(onChange).toHaveBeenCalledTimes(tabMap.length);
  });

  it('renders navigation with correct role and aria-label', () => {
    render(<BottomNav {...props} />);
    const nav = screen.getByRole('navigation', { name: /hlavní navigace/i });
    expect(nav).toBeInTheDocument();
  });
});
