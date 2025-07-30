// src/components/SettingsModal.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';

/**
 * Modal dialog for global settings (Nastavení).
 * Appears when `open` is true and closes via onClose().
 */
export default function SettingsModal({ open, onClose }) {
  const { config, setConfig } = useContext(ConfigContext);
  const [local, setLocal]     = useState(config);

  /* Sync local copy when modal opens */
  useEffect(() => {
    if (open) setLocal(config);
  }, [open, config]);

  if (!open) return null;

  const save = () => {
    setConfig({ ...config, ...local });
    onClose();
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
              onChange={e => setLocal({ ...local, workers: Number(e.target.value) })}
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
              onChange={e => setLocal({ ...local, hourlyRate: Number(e.target.value) })}
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
              onChange={e => setLocal({ ...local, costRatio: Number(e.target.value) })}
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
