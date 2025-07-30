// src/components/BottomNav.jsx
import React from 'react';

const tabs = [
  { key: 'calc',    label: 'Kalkulačka', emoji: '🧮' },
  { key: 'history', label: 'Historie',   emoji: '📊' },
  { key: 'tips',    label: 'Tipy',       emoji: '💡' }
];

/**
 * Fixed bottom navigation bar.
 * Props:
 *   active   – currently selected tab key
 *   onChange – fn(key) ⇒ void
 */
export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-primary border-t border-gray-200 dark:border-gray-700 backdrop-blur p-2 flex justify-around z-50">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex flex-col items-center text-sm font-medium transition
            ${active === t.key
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-300'}`}
        >
          <span className="text-lg">{t.emoji}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
