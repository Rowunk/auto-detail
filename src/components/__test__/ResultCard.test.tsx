// src/components/__test__/ResultCard.test.tsx - COMPLETELY FIXED VERSION
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResultCard from '../ResultCard';
import { ConfigContext } from '../../contexts/ConfigContext';

// ✅ Fix: Define mock data inside jest.mock callback to avoid hoisting issues
jest.mock('../../services/serviceDatabase', () => ({
  serviceDatabase: {
    'svc-a': {
      name: 'Služba A',
      times: { excellent: 30, dirty: 45, neglected: 60, extreme: 90 },
      basePrice: { excellent: 300, dirty: 350, neglected: 400, extreme: 500 },
    },
    'svc-b': {
      name: 'Služba B',
      times: { excellent: 20, dirty: 30, neglected: 50, extreme: 60 },
      basePrice: { excellent: 150, dirty: 160, neglected: 200, extreme: 300 },
    },
  },
  sizeMultipliers: { small: 1, medium: 1.1, large: 1.25 }
}));

jest.mock('../../utils/storage', () => ({
  getStorageItem: jest.fn(() => []),
  setStorageItem: jest.fn(() => true),
}));

// Helper for context
function renderWithConfig(
  ui: React.ReactElement,
  {
    config = {
      vehicleSize: 'small' as const,
      workers: 1,
      costRatio: 0.25,
      hourlyRate: 600,
    },
    storageAvailable = true,
  }: any = {}
) {
  return render(
    <ConfigContext.Provider value={{ config, setConfig: jest.fn(), storageAvailable }}>
      {ui}
    </ConfigContext.Provider>
  );
}

describe('ResultCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders null if no services selected', () => {
    const { container } = renderWithConfig(<ResultCard selected={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows correct summary for one service', () => {
    renderWithConfig(<ResultCard selected={['svc-a']} condition="dirty" />);
    
    // Check for service name in heading
    expect(screen.getByRole('heading', { name: /služba a/i })).toBeInTheDocument();
    
    // Check for condition label
    expect(screen.getByText('dirty')).toBeInTheDocument();
    
    // ✅ Fix: Use getAllByText for multiple time/price elements and check first one
    const timeElements = screen.getAllByText(/45 min/);
    expect(timeElements.length).toBeGreaterThan(0);
    
    const priceElements = screen.getAllByText(/350.*Kč/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('shows warning when condition is null', () => {
    renderWithConfig(<ResultCard selected={['svc-a']} condition={null} />);
    
    // ✅ Fix: Use getAllByText for multiple warning elements
    const warningElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('Vyberte') && 
             element?.textContent?.includes('Stav vozidla') && 
             element?.textContent?.includes('excellent') || false;
    });
    
    expect(warningElements.length).toBeGreaterThan(0);
  });

  it('renders multiple services and their breakdown', () => {
    renderWithConfig(
      <ResultCard selected={['svc-a', 'svc-b']} condition="excellent" />
    );
    
    // Check for multi-service heading
    expect(screen.getByText('2 služeb')).toBeInTheDocument();
    
    // ✅ Fix: Use getAllByText and check that services exist in breakdown
    const serviceAElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('1. Služba A') || false;
    });
    expect(serviceAElements.length).toBeGreaterThan(0);
    
    const serviceBElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('2. Služba B') || false;
    });
    expect(serviceBElements.length).toBeGreaterThan(0);
  });

  it('handles Save and shows toast', () => {
    const toastMock = jest.fn();
    renderWithConfig(<ResultCard selected={['svc-a']} condition="dirty" onToast={toastMock} />);
    
    const saveButton = screen.getByRole('button', { name: /uložit/i });
    fireEvent.click(saveButton);
    
    expect(toastMock).toHaveBeenCalledWith(expect.stringMatching(/uložen/));
  });

  it('shows error if storage unavailable', () => {
    const toastMock = jest.fn();
    renderWithConfig(<ResultCard selected={['svc-a']} condition="dirty" onToast={toastMock} />, {
      storageAvailable: false,
    });
    
    const saveButton = screen.getByRole('button', { name: /uložit/i });
    fireEvent.click(saveButton);
    
    expect(toastMock).toHaveBeenCalledWith(expect.stringMatching(/úložiště|uložení/i));
  });

  it('uses Web Share API when available', async () => {
    const toastMock = jest.fn();
    const originalShare = global.navigator.share;
    global.navigator.share = jest.fn().mockResolvedValue(undefined);

    renderWithConfig(<ResultCard selected={['svc-a']} condition="dirty" onToast={toastMock} />);
    
    const shareButton = screen.getByRole('button', { name: /sdílet/i });
    fireEvent.click(shareButton);
    
    await waitFor(() => {
      expect(global.navigator.share).toHaveBeenCalled();
    });

    global.navigator.share = originalShare;
  });

  it('falls back to clipboard when share is undefined', async () => {
    const toastMock = jest.fn();
    const originalClipboard = global.navigator.clipboard;
    const originalShare = global.navigator.share;
    
    (global.navigator as any).share = undefined;
    (global.navigator as any).clipboard = {
      writeText: jest.fn().mockResolvedValueOnce(undefined),
    };
    
    renderWithConfig(<ResultCard selected={['svc-a']} condition="dirty" onToast={toastMock} />);
    
    const shareButton = screen.getByRole('button', { name: /sdílet/i });
    fireEvent.click(shareButton);
    
    await waitFor(() => {
      expect(global.navigator.clipboard.writeText).toHaveBeenCalled();
      expect(toastMock).toHaveBeenCalledWith(expect.stringMatching(/schránk/i));
    });
    
    global.navigator.clipboard = originalClipboard;
    global.navigator.share = originalShare;
  });

  it('shows error toast if share fails', async () => {
    const toastMock = jest.fn();
    const originalShare = global.navigator.share;
    global.navigator.share = jest.fn().mockRejectedValue(new Error('fail'));
    
    renderWithConfig(<ResultCard selected={['svc-a']} condition="dirty" onToast={toastMock} />);
    
    const shareButton = screen.getByRole('button', { name: /sdílet/i });
    fireEvent.click(shareButton);
    
    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(expect.stringMatching(/zrušeno|selhalo/i));
    });
    
    global.navigator.share = originalShare;
  });

  it('handles Detail button', () => {
    const toastMock = jest.fn();
    renderWithConfig(<ResultCard selected={['svc-a']} condition="dirty" onToast={toastMock} />);
    
    const detailButton = screen.getByRole('button', { name: /detail/i });
    fireEvent.click(detailButton);
    
    expect(toastMock).toHaveBeenCalledWith(expect.stringMatching(/přehled/i));
  });

  it('calculates financial metrics correctly', () => {
    renderWithConfig(<ResultCard selected={['svc-a']} condition="dirty" />);
    
    // Check that basic financial calculations are displayed
    expect(screen.getByText(/náklady/i)).toBeInTheDocument();
    expect(screen.getByText(/marže/i)).toBeInTheDocument();
    expect(screen.getByText(/zisk/i)).toBeInTheDocument();
    
    // Check for percentage symbol (margin)
    expect(screen.getByText(/75.*%/)).toBeInTheDocument();
  });

  it('displays breakdown section for single service', () => {
    renderWithConfig(<ResultCard selected={['svc-a']} condition="excellent" />);
    
    // Check that breakdown contains service info
    const breakdownSection = screen.getByText((content, element) => {
      return element?.className?.includes('bg-white bg-opacity-20') && 
             element?.textContent?.includes('Služba A') || false;
    });
    
    expect(breakdownSection).toBeInTheDocument();
  });
});