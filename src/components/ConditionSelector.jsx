// src/components/ConditionSelector.jsx
import React from 'react';

const CONDITIONS = [
  { key: 'excellent', label: 'ČISTÉ',     emoji: '🟢', bg: 'from-green-400 to-green-500'   },
  { key: 'dirty',     label: 'ŠPINAVÉ',   emoji: '🟡', bg: 'from-yellow-400 to-yellow-500' },
  { key: 'neglected', label: 'ZANEDBANÉ', emoji: '🔴', bg: 'from-red-400   to-red-500'     },
  { key: 'extreme',   label: 'EXTRÉMNÍ',  emoji: '🟣', bg: 'from-purple-400 to-purple-500' }
];

/**
 * Vehicle‑condition picker.
 */
export default function ConditionSelector({ current, onSelect }) {
  return (
    <div className="p-4">
      <h3 className="text-center font-semibold mb-2">Stav vozidla</h3>
      <div className="grid grid-cols-4 gap-3">
        {CONDITIONS.map(c => (
          <button
            key={c.key}
            onClick={() => onSelect(c.key)}
            className={
              `flex flex-col items-center p-3 rounded-lg shadow-sm transition transform hover:scale-95
               ${current === c.key
                 ? `bg-gradient-to-br ${c.bg} text-white`
                 : 'bg-white border border-gray-300 text-gray-700'}`
            }
          >
            <span className="text-2xl mb-1">{c.emoji}</span>
            <span className="text-sm font-medium">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
