// src/App.jsx
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { ConfigProvider, ConfigContext } from './contexts/ConfigContext';

import Header              from './components/Header';
import SearchBar           from './components/SearchBar';
import CategoryTabs        from './components/CategoryTabs';
import ServiceCard         from './components/ServiceCard';
import SelectionSummary    from './components/SelectionSummary';
import ConditionSelector   from './components/ConditionSelector';
import VehicleSizeSelector from './components/VehicleSizeSelector';
import ResultCard          from './components/ResultCard';
import HistorySection      from './components/HistorySection';
import TipsSection         from './components/TipsSection';
import BottomNav           from './components/BottomNav';
import Toast               from './components/Toast';

import { serviceDatabase } from './services/serviceDatabase';

/* ───────────────────────────────────────── CALCULATOR VIEW ── */
function CalculatorView () {
  const { config, setConfig } = useContext(ConfigContext);

  /* UI state */
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm,     setSearchTerm]     = useState('');
  const [selected,       setSelected]       = useState([]);
  const [condition,      setCondition]      = useState(null);
  const [toast,          setToast]          = useState('');

  /* helper: sort using the explicit `order` field (fallback: α‑by‑name) */
  const sortKeys = keys =>
    [...keys].sort((a, b) => {
      const oa = serviceDatabase[a].order ?? 9_999;
      const ob = serviceDatabase[b].order ?? 9_999;
      return oa !== ob
        ? oa - ob
        : serviceDatabase[a].name.localeCompare(serviceDatabase[b].name);
    });

  /* toggle a service in/out of the selection */
  const toggleService = key => {
    const name = serviceDatabase[key].name;
    setSelected(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : sortKeys([...prev, key])
    );
    setToast(prev.includes(key) ? `Odebráno: ${name}` : `Přidáno: ${name}`);
  };

  /* memoised list of services currently shown in the grid */
  const filtered = useMemo(
    () =>
      Object.entries(serviceDatabase)
        .filter(([, svc]) =>
          (activeCategory === 'all' || svc.category === activeCategory) &&
          svc.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort(([, a], [, b]) => a.order - b.order),
    [activeCategory, searchTerm]
  );

  return (
    <>
      <SearchBar    value={searchTerm}       onChange={setSearchTerm}     />
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
      <ResultCard selected={selected} condition={condition} />

      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </>
  );
}

/* ──────────────────────────────────────────── APP ROOT ── */
export default function App () {
  /* remember last opened view between refreshes */
  const [view, setView] = useState(
    () => localStorage.getItem('detailingUiView') || 'calc'
  );

  useEffect(() => {
    localStorage.setItem('detailingUiView', view);
  }, [view]);

  return (
    <ConfigProvider>
      <div className="h-screen flex flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto pt-14 pb-14">
          {view === 'calc'    && <CalculatorView />}
          {view === 'history' && <HistorySection />}
          {view === 'tips'    && <TipsSection />}
        </main>

        <BottomNav active={view} onChange={setView} />
      </div>
    </ConfigProvider>
  );
}
