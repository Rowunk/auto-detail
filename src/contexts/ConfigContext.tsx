// src/contexts/ConfigContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  getStorageItem,
  setStorageItem,
  isStorageAvailable
} from '../utils/storage';
import type { AppConfig, ConfigContextType } from '../types';
import type { ConfigProviderProps } from '../types/props';

/**
 * Default application configuration.
 * Exported for use in tests and for initializing the context.
 */
export const defaultConfig: AppConfig = {
  vehicleSize: 'suv',
  workers: 1,
  hourlyRate: 450,
  costRatio: 0.35
};

/**
 * Context for application configuration and settings.
 * Provides access to global configuration state throughout the app.
 */
export const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  setConfig: () => { },
  storageAvailable: true
});

/**
 * Provider component for configuration context.
 * Handles loading, persisting, and validating configuration.
 *
 * @param props.children - Child components that will have access to the context
 */
export const ConfigProvider = ({
  children
}: ConfigProviderProps): React.ReactElement => {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);
  const [storageAvailable, setStorageAvailable] = useState<boolean>(true);

  // On mount: detect storage availability and load persisted config
  useEffect(() => {
    const available = isStorageAvailable();
    setStorageAvailable(available);

    if (available) {
      const saved = getStorageItem<Partial<AppConfig> | null>(
        'detailingSettingsGranular',
        null
      );
      if (saved) {
        try {
          const validConfig: AppConfig = { ...defaultConfig };
          if (typeof saved === 'object' && saved !== null) {
            if (
              typeof saved.vehicleSize === 'string' &&
              ['small', 'sedan', 'combi', 'suv', 'van', 'truck'].includes(
                saved.vehicleSize
              )
            ) {
              validConfig.vehicleSize = saved.vehicleSize;
            }
            if (
              typeof saved.workers === 'number' &&
              saved.workers >= 1 &&
              saved.workers <= 10
            ) {
              validConfig.workers = saved.workers;
            }
            if (typeof saved.hourlyRate === 'number' && saved.hourlyRate >= 0) {
              validConfig.hourlyRate = saved.hourlyRate;
            }
            if (
              typeof saved.costRatio === 'number' &&
              saved.costRatio >= 0 &&
              saved.costRatio <= 1
            ) {
              validConfig.costRatio = saved.costRatio;
            }
            setConfig(validConfig);
          }
        } catch (e) {
          console.error('Failed to parse saved config:', e);
          // fallback to defaults
        }
      }
    }
  }, []);

  // On config change: persist to localStorage
  useEffect(() => {
    if (storageAvailable) {
      const ok = setStorageItem('detailingSettingsGranular', config);
      if (!ok) {
        console.error('Failed to save config to localStorage');
      }
    }
  }, [config, storageAvailable]);

  return (
    <ConfigContext.Provider
      value={{
        config,
        setConfig,
        storageAvailable
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
