// src/components/__test__/ServiceCard.test.tsx - Updated with info button tests
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceCard from '../ServiceCard';
import { ConfigContext } from '../../contexts/ConfigContext';
import { serviceDatabase, sizeMultipliers } from '../../services/serviceDatabase';
import type { AppConfig } from '../../types';

const mockConfig: AppConfig = {
  vehicleSize: 'suv',    // matches sizeMultipliers and actual DB
  workers: 2,
  hourlyRate: 600,
  costRatio: 0.35
};

const providerWrapper =
  (config: Partial<AppConfig> = {}) =>
  ({ children }: { children: React.ReactNode }) =>
    (
      <ConfigContext.Provider
        value={{
          config: { ...mockConfig, ...config },
          setConfig: jest.fn(),
          storageAvailable: true,
        }}
      >
        {children}
      </ConfigContext.Provider>
    );

// Use a real service from the DB, so keys are guaranteed to exist:
const serviceKey = 'hand-wash';
const service = serviceDatabase[serviceKey];

describe('ServiceCard', () => {
  it('renders the service name and adjusted time/price', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );

    // From database: times.excellent = 30, basePrice.excellent = 300, multiplier (suv) = 1.0, workers = 2
    // Adjusted time: Math.round(30 * 1.0 / 2) = 15
    // Adjusted price: Math.round(300 * 1.0) = 300

    expect(screen.getByText(service.name)).toBeInTheDocument();
    expect(screen.getByText(/15 min/)).toBeInTheDocument();
    expect(screen.getByText(/300 Kč/)).toBeInTheDocument();
  });

  it('renders info button with correct accessibility', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );

    const infoButton = screen.getByLabelText('Zobrazit informace o službě');
    expect(infoButton).toBeInTheDocument();
    expect(infoButton).toHaveAttribute('title', 'Informace o službě');
    expect(infoButton).toHaveTextContent('i');
  });

  it('opens info modal when info button is clicked', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );

    const infoButton = screen.getByLabelText('Zobrazit informace o službě');
    fireEvent.click(infoButton);

    // Check that modal is now open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(service.name)).toBeInTheDocument(); // Service name in modal
  });

  it('closes info modal when close button is clicked', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );

    // Open modal
    const infoButton = screen.getByLabelText('Zobrazit informace o službě');
    fireEvent.click(infoButton);

    // Close modal
    const closeButton = screen.getByRole('button', { name: /zavřít/i });
    fireEvent.click(closeButton);

    // Modal should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not trigger service toggle when info button is clicked', () => {
    const toggleMock = jest.fn();
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={toggleMock}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );

    const infoButton = screen.getByLabelText('Zobrazit informace o službě');
    fireEvent.click(infoButton);

    expect(toggleMock).not.toHaveBeenCalled();
  });

  it('renders correct values for different vehicle size and workers', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper({ vehicleSize: 'van', workers: 3 }) }
    );

    // van: multiplier = 1.1, workers = 3, baseTime = 30, basePrice = 300
    // Adjusted time: Math.round(30 * 1.1 / 3) = Math.round(11) = 11
    // Adjusted price: Math.round(300 * 1.1) = 330

    expect(screen.getByText(/11 min/)).toBeInTheDocument();
    expect(screen.getByText(/330 Kč/)).toBeInTheDocument();
  });

  it('shows disabled state when no condition is selected', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition={null}
      />,
      { wrapper: providerWrapper() }
    );
    expect(screen.getByText(/Vyberte stav vozidla/)).toBeInTheDocument();
    // No selection indicator (no "✅")
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('calls toggle prop when main button is clicked', () => {
    const toggleMock = jest.fn();
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={toggleMock}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );
    // The main card button is the one with data-testid
    const mainBtn = screen.getByTestId('service-main-btn');
    fireEvent.click(mainBtn);
    expect(toggleMock).toHaveBeenCalledWith(serviceKey);
  });

  it('toggles favorite state when favorite button is clicked', () => {
    // Set up: Ensure favorite state is reset (clear from localStorage)
    window.localStorage.clear();
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );
    const favBtn = screen.getByLabelText('Přidat do oblíbených');
    expect(favBtn).toHaveAttribute('aria-label', 'Přidat do oblíbených');
    fireEvent.click(favBtn);
    // Label should now toggle (Odebrat z oblíbených)
    expect(favBtn).toHaveAttribute('aria-label', 'Odebrat z oblíbených');
  });

  it('positions info button in top-left corner', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );

    const infoButton = screen.getByLabelText('Zobrazit informace o službě');
    expect(infoButton).toHaveClass('top-2', 'left-2');
  });

  it('adjusts service name padding to accommodate info button', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );

    const serviceName = screen.getByText(service.name);
    expect(serviceName).toHaveClass('pl-8'); // Left padding to avoid overlap with info button
  });

  it('shows info modal with service details', () => {
    render(
      <ServiceCard
        serviceKey={serviceKey}
        service={service}
        isSelected={false}
        toggle={jest.fn()}
        currentCondition="excellent"
      />,
      { wrapper: providerWrapper() }
    );

    // Open modal
    const infoButton = screen.getByLabelText('Zobrazit informace o službě');
    fireEvent.click(infoButton);

    // Check modal content
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('📝 Popis služby')).toBeInTheDocument();
    expect(screen.getByText('💰 Čas a cena podle stavu vozidla')).toBeInTheDocument();
    expect(screen.getByText('💡 Profesionální tipy')).toBeInTheDocument();
  });
});