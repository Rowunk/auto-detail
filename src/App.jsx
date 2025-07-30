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

/* ideal order of categories when we auto‑sort selections */
const CATEGORY_ORDER = [
  'wash', 'wheels', 'exterior',
  'interior', 'protection', 'restoration', 'specialty'
];

/* ───────────────────────────────────────── CALCULATOR VIEW ── */
function CalculatorView() {
  const { config, setConfig } = useContext(ConfigContext);

  /* UI state */
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm,     setSearchTerm]     = useState('');
  const [selected,       setSelected]       = useState([]);
  const [condition,      setCondition]      = useState(null);
  const [toast,          setToast]          = useState('');

  /* helper: sort selected service keys in workflow order + alphabetically */
  const sortKeys = keys => [...keys].sort((a, b) => {
    const ca = serviceDatabase[a].category;
    const cb = serviceDatabase[b].category;
    const pa = CATEGORY_ORDER.indexOf(ca);
    const pb = CATEGORY_ORDER.indexOf(cb);
    return pa !== pb
      ? pa - pb
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
      Object.entries(serviceDatabase).filter(
        ([, svc]) =>
          (activeCategory === 'all' || svc.category === activeCategory) &&
          svc.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [activeCategory, searchTerm]
  );

  return (
    <>
      {/* search + category chips */}
      <SearchBar   value={searchTerm}       onChange={setSearchTerm}     />
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      {/* responsive service grid */}
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

      {/* selection chips + selectors + summary */}
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

      {/* global toast */}
      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </>
  );
}

/* ──────────────────────────────────────────── APP ROOT ── */
export default function App() {
  /* remember last opened view between refreshes */
  const [view, setView] = useState(() =>
    localStorage.getItem('detailingUiView') || 'calc'
  );

  useEffect(() => {
    localStorage.setItem('detailingUiView', view);
  }, [view]);

  return (
    <ConfigProvider>
      <div className="h-screen flex flex-col">
        <Header />

        {/* main content swaps by view; header (top) & nav (bottom) are fixed */}
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
