// src/contexts/ConfigContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { getStorageItem, setStorageItem, isStorageAvailable } from '../utils/storage';
import type { AppConfig, ConfigContextType } from '../types';
import type { ConfigProviderProps } from '../types/props';

// Default configuration
const defaultConfig: AppConfig = {
  vehicleSize: 'suv',
  workers: 1,
  hourlyRate: 450,
  costRatio: 0.35,
};

/**
 * Context for application configuration and settings.
 * Provides access to global configuration state throughout the app.
 */
export const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  setConfig: () => {},
  storageAvailable: true
});

/**
 * Provider component for configuration context.
 * Handles loading, persisting, and validating configuration.
 *
 * @param {ConfigProviderProps} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to the context
 * @returns {React.ReactElement} Config provider component
 * 
 * @example
 * <ConfigProvider>
 *   <App />
 * </ConfigProvider>
 */
export const ConfigProvider = ({ children }: ConfigProviderProps): React.ReactElement => {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);
  const [storageAvailable, setStorageAvailable] = useState<boolean>(true);

  // Check if storage is available on mount
  useEffect(() => {
    const available = isStorageAvailable();
    setStorageAvailable(available);
    
    // Load persisted settings on mount
    if (available) {
      const saved = getStorageItem<Partial<AppConfig> | null>('detailingSettingsGranular', null);
      if (saved) {
        try {
          // Validate that saved config has required keys
          const validConfig = { ...defaultConfig };
          if (typeof saved === 'object' && saved !== null) {
            // Only copy known properties and validate their types
            if (typeof saved.vehicleSize === 'string' && 
                ['small', 'sedan', 'combi', 'suv', 'van', 'truck'].includes(saved.vehicleSize)) {
              validConfig.vehicleSize = saved.vehicleSize as AppConfig['vehicleSize'];
            }
            
            if (typeof saved.workers === 'number' && 
                saved.workers >= 1 && 
                saved.workers <= 10) {
              validConfig.workers = saved.workers;
            }
            
            if (typeof saved.hourlyRate === 'number' && 
                saved.hourlyRate >= 0) {
              validConfig.hourlyRate = saved.hourlyRate;
            }
            
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

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired
};