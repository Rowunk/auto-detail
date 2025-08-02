// src/components/__test__/VehicleSizeSelector.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VehicleSizeSelector from '../VehicleSizeSelector';
import type { VehicleSize } from '../../types';

describe('VehicleSizeSelector', () => {
  const mockOnSelect = jest.fn();
  const allSizes: VehicleSize[] = ['small', 'midsize', 'sedan', 'combi', 'suv', 'van', 'truck'];

  afterEach(() => {
    mockOnSelect.mockReset();
  });

  it('renders all vehicle size options', () => {
    render(<VehicleSizeSelector current="suv" onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Malé')).toBeInTheDocument();
    expect(screen.getByText('Střední')).toBeInTheDocument();
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('Kombi')).toBeInTheDocument();
    expect(screen.getByText('SUV')).toBeInTheDocument();
    expect(screen.getByText('Van')).toBeInTheDocument();
    expect(screen.getByText('Truck')).toBeInTheDocument();
  });

  it('highlights the currently selected size', () => {
    render(<VehicleSizeSelector current="combi" onSelect={mockOnSelect} />);
    
    const selectedBtn = screen.getByText('Kombi').closest('button');
    expect(selectedBtn).toHaveClass('bg-blue-500');
    expect(selectedBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onSelect when a size is clicked', () => {
    render(<VehicleSizeSelector current="suv" onSelect={mockOnSelect} />);
    
    fireEvent.click(screen.getByText('Van'));
    expect(mockOnSelect).toHaveBeenCalledWith('van');
  });

  it('shows proper emojis for each size', () => {
    render(<VehicleSizeSelector current="suv" onSelect={mockOnSelect} />);
    
    expect(screen.getByText('🚗')).toBeInTheDocument(); // small
    expect(screen.getByText('🚕')).toBeInTheDocument(); // midsize
    expect(screen.getByText('🚙')).toBeInTheDocument(); // sedan
    expect(screen.getByText('🚘')).toBeInTheDocument(); // combi
    expect(screen.getByText('🚚')).toBeInTheDocument(); // suv
    expect(screen.getByText('🚐')).toBeInTheDocument(); // van
    expect(screen.getByText('🚛')).toBeInTheDocument(); // truck
  });
});