// src/types/props.ts
import type { ReactNode } from 'react';
import type { 
  VehicleCondition, 
  VehicleSize, 
  ServiceCategory, 
  ServiceItem} from './index';
import {
  AppConfig
} from './index';

/**
 * Props for the BottomNav component
 */
export interface BottomNavProps {
  /** Currently active tab key */
  active: 'calc' | 'history' | 'tips';
  /** Callback for tab change */
  onChange: (key: 'calc' | 'history' | 'tips') => void;
}

/**
 * Props for the CategoryTabs component
 */
export interface CategoryTabsProps {
  /** Currently active category */
  active: ServiceCategory;
  /** Callback for category change */
  onChange: (category: ServiceCategory) => void;
}

/**
 * Props for the ConditionSelector component
 */
export interface ConditionSelectorProps {
  /** Currently selected vehicle condition */
  current: VehicleCondition | null;
  /** Callback for condition selection */
  onSelect: (condition: VehicleCondition) => void;
}

/**
 * Props for the ConfigProvider component
 */
export interface ConfigProviderProps {
  /** Child components */
  children: ReactNode;
}

/**
 * Props for the Header component (no props required)
 */
export interface HeaderProps {}

/**
 * Props for the HistorySection component (no props required)
 */
export interface HistorySectionProps {}

/**
 * Props for the ResultCard component
 */
export interface ResultCardProps {
  /** Array of selected service keys */
  selected: string[];
  /** Current vehicle condition */
  condition: VehicleCondition | null;
  /** Callback for toast notifications */
  onToast?: (message: string) => void;
}

/**
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  /** Current search term */
  value: string;
  /** Callback for search term change */
  onChange: (value: string) => void;
}

/**
 * Props for the SelectionSummary component
 */
export interface SelectionSummaryProps {
  /** Array of selected service keys */
  selected: string[];
  /** Callback to clear all selections */
  onClear: () => void;
}

/**
 * Props for the ServiceCard component
 */
export interface ServiceCardProps {
  /** Unique identifier for the service */
  serviceKey: string;
  /** Service data object */
  service: ServiceItem;
  /** Whether the service is currently selected */
  isSelected: boolean;
  /** Callback to toggle selection state */
  toggle: (key: string) => void;
  /** Current vehicle condition */
  currentCondition: VehicleCondition | null;
}

/**
 * Props for the SettingsModal component
 */
export interface SettingsModalProps {
  /** Whether the modal is currently visible */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
}

/**
 * Props for the TipsSection component (no props required)
 */
export interface TipsSectionProps {}

/**
 * Props for the Toast component
 */
export interface ToastProps {
  /** Message to display in the toast */
  message: string;
  /** Callback when toast is dismissed */
  onDismiss: () => void;
}

/**
 * Props for the VehicleSizeSelector component
 */
export interface VehicleSizeSelectorProps {
  /** Currently selected vehicle size */
  current: VehicleSize;
  /** Callback for size selection */
  onSelect: (size: VehicleSize) => void;
}

/**
 * Props for the CalculatorView component (no props required)
 */
export interface CalculatorViewProps {}