// src/components/SelectionSummary.jsx
import React from 'react';
import { serviceDatabase } from '../services/serviceDatabase';

/**
 * Displays selected services as tags and a button to clear all.
 */
export default function SelectionSummary({ selected, onClear }) {
  if (selected.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">Vybrané služby</h4>
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-red-500 transition"
          title="Vymazat výběr"
        >
          🗑️
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selected.map(key => {
          const svc = serviceDatabase[key];
          return (
            <span
              key={key}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {svc?.name ?? key}
            </span>
          );
        })}
      </div>
    </div>
  );
}
