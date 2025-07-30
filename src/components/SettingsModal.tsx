// src/components/SettingsModal.tsx
import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../contexts/ConfigContext';
import { SettingsModalProps } from '../types/props';
import { AppConfig } from '../types';

/**
 * Modal dialog for global settings (Nastavení).
 * Appears when `open` is true and closes via onClose().
 *
 * @param {SettingsModalProps} props - Component props
 * @param {boolean} props.open - Whether the modal is currently visible
 * @param {Function} props.onClose - Callback to close the modal
 * @returns {React.ReactElement|null} Settings modal component or null if not open
 * 
 * @example
 * <SettingsModal open={isOpen} onClose={() => setIsOpen(false)} />
 */
export default function SettingsModal({ open, onClose }: SettingsModalProps): React.ReactElement | null {
  const { config, setConfig } = useContext(ConfigContext);
  const [local, setLocal] = useState<AppConfig>(config);

  /* Sync local copy when modal opens */
  useEffect(() => {
    if (open) setLocal(config);
  }, [open, config]);

  if (!open) return null;

  const save = (): void => {
    setConfig({ ...config, ...local });
    onClose();
  };

  const handleWorkersChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setLocal({ ...local, workers: Number(e.target.value) });
  };

  const handleHourlyRateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocal({ ...local, hourlyRate: Number(e.target.value) });
  };

  const handleCostRatioChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocal({ ...local, costRatio: Number(e.target.value) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-11/12 sm:w-96 rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6">
        <h2 className="text-lg font-semibold mb-4">⚙️ Nastavení</h2>

        <div className="space-y-4">
          {/* Workers */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Počet&nbsp;pracovníků
            </label>
            <select
              value={local.workers}
              onChange={handleWorkersChange}
              className="w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Hourly rate */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hodinová&nbsp;sazba&nbsp;(Kč)
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={local.hourlyRate}
              onChange={handleHourlyRateChange}
              className="w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Cost ratio */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nákladový&nbsp;poměr&nbsp;(0 – 1)
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.05"
              value={local.costRatio}
              onChange={handleCostRatioChange}
              className="w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Zrušit
          </button>
          <button
            onClick={save}
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Uložit
          </button>
        </div>
      </div>
    </div>
  );
}

SettingsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};