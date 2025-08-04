// src/components/BottomNav.tsx
import React from 'react';
import type { BottomNavProps } from '../types/props';

type TabKey = 'calc' | 'history' | 'tips' | 'services';

const tabs: { key: TabKey; label: string; emoji: string }[] = [
  { key: 'calc', label: 'Kalkulačka', emoji: '🧮' },
  { key: 'history', label: 'Historie', emoji: '📊' },
  { key: 'tips', label: 'Tipy', emoji: '💡' },
  { key: 'services', label: 'Služby', emoji: '🛠️' },
];

/**
 * Modern fixed bottom navigation bar with glassmorphism design.
 */
export default function BottomNav({
  active,
  onChange,
}: BottomNavProps): React.ReactElement {
  return (
    <nav
      role="navigation"
      aria-label="Hlavní navigace"
      className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg z-40"
    >
      <div className="flex justify-around items-center px-2 py-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            aria-label={tab.label}
            onClick={() => onChange(tab.key)}
            className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              active === tab.key
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
            }`}
          >
            <span className="text-xl mb-1">{tab.emoji}</span>
            <span className="text-xs font-medium whitespace-nowrap">
              {tab.label}
            </span>
            
            {/* Active indicator dot */}
            {active === tab.key && (
              <div className="absolute -top-1 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}