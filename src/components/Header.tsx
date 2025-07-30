// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import SettingsModal from './SettingsModal';
import { HeaderProps } from '../types/props';

/**
 * Sticky app header with dark-mode toggle and settings modal.
 * Appears at the top of the application and stays fixed while scrolling.
 *
 * @returns {React.ReactElement} Header component
 * 
 * @example
 * <Header />
 */
export default function Header(): React.ReactElement {
  /* Dark‑mode handling */
  const [darkMode, setDarkMode] = useState<boolean>(
    () => getStorageItem<string>('theme', 'light') === 'dark'
  );
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    setStorageItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  /* Settings modal */
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 bg-primary text-white py-2 shadow z-50">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-base font-bold">
            🚗 Detailing Kalkulačka Pro+ | Granulární
          </h1>

          <div className="flex space-x-1">
            {/* Settings */}
            <button
              onClick={() => setOpen(true)}
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

      {/* Modal portal */}
      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

// No PropTypes needed as this component has no props