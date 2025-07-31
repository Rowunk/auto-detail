// src/App.tsx
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { ConfigProvider, ConfigContext } from './contexts/ConfigContext';
import { getStorageItem, setStorageItem } from './utils/storage';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { isVehicleCondition, isServiceItemArray } from './utils/validators';
import type { ServiceCategory, VehicleCondition, ServiceItem } from './types';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import ServiceCard from './components/ServiceCard';
import SelectionSummary from './components/SelectionSummary';
import ReportPanel from './components/ReportPanel';
import HistorySection from './components/HistorySection';
import TipsSection from './components/TipsSection';
import ServiceManager from './components/ServiceManager';
import ConfigSidebar from './components/ConfigSidebar';
import TemplateManager, { ServiceTemplate } from './components/TemplateManager';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

import { serviceDatabase as baseDatabase } from './services/serviceDatabase';

interface CalculatorViewProps {
  condition: VehicleCondition | null;
  onConditionChange: (c: VehicleCondition) => void;
}

function CalculatorView({
  condition,
  onConditionChange
}: CalculatorViewProps): React.ReactElement {
  const { config } = useContext(ConfigContext);

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);
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

  // Sort helper
  const sortKeys = (keys: string[]): string[] =>
    [...keys].sort((a, b) => {
      const oa = mergedServices[a]?.order ?? 9_999;
      const ob = mergedServices[b]?.order ?? 9_999;
      return oa !== ob
        ? oa - ob
        : (mergedServices[a]?.name ?? '').localeCompare(mergedServices[b]?.name ?? '');
    });

  // Toggle selection
  const toggleService = (key: string): void => {
    const name = mergedServices[key]?.name ?? key;
    const isSel = selected.includes(key);
    setSelected(prev =>
      isSel ? prev.filter(k => k !== key) : sortKeys([...prev, key])
    );
    setToast(isSel ? `Odebráno: ${name}` : `Přidáno: ${name}`);
  };

  // Filter + sort
  const filtered = useMemo(
    () =>
      Object.entries(mergedServices)
        .filter(([, svc]) =>
          (activeCategory === 'all' || svc.category === activeCategory) &&
          svc.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort(([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0)),
    [activeCategory, searchTerm, mergedServices]
  );

  return (
    <>
      {/* Templates modal */}
      {showTemplates && (
        <TemplateManager
          onApply={services => {
            setSelected(services);
            setShowTemplates(false);
          }}
          onClose={() => setShowTemplates(false)}
        />
      )}

      {/* Split screen */}
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
          <div className="p-2 flex justify-end">
            <button
              onClick={() => setShowTemplates(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded"
            >
              Šablony
            </button>
          </div>

          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 auto-rows-fr">
            {filtered.map(([key, svc]) => (
              <ServiceCard
                key={key}
                serviceKey={key}
                service={svc}
                isSelected={selected.includes(key)}
                toggle={toggleService}
                currentCondition={condition}
              />
            ))}
          </div>

          <SelectionSummary selected={selected} onClear={() => setSelected([])} />
        </div>

        {/* Right pane */}
        <div
          className="w-full lg:flex-[1] border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 p-4"
          role="complementary"
          aria-label="Summary report"
        >
          <ReportPanel selected={selected} condition={condition} />
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

  // Persisted vehicle condition
  const [condition, setCondition] = useLocalStorageState<VehicleCondition | null>(
    'detailingCondition',
    null,
    x => x === null || isVehicleCondition(x)
  );

  useEffect(() => {
    const saved = getStorageItem<ViewType>('detailingUiView', 'calc');
    setView(saved);
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
          condition={condition}
          onConditionChange={setCondition}
        />

        <main className="flex-1 overflow-y-auto pt-14 pb-14">
          {view === 'calc' && (
            <CalculatorView
              condition={condition}
              onConditionChange={setCondition}
            />
          )}
          {view === 'history' && <HistorySection />}
          {view === 'tips' && <TipsSection />}
          {view === 'services' && <ServiceManager />}
        </main>

        <BottomNav active={view} onChange={setView} />
      </div>
    </ConfigProvider>
  );
}

export default App;
