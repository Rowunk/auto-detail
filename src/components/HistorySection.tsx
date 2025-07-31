// src/components/HistorySection.tsx
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { ConfigContext } from '../contexts/ConfigContext';
import type { HistoryEntry } from '../types';
import Toast from './Toast';

export interface HistorySectionProps {
  /** Called when user clicks “Kopírovat služby” */
  onCopyServices?: (services: string[]) => void;
}

/**
 * Displays job history and lets you copy services into the calculator.
 */
export default function HistorySection({
  onCopyServices
}: HistorySectionProps): React.ReactElement {
  const { storageAvailable } = useContext(ConfigContext);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [toast, setToast] = useState<string>('');

  useEffect(() => {
    if (storageAvailable) {
      setHistory(getStorageItem<HistoryEntry[]>('detailingHistoryGranular', []));
    }
  }, [storageAvailable]);

  const deleteItem = (idx: number) => {
    if (!window.confirm('Smazat tuto zakázku?')) return;
    if (!storageAvailable) return setToast('Lokální úložiště nedostupné');
    const h = [...history];
    h.splice(idx, 1);
    setStorageItem('detailingHistoryGranular', h);
    setHistory(h);
    setToast('Zakázka smazána');
  };

  const clearHistory = () => {
    if (!window.confirm('Smazat celou historii?')) return;
    if (!storageAvailable) return setToast('Lokální úložiště nedostupné');
    removeStorageItem('detailingHistoryGranular');
    setHistory([]);
    setToast('Historie smazána');
  };

  const handleCopy = (services: string[]) => {
    if (!window.confirm('Kopírovat služby z této zakázky?')) return;
    onCopyServices?.(services);
    setToast('Služby zkopírovány do kalkulačky');
  };

  const totalJobs = history.length;
  const totalRevenue = history.reduce((sum, e) => sum + (e.price || 0), 0);

  return (
    <section className="p-4">
      {!storageAvailable && (
        <div className="bg-yellow-100 p-3 mb-4 rounded text-yellow-800">
          Lokální úložiště není dostupné.
        </div>
      )}

      <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold">📊 Historie zakázek</h3>
        <button
          onClick={clearHistory}
          disabled={!storageAvailable}
          className="text-red-500 hover:text-red-700"
          title="Vymazat vše"
        >
          🗑️
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <span className="text-5xl opacity-30 block">📊</span>
          <p>Žádné zakázky</p>
        </div>
      ) : (
        history.map((e, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {e.services.length} služeb – {e.condition}
              </div>
              <div className="text-xs text-gray-500">
                {e.date} • {e.price} Kč
              </div>
            </div>
            <div className="flex items-center gap-3">
              {onCopyServices && (
                <button
                  onClick={() => handleCopy(e.services)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Kopírovat služby
                </button>
              )}
              <span className="font-semibold text-blue-600">{e.time}</span>
              <button
                onClick={() => deleteItem(i)}
                disabled={!storageAvailable}
                className="text-gray-400 hover:text-red-500"
                title="Smazat"
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-2xl font-bold text-blue-600">{totalJobs}</div>
          <div>Celkem zakázek</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-2xl font-bold text-blue-600">
            {totalRevenue.toLocaleString()} Kč
          </div>
          <div>Celkový obrat</div>
        </div>
      </div>

      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </section>
  );
}

HistorySection.propTypes = {
  onCopyServices: PropTypes.func
};
