// src/components/__test__/ConditionSelector.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConditionSelector from '../ConditionSelector';
import type { VehicleCondition } from '../../types';

describe('ConditionSelector', () => {
  const allConditions: VehicleCondition[] = ['excellent', 'dirty', 'neglected', 'extreme'];
  const labels = {
    excellent: 'ČISTÉ',
    dirty: 'ŠPINAVÉ',
    neglected: 'ZANEDBANÉ',
    extreme: 'EXTRÉMNÍ',
  };
  const emojis = {
    excellent: '🟢',
    dirty: '🟡',
    neglected: '🔴',
    extreme: '🟣',
  };

  it('renders all condition buttons with correct labels and emojis', () => {
    render(<ConditionSelector current={null} onSelect={jest.fn()} />);
    allConditions.forEach(cond => {
      expect(screen.getByText(labels[cond])).toBeInTheDocument();
      expect(screen.getByText(emojis[cond])).toBeInTheDocument();
    });
  });

  it('highlights the selected condition', () => {
    render(<ConditionSelector current="neglected" onSelect={jest.fn()} />);
    const selectedBtn = screen.getByText('ZANEDBANÉ').closest('button');
    expect(selectedBtn).toHaveClass('bg-gradient-to-br');
    expect(selectedBtn).toHaveClass('ring-2');
    expect(selectedBtn).toHaveClass('text-white');
  });

  it('shows warning if no condition is selected', () => {
    render(<ConditionSelector current={null} onSelect={jest.fn()} />);
    expect(screen.getByText(/nejprve vyberte stav vozidla/i)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveClass('text-red-600');
  });

  it('calls onSelect with correct condition when button is clicked', () => {
    const onSelect = jest.fn();
    render(<ConditionSelector current={null} onSelect={onSelect} />);
    const btn = screen.getByText('ŠPINAVÉ').closest('button');
    fireEvent.click(btn!);
    expect(onSelect).toHaveBeenCalledWith('dirty');
  });

  it('shows neutral styling for all other buttons when a condition is selected', () => {
    render(<ConditionSelector current="dirty" onSelect={jest.fn()} />);
    allConditions.filter(c => c !== 'dirty').forEach(cond => {
      const btn = screen.getByText(labels[cond]).closest('button');
      expect(btn).toHaveClass('bg-white');
      expect(btn).toHaveClass('text-gray-700');
    });
  });

  it('shows pulsing border if no condition is selected', () => {
    render(<ConditionSelector current={null} onSelect={jest.fn()} />);
    const anyBtn = screen.getByText('EXTRÉMNÍ').closest('button');
    expect(anyBtn).toHaveClass('animate-pulse');
    expect(anyBtn).toHaveClass('border-red-300');
  });
});
