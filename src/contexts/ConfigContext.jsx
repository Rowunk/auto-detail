// src/contexts/ConfigContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ConfigContext = createContext({
  config: {
    vehicleSize: 'suv',
    workers: 1,
    hourlyRate: 450,
    costRatio: 0.35,
  },
  setConfig: () => {},
});

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    vehicleSize: 'suv',
    workers: 1,
    hourlyRate: 450,
    costRatio: 0.35,
  });

  // Load persisted settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('detailingSettingsGranular');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved config:', e);
      }
    }
  }, []);

  // Persist settings on change
  useEffect(() => {
    localStorage.setItem('detailingSettingsGranular', JSON.stringify(config));
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
