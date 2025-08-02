// src/components/__test__/TipsSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TipsSection from '../TipsSection';

describe('TipsSection', () => {
  it('renders all professional tips', () => {
    render(<TipsSection />);
    
    expect(screen.getByText(/Profesionální tipy pro granulární služby/i)).toBeInTheDocument();
    expect(screen.getByText(/⭐ Oblíbené služby/)).toBeInTheDocument();
    expect(screen.getByText(/🎯 Granulární přístup/)).toBeInTheDocument();
    expect(screen.getByText(/⏱️ Časová optimalizace/)).toBeInTheDocument();
    expect(screen.getByText(/💰 Cenová strategie/)).toBeInTheDocument();
  });

  it('displays tip content correctly', () => {
    render(<TipsSection />);
    
    expect(screen.getByText(/Označte nejčastěji používané služby hvězdičkou/)).toBeInTheDocument();
    expect(screen.getByText(/Kombinujte služby pro optimální výsledek/)).toBeInTheDocument();
    expect(screen.getByText(/Některé služby lze kombinovat/)).toBeInTheDocument();
    expect(screen.getByText(/Balíčkové ceny jsou často výhodnější/)).toBeInTheDocument();
  });

  it('has proper structure and styling', () => {
    const { container } = render(<TipsSection />);
    
    // Check for main section
    expect(container.querySelector('section')).toBeInTheDocument();
    
    // Check for grid layout
    expect(container.querySelector('.grid')).toBeInTheDocument();
    
    // Check for colored border accents
    expect(container.querySelector('.border-yellow-500')).toBeInTheDocument();
    expect(container.querySelector('.border-green-500')).toBeInTheDocument();
    expect(container.querySelector('.border-blue-500')).toBeInTheDocument();
    expect(container.querySelector('.border-purple-500')).toBeInTheDocument();
  });
});