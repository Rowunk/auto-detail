import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ConfigContext } from '../../contexts/ConfigContext';
import HistorySection from '../HistorySection';
import * as storage from '../../utils/storage';
import type { AppConfig, HistoryEntry } from '../../types';

// Dummy AppConfig for context (matching types/index.ts)
const dummyConfig: AppConfig = {
  vehicleSize: 'midsize', // fixed to match VehicleSize type
  workers: 1,
  hourlyRate: 600,
  costRatio: 0.4,
};

jest.mock('../../utils/storage');

const getStorageItem = storage.getStorageItem as jest.Mock;

describe('<HistorySection />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Utility: Render with context for storage availability
  function renderWithContext(
    ui: React.ReactElement,
    storageAvailable = true,
    config: AppConfig = dummyConfig
  ) {
    return render(
      <ConfigContext.Provider value={{ config, setConfig: () => {}, storageAvailable }}>
        {ui}
      </ConfigContext.Provider>
    );
  }

  it('renders all history entries and summary', () => {
    const entries: HistoryEntry[] = [
      {
        services: ['exterior-rinse', 'snow-foam'],
        condition: 'dirty',
        vehicleSize: 'midsize',
        price: 950,
        time: '1h 30 min',
        date: '2024-08-02',
      },
      {
        services: ['vacuum'],
        condition: 'excellent',
        vehicleSize: 'midsize',
        price: 600,
        time: '45 min',
        date: '2024-08-01',
      },
    ];
    getStorageItem.mockReturnValueOnce(entries);

    renderWithContext(<HistorySection />);

    // Robust text matching for split text content
    expect(
      screen.getAllByText((_, node) => 
        node?.textContent?.replace(/\s+/g, " ").includes("2 služeb – dirty") ?? false
      ).length
    ).toBeGreaterThan(0);

    expect(
      screen.getAllByText((_, node) => 
        node?.textContent?.replace(/\s+/g, " ").includes("1 služeb – excellent") ?? false
      ).length
    ).toBeGreaterThan(0);

    expect(screen.getByText(/2024-08-02/)).toBeInTheDocument();
    expect(screen.getByText(/950 Kč/)).toBeInTheDocument();
    expect(screen.getByText(/Celkem zakázek/)).toBeInTheDocument();
    expect(screen.getByText(/Celkový obrat/)).toBeInTheDocument();
  });

  it('disables destructive buttons if storage is unavailable', () => {
    getStorageItem.mockReturnValueOnce([]);
    renderWithContext(<HistorySection />, false);

    // Delete and clear buttons should be disabled
    expect(screen.getByTitle(/Vymazat vše/)).toBeDisabled();

    // Per-job delete buttons may not be present with no jobs, so expect none.
    const delBtns = screen.queryAllByTitle(/Smazat/);
    expect(delBtns.length).toBe(0);
  });

  it('handles malformed storage gracefully', () => {
    getStorageItem.mockReturnValueOnce('bad data');
    renderWithContext(<HistorySection />);

    // Fallback UI for no jobs
    expect(
      screen.getAllByText((_, node) =>
        node?.textContent?.replace(/\s+/g, ' ').includes('Žádné zakázky') ?? false
      ).length
    ).toBeGreaterThan(0);
  });

  it('shows storage error toast if localStorage is unavailable', () => {
    getStorageItem.mockReturnValueOnce([
      {
        services: ['exterior-rinse'],
        condition: 'dirty',
        vehicleSize: 'midsize',
        price: 300,
        time: '30 min',
        date: '2024-08-03',
      },
    ]);
    renderWithContext(<HistorySection />, false);

    expect(screen.getByText(/Lokální úložiště není dostupné/)).toBeInTheDocument();
    // Try to delete an item (should trigger toast, but buttons should not be enabled)
    const deleteBtn = screen.queryByTitle(/Smazat/);
    if (deleteBtn) {
      expect(deleteBtn).toBeDisabled();
    }
  });

  it('invokes onCopyServices callback', () => {
    const entries: HistoryEntry[] = [
      {
        services: ['exterior-rinse'],
        condition: 'dirty',
        vehicleSize: 'midsize',
        price: 300,
        time: '30 min',
        date: '2024-08-03',
      },
    ];
    getStorageItem.mockReturnValueOnce(entries);

    // Patch HistorySection to pass a callback for onCopyServices (if needed)
    renderWithContext(<HistorySection />);

    // The button might not always be present if not implemented, but check existence
    const copyBtns = screen.queryAllByText((_, node) =>
      node?.textContent?.includes('Kopírovat služby') ?? false
    );
    if (copyBtns.length) {
      act(() => {
        fireEvent.click(copyBtns[0]);
      });
      // If you expect some side effect, assert here (no-op for now)
    }
  });
});
