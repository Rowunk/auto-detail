import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsModal from '../SettingsModal';
import { ConfigContext } from '../../contexts/ConfigContext';
import type { AppConfig } from '../../types';

const mockConfig: AppConfig = {
  vehicleSize: 'suv',
  workers: 1,
  hourlyRate: 600,
  costRatio: 0.35
};

const TestWrapper = ({ 
  children, 
  config = mockConfig 
}: { 
  children: React.ReactNode;
  config?: AppConfig;
}) => {
  const setConfig = jest.fn();
  return (
    <ConfigContext.Provider value={{ 
      config, 
      setConfig, 
      storageAvailable: true 
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

describe('SettingsModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('does not render when closed', () => {
    const { container } = render(
      <TestWrapper>
        <SettingsModal open={false} onClose={mockOnClose} />
      </TestWrapper>
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('renders when open', () => {
    render(
      <TestWrapper>
        <SettingsModal open={true} onClose={mockOnClose} />
      </TestWrapper>
    );
    
    expect(screen.getByText('⚙️ Nastavení')).toBeInTheDocument();
    expect(screen.getByText(/počet.*pracovníků/i)).toBeInTheDocument();
    expect(screen.getByText(/hodinová.*sazba/i)).toBeInTheDocument();
    expect(screen.getByText(/nákladový.*poměr/i)).toBeInTheDocument();
  });

  it('displays current config values', () => {
    render(
      <TestWrapper>
        <SettingsModal open={true} onClose={mockOnClose} />
      </TestWrapper>
    );
    
    expect(screen.getByDisplayValue('1')).toBeInTheDocument(); // workers
    expect(screen.getByDisplayValue('600')).toBeInTheDocument(); // hourly rate
    expect(screen.getByDisplayValue('0.35')).toBeInTheDocument(); // cost ratio
  });

  it('closes when cancel button is clicked', () => {
    render(
      <TestWrapper>
        <SettingsModal open={true} onClose={mockOnClose} />
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByText('Zrušit'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes when backdrop is clicked', () => {
    render(
      <TestWrapper>
        <SettingsModal open={true} onClose={mockOnClose} />
      </TestWrapper>
    );
    
    const backdrop = screen.getByText('⚙️ Nastavení').closest('div')?.previousSibling;
    if (backdrop) {
      fireEvent.click(backdrop as Element);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('updates workers when select changes', async () => {
    render(
      <TestWrapper>
        <SettingsModal open={true} onClose={mockOnClose} />
      </TestWrapper>
    );
    
    const workersSelect = screen.getByDisplayValue('1');
    await userEvent.selectOptions(workersSelect, '3');
    
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });

  it('updates hourly rate when input changes', async () => {
    render(
      <TestWrapper>
        <SettingsModal open={true} onClose={mockOnClose} />
      </TestWrapper>
    );
    
    const rateInput = screen.getByDisplayValue('600');
    await userEvent.clear(rateInput);
    await userEvent.type(rateInput, '800');
    
    expect(screen.getByDisplayValue('800')).toBeInTheDocument();
  });

  it('updates cost ratio when input changes', async () => {
    render(
      <TestWrapper>
        <SettingsModal open={true} onClose={mockOnClose} />
      </TestWrapper>
    );
    
    const ratioInput = screen.getByDisplayValue('0.35');
    await userEvent.clear(ratioInput);
    await userEvent.type(ratioInput, '0.5');
    
    expect(screen.getByDisplayValue('0.5')).toBeInTheDocument();
  });

  it('saves changes and closes on save button click', () => {
    const setConfig = jest.fn();
    
    render(
      <ConfigContext.Provider value={{ 
        config: mockConfig, 
        setConfig, 
        storageAvailable: true 
      }}>
        <SettingsModal open={true} onClose={mockOnClose} />
      </ConfigContext.Provider>
    );
    
    fireEvent.click(screen.getByText('Uložit'));
    
    expect(setConfig).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});