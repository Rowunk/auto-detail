// src/components/CategoryTabs.jsx
import React from 'react';

const categories = [
  { key: 'all',      label: '📋 Vše'        },  // ← new tab
  { key: 'wash',     label: '🚿 Mytí'       },
  { key: 'exterior', label: '🚗 Exteriér'   },
  { key: 'wheels',   label: '⚙️ Kola'       },
  { key: 'interior', label: '🪑 Interiér'   },
  { key: 'protection', label: '🛡️ Ochrana' },
  { key: 'restoration', label: '🔧 Opravy'  },
  { key: 'specialty',  label: '⭐ Speciální'}
];

/**
 * Horizontal scrollable pill-tabs.
 * Props: active (string), onChange(key)
 */
export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="flex space-x-2 overflow-x-auto px-2 py-1">
      {categories.map(cat => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-semibold transition
            ${active === cat.key
              ? 'bg-blue-500 text-white shadow'
              : 'bg-white text-gray-700 border border-gray-300 dark:bg-primary dark:text-gray-200 dark:border-gray-600'}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
