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

const CONDITION_LABELS = {
    excellent: 'Výborný',
    dirty: 'Špinavý', 
    neglected: 'Zanedbané',
    extreme: 'Extrémní'
};

const CATEGORY_OPTIONS = [
    { value: 'wash', label: 'Mytí' },
    { value: 'wheels', label: 'Kola' },
    { value: 'exterior', label: 'Exteriér' },
    { value: 'interior', label: 'Interiér' },
    { value: 'protection', label: 'Ochrana' },
    { value: 'restoration', label: 'Renovace' },
    { value: 'specialty', label: 'Speciální' }
];

/**
 * Modern hybrid service manager with responsive card/table layout.
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

    // Modern Service Card Component
    const ServiceCard = ({ svc }: { svc: EditableService }) => (
        <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={svc.name}
                        onChange={e => updateService(svc.key, { name: e.target.value })}
                        placeholder="Název služby"
                        className="text-lg font-semibold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 w-full"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                        {svc.key}
                    </p>
                </div>
                <button
                    onClick={() => deleteService(svc.key)}
                    className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-110"
                    title="Smazat službu"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Category & Order */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kategorie
                    </label>
                    <select
                        value={svc.category}
                        onChange={e => updateService(svc.key, { category: e.target.value as EditableService['category'] })}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        {CATEGORY_OPTIONS.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pořadí
                    </label>
                    <input
                        type="number"
                        value={svc.order}
                        onChange={e => updateService(svc.key, { order: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-right"
                    />
                </div>
            </div>

            {/* Times & Prices */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Časy & Ceny podle stavu
                </h4>
                {CONDITIONS.map(cond => (
                    <div key={cond} className="bg-gray-50/50 dark:bg-gray-700/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {CONDITION_LABELS[cond]}
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                {cond}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        ČAS
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min={0}
                                        value={svc.times[cond]}
                                        onChange={e => updateService(svc.key, {
                                            times: { ...svc.times, [cond]: Number(e.target.value) }
                                        })}
                                        className="w-full px-3 py-2 pr-12 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-right font-medium"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">min</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <label className="text-sm font-medium text-green-700 dark:text-green-300">
                                        CENA
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min={0}
                                        value={svc.basePrice[cond]}
                                        onChange={e => updateService(svc.key, {
                                            basePrice: { ...svc.basePrice, [cond]: Number(e.target.value) }
                                        })}
                                        className="w-full px-3 py-2 pr-12 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-right font-medium"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-sm font-medium text-green-600 dark:text-green-400">Kč</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Modern Header */}
                <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                🛠️ Správa služeb
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Spravujte služby, ceny a časy pro všechny stavy vozidel
                            </p>
                        </div>
                        <button
                            onClick={addService}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Přidat službu
                        </button>
                    </div>
                </div>

                {/* Modern Search */}
                <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Hledat podle názvu nebo klíče..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Mobile Cards (lg:hidden) */}
                <div className="lg:hidden grid gap-6">
                    {filtered.length === 0 ? (
                        <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-12 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Žádné služby nenalezeny
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Zkuste změnit vyhledávací kritéria
                            </p>
                        </div>
                    ) : (
                        filtered.map(svc => (
                            <ServiceCard key={svc.key} svc={svc} />
                        ))
                    )}
                </div>

                {/* Desktop Table (hidden lg:block) */}
                <div className="hidden lg:block backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50">
                                <tr>
                                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Název & Klíč
                                    </th>
                                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Kategorie
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Pořadí
                                    </th>
                                    {CONDITIONS.map(cond => (
                                        <th key={cond} className="px-3 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <div className="space-y-2">
                                                <div className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                                    {CONDITION_LABELS[cond]}
                                                </div>
                                                <div className="grid grid-cols-2 gap-1 text-xs">
                                                    <div className="flex items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 rounded p-1">
                                                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-blue-700 dark:text-blue-300 font-medium">ČAS</span>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/20 rounded p-1">
                                                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                        </svg>
                                                        <span className="text-green-700 dark:text-green-300 font-medium">CENA</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Akce
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-12 text-center">
                                            <div className="text-4xl mb-4">🔍</div>
                                            <div className="text-gray-500 dark:text-gray-400">
                                                Žádné služby nenalezeny
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(svc => (
                                        <tr key={svc.key} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                                            {/* Name & Key */}
                                            <td className="px-4 py-4">
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={svc.name}
                                                        onChange={e => updateService(svc.key, { name: e.target.value })}
                                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                        placeholder="Název služby"
                                                    />
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                                        {svc.key}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-4 py-4">
                                                <select
                                                    value={svc.category}
                                                    onChange={e => updateService(svc.key, { category: e.target.value as EditableService['category'] })}
                                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                >
                                                    {CATEGORY_OPTIONS.map(cat => (
                                                        <option key={cat.value} value={cat.value}>
                                                            {cat.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            {/* Order */}
                                            <td className="px-4 py-4">
                                                <input
                                                    type="number"
                                                    value={svc.order}
                                                    onChange={e => updateService(svc.key, { order: Number(e.target.value) })}
                                                    className="w-20 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center"
                                                />
                                            </td>

                                            {/* Times & Prices */}
                                            {CONDITIONS.map(cond => (
                                                <td key={cond} className="px-3 py-4">
                                                    <div className="space-y-3">
                                                        {/* Time Input */}
                                                        <div className="relative">
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={svc.times[cond]}
                                                                onChange={e => updateService(svc.key, {
                                                                    times: { ...svc.times, [cond]: Number(e.target.value) }
                                                                })}
                                                                className="w-20 px-2 py-1.5 pr-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-center text-sm font-medium"
                                                            />
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 pointer-events-none">
                                                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">min</span>
                                                            </div>
                                                        </div>
                                                        {/* Price Input */}
                                                        <div className="relative">
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={svc.basePrice[cond]}
                                                                onChange={e => updateService(svc.key, {
                                                                    basePrice: { ...svc.basePrice, [cond]: Number(e.target.value) }
                                                                })}
                                                                className="w-20 px-2 py-1.5 pr-8 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-center text-sm font-medium"
                                                            />
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 pointer-events-none">
                                                                <span className="text-xs font-medium text-green-600 dark:text-green-400">Kč</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            ))}

                                            {/* Delete */}
                                            <td className="px-4 py-4 text-center">
                                                <button
                                                    onClick={() => deleteService(svc.key)}
                                                    className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-110"
                                                    title="Smazat službu"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}