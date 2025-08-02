// src/types/index.ts

/**
 * Vehicle condition states that affect service times and prices
 */
export type VehicleCondition = 'excellent' | 'dirty' | 'neglected' | 'extreme';

/**
 * Vehicle size categories that affect pricing via multipliers
 */
export type VehicleSize = 'small' | 'sedan' | 'combi' | 'suv' | 'van' | 'truck';

/**
 * Service categories for organizing services in the UI
 * 'all' is a special category used for filtering to show all services
 * 'favorites' shows user's favorited services for quick access
 */
export type ServiceCategory = 'wash' | 'exterior' | 'wheels' | 'interior' | 'protection' | 'restoration' | 'specialty' | 'all' | 'favorites';

/**
 * Structure of a single service item in the database
 */
export interface ServiceItem {
  /** Display name of the service */
  name: string;
  /** Category the service belongs to */
  category: Exclude<ServiceCategory, 'all' | 'favorites'>;
  /** Suggested position in professional detailing workflow (lower = earlier) */
  order: number;
  /** Labor minutes required for each condition */
  times: Record<VehicleCondition, number>;
  /** Base price in CZK for each condition */
  basePrice: Record<VehicleCondition, number>;
}

/**
 * Complete service database structure
 */
export type ServiceDatabase = Record<string, ServiceItem>;

/**
 * Application configuration settings
 */
export interface AppConfig {
  /** Currently selected vehicle size */
  vehicleSize: VehicleSize;
  /** Number of workers performing the services */
  workers: number;
  /** Hourly labor rate in CZK */
  hourlyRate: number;
  /** Cost ratio for calculating margins (0-1) */
  costRatio: number;
}

/**
 * Type for the ConfigContext
 */
export interface ConfigContextType {
  /** Current application configuration */
  config: AppConfig;
  /** Function to update configuration */
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  /** Whether localStorage is available */
  storageAvailable: boolean;
}

/**
 * Structure of a history entry for saved jobs
 */
export interface HistoryEntry {
  /** Array of service keys that were selected */
  services: string[];
  /** Vehicle condition at time of saving */
  condition: VehicleCondition;
  /** Vehicle size at time of saving */
  vehicleSize: VehicleSize;
  /** Total price in CZK */
  price: number;
  /** Formatted time string (e.g. "2h 30 min") */
  time: string;
  /** Formatted date string */
  date: string;
}

/**
 * Service usage statistics for tracking most-used services
 */
export interface ServiceUsageStats {
  /** Service key -> usage count mapping */
  [serviceKey: string]: number;
}

/**
 * Favorites management data structure
 */
export interface FavoritesData {
  /** Array of favorited service keys */
  favorites: string[];
  /** Usage statistics for tracking most-used services */
  usageStats: ServiceUsageStats;
}