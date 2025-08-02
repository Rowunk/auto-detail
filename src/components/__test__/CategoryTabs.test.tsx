// src/components/__test__/CategoryTabs.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryTabs from '../CategoryTabs';
import type { ServiceCategory } from '../../types';

describe('CategoryTabs', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    mockOnChange.mockReset();
  });

  const allCategories: ServiceCategory[] = [
    'favorites', 'all', 'wash', 'exterior', 'wheels',
    'interior', 'protection', 'restoration', 'specialty'
  ];

  it('renders all category buttons with correct labels', () => {
    render(<CategoryTabs active="all" onChange={mockOnChange} />);
    expect(screen.getByText('⭐ Oblíbené')).toBeInTheDocument();
    expect(screen.getByText('📋 Vše')).toBeInTheDocument();
    expect(screen.getByText('🚿 Mytí')).toBeInTheDocument();
    expect(screen.getByText('🚗 Exteriér')).toBeInTheDocument();
    expect(screen.getByText('⚙️ Kola')).toBeInTheDocument();
    expect(screen.getByText('🪑 Interiér')).toBeInTheDocument();
    expect(screen.getByText('🛡️ Ochrana')).toBeInTheDocument();
    expect(screen.getByText('🔧 Opravy')).toBeInTheDocument();
    expect(screen.getByText('⭐ Speciální')).toBeInTheDocument();
  });

  it('highlights the active category tab', () => {
    render(<CategoryTabs active="wash" onChange={mockOnChange} />);
    const labels = [
      '⭐ Oblíbené', '📋 Vše', '🚿 Mytí', '🚗 Exteriér',
      '⚙️ Kola', '🪑 Interiér', '🛡️ Ochrana', '🔧 Opravy', '⭐ Speciální'
    ];
    labels.forEach(label => {
      const btn = screen.getByText(label);
      if (label === '🚿 Mytí') {
        expect(btn).toHaveClass('bg-blue-500', { exact: false });
      } else {
        expect(btn).not.toHaveClass('bg-blue-500', { exact: false });
      }
    });
  });

  it('calls onChange with correct category key when a tab is clicked', () => {
    render(<CategoryTabs active="all" onChange={mockOnChange} />);
    const wheelsBtn = screen.getByText('⚙️ Kola');
    fireEvent.click(wheelsBtn);
    expect(mockOnChange).toHaveBeenCalledWith('wheels');
  });

  it('calls onChange for all category tabs', () => {
    render(<CategoryTabs active="all" onChange={mockOnChange} />);
    const labelMap: Record<ServiceCategory, string> = {
      favorites: '⭐ Oblíbené',
      all: '📋 Vše',
      wash: '🚿 Mytí',
      exterior: '🚗 Exteriér',
      wheels: '⚙️ Kola',
      interior: '🪑 Interiér',
      protection: '🛡️ Ochrana',
      restoration: '🔧 Opravy',
      specialty: '⭐ Speciální'
    };
    allCategories.forEach(cat => {
      const btn = screen.getByText(labelMap[cat]);
      fireEvent.click(btn);
      expect(mockOnChange).toHaveBeenCalledWith(cat);
    });
  });

  it('matches snapshot (visual regression)', () => {
    const { container } = render(<CategoryTabs active="all" onChange={mockOnChange} />);
    expect(container).toMatchSnapshot();
  });
});
