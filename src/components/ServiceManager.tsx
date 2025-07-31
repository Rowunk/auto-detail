// src/components/ServiceManager.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
    getStorageItem,
    setStorageItem
} from '../utils/storage';
import { serviceDatabase as baseDB } from '../services/serviceDatabase';
import type { ServiceItem, VehicleCondition } from '../types';

type EditableService = ServiceItem & { key: string };

const CONDITIONS: VehicleCondition[] = [
    'excellent', 'dirty', 'neglected', 'extreme'
];

/**
 * Full-featured management UI for CRUD of services.
 */
export default function ServiceManager(): React.ReactElement {
    const [services, setServices] = useState<EditableService[]>([]);
    const [search, setSearch] = useState<string>('');

    // Load from localStorage or bootstrap from baseDB
    useEffect(() => {
        const saved = getStorageItem<EditableService[]>('customServices', []);
        if (saved.length) {
            setServices(saved);
        } else {
            const initial = Object.entries(baseDB).map(
                ([key, svc]) => ({ key, ...svc })
            );
            setServices(initial);
        }
    }, []);

    // Persist helper
    const persist = (updated: EditableService[]) => {
        setServices(updated);
        setStorageItem('customServices', updated);
    };

    // Add a blank service
    const addService = () => {
        const blank: EditableService = {
            key: `svc_${Date.now()}`,
            name: '',
            category: 'wash',
            order: Math.max(0, ...services.map(s => s.order)) + 1,
            times: { excellent: 0, dirty: 0, neglected: 0, extreme: 0 },
            basePrice: { excellent: 0, dirty: 0, neglected: 0, extreme: 0 }
        };
        persist([blank, ...services]);
    };

    // Update a service field (shallow or nested)
    const updateService = (
        key: string,
        changes: Partial<EditableService>
    ) => {
        const updated = services.map(s =>
            s.key === key ? { ...s, ...changes } : s
        );
        persist(updated);
    };

    // Delete by key
    const deleteService = (key: string) => {
        const filtered = services.filter(s => s.key !== key);
        persist(filtered);
    };

    // Filter & sort for rendering
    const filtered = useMemo(() => {
        return services
            .filter(s =>
                s.key.includes(search) ||
                s.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => a.order - b.order);
    }, [services, search]);

    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">🛠️ Správa služeb</h2>
                <button
                    onClick={addService}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Přidat službu
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="🔍 Hledat podle názvu nebo klíče..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />

            {/* Services Table */}
            <div className="overflow-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Klíč</th>
                            <th className="p-2 border">Název</th>
                            <th className="p-2 border">Kategorie</th>
                            <th className="p-2 border">Pořadí</th>
                            {CONDITIONS.map(cond => (
                                <th key={cond} className="p-2 border">
                                    Čas {cond}
                                </th>
                            ))}
                            {CONDITIONS.map(cond => (
                                <th key={cond} className="p-2 border">
                                    Cena {cond}
                                </th>
                            ))}
                            <th className="p-2 border">Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(svc => (
                            <tr key={svc.key} className="hover:bg-gray-50">
                                {/* Key (read-only) */}
                                <td className="p-1 border text-xs text-gray-600">
                                    {svc.key}
                                </td>

                                {/* Name */}
                                <td className="p-1 border">
                                    <input
                                        type="text"
                                        value={svc.name}
                                        onChange={e =>
                                            updateService(svc.key, { name: e.target.value })
                                        }
                                        className="w-full px-1 py-0.5 border rounded"
                                    />
                                </td>

                                {/* Category */}
                                <td className="p-1 border">
                                    <select
                                        value={svc.category}
                                        onChange={e =>
                                            updateService(svc.key, {
                                                category: e.target.value as EditableService['category']
                                            })
                                        }
                                        className="w-full px-1 py-0.5 border rounded"
                                    >
                                        {['wash', 'wheels', 'exterior', 'interior', 'protection', 'restoration', 'specialty']
                                            .map(cat => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                    </select>
                                </td>

                                {/* Order */}
                                <td className="p-1 border">
                                    <input
                                        type="number"
                                        value={svc.order}
                                        onChange={e =>
                                            updateService(svc.key, { order: Number(e.target.value) })
                                        }
                                        className="w-16 px-1 py-0.5 border rounded text-right"
                                    />
                                </td>

                                {/* Times */}
                                {CONDITIONS.map(cond => (
                                    <td key={cond} className="p-1 border">
                                        <input
                                            type="number"
                                            min={0}
                                            value={svc.times[cond]}
                                            onChange={e =>
                                                updateService(svc.key, {
                                                    times: {
                                                        ...svc.times,
                                                        [cond]: Number(e.target.value)
                                                    }
                                                })
                                            }
                                            className="w-16 px-1 py-0.5 border rounded text-right"
                                        />
                                    </td>
                                ))}

                                {/* Prices */}
                                {CONDITIONS.map(cond => (
                                    <td key={cond} className="p-1 border">
                                        <input
                                            type="number"
                                            min={0}
                                            value={svc.basePrice[cond]}
                                            onChange={e =>
                                                updateService(svc.key, {
                                                    basePrice: {
                                                        ...svc.basePrice,
                                                        [cond]: Number(e.target.value)
                                                    }
                                                })
                                            }
                                            className="w-20 px-1 py-0.5 border rounded text-right"
                                        />
                                    </td>
                                ))}

                                {/* Delete */}
                                <td className="p-1 border text-center">
                                    <button
                                        onClick={() => deleteService(svc.key)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Smazat službu"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
