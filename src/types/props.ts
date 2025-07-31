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
  onOpenConfigSidebar: () => void;
}

/**
 * Props for the CalculatorView component
 */
export interface CalculatorViewProps {
  condition: VehicleCondition | null;
  onConditionChange: (condition: VehicleCondition) => void;
  selected: string[];
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
}

/**
 * Props for the ReportPanel component
 */
export interface ReportPanelProps {
  selected: string[];
  condition: VehicleCondition | null;
}

/**
 * Props for the HistorySection component
 */
export interface HistorySectionProps {
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
  onApply: (services: string[]) => void;
  onClose: () => void;
}

/**
 * Props for the BottomNav component
 */
export interface BottomNavProps {
  active: 'calc' | 'history' | 'tips' | 'services';
  onChange: (key: 'calc' | 'history' | 'tips' | 'services') => void;
}

/**
 * Props for the CategoryTabs component
 */
export interface CategoryTabsProps {
  active: ServiceCategory;
  onChange: (category: ServiceCategory) => void;
}

/**
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Props for the ServiceCard component
 */
export interface ServiceCardProps {
  serviceKey: string;
  service: ServiceItem;
  isSelected: boolean;
  toggle: (key: string) => void;
  currentCondition: VehicleCondition | null;
}

/**
 * Props for the SelectionSummary component
 */
export interface SelectionSummaryProps {
  selected: string[];
  onClear: () => void;
}

/**
 * Props for the ResultCard component
 */
export interface ResultCardProps {
  selected: string[];
  condition: VehicleCondition | null;
  onToast?: (message: string) => void;
}

/**
 * Props for the ConditionSelector component
 */
export interface ConditionSelectorProps {
  current: VehicleCondition | null;
  onSelect: (condition: VehicleCondition) => void;
}

/**
 * Props for the VehicleSizeSelector component
 */
export interface VehicleSizeSelectorProps {
  current: VehicleSize;
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
  message: string;
  onDismiss: () => void;
}
