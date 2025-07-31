// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import type { HeaderProps } from '../types/props';

export interface HeaderProps {
  /** Called when the user clicks the settings icon */
  onOpenConfigSidebar: () => void;
}

/**
 * Sticky app header with dark-mode toggle and a button to open the Config Sidebar.
 */
export default function Header({ onOpenConfigSidebar }: HeaderProps): React.ReactElement {
  /* Dark-mode handling */
  const [darkMode, setDarkMode] = useState<boolean>(
    () => getStorageItem<string>('theme', 'light') === 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    setStorageItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <header className="sticky top-0 bg-primary text-white py-2 shadow z-50">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-base font-bold">
          🚗 Detailing Kalkulačka Pro+ | Granulární
        </h1>

        <div className="flex space-x-1">
          {/* Open Config Sidebar */}
          <button
            onClick={onOpenConfigSidebar}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition"
            title="Nastavení"
          >
            ⚙️
          </button>

          {/* Theme switch */}
          <button
            onClick={() => setDarkMode(d => !d)}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition"
            title="Přepnout téma"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
