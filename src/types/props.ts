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
  /** Called when the user clicks the settings icon */
  onOpenConfigSidebar: () => void;
}

/**
 * Props for the CalculatorView component
 */
export interface CalculatorViewProps {
  /** Currently selected vehicle condition */
  condition: VehicleCondition | null;
  /** Handler when the vehicle condition changes */
  onConditionChange: (condition: VehicleCondition) => void;
  /** Keys of services currently selected */
  selected: string[];
  /** Handler when the selected services array changes */
  onSelectedChange: (services: string[]) => void;
}

/**
 * Props for the ConfigSidebar component
 */
export interface ConfigSidebarProps {
  /** Whether the sidebar is open */
  open: boolean;
  /** Callback to close the sidebar */
  onClose: () => void;
}

/**
 * Props for the ReportPanel component
 */
export interface ReportPanelProps {
  /** Keys of services currently selected */
  selected: string[];
  /** Current vehicle condition */
  condition: VehicleCondition | null;
}

/**
 * Props for the HistorySection component
 */
export interface HistorySectionProps {
  /** Called when the user clicks "Copy services" */
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
  /** Apply the given array of service keys */
  onApply: (services: string[]) => void;
  /** Callback to close the modal */
  onClose: () => void;
}

/**
 * Props for the BottomNav component
 */
export interface BottomNavProps {
  /** Active view key */
  active: 'calc' | 'history' | 'tips' | 'services';
  /** Handler when the user selects a different tab */
  onChange: (key: 'calc' | 'history' | 'tips' | 'services') => void;
}

/**
 * Props for the CategoryTabs component
 */
export interface CategoryTabsProps {
  /** Currently active category */
  active: ServiceCategory;
  /** Called when the user selects a new category */
  onChange: (category: ServiceCategory) => void;
}

/**
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  /** Current search input value */
  value: string;
  /** Called when the search input changes */
  onChange: (value: string) => void;
}

/**
 * Props for the ServiceCard component
 */
export interface ServiceCardProps {
  /** Unique key of this service */
  serviceKey: string;
  /** Service data object */
  service: ServiceItem;
  /** Whether this service is currently selected */
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
  /** Optional toast notification callback */
  onToast?: (message: string) => void;
}

/**
 * Props for the ConditionSelector component
 */
export interface ConditionSelectorProps {
  /** Currently selected condition */
  current: VehicleCondition | null;
  /** Called when the user selects a condition */
  onSelect: (condition: VehicleCondition) => void;
}

/**
 * Props for the VehicleSizeSelector component
 */
export interface VehicleSizeSelectorProps {
  /** Currently selected vehicle size */
  current: VehicleSize;
  /** Handler when the user selects a vehicle size */
  onSelect: (size: VehicleSize) => void;
}

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
  /** Message to display */
  message: string;
  /** Callback when the toast is dismissed */
  onDismiss: () => void;
}

/**
 * Props for the SettingsModal component
 */
export interface SettingsModalProps {
  /** Whether the settings modal is open */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
}