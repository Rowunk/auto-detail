// src/types/props.ts

import type { ReactNode } from 'react';
import type {
  VehicleCondition,
  VehicleSize,
  ServiceCategory,
  ServiceItem
} from './index';

/**
 * Props for the Header component
 */
export interface HeaderProps {
  /** Called when the user clicks the gear icon */
  onOpenConfigSidebar: () => void;
}

/**
 * Props for the CalculatorView component
 */
export interface CalculatorViewProps {
  /** Current vehicle condition (or null for default) */
  condition: VehicleCondition | null;
  /** Update the selected vehicle condition */
  onConditionChange: (condition: VehicleCondition) => void;
  /** Currently selected service keys */
  selected: string[];
  /** Update the selected services array */
  onSelectedChange: (services: string[]) => void;
}

/**
 * Props for the ConfigSidebar component
 */
export interface ConfigSidebarProps {
  /** Whether the sidebar is open */
  open: boolean;
  /** Close the sidebar */
  onClose: () => void;
  /** Current vehicle condition */
  condition: VehicleCondition | null;
  /** Update the vehicle condition */
  onConditionChange: (condition: VehicleCondition) => void;
}

/**
 * Props for the ReportPanel component
 */
export interface ReportPanelProps {
  /** Currently selected service keys */
  selected: string[];
  /** Current vehicle condition */
  condition: VehicleCondition | null;
}

/**
 * Props for the HistorySection component
 */
export interface HistorySectionProps {
  /**
   * Callback when the user clicks “Kopírovat služby”
   * to pre‐select those services in the calculator
   */
  onCopyServices?: (services: string[]) => void;
}

/**
 * Props for the TipsSection component
 */
export interface TipsSectionProps { }

/**
 * Props for the ServiceManager component
 */
export interface ServiceManagerProps { }

/**
 * Props for the TemplateManager component
 */
export interface TemplateManagerProps {
  /** Apply a saved template’s service list */
  onApply: (services: string[]) => void;
  /** Close the template manager */
  onClose: () => void;
}

/**
 * Props for the BottomNav component
 */
export interface BottomNavProps {
  /** Currently active tab */
  active: 'calc' | 'history' | 'tips' | 'services';
  /** Change the active tab */
  onChange: (key: 'calc' | 'history' | 'tips' | 'services') => void;
}

/**
 * Props for the CategoryTabs component
 */
export interface CategoryTabsProps {
  /** Currently selected service category */
  active: ServiceCategory;
  /** Change the selected category */
  onChange: (category: ServiceCategory) => void;
}

/**
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  /** Current search term */
  value: string;
  /** Callback when the search term changes */
  onChange: (value: string) => void;
}

/**
 * Props for the ServiceCard component
 */
export interface ServiceCardProps {
  /** Unique key of the service */
  serviceKey: string;
  /** Service data */
  service: ServiceItem;
  /** Whether this service is selected */
  isSelected: boolean;
  /** Toggle selection of this service */
  toggle: (key: string) => void;
  /** Current vehicle condition */
  currentCondition: VehicleCondition | null;
}

/**
 * Props for the SelectionSummary component
 */
export interface SelectionSummaryProps {
  /** Currently selected service keys */
  selected: string[];
  /** Clear all selections */
  onClear: () => void;
}

/**
 * Props for the ResultCard component
 */
export interface ResultCardProps {
  /** Currently selected service keys */
  selected: string[];
  /** Current vehicle condition */
  condition: VehicleCondition | null;
  /** Toast callback for notifications */
  onToast?: (message: string) => void;
}

/**
 * Props for the ConditionSelector component
 */
export interface ConditionSelectorProps {
  /** Currently selected vehicle condition */
  current: VehicleCondition | null;
  /** Select a new vehicle condition */
  onSelect: (condition: VehicleCondition) => void;
}

/**
 * Props for the VehicleSizeSelector component
 */
export interface VehicleSizeSelectorProps {
  /** Currently selected vehicle size */
  current: VehicleSize;
  /** Select a new vehicle size */
  onSelect: (size: VehicleSize) => void;
}

/**
 * Props for the ConfigProvider component
 */
export interface ConfigProviderProps {
  /** Child components */
  children: ReactNode;
}

/**
 * Props for the Toast component
 */
export interface ToastProps {
  /** Message to display */
  message: string;
  /** Dismiss the toast */
  onDismiss: () => void;
}
