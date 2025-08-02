// src/components/__test__/ReportPanel.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ReportPanel from '../ReportPanel';
import { ConfigContext } from '../../contexts/ConfigContext';

jest.mock('../../utils/storage', () => ({
  getStorageItem: jest.fn(() => []),
  setStorageItem: jest.fn(),
}));

jest.mock('../../utils/favorites', () => ({
  incrementUsage: jest.fn(() => true),
}));

jest.mock('../../utils/jobCalculator', () => ({
  calculateJob: jest.fn(() => ({
    breakdown: [
      { name: 'Ruční mytí', price: 100, time: 10 },
      { name: 'Vysátí interiéru', price: 200, time: 20 },
    ],
    totalTime: 30,
    totalPrice: 300,
    cost: 75,
    profit: 225,
    marginPct: 75,
  })),
}));

jest.mock('../../utils/format', () => ({
  formatMinutes: jest.fn((min) => `${min} min`),
}));

// Provide a minimal config/context
const ctx = {
  config: {
    vehicleSize: 'sedan',
    workers: 1,
    hourlyRate: 600,
    costRatio: 0.25,
  },
  setConfig: jest.fn(),
  storageAvailable: true,
};

const setup = (props = {}) => {
  const defaultProps = {
    selected: ['hand-wash', 'vacuum'],
    condition: 'dirty',
    onJobConfirmed: jest.fn(),
    ...props,
  };
  return render(
    <ConfigContext.Provider value={ctx as any}>
      <ReportPanel {...defaultProps} />
    </ConfigContext.Provider>
  );
};

describe('ReportPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders summary grid and details panel', () => {
    setup();

    // Check summary grid for correct times and prices
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getAllByText('300 Kč').length).toBeGreaterThan(0);
    expect(screen.getByText('75 Kč')).toBeInTheDocument();
    expect(screen.getByText('225 Kč')).toBeInTheDocument();
    expect(screen.getByText(/Čas práce/)).toBeInTheDocument();
    expect(screen.getByText(/Původní cena/)).toBeInTheDocument();
    expect(screen.getByText(/Náklady/)).toBeInTheDocument();
    expect(screen.getByText(/Zisk/i)).toBeInTheDocument();

    // Subtotal, discount, after-discount, flat, and grand total rows
    expect(screen.getByText(/Mezisoučet/i)).toBeInTheDocument();
    expect(screen.getAllByText('300 Kč').length).toBeGreaterThan(0); // subtotal
    expect(screen.getByText(/Po slevě/i)).toBeInTheDocument();
    expect(screen.getByText(/Celkem po úpravě/i)).toBeInTheDocument();

    // Notes input (textarea, by placeholder)
    expect(screen.getByPlaceholderText(/vysvětlení/i)).toBeInTheDocument();
  });

  it('handles discount, adjustment, and notes input', () => {
    setup();

    // Discount (first spinbutton)
    const spinboxes = screen.getAllByRole('spinbutton');
    fireEvent.change(spinboxes[0], { target: { value: '12' } });
    expect(spinboxes[0]).toHaveValue(12);

    // Flat adjustment (second spinbutton)
    fireEvent.change(spinboxes[1], { target: { value: '50' } });
    expect(spinboxes[1]).toHaveValue(50);

    // Notes
    const notes = screen.getByPlaceholderText(/vysvětlení/i);
    fireEvent.change(notes, { target: { value: 'VIP klient' } });
    expect(notes).toHaveValue('VIP klient');
  });

  it('toggles details and allows per-line price override', () => {
    setup();

    // Click "Detaily" to reveal detail inputs
    fireEvent.click(screen.getByRole('button', { name: /detaily/i }));

    // There should now be inputs for price overrides
    const priceInputs = screen.getAllByRole('spinbutton');
    // priceInputs[2] is for the first detail line, [3] for the second (depends on layout)
    // The order is: discount, adjustment, detail_1, detail_2
    expect(priceInputs.length).toBeGreaterThanOrEqual(4);

    fireEvent.change(priceInputs[2], { target: { value: '250' } });
    expect(priceInputs[2]).toHaveValue(250);

    fireEvent.change(priceInputs[3], { target: { value: '180' } });
    expect(priceInputs[3]).toHaveValue(180);
  });

  it('calls onJobConfirmed and shows toast on confirm', async () => {
    const onJobConfirmed = jest.fn();
    setup({ onJobConfirmed });

    // Click "Potvrdit"
    fireEvent.click(screen.getByRole('button', { name: /potvrdit/i }));
    // Toast should appear
    await waitFor(() =>
      expect(
        screen.getByText(/Zakázka uložena/i)
      ).toBeInTheDocument()
    );

    // onJobConfirmed is called after timeout
    act(() => {
      jest.advanceTimersByTime(1600);
    });
    await waitFor(() => expect(onJobConfirmed).toHaveBeenCalled());
  });

  it('shows prompt if condition is null', () => {
    setup({ condition: null });

    expect(screen.getByText(/vyberte stav vozidla/i)).toBeInTheDocument();
    expect(screen.queryByText(/č as práce/i)).not.toBeInTheDocument();
  });

  it('shows toast if storage unavailable', async () => {
    const unavailableCtx = { ...ctx, storageAvailable: false };
    render(
      <ConfigContext.Provider value={unavailableCtx as any}>
        <ReportPanel
          selected={['hand-wash', 'vacuum']}
          condition="dirty"
          onJobConfirmed={jest.fn()}
        />
      </ConfigContext.Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /potvrdit/i }));
    await waitFor(() =>
      expect(
        screen.getByText(/úložiště není dostupné/i)
      ).toBeInTheDocument()
    );
  });
});
