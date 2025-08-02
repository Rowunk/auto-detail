// src/components/__test__/ServiceInfoModal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceInfoModal from '../ServiceInfoModal';
import { ConfigContext } from '../../contexts/ConfigContext';
import type { ServiceItem, AppConfig } from '../../types';

const mockConfig: AppConfig = {
  vehicleSize: 'suv',
  workers: 2,
  hourlyRate: 600,
  costRatio: 0.35
};

const mockService: ServiceItem = {
  name: 'Test Service',
  category: 'wash',
  order: 10,
  times: { excellent: 30, dirty: 45, neglected: 60, extreme: 90 },
  basePrice: { excellent: 300, dirty: 400, neglected: 500, extreme: 600 }
};

const renderWithContext = (
  ui: React.ReactElement,
  config: AppConfig = mockConfig
) => {
  return render(
    <ConfigContext.Provider value={{ 
      config, 
      setConfig: jest.fn(), 
      storageAvailable: true 
    }}>
      {ui}
    </ConfigContext.Provider>
  );
};

describe('ServiceInfoModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('does not render when closed', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={false}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders service information when open', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(screen.getByText(/🚿 Mytí/)).toBeInTheDocument();
    expect(screen.getByText(/Pořadí: 10/)).toBeInTheDocument();
  });

  it('displays service description', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="exterior-rinse"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(/Počáteční oplach karoserie/)).toBeInTheDocument();
  });

  it('shows current vehicle settings', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('suv')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays time and price breakdown for all conditions', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Čisté')).toBeInTheDocument();
    expect(screen.getByText('Špinavé')).toBeInTheDocument();
    expect(screen.getByText('Zanedbané')).toBeInTheDocument();
    expect(screen.getByText('Extrémní')).toBeInTheDocument();

    // Check calculated values (based on suv=1.0 multiplier, 2 workers)
    // excellent: 30 min / 2 workers = 15 min, 300 * 1.0 = 300 Kč
    expect(screen.getByText(/15 min • 300 Kč/)).toBeInTheDocument();
  });

  it('shows base values for comparison', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Base values should be shown
    expect(screen.getByText(/Základ: 30 min • 300 Kč/)).toBeInTheDocument();
  });

  it('displays professional tips based on category', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Should show wash category tips
    expect(screen.getByText(/Vždy začněte oplachováním/)).toBeInTheDocument();
    expect(screen.getByText(/metodu "shora dolů"/)).toBeInTheDocument();
  });

  it('closes when close button is clicked', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /zavřít/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes when X button is clicked', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const xButton = screen.getByLabelText('Zavřít');
    fireEvent.click(xButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes when backdrop is clicked', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const backdrop = screen.getByRole('dialog').previousSibling;
    fireEvent.click(backdrop as Element);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calculates different values for different vehicle sizes', () => {
    const largeVehicleConfig = { ...mockConfig, vehicleSize: 'van' as const };
    
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="test-service"
        isOpen={true}
        onClose={mockOnClose}
      />,
      largeVehicleConfig
    );

    // van multiplier is 1.1, so 300 * 1.1 = 330
    expect(screen.getByText(/17 min • 330 Kč/)).toBeInTheDocument();
  });

  it('shows different tips for different service categories', () => {
    const wheelService: ServiceItem = {
      ...mockService,
      category: 'wheels',
      name: 'Wheel Service'
    };

    renderWithContext(
      <ServiceInfoModal
        service={wheelService}
        serviceKey="test-wheel-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Should show wheel category tips
    expect(screen.getByText(/Kola čistěte jako první/)).toBeInTheDocument();
  });

  it('shows fallback description for unknown service keys', () => {
    renderWithContext(
      <ServiceInfoModal
        service={mockService}
        serviceKey="unknown-service"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(/Profesionální auto detailing služba/)).toBeInTheDocument();
  });
});