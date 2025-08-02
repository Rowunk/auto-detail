// src/components/__test__/SelectionSummary.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectionSummary from '../SelectionSummary';

describe('SelectionSummary', () => {
  const dummyOnClear = jest.fn();

  it('renders nothing when selected is empty', () => {
    const { container } = render(
      <SelectionSummary selected={[]} onClear={dummyOnClear} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders service names for selected keys', () => {
    render(
      <SelectionSummary selected={['exterior-rinse', 'snow-foam']} onClear={dummyOnClear} />
    );
    expect(screen.getByText(/Oplach karoserie/i)).toBeInTheDocument();
    expect(screen.getByText(/Snow‑foam aplikace/i)).toBeInTheDocument();
    expect(screen.getByTitle(/vymazat výběr/i)).toBeInTheDocument();
  });

  it('calls onClear when the clear button is clicked', () => {
    render(
      <SelectionSummary selected={['exterior-rinse']} onClear={dummyOnClear} />
    );
    fireEvent.click(screen.getByTitle(/vymazat výběr/i));
    expect(dummyOnClear).toHaveBeenCalled();
  });
});
