// src/components/HistorySection.jsx
import React, { useState, useEffect } from 'react';

export default function HistorySection() {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('detailingHistoryGranular') || '[]');
    setHistory(saved);
  }, []);

  // Delete a single history entry
  const deleteItem = (index) => {
    if (!window.confirm('Smazat tuto zakázku z historie?')) return;
    const newHistory = [...history];
    newHistory.splice(index, 1);
    localStorage.setItem('detailingHistoryGranular', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  // Clear all history
  const clearHistory = () => {
    if (!window.confirm('Smazat celou historii zakázek?')) return;
    localStorage.removeItem('detailingHistoryGranular');
    setHistory([]);
  };

  const totalJobs = history.length;
  const totalRevenue = history.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="p-4">
      <div className="bg-white rounded-lg shadow mb-4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">📊 Historie zakázek</h3>
          <button
            onClick={clearHistory}
            className="text-gray-500 hover:text-red-500"
            title="Vymazat vše"
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
                    {item.services.length} služeb – {item.condition}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.date} • {item.price} Kč
                  </div>
                </div>
                <div className="font-semibold text-blue-600 mr-2">
                  {item.time}
                </div>
                <button
                  onClick={() => deleteItem(index)}
                  className="text-gray-400 hover:text-red-500"
                  title="Smazat"
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
    </section>
);
}
