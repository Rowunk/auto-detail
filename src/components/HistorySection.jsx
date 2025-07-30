// src/components/HistorySection.jsx
import React, { useState, useEffect, useContext } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { ConfigContext } from '../contexts/ConfigContext';
import Toast from './Toast';

export default function HistorySection() {
  const { storageAvailable } = useContext(ConfigContext);
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState('');

  // Load history from localStorage on mount
  useEffect(() => {
    if (storageAvailable) {
      const saved = getStorageItem('detailingHistoryGranular', []);
      setHistory(saved);
    }
  }, [storageAvailable]);

  // Delete a single history entry
  const deleteItem = (index) => {
    if (!window.confirm('Smazat tuto zakázku z historie?')) return;
    
    if (!storageAvailable) {
      setToast('Operace není možná - lokální úložiště není dostupné');
      return;
    }
    
    const newHistory = [...history];
    newHistory.splice(index, 1);
    
    const saved = setStorageItem('detailingHistoryGranular', newHistory);
    if (saved) {
      setHistory(newHistory);
      setToast('Zakázka smazána');
    } else {
      setToast('Smazání selhalo ⚠️');
    }
  };

  // Clear all history
  const clearHistory = () => {
    if (!window.confirm('Smazat celou historii zakázek?')) return;
    
    if (!storageAvailable) {
      setToast('Operace není možná - lokální úložiště není dostupné');
      return;
    }
    
    const removed = removeStorageItem('detailingHistoryGranular');
    if (removed) {
      setHistory([]);
      setToast('Historie smazána');
    } else {
      setToast('Smazání historie selhalo ⚠️');
    }
  };

  const totalJobs = history.length;
  const totalRevenue = history.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="p-4">
      {!storageAvailable && (
        <div className="bg-yellow-100 text-yellow-800 p-3 mb-4 rounded-lg">
          ⚠️ Lokální úložiště není dostupné. Historie zakázek nemůže být zobrazena ani upravena.
        </div>
      )}
    
      <div className="bg-white rounded-lg shadow mb-4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">📊 Historie zakázek</h3>
          <button
            onClick={clearHistory}
            className="text-gray-500 hover:text-red-500"
            title="Vymazat vše"
            disabled={!storageAvailable}
          >
            🗑️
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <span className="text-5xl opacity-30 block">📊</span>
            <p>Zatím žádné uložené zakázky</p>
          </div>
        ) : (
          <div>
            {history.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">
                    {item.services?.length || 0} služeb – {item.condition || 'neznámo'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.date || 'neznámo'} • {item.price || 0} Kč
                  </div>
                </div>
                <div className="font-semibold text-blue-600 mr-2">
                  {item.time || '?'}
                </div>
                <button
                  onClick={() => deleteItem(index)}
                  className="text-gray-400 hover:text-red-500"
                  title="Smazat"
                  disabled={!storageAvailable}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-blue-600">{totalJobs}</div>
          <div className="text-sm text-gray-500">Celkem zakázek</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-2xl font-bold text-blue-600">
            {totalRevenue.toLocaleString()} Kč
          </div>
          <div className="text-sm text-gray-500">Celkový obrat</div>
        </div>
      </div>
      
      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </section>
  );
}