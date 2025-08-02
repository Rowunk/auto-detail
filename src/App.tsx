// src/App.tsx
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { ConfigProvider, ConfigContext } from './contexts/ConfigContext';
import { getStorageItem, setStorageItem } from './utils/storage';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { isVehicleCondition, isServiceItemArray } from './utils/validators';
import { getQuickPickServices } from './utils/favorites';
import type { ServiceCategory, VehicleCondition, ServiceItem } from './types';

import Header from './components/Header';
import ConfigSidebar from './components/ConfigSidebar';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import ConditionSelector from './components/ConditionSelector';
import ServiceCard from './components/ServiceCard';
import SelectionSummary from './components/SelectionSummary';
import ReportPanel from './components/ReportPanel';
import HistorySection from './components/HistorySection';
import TipsSection from './components/TipsSection';
import ServiceManager from './components/ServiceManager';
import TemplateManager from './components/TemplateManager';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

import { serviceDatabase as baseDatabase } from './services/serviceDatabase';

interface CalculatorViewProps {
  condition: VehicleCondition | null;
  onConditionChange: (c: VehicleCondition) => void;
  selected: string[];
  onSelectedChange: (services: string[]) => void;
  onJobConfirmed: () => void;
}

function CalculatorView({
  condition,
  onConditionChange,
  selected,
  onSelectedChange,
  onJobConfirmed
}: CalculatorViewProps): React.ReactElement {
  const { config } = useContext(ConfigContext);

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('favorites'); // Start with favorites
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [toast, setToast] = useState<string>('');
  const [showTemplates, setShowTemplates] = useState<boolean>(false);

  // Persisted & validated custom services
  const [customServices] = useLocalStorageState(
    'customServices',
    [] as (ServiceItem & { key: string })[],
    isServiceItemArray
  );

  // Merge built-in + custom
  const mergedServices: Record<string, ServiceItem> = useMemo(() => {
    const result: Record<string, ServiceItem> = { ...baseDatabase };
    customServices.forEach(svc => {
      result[svc.key] = {
        name: svc.name,
        category: svc.category,
        order: svc.order,
        times: svc.times,
        basePrice: svc.basePrice
      };
    });
    return result;
  }, [customServices]);

  // Get quick pick services (favorites + most used)
  const quickPickServices = useMemo(() => getQuickPickServices(), [activeCategory]);

  // Sort helper
  const sortKeys = (keys: string[]): string[] =>
    [...keys].sort((a, b) => {
      const oa = mergedServices[a]?.order ?? 9999;
      const ob = mergedServices[b]?.order ?? 9999;
      if (oa !== ob) return oa - ob;
      return mergedServices[a].name.localeCompare(mergedServices[b].name);
    });

  // Toggle selection
  const toggleService = (key: string): void => {
    const name = mergedServices[key]?.name ?? key;
    const isSel = selected.includes(key);
    const next = isSel
      ? selected.filter(k => k !== key)
      : sortKeys([...selected, key]);
    onSelectedChange(next);
    setToast(isSel ? `Odebráno: ${name}` : `Přidáno: ${name}`);
  };

  // Filter + sort
  const filtered = useMemo(() => {
    let serviceEntries = Object.entries(mergedServices);

    // Filter by category
    if (activeCategory === 'favorites') {
      // Show only services that are in quick pick list
      serviceEntries = serviceEntries.filter(([key]) => 
        quickPickServices.includes(key)
      );
    } else if (activeCategory !== 'all') {
      serviceEntries = serviceEntries.filter(([, svc]) => 
        svc.category === activeCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      serviceEntries = serviceEntries.filter(([, svc]) =>
        svc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by order for non-favorites, or by quick pick order for favorites
    if (activeCategory === 'favorites') {
      return serviceEntries.sort(([keyA], [keyB]) => {
        const indexA = quickPickServices.indexOf(keyA);
        const indexB = quickPickServices.indexOf(keyB);
        return indexA - indexB;
      });
    } else {
      return serviceEntries.sort(([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0));
    }
  }, [activeCategory, searchTerm, mergedServices, quickPickServices]);

  return (
    <>
      {showTemplates && (
        <TemplateManager
          onApply={services => {
            onSelectedChange(services);
            setShowTemplates(false);
          }}
          onClose={() => setShowTemplates(false)}
        />
      )}

      <div
        className="flex flex-col lg:flex-row flex-1 overflow-hidden"
        role="region"
        aria-label="Calculator split-screen"
      >
        {/* Left pane */}
        <div
          className="w-full lg:flex-[3] flex flex-col overflow-y-auto"
          role="region"
          aria-label="Service selection"
        >
          {/* 1) Condition selector always visible */}
          <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
            <ConditionSelector
              current={condition}
              onSelect={onConditionChange}
            />
            {condition === null && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-semibold">Vyberte stav vozidla</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Služby jsou zakázané dokud nevyberete stav vozidla pro správnou kalkulaci cen.
                </p>
              </div>
            )}
          </div>

          {/* 2) Templates button */}
          <div className="p-2 flex justify-end bg-white dark:bg-gray-800">
            <button
              onClick={() => setShowTemplates(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded"
            >
              Šablony
            </button>
          </div>

          {/* 3) Filters */}
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

          {/* 4) Grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2 auto-rows-fr">
            {filtered.length === 0 && activeCategory === 'favorites' ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                <span className="text-4xl block mb-2">⭐</span>
                <p>Žádné oblíbené služby</p>
                <p className="text-sm mt-1">
                  Označte služby hvězdičkou pro rychlý přístup
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                <span className="text-4xl block mb-2">🔍</span>
                <p>Žádné služby nenalezeny</p>
              </div>
            ) : (
              filtered.map(([key, svc]) => (
                <ServiceCard
                  key={key}
                  serviceKey={key}
                  service={svc}
                  isSelected={selected.includes(key)}
                  toggle={toggleService}
                  currentCondition={condition}
                />
              ))
            )}
          </div>

          {/* 5) Summary */}
          <SelectionSummary
            selected={selected}
            onClear={() => onSelectedChange([])}
          />
        </div>

        {/* Right pane */}
        <div
          className="w-full lg:flex-[1] border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto"
          role="complementary"
          aria-label="Summary report"
        >
          <ReportPanel 
            selected={selected} 
            condition={condition}
            onJobConfirmed={onJobConfirmed}
          />
        </div>
      </div>

      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </>
  );
}

function App(): React.ReactElement {
  type ViewType = 'calc' | 'history' | 'tips' | 'services';

  const [view, setView] = useState<ViewType>('calc');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Persisted vehicle condition
  const [condition, setCondition] = useLocalStorageState<VehicleCondition | null>(
    'detailingCondition',
    null,
    x => x === null || isVehicleCondition(x)
  );

  useEffect(() => {
    const saved = getStorageItem<ViewType>('detailingUiView', 'calc');
    // Ensure only valid views are used
    if (['calc', 'history', 'tips', 'services'].includes(saved)) {
      setView(saved);
    } else {
      setView('calc');
    }
  }, []);

  useEffect(() => {
    setStorageItem('detailingUiView', view);
  }, [view]);

  return (
    <ConfigProvider>
      <div className="h-screen flex flex-col">
        <Header onOpenConfigSidebar={() => setSidebarOpen(true)} />

        <ConfigSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto pt-14 pb-14">
          {view === 'calc' && (
            <CalculatorView
              condition={condition}
              onConditionChange={setCondition}
              selected={selectedServices}
              onSelectedChange={setSelectedServices}
              onJobConfirmed={() => {
                // Reset condition and selection for next job
                setCondition(null);
                setSelectedServices([]);
              }}
            />
          )}
          {view === 'history' && (
            <HistorySection
              onCopyServices={svc => {
                setSelectedServices(svc);
                setView('calc');
              }}
            />
          )}
          {view === 'tips' && <TipsSection />}
          {view === 'services' && <ServiceManager />}
        </main>

        <BottomNav active={view} onChange={setView} />
      </div>
    </ConfigProvider>
  );
}

export default App;