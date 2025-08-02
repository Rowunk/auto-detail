// src/components/__test__/ConfigSidebar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfigSidebar from '../ConfigSidebar';
import { ConfigContext } from '../../contexts/ConfigContext';
import type { AppConfig } from '../../types';

const dummyConfig: AppConfig = {
  vehicleSize: 'midsize', workers: 2, hourlyRate: 1000, costRatio: 0.3
};

function setup(open: boolean, config = dummyConfig) {
  const setConfig = jest.fn();
  const onClose = jest.fn();

  render(
    <ConfigContext.Provider value={{ config, setConfig, storageAvailable: true }}>
      <ConfigSidebar open={open} onClose={onClose} />
    </ConfigContext.Provider>
  );

  return { setConfig, onClose };
}

describe('ConfigSidebar', () => {
  it('does not render when open=false', () => {
    const { onClose } = setup(false);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders correct UI when open=true', () => {
    setup(true);
    // Section and vehicle size selector
    expect(screen.getByRole('dialog', { name: /nastavení/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Velikost vozidla/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Pracovníků/i)).toBeInTheDocument();
    expect(screen.getByText(/Hodinová sazba/i)).toBeInTheDocument();
    expect(screen.getByText(/Poměr nákladů/i)).toBeInTheDocument();
  });

  it('clicking backdrop closes sidebar without saving', () => {
    const { setConfig, onClose } = setup(true);
    fireEvent.click(screen.getByTestId('sidebar-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(setConfig).not.toHaveBeenCalled();
  });

  it('pressing Escape key closes sidebar', () => {
    const { setConfig, onClose } = setup(true);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(setConfig).not.toHaveBeenCalled();
  });

  it('updating workers, rate and ratio then saving calls setConfig and onClose', async () => {
    const { setConfig, onClose } = setup(true);

    const selectWorkers = screen.getByLabelText(/Pracovníků/i);
    await userEvent.selectOptions(selectWorkers, '4');

    const inputRate = screen.getByLabelText(/Hodinová sazba/i);
    await userEvent.clear(inputRate);
    await userEvent.type(inputRate, '1200');

    const inputRatio = screen.getByLabelText(/Poměr nákladů/i);
    await userEvent.clear(inputRatio);
    await userEvent.type(inputRatio, '0.5');

    fireEvent.click(screen.getByText(/Uložit/i));

    expect(setConfig).toHaveBeenCalledTimes(1);
    expect(setConfig).toHaveBeenCalledWith({
      ...dummyConfig,
      workers: 4,
      hourlyRate: 1200,
      costRatio: 0.5
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('clicking Cancel does not update configuration', () => {
    const { setConfig, onClose } = setup(true);

    fireEvent.click(screen.getByText(/Zrušit/i));

    expect(setConfig).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
