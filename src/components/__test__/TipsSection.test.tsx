// src/components/__test__/TipsSection.test.tsx - Updated for KnowledgeBase
import React from 'react';
import { render, screen } from '@testing-library/react';
import TipsSection from '../TipsSection';

// Mock the KnowledgeBase component
jest.mock('../KnowledgeBase', () => {
  return function MockKnowledgeBase() {
    return (
      <div data-testid="knowledge-base">
        <h1>📚 Detailing Wiki & Know-How</h1>
        <p>Kompletní znalostní báze pro profesionální auto detailing</p>
      </div>
    );
  };
});

describe('TipsSection', () => {
  it('renders the knowledge base component', () => {
    render(<TipsSection />);
    
    expect(screen.getByTestId('knowledge-base')).toBeInTheDocument();
    expect(screen.getByText('📚 Detailing Wiki & Know-How')).toBeInTheDocument();
    expect(screen.getByText(/kompletní znalostní báze/i)).toBeInTheDocument();
  });

  it('matches the interface of the old TipsSection', () => {
    // The component should render without any props
    const { container } = render(<TipsSection />);
    expect(container.firstChild).not.toBeNull();
  });

  it('serves as a wrapper for KnowledgeBase', () => {
    render(<TipsSection />);
    
    // Should contain the knowledge base content
    expect(screen.getByTestId('knowledge-base')).toBeInTheDocument();
  });
});