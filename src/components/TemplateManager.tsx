// src/components/TemplateManager.tsx
import React, { useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { isServiceItemArray } from '../utils/validators';
import { serviceDatabase } from '../services/serviceDatabase';
import type { ServiceItem } from '../types';

export interface ServiceTemplate {
    id: string;
    name: string;
    services: string[];
}

interface TemplateManagerProps {
    /** Apply this template’s services to the calculator */
    onApply: (services: string[]) => void;
    /** Close the modal */
    onClose: () => void;
}

export default function TemplateManager({
    onApply,
    onClose
}: TemplateManagerProps): React.ReactElement {
    // Persisted templates
    const [templates, setTemplates] = useLocalStorageState<ServiceTemplate[]>(
        'serviceTemplates',
        [],
        (x): x is ServiceTemplate[] => Array.isArray(x)
    );

    // Modal/form state
    const [editing, setEditing] = useState<ServiceTemplate | null>(null);
    const [name, setName] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const openNew = () => {
        setEditing(null);
        setName('');
        setSelectedServices([]);
    };

    const openEdit = (tpl: ServiceTemplate) => {
        setEditing(tpl);
        setName(tpl.name);
        setSelectedServices(tpl.services);
    };

    const save = () => {
        if (!name.trim()) return;
        const updated = editing
            ? templates.map(t =>
                t.id === editing.id ? { ...t, name, services: selectedServices } : t
            )
            : [
                ...templates,
                { id: Date.now().toString(), name, services: selectedServices }
            ];
        setTemplates(updated);
        // reset form
        openNew();
    };

    const remove = (id: string) => {
        setTemplates(templates.filter(t => t.id !== id));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 max-w-2xl p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Šablony služeb</h2>
                    <button onClick={onClose} aria-label="Zavřít">
                        ✕
                    </button>
                </div>

                {/* Template List */}
                <div className="mb-4">
                    <button
                        onClick={openNew}
                        className="mb-3 bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        + Nová šablona
                    </button>
                    <ul className="space-y-2 max-h-32 overflow-y-auto">
                        {templates.map(tpl => (
                            <li
                                key={tpl.id}
                                className="flex justify-between items-center border-b pb-1"
                            >
                                <span>{tpl.name}</span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => onApply(tpl.services)}
                                        className="text-green-600"
                                    >
                                        Aplikovat
                                    </button>
                                    <button
                                        onClick={() => openEdit(tpl)}
                                        className="text-yellow-600"
                                    >
                                        Upravit
                                    </button>
                                    <button
                                        onClick={() => remove(tpl.id)}
                                        className="text-red-600"
                                    >
                                        Smazat
                                    </button>
                                </div>
                            </li>
                        ))}
                        {templates.length === 0 && (
                            <li className="text-gray-500">Žádné šablony</li>
                        )}
                    </ul>
                </div>

                {/* Edit/Create Form */}
                <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">
                        {editing ? 'Upravit' : 'Nová'} šablona
                    </h3>
                    <input
                        className="w-full mb-2 border rounded px-2 py-1"
                        placeholder="Název šablony"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto mb-2">
                        {Object.entries(serviceDatabase).map(([key, svc]) => (
                            <label
                                key={key}
                                className="flex items-center space-x-2 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedServices.includes(key)}
                                    onChange={() => {
                                        setSelectedServices(prev =>
                                            prev.includes(key)
                                                ? prev.filter(x => x !== key)
                                                : [...prev, key]
                                        );
                                    }}
                                />
                                <span>{svc.name}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => {
                                openNew();
                                onClose();
                            }}
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Zavřít
                        </button>
                        <button
                            onClick={save}
                            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Uložit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
