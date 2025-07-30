// src/App.tsx
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { ConfigProvider, ConfigContext } from './contexts/ConfigContext';
import { getStorageItem, setStorageItem } from './utils/storage';
import type { ServiceCategory, VehicleCondition } from './types';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import ServiceCard from './components/ServiceCard';
import SelectionSummary from './components/SelectionSummary';
import ConditionSelector from './components/ConditionSelector';
import VehicleSizeSelector from './components/VehicleSizeSelector';
import ResultCard from './components/ResultCard';
import HistorySection from './components/HistorySection';
import TipsSection from './components/TipsSection';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

import { serviceDatabase } from './services/serviceDatabase';

/**
 * The calculator view component that handles service selection and calculation.
 * Manages the main business logic of the application.
 *
 * @returns {React.ReactElement} Calculator view component
 */
function CalculatorView(): React.ReactElement {
  const { config, setConfig } = useContext(ConfigContext);

  /* UI state */
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);
  const [condition, setCondition] = useState<VehicleCondition | null>(null);
  const [toast, setToast] = useState<string>('');

  /* helper: sort using the explicit `order` field (fallback: α‑by‑name) */
  const sortKeys = (keys: string[]): string[] =>
    [...keys].sort((a, b) => {
      const oa = serviceDatabase[a]?.order ?? 9_999;
      const ob = serviceDatabase[b]?.order ?? 9_999;
      return oa !== ob
        ? oa - ob
        : (serviceDatabase[a]?.name ?? '').localeCompare(serviceDatabase[b]?.name ?? '');
    });

  /* toggle a service in/out of the selection */
  const toggleService = (key: string): void => {
    const name = serviceDatabase[key]?.name ?? key;
    const isCurrentlySelected = selected.includes(key);
    setSelected(prev =>
      isCurrentlySelected
        ? prev.filter(k => k !== key)
        : sortKeys([...prev, key])
    );
    setToast(isCurrentlySelected ? `Odebráno: ${name}` : `Přidáno: ${name}`);
  };

  /* memoized list of services currently shown in the grid */
  const filtered = useMemo(
    () =>
      Object.entries(serviceDatabase)
        .filter(([, svc]) =>
          (activeCategory === 'all' || svc.category === activeCategory) &&
          svc.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort(([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0)),
    [activeCategory, searchTerm]
  );

  return (
    <>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      {/* responsive grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-2 p-2">
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
      <ConditionSelector current={condition} onSelect={setCondition} />
      <VehicleSizeSelector
        current={config.vehicleSize}
        onSelect={size => setConfig(c => ({ ...c, vehicleSize: size }))}
      />
      <ResultCard
        selected={selected}
        condition={condition}
        onToast={setToast}
      />

      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </>
  );
}

/**
 * Main application component that manages navigation between views.
 * Wraps the entire application in the ConfigProvider.
 *
 * @returns {React.ReactElement} Root application component
 */
function App(): React.ReactElement {
  type ViewType = 'calc' | 'history' | 'tips';
  
  /* remember last opened view between refreshes */
  const [view, setView] = useState<ViewType>('calc');
  
  // Load saved view preference after initial render
  useEffect(() => {
    const savedView = getStorageItem<ViewType>('detailingUiView', 'calc');
    setView(savedView);
  }, []);

  // Save view preference when it changes
  useEffect(() => {
    setStorageItem('detailingUiView', view);
  }, [view]);

  return (
    <ConfigProvider>
      <div className="h-screen flex flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto pt-14 pb-14">
          {view === 'calc' && <CalculatorView />}
          {view === 'history' && <HistorySection />}
          {view === 'tips' && <TipsSection />}
        </main>

        <BottomNav active={view} onChange={setView} />
      </div>
    </ConfigProvider>
  );
}

export default App;