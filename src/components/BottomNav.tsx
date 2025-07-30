// src/components/BottomNav.tsx
import React from 'react';
import PropTypes from 'prop-types';
import type { BottomNavProps } from '../types/props';

type TabKey = 'calc' | 'history' | 'tips';

type TabInfo = {
  key: TabKey;
  label: string;
  emoji: string;
};

const tabs: TabInfo[] = [
  { key: 'calc',    label: 'Kalkulačka', emoji: '🧮' },
  { key: 'history', label: 'Historie',   emoji: '📊' },
  { key: 'tips',    label: 'Tipy',       emoji: '💡' }
];

/**
 * Fixed bottom navigation bar with tabs for application views.
 *
 * @param {BottomNavProps} props - Component props
 * @param {TabKey} props.active - Currently selected tab key
 * @param {Function} props.onChange - Callback when tab is changed
 * @returns {React.ReactElement} Bottom navigation component
 * 
 * @example
 * <BottomNav 
 *   active="calc" 
 *   onChange={(key) => setView(key)} 
 * />
 */
export default function BottomNav({ active, onChange }: BottomNavProps): React.ReactElement {
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

BottomNav.propTypes = {
  active: PropTypes.oneOf(['calc', 'history', 'tips']).isRequired,
  onChange: PropTypes.func.isRequired
};