// src/types/props.ts
import type { ReactNode } from 'react';
import type {
  VehicleCondition,
  VehicleSize,
  ServiceCategory,
  ServiceItem
} from './index';
import type { AppConfig } from './index';

/**
 * Props for the BottomNav component
 */
export interface BottomNavProps {
  /** Currently active tab key */
  active: 'calc' | 'history' | 'tips' | 'services';
  /** Callback for tab change */
  onChange: (key: 'calc' | 'history' | 'tips' | 'services') => void;
}

/**
 * Props for the Header component
 */
export interface HeaderProps {
  /** Called when user clicks the gear icon to open the Config Sidebar */
  onOpenConfigSidebar: () => void;
}

/**
 * Props for the CalculatorView component
 */
export interface CalculatorViewProps {
  /**
   * Current vehicle condition (could be null → default)
   */
  condition: VehicleCondition | null;
  /**
   * Callback to update the selected vehicle condition
   */
  onConditionChange: (condition: VehicleCondition) => void;
}

/**
 * Props for the ConfigSidebar component
 */
export interface ConfigSidebarProps {
  /** Whether the sidebar is open */
  open: boolean;
  /** Callback to close the sidebar */
  onClose: () => void;
  /** Current vehicle condition */
  condition: VehicleCondition | null;
  /** Callback to update condition */
  onConditionChange: (condition: VehicleCondition) => void;
}

/**
 * Props for the ReportPanel component
 */
export interface ReportPanelProps {
  /** Array of selected service keys */
  selected: string[];
  /** Current vehicle condition */
  condition: VehicleCondition | null;
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
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  /** Current search term */
  value: string;
  /** Callback for search term change */
  onChange: (value: string) => void;
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
 * Props for the SelectionSummary component
 */
export interface SelectionSummaryProps {
  /** Array of selected service keys */
  selected: string[];
  /** Callback to clear all selections */
  onClear: () => void;
}

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
 * Props for the HistorySection component
 */
export interface HistorySectionProps { }

/**
 * Props for the TipsSection component
 */
export interface TipsSectionProps { }

/**
 * Props for the ServiceManager component
 */
export interface ServiceManagerProps { }

/**
 * Props for the ConfigProvider component
 */
export interface ConfigProviderProps {
  children: ReactNode;
}

/**
 * Props for the Toast component
 */
export interface ToastProps {
  /** Message to display in the toast */
  message: string;
  /** Callback when toast is dismissed */
  onDismiss: () => void;
}
