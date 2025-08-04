// src/components/ConfigSidebar.tsx
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import VehicleSizeSelector from './VehicleSizeSelector';
import type { ConfigSidebarProps } from '../types/props';

const defaultConfig = {
  vehicleSize: 'sedan' as const,
  workers: 1,
  hourlyRate: 600,
  costRatio: 0.3,
};

const SectionHeader = ({
  icon, title, description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-1.5">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 dark:text-white text-sm">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-gray-700 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  </div>
);

const VehicleSizeSection = ({
  currentSize,
  onSelect,
}: {
  currentSize: string;
  onSelect: (size: string) => void;
}) => (
  <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-gray-700">
    <SectionHeader
      icon={
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      }
      title="Velikost vozidla"
      description="Vyberte typ vozidla"
    />
    <VehicleSizeSelector current={currentSize} onSelect={onSelect} />
  </section>
);

const AppSettingsSection = ({
  workers, hourlyRate, costRatio,
  onWorkersChange, onHourlyRateChange, onCostRatioChange,
}: {
  workers: number;
  hourlyRate: number;
  costRatio: number;
  onWorkersChange: (n: number) => void;
  onHourlyRateChange: (rate: number) => void;
  onCostRatioChange: (r: number) => void;
}) => (
  <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-gray-700">
    <SectionHeader
      icon={
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10.325 4.317c.426-1.756…z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      }
      title="Parametry výpočtu"
      description="Nastavte pracovní podmínky"
    />
    <div className="space-y-4">
      {/* Workers */}
      <div className="space-y-1">
        <label htmlFor="sidebar-workers" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          👥 Počet pracovníků
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-sm">
            {workers}×
          </span>
        </label>
        <select
          id="sidebar-workers"
          value={workers}
          onChange={e => onWorkersChange(+e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm"
        >
          {[1,2,3,4,5,6].map(n => (
            <option key={n} value={n}>
              {n} {n===1?'pracovník':n<5?'pracovníci':'pracovníků'}
            </option>
          ))}
        </select>
      </div>

      {/* Hourly Rate */}
      <div className="space-y-1">
        <label htmlFor="sidebar-hourlyRate" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          💰 Hodinová sazba
          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-sm">
            {hourlyRate} Kč/h
          </span>
        </label>
        <input
          id="sidebar-hourlyRate"
          type="number" min={0} step={50}
          value={hourlyRate}
          onChange={e => onHourlyRateChange(+e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm"
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          {['400','600','800'].map(lbl => (
            <button key={lbl} onClick={() => onHourlyRateChange(+lbl)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {lbl} Kč
            </button>
          ))}
        </div>
      </div>

      {/* Cost Ratio */}
      <div className="space-y-1">
        <label htmlFor="sidebar-costRatio" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          📊 Poměr nákladů
          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 px-2 py-1 rounded-full text-sm">
            {Math.round(costRatio*100)}%
          </span>
        </label>
        <input
          id="sidebar-costRatio"
          type="range" min={0} max={1} step={0.05}
          value={costRatio}
          onChange={e => onCostRatioChange(+e.target.value)}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider accent-indigo-500 dark:accent-indigo-400"
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>0%</span>
          <span className="font-medium text-purple-600 dark:text-purple-400">{Math.round(costRatio*100)}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  </section>
);

const QuickPresetsSection = ({
  onPresetSelect,
}: {
  onPresetSelect: (cfg: {workers:number;hourlyRate:number;costRatio:number}) => void;
}) => (
  <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
    <SectionHeader
      icon={
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      }
      title="Rychlá nastavení"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { label: 'Domácí detailing', preset: { workers:1, hourlyRate:400, costRatio:0.2 } },
        { label: 'Profesionální studio', preset: { workers:2, hourlyRate:600, costRatio:0.3 } },
        { label: 'Premium služby', preset: { workers:3, hourlyRate:800, costRatio:0.4 } },
      ].map(({label,preset}) => (
        <button
          key={label}
          onClick={() => onPresetSelect(preset)}
          className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-left text-sm whitespace-normal break-words"
        >
          <div className="font-medium text-gray-900 dark:text-white">{label}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {preset.workers} pracovník{preset.workers>1?'ů':''} • {preset.hourlyRate} Kč/h • {Math.round(preset.costRatio*100)} % náklady
          </div>
        </button>
      ))}
    </div>
  </section>
);

export default function ConfigSidebar({ open, onClose }: ConfigSidebarProps): React.ReactElement | null {
  const { config, setConfig } = useContext(ConfigContext);
  const [localConfig, setLocalConfig] = useState(config);
  const [hasChanges, setHasChanges] = useState(false);
  const [visible, setVisible] = useState(open);

  // Slide in/out
  useEffect(() => {
    if (open) setVisible(true);
    else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Sync
  useEffect(() => {
    if (open) {
      setLocalConfig(config);
      setHasChanges(false);
    }
  }, [open, config]);

  // Detect changes
  useEffect(() => {
    setHasChanges(JSON.stringify(localConfig) !== JSON.stringify(config));
  }, [localConfig, config]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const save = useCallback(() => { setConfig(localConfig); onClose(); }, [localConfig, setConfig, onClose]);
  const cancel = useCallback(() => { setLocalConfig(config); onClose(); }, [config, onClose]);
  const reset = useCallback(() => { setLocalConfig(defaultConfig); }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={cancel}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="config-sidebar-title"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[440px] sm:w-80 md:w-[440px]
          bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
          shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <header className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-sm"/>
          <div className="relative flex items-center justify-between">
            <h2 id="config-sidebar-title" className="text-xl font-bold flex items-center gap-2">
              ⚙️ Nastavení
            </h2>
            <button onClick={cancel} aria-label="Zavřít nastavení"
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          {hasChanges && <div className="absolute -bottom-0.5 left-6 right-6 h-0.5 bg-yellow-400 rounded-full shadow-lg"/>}
        </header>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <VehicleSizeSection
            currentSize={localConfig.vehicleSize}
            onSelect={v => setLocalConfig(c => ({ ...c, vehicleSize: v }))}
          />
          <AppSettingsSection
            workers={localConfig.workers}
            hourlyRate={localConfig.hourlyRate}
            costRatio={localConfig.costRatio}
            onWorkersChange={w => setLocalConfig(c => ({ ...c, workers: w }))}
            onHourlyRateChange={r => setLocalConfig(c => ({ ...c, hourlyRate: r }))}
            onCostRatioChange={r => setLocalConfig(c => ({ ...c, costRatio: r }))}
          />
          <QuickPresetsSection
            onPresetSelect={p => setLocalConfig(c => ({ ...c, ...p }))}
          />
        </div>

        {/* Footer with bottom padding */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 p-6 pb-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={reset}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              🔄 Obnovit výchozí
            </button>
            {hasChanges && (
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"/>
                Neuložené změny
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={cancel}
              className="flex-1 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              Zrušit
            </button>
            <button onClick={save}
              className={`flex-1 px-6 py-3 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                hasChanges
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-lg'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {hasChanges ? '💾 Uložit změny' : '✅ Uložit'}
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}
