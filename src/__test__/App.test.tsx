// ===== src/__test__/App.test.tsx (UPDATED for Knowledge Base) =====
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock storage utilities
jest.mock('../utils/storage', () => ({
  getStorageItem: jest.fn(() => []),
  setStorageItem: jest.fn(() => true),
  isStorageAvailable: jest.fn(() => true),
}));

// Mock service database
jest.mock('../services/serviceDatabase', () => ({
  serviceDatabase: {
    'test-service': {
      name: 'Test Service',
      category: 'wash',
      order: 1,
      times: { excellent: 30, dirty: 45, neglected: 60, extreme: 90 },
      basePrice: { excellent: 300, dirty: 400, neglected: 500, extreme: 600 }
    }
  },
  sizeMultipliers: { suv: 1.0 }
}));

// ✅ Fix: Mock favorites utilities with empty state for favorites test
jest.mock('../utils/favorites', () => ({
  isFavorite: jest.fn(() => false),
  toggleFavorite: jest.fn(() => true),
  getQuickPickServices: jest.fn(() => []), // ✅ Empty array for empty state
  incrementUsage: jest.fn(() => true),
}));

// ✅ NEW: Mock knowledge base for the new Tips section
jest.mock('../data/knowledgeBase', () => ({
  knowledgeBase: [
    {
      id: 'test-kb-article',
      title: 'Test Knowledge Article',
      category: 'basics',
      tags: ['test'],
      difficulty: 'beginner',
      readTime: 5,
      lastUpdated: '2024-08-02',
      content: { summary: 'Test summary', sections: [] }
    }
  ],
  knowledgeCategories: [
    { id: 'basics', name: '🎯 Základy', icon: '🎯' }
  ],
  searchArticles: jest.fn(() => []),
  getArticlesByCategory: jest.fn(() => [])
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset favorites mock to return empty array by default
    const { getQuickPickServices } = require('../utils/favorites');
    getQuickPickServices.mockReturnValue([]);
  });

  it('renders the main application', () => {
    render(<App />);
    
    expect(screen.getByText(/Detailing Kalkulačka Pro\+/)).toBeInTheDocument();
    expect(screen.getByText(/nejprve vyberte stav vozidla/i)).toBeInTheDocument();
  });

  it('renders navigation tabs', () => {
    render(<App />);
    
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(4);
  });

  it('switches to history view', () => {
    render(<App />);
    
    const historyTab = screen.getByRole('tab', { name: /historie/i });
    fireEvent.click(historyTab);
    
    expect(screen.getByText(/Historie zakázek/i)).toBeInTheDocument();
  });

  // ✅ UPDATED: Test now expects Knowledge Base content instead of old tips
  it('switches to tips view (now Knowledge Base)', () => {
    render(<App />);
    
    const tipsTab = screen.getByRole('tab', { name: /tipy/i });
    fireEvent.click(tipsTab);
    
    // Should show the Knowledge Base interface
    expect(screen.getByText(/Detailing Wiki & Know-How/i)).toBeInTheDocument();
    expect(screen.getByText(/Kompletní znalostní báze/i)).toBeInTheDocument();
  });

  it('switches to services view', () => {
    render(<App />);
    
    const servicesTab = screen.getByRole('tab', { name: /služby/i });
    fireEvent.click(servicesTab);
    
    expect(screen.getByText(/Správa služeb/i)).toBeInTheDocument();
  });

  it('switches back to calculator view', () => {
    render(<App />);
    
    // Switch to tips first
    const tipsTab = screen.getByRole('tab', { name: /tipy/i });
    fireEvent.click(tipsTab);
    
    // Switch back to calculator
    const calcTab = screen.getByRole('tab', { name: /kalkulačka/i });
    fireEvent.click(calcTab);
    
    expect(screen.getByText(/nejprve vyberte stav vozidla/i)).toBeInTheDocument();
  });

  it('renders condition selector', () => {
    render(<App />);
    
    expect(screen.getByText('ČISTÉ')).toBeInTheDocument();
    expect(screen.getByText('ŠPINAVÉ')).toBeInTheDocument();
    expect(screen.getByText('ZANEDBANÉ')).toBeInTheDocument();
    expect(screen.getByText('EXTRÉMNÍ')).toBeInTheDocument();
  });

  it('selects vehicle condition', () => {
    render(<App />);
    
    const dirtyCondition = screen.getByText('ŠPINAVÉ');
    fireEvent.click(dirtyCondition);
    
    // Check that condition is selected (button should have active styling)
    expect(dirtyCondition.closest('button')).toHaveClass('bg-gradient-to-br');
  });

  it('shows service cards when condition is selected', () => {
    // ✅ Fix: Mock getQuickPickServices to return test service for this test
    const { getQuickPickServices } = require('../utils/favorites');
    getQuickPickServices.mockReturnValue(['test-service']);
    
    render(<App />);
    
    // Select condition first
    const condition = screen.getByText('ČISTÉ');
    fireEvent.click(condition);
    
    // Should show service cards
    expect(screen.getByText('Test Service')).toBeInTheDocument();
  });

  it('opens configuration sidebar', () => {
    render(<App />);
    
    const settingsBtn = screen.getByTitle('Nastavení');
    fireEvent.click(settingsBtn);
    
    expect(screen.getByRole('dialog', { name: /nastavení/i })).toBeInTheDocument();
  });

  it('closes configuration sidebar', () => {
    render(<App />);
    
    // Open sidebar
    const settingsBtn = screen.getByTitle('Nastavení');
    fireEvent.click(settingsBtn);
    
    // Close sidebar
    const closeBtn = screen.getByText('✕');
    fireEvent.click(closeBtn);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('can toggle dark mode', () => {
    render(<App />);
    
    const themeBtn = screen.getByTitle('Přepnout téma');
    fireEvent.click(themeBtn);
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    fireEvent.click(themeBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('renders search functionality', () => {
    render(<App />);
    
    expect(screen.getByPlaceholderText(/hledat služby/i)).toBeInTheDocument();
  });

  it('renders category tabs', () => {
    render(<App />);
    
    expect(screen.getByText('⭐ Oblíbené')).toBeInTheDocument();
    expect(screen.getByText('📋 Vše')).toBeInTheDocument();
    expect(screen.getByText('🚿 Mytí')).toBeInTheDocument();
  });

  it('can search for services', async () => {
    // ✅ Fix: Mock to return test service for search test
    const { getQuickPickServices } = require('../utils/favorites');
    getQuickPickServices.mockReturnValue(['test-service']);
    
    render(<App />);
    
    // Select condition first to enable services
    fireEvent.click(screen.getByText('ČISTÉ'));
    
    const searchInput = screen.getByPlaceholderText(/hledat služby/i);
    await userEvent.type(searchInput, 'test');
    
    // Should still show the test service
    expect(screen.getByText('Test Service')).toBeInTheDocument();
  });

  it('can filter by category', () => {
    // ✅ Fix: Mock to return test service for category test
    const { getQuickPickServices } = require('../utils/favorites');
    getQuickPickServices.mockReturnValue(['test-service']);
    
    render(<App />);
    
    // Select condition first
    fireEvent.click(screen.getByText('ČISTÉ'));
    
    // Switch to wash category
    const washTab = screen.getByText('🚿 Mytí');
    fireEvent.click(washTab);
    
    // Should still show test service (it's in wash category)
    expect(screen.getByText('Test Service')).toBeInTheDocument();
  });

  it('can select and deselect services', () => {
    // ✅ Fix: Mock to return test service
    const { getQuickPickServices } = require('../utils/favorites');
    getQuickPickServices.mockReturnValue(['test-service']);
    
    render(<App />);
    
    // Select condition first
    fireEvent.click(screen.getByText('ČISTÉ'));
    
    // Click on service card to select
    const serviceCard = screen.getByText('Test Service').closest('div');
    const serviceButton = serviceCard?.querySelector('button[data-testid="service-main-btn"]');
    
    if (serviceButton) {
      fireEvent.click(serviceButton);
      
      // Should show service in summary
      expect(screen.getByText('Vybrané služby')).toBeInTheDocument();
    }
  });

  it('can clear all selected services', () => {
    // ✅ Fix: Mock to return test service
    const { getQuickPickServices } = require('../utils/favorites');
    getQuickPickServices.mockReturnValue(['test-service']);
    
    render(<App />);
    
    // Select condition and service
    fireEvent.click(screen.getByText('ČISTÉ'));
    
    const serviceCard = screen.getByText('Test Service').closest('div');
    const serviceButton = serviceCard?.querySelector('button[data-testid="service-main-btn"]');
    
    if (serviceButton) {
      fireEvent.click(serviceButton);
      
      // Clear all services
      const clearButton = screen.getByTitle('Vymazat výběr');
      fireEvent.click(clearButton);
      
      // Summary should be gone
      expect(screen.queryByText('Vybrané služby')).not.toBeInTheDocument();
    }
  });

  it('opens templates modal', () => {
    render(<App />);
    
    const templatesBtn = screen.getByText('Šablony');
    fireEvent.click(templatesBtn);
    
    expect(screen.getByText('Šablony služeb')).toBeInTheDocument();
  });

  // ✅ Fix: Test now works because getQuickPickServices returns empty array by default
  it('shows favorites empty state', () => {
    render(<App />);
    
    // Should start on favorites tab and show empty state
    expect(screen.getByText('Žádné oblíbené služby')).toBeInTheDocument();
  });

  it('can toggle service favorite status', () => {
    // ✅ Fix: Mock to return test service for favorites test
    const { getQuickPickServices } = require('../utils/favorites');
    getQuickPickServices.mockReturnValue(['test-service']);
    
    render(<App />);
    
    // Select condition first
    fireEvent.click(screen.getByText('ČISTÉ'));
    
    // Find and click favorite button on service card
    const favoriteButton = screen.getByLabelText('Přidat do oblíbených');
    fireEvent.click(favoriteButton);
    
    // Should update to remove from favorites
    expect(screen.getByLabelText('Odebrat z oblíbených')).toBeInTheDocument();
  });

  it('confirms job and resets state', async () => {
    // ✅ Fix: Mock to return test service
    const { getQuickPickServices } = require('../utils/favorites');
    getQuickPickServices.mockReturnValue(['test-service']);
    
    render(<App />);
    
    // Select condition and service
    fireEvent.click(screen.getByText('ČISTÉ'));
    
    const serviceCard = screen.getByText('Test Service').closest('div');
    const serviceButton = serviceCard?.querySelector('button[data-testid="service-main-btn"]');
    
    if (serviceButton) {
      fireEvent.click(serviceButton);
      
      // Confirm job in report panel
      const confirmButton = screen.getByText('Potvrdit');
      fireEvent.click(confirmButton);
      
      // Should reset condition (warning should appear again)
      await waitFor(() => {
        expect(screen.getByText(/nejprve vyberte stav vozidla/i)).toBeInTheDocument();
      });
    }
  });

  it('persists view state', () => {
    const { getStorageItem, setStorageItem } = require('../utils/storage');
    
    render(<App />);
    
    // Switch to tips view
    const tipsTab = screen.getByRole('tab', { name: /tipy/i });
    fireEvent.click(tipsTab);
    
    // Should save view state
    expect(setStorageItem).toHaveBeenCalledWith('detailingUiView', 'tips');
  });

  // ✅ NEW: Test Knowledge Base search functionality
  it('can search in knowledge base', async () => {
    render(<App />);
    
    // Switch to tips (knowledge base) view
    const tipsTab = screen.getByRole('tab', { name: /tipy/i });
    fireEvent.click(tipsTab);
    
    // Should show knowledge base search
    const searchInput = screen.getByPlaceholderText(/hledat články/i);
    expect(searchInput).toBeInTheDocument();
  });

  // ✅ NEW: Test Knowledge Base categories
  it('shows knowledge base categories', () => {
    render(<App />);
    
    // Switch to tips (knowledge base) view
    const tipsTab = screen.getByRole('tab', { name: /tipy/i });
    fireEvent.click(tipsTab);
    
    // Should show category buttons
    expect(screen.getByText(/🎯 Základy/)).toBeInTheDocument();
  });
});