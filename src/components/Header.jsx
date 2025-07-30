// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import SettingsModal from './SettingsModal';

/**
 * Sticky app header with dark‑mode toggle and settings modal.
 */
export default function Header() {
  /* Dark‑mode handling */
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  /* Settings modal */
  const [open, setOpen] = useState(false);

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
