// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import type { HeaderProps } from '../types/props';

/**
 * Modern sticky app header with glassmorphism design and smooth interactions.
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
    <header className="sticky top-0 backdrop-blur-md bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl shadow-lg">
              🚗
            </div>
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-sm">
                AutoDetail Pro
              </h1>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenConfigSidebar}
              className="p-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all duration-200 hover:scale-105 shadow-lg"
              title="Nastavení"
              aria-label="Otevřít nastavení"
            >
              <span className="text-lg">⚙️</span>
            </button>
            
            <button
              onClick={() => setDarkMode(d => !d)}
              className="p-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all duration-200 hover:scale-105 shadow-lg"
              title="Přepnout téma"
              aria-label={darkMode ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
            >
              <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}