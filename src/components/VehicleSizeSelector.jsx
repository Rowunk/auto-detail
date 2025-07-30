import React from 'react';

const sizes = [
  { key: 'small',  label: 'Malé',   emoji: '🚗' },
  { key: 'sedan',  label: 'Sedan',  emoji: '🚙' },
  { key: 'combi',  label: 'Kombi',  emoji: '🚘' },
  { key: 'suv',    label: 'SUV',    emoji: '🚚' },
  { key: 'van',    label: 'Van',    emoji: '🚐' },
  { key: 'truck',  label: 'Truck',  emoji: '🚛' }
];

/** UI selector very similar to Stav vozidla */
export default function VehicleSizeSelector({ current, onSelect }) {
  return (
    <div className="p-4">
      <h3 className="text-center font-semibold mb-2">Velikost vozidla</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {sizes.map(s => (
          <button
            key={s.key}
            onClick={() => onSelect(s.key)}
            className={`flex flex-col items-center p-3 rounded-lg shadow-sm transition
              ${current === s.key
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-300 text-gray-700'}`}
          >
            <span className="text-2xl mb-1">{s.emoji}</span>
            <span className="text-sm font-medium">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
