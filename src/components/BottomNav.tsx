// src/components/BottomNav.tsx
import React from 'react';
import PropTypes from 'prop-types';
import type { BottomNavProps } from '../types/props';

type TabKey = 'calc' | 'history' | 'tips' | 'services';

const tabs: { key: TabKey; label: string; emoji: string }[] = [
  { key: 'calc', label: 'Kalkulačka', emoji: '🧮' },
  { key: 'history', label: 'Historie', emoji: '📊' },
  { key: 'tips', label: 'Tipy', emoji: '💡' },
  { key: 'services', label: 'Služby', emoji: '🛠️' },
];

/**
 * Fixed bottom navigation bar with tabs for application views.
 */
export default function BottomNav({
  active,
  onChange,
}: BottomNavProps): React.ReactElement {
  return (
    <nav
      role="navigation"
      aria-label="Hlavní navigace"
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-primary border-t border-gray-200 dark:border-gray-700 backdrop-blur p-2 flex justify-around z-40"
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={active === t.key}
          aria-label={t.label}
          onClick={() => onChange(t.key)}
          className={`flex flex-col items-center text-sm font-medium transition ${
            active === t.key
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-300'
          }`}
        >
          <span className="text-lg">{t.emoji}</span>
          <span className="sr-only">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

BottomNav.propTypes = {
  active: PropTypes.oneOf(['calc', 'history', 'tips', 'services']).isRequired,
  onChange: PropTypes.func.isRequired,
};
