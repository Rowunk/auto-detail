// src/components/ConfigSidebar.tsx
import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import ConditionSelector from './ConditionSelector';
import VehicleSizeSelector from './VehicleSizeSelector';
import type { VehicleCondition } from '../types';

interface ConfigSidebarProps {
    open: boolean;
    onClose: () => void;
    /** Current selected condition */
    condition: VehicleCondition | null;
    /** Callback to update condition */
    onConditionChange: (cond: VehicleCondition) => void;
}

export default function ConfigSidebar({
    open,
    onClose,
    condition,
    onConditionChange
}: ConfigSidebarProps): React.ReactElement | null {
    const { config, setConfig } = useContext(ConfigContext);
    const [localConfig, setLocalConfig] = useState(config);
    const [localCondition, setLocalCondition] = useState<VehicleCondition | null>(condition);

    // Sync local state when opened
    useEffect(() => {
        if (open) {
            setLocalConfig(config);
            setLocalCondition(condition);
        }
    }, [open, config, condition]);

    if (!open) return null;

    const save = (): void => {
        setConfig(localConfig);
        if (localCondition) onConditionChange(localCondition);
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
            />

            {/* Sidebar */}
            <aside className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col">
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h2 className="text-lg font-semibold">⚙️ Config Sidebar</h2>
                    <button onClick={cancel} className="text-gray-600 hover:text-gray-900">✕</button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Vehicle Settings */}
                    <section>
                        <h3 className="font-semibold mb-2">🚗 Vehicle Settings</h3>
                        <div className="mb-4">
                            <ConditionSelector
                                current={localCondition}
                                onSelect={c => setLocalCondition(c)}
                            />
                        </div>
                        <div>
                            <VehicleSizeSelector
                                current={localConfig.vehicleSize}
                                onSelect={size =>
                                    setLocalConfig(cfg => ({ ...cfg, vehicleSize: size }))
                                }
                            />
                        </div>
                    </section>

                    {/* App Settings */}
                    <section>
                        <h3 className="font-semibold mb-2">🛠️ App Settings</h3>

                        {/* Workers */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Pracovníků
                            </label>
                            <select
                                value={localConfig.workers}
                                onChange={e =>
                                    setLocalConfig(cfg => ({ ...cfg, workers: Number(e.target.value) }))
                                }
                                className="w-full border rounded px-2 py-1"
                            >
                                {[1, 2, 3, 4, 5, 6].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>

                        {/* Hourly Rate */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Hodinová sazba (Kč)
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={localConfig.hourlyRate}
                                onChange={e =>
                                    setLocalConfig(cfg => ({ ...cfg, hourlyRate: Number(e.target.value) }))
                                }
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>

                        {/* Cost Ratio */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Poměr nákladů (0-1)
                            </label>
                            <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.05}
                                value={localConfig.costRatio}
                                onChange={e =>
                                    setLocalConfig(cfg => ({ ...cfg, costRatio: Number(e.target.value) }))
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
