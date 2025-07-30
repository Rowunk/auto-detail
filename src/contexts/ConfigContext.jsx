// src/contexts/ConfigContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, isStorageAvailable } from '../utils/storage';

// Default configuration
const defaultConfig = {
  vehicleSize: 'suv',
  workers: 1,
  hourlyRate: 450,
  costRatio: 0.35,
};

export const ConfigContext = createContext({
  config: defaultConfig,
  setConfig: () => {},
  storageAvailable: true
});

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Check if storage is available on mount
  useEffect(() => {
    const available = isStorageAvailable();
    setStorageAvailable(available);
    
    // Load persisted settings on mount
    if (available) {
      const saved = getStorageItem('detailingSettingsGranular');
      if (saved) {
        try {
          // Validate that saved config has required keys
          const validConfig = { ...defaultConfig };
          if (typeof saved === 'object' && saved !== null) {
            // Only copy known properties and validate their types
            if (typeof saved.vehicleSize === 'string') validConfig.vehicleSize = saved.vehicleSize;
            if (typeof saved.workers === 'number') validConfig.workers = saved.workers;
            if (typeof saved.hourlyRate === 'number') validConfig.hourlyRate = saved.hourlyRate;
            if (typeof saved.costRatio === 'number' && 
                saved.costRatio >= 0 && 
                saved.costRatio <= 1) {
              validConfig.costRatio = saved.costRatio;
            }
            setConfig(validConfig);
          }
        } catch (e) {
          console.error('Failed to parse saved config:', e);
          // Continue with default settings on error
        }
      }
    }
  }, []);

  // Persist settings on change
  useEffect(() => {
    if (storageAvailable) {
      const success = setStorageItem('detailingSettingsGranular', config);
      if (!success) {
        console.error('Failed to save config to localStorage');
      }
    }
  }, [config, storageAvailable]);

  return (
    <ConfigContext.Provider value={{ 
      config, 
      setConfig,
      storageAvailable
    }}>
      {children}
    </ConfigContext.Provider>
  );
};