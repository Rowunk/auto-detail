// src/components/ConfigSidebar.tsx
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../contexts/ConfigContext';
import ConditionSelector from './ConditionSelector';
import VehicleSizeSelector from './VehicleSizeSelector';
import type { ConfigSidebarProps } from '../types/props';

export default function ConfigSidebar({
    open,
    onClose,
    condition,
    onConditionChange
}: ConfigSidebarProps): React.ReactElement | null {
    const { config, setConfig } = useContext(ConfigContext);
    const [localConfig, setLocalConfig] = useState(config);
    const [localCondition, setLocalCondition] = useState(condition);

    // Sync local state when sidebar opens
    useEffect(() => {
        if (open) {
            setLocalConfig(config);
            setLocalCondition(condition);
        }
    }, [open, config, condition]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    if (!open) return null;

    const save = (): void => {
        setConfig(localConfig);
        if (localCondition !== null) onConditionChange(localCondition);
        onClose();
    };

    const cancel = (): void => {
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={cancel}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="config-sidebar-title"
                className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col"
            >
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h2 id="config-sidebar-title" className="text-lg font-semibold">
                        ⚙️ Nastavení
                    </h2>
                    <button
                        onClick={cancel}
                        autoFocus
                        className="text-gray-600 hover:text-gray-900"
                        aria-label="Zavřít nastavení"
                    >
                        ✕
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Vehicle Settings */}
                    <section>
                        <h3 className="font-semibold mb-2">🚗 Stav vozidla</h3>
                        <ConditionSelector
                            current={localCondition}
                            onSelect={setLocalCondition}
                        />
                    </section>

                    <section>
                        <h3 className="font-semibold mb-2">🚚 Velikost vozidla</h3>
                        <VehicleSizeSelector
                            current={localConfig.vehicleSize}
                            onSelect={size =>
                                setLocalConfig(cfg => ({ ...cfg, vehicleSize: size }))
                            }
                        />
                    </section>

                    {/* App Settings */}
                    <section>
                        <h3 className="font-semibold mb-2">🛠️ Aplikace</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Pracovníků</label>
                            <select
                                value={localConfig.workers}
                                onChange={e =>
                                    setLocalConfig(cfg => ({ ...cfg, workers: Number(e.target.value) }))
                                }
                                className="w-full border rounded px-2 py-1"
                            >
                                {[1, 2, 3, 4, 5, 6].map(n => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Hodinová sazba (Kč)
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={localConfig.hourlyRate}
                                onChange={e =>
                                    setLocalConfig(cfg => ({
                                        ...cfg,
                                        hourlyRate: Number(e.target.value)
                                    }))
                                }
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Poměr nákladů (0–1)
                            </label>
                            <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.05}
                                value={localConfig.costRatio}
                                onChange={e =>
                                    setLocalConfig(cfg => ({
                                        ...cfg,
                                        costRatio: Number(e.target.value)
                                    }))
                                }
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                    </section>
                </div>

                {/* Actions */}
                <footer className="flex justify-end gap-2 p-4 border-t dark:border-gray-700">
                    <button
                        onClick={cancel}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Zrušit
                    </button>
                    <button
                        onClick={save}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Uložit
                    </button>
                </footer>
            </aside>
        </>
    );
}

ConfigSidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    condition: PropTypes.oneOf(['excellent', 'dirty', 'neglected', 'extreme', null]),
    onConditionChange: PropTypes.func.isRequired
};
